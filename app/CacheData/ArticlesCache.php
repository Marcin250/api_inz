<?php

namespace App\CacheData;

use App\Articles;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\ArticlesController;
use App\Http\Resources\Articles as ArticlesResource;

class ArticlesCache
{
	CONST CACHE_KEY = 'ARTICLES';

    public function index($user)
    {
        $key = 'index.' . $user;
        $cacheKey = $this->getCacheKey($key);
        return cache()->remember($cacheKey, Carbon::now()->addSeconds(4), function() use($user) {
            ArticlesController::buildArticleData($articles, [0, 1], 'articles.idUser', [$user], 'articles.idArticle', 'desc', null, null, 'articles.Title', '', 'long');
            return $articles;
        });
    }

	public function article($id)
	{
		$key = 'article.' . $id;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addHours(12), function() use($id) {
            if(Articles::where('idArticle', $id)->where('Visible', 1)->count())
            {
                ArticlesController::buildArticleData($article, [1], 'Main', [0, 1], 'articles.idArticle', 'asc', 1, $id, 'articles.Title', '', 'long');
                return $article;
            }
          	return false;
		});
	}

    public function articleUser($id, $user)
    {
        $key = 'article.' . $id . '.user.' . $user;
        $cacheKey = $this->getCacheKey($key);
        return cache()->remember($cacheKey, Carbon::now()->addSeconds(4), function() use($id, $user) {
            $article = $this->article($id);
            if($article)
            {
                if($user != 'none')
                {
                    // sprawdzenie czy użytkownik którego dane sesji zostały przesłane polubił dany artykuł
                    if(DB::table('user_likes')->where('Type', 'article')->where('Reaction', 'like')->where('idReference', $id)->where('idUser', $user)->count())
                        $article->liked = true;
                    else
                        $article->liked = false;
                }
                else
                    $article->liked = false;
            }
            return $article;
        });
    }

	public function latest_main($count)
	{
		$key = 'latest_main.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($count) {
			ArticlesController::buildArticleData($articles_latest_main, [1], 'articles.Main', [1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
			return $articles_latest_main;
		});
	}	

	public function latest($count)
	{
        $key = 'latest_plain.' . $count;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($count) {
			ArticlesController::buildArticleData($articles_latest, [1], 'articles.Main', [0], 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
			return $articles_latest;
		});
	}

	public function panel($days)
	{
		$key = 'panel.' . $days;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($days) {
			$articlesByCategory = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->select('categories.Name as category', DB::raw('count(*) as articles_count'))->groupBy('categories.Name')->get();
            ArticlesController::buildArticleData($latestArticles, [0, 1], 'articles.Main', [0, 1], 'articles.idArticle', 'desc', 3, null, 'articles.Title', '');
            $weekSum = DB::table('articles')->select(DB::raw('date(created_at) as day, count(*) as total_articles'))->where(DB::raw('DATEDIFF(NOW(), articles.created_at)'), '<', $days)->groupBy(DB::raw('day'))->get();
            $weekSummary = array();
            $to = date('Y-m-d', time());
            $from = date('Y-m-d',(strtotime('-' . $days+1 . 'day', strtotime($to))));
            for($from; $from <= $to; $from = date('Y-m-d',(strtotime( '+1 day', strtotime($from)))))
            {
                $data = $weekSum->where('day', $from)->first();
                $count = isset($data->total_articles) ? $data->total_articles : 0;
                array_push($weekSummary, ['day' => $from, 'articles_count' => $count]);
            }
            $panelData = [
                'weekSummary' => $weekSummary,
                'latestArticles' => $latestArticles->toArray(),
                'articlesByCategory' => $articlesByCategory->toArray(),
                'totalArticles' => Articles::count()
            ];
			return $panelData;
		});
	}

	public function neighbours($id)
	{
		$key = 'neighbours.' . $id;
		$cacheKey = $this->getCacheKey($key);
		return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($id) {
            $idPrev = DB::table('articles')->select('idArticle')->where('idArticle', '<', $id)->orderBy('idArticle', 'desc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
            $idNext = DB::table('articles')->select('idArticle')->where('idArticle', '>', $id)->orderBy('idArticle', 'asc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
            if($idPrev && $idNext)
                $ids = [$idPrev, $id, $idNext];
            elseif($idPrev)
            {
                $idNext = DB::table('articles')->select('idArticle')->where('idArticle', '<', $idPrev)->orderBy('idArticle', 'desc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
                $ids = [$idPrev, $id, $idNext];
            }
            elseif($idNext)
            {
                $idPrev = DB::table('articles')->select('idArticle')->where('idArticle', '>', $idNext)->orderBy('idArticle', 'asc')->where('articles.Visible', 1)->limit(1)->value('idArticle');
                $ids = [$idPrev, $id, $idNext];
            }
            $articles = ArticlesController::BuildNeighboursData($ids);
            return $articles;
		});
	}

    public function by_category($column, $categories, $count)
    {
        $keyCategories = '';
        foreach ($categories as $key => $category) {
            $keyCategories .= $category . '.';
        }
        $key = 'by_category.' . $keyCategories . $count ;
        $cacheKey = $this->getCacheKey($key);
        return cache()->remember($cacheKey, Carbon::now()->addMinutes(1), function() use($column, $categories, $count) {
            ArticlesController::buildArticleData($articles, [1], 'articles.' . $column, $categories, 'articles.idArticle', 'desc', $count, null, 'articles.Title', '');
            return $articles;
        });
    }

    public function storeForever($key, $data)
    {
        $cacheKey = $this->getCacheKey($key);
        return Cache::forever($cacheKey, $data);
    }

	public function getCacheKey($key)
	{
		$key = strtoupper($key);
		return self::CACHE_KEY . '.' . $key;
	}

    public function removeFromCache($id, $user = false)
    {
        if($user) {
            $key = 'article.' . $id . '.user.' . $user;
            $cacheKey = $this->getCacheKey($key);
            cache()->forget($cacheKey);
        }
        $key = 'article.' . $id;
        $cacheKey = $this->getCacheKey($key);
        return cache()->forget($cacheKey);
    }

    // for ORM

    public function oArticle($id) {
        $key = 'oArticle.' . $id;
        $cacheKey = $this->getCacheKey($key);
        return cache()->remember($cacheKey, Carbon::now()->addSeconds(2), function() use($id) {
            $articles = Articles::where('idArticle', $id)->first();
            return ArticlesResource::make($articles);
        });
    }
}