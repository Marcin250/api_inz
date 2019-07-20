<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Articles;
use App\Comments;
use App\UserLikes;
use App\Http\Resources\Articles as ArticlesResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CloudinaryController;
use Facades\App\CacheData\ArticlesCache;
use Facades\App\CacheData\UsersCache;
use App\Http\Controllers\ValidatorController;

if(!isset($_SESSION)) { session_start(); }

class ArticlesController extends Controller
{
    public static function buildArticleData(&$articles, $whereVisible, $whereInColumn, $whereInValues, $orderColumn, $orderValue, $quantity, $articleID, $filterColumn, $phrase, $lenght = 'short')
    {
        if($articleID == null && $lenght == 'short')
        {
            if($phrase == '')
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.Main', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->orderBy($orderColumn, $orderValue)->limit($quantity)->get();
            else
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', DB::raw('SUBSTRING(articles.Content, 1, 120) as content'), 'articles.Views as views', 'articles.Visible as visible', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.Main', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->whereRaw('MATCH (' . $filterColumn . ') AGAINST ("+' . $phrase . '*" IN BOOLEAN MODE)')->orderBy($orderColumn, $orderValue)->limit($quantity)->get();
        }
        elseif($articleID == null && $lenght == 'long')
        {
            if($phrase == '')
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', 'articles.Content as content', 'articles.Views as views', 'articles.Visible as visible', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.Main', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->orderBy($orderColumn, $orderValue)->limit($quantity)->get();
            else
                $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', 'articles.Content as content', 'articles.Views as views', 'articles.Visible as visible', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.Main', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereRaw('MATCH (' . $filterColumn . ') AGAINST ("+' . $phrase . '*" IN BOOLEAN MODE)')->whereIn($whereInColumn, $whereInValues)->orderBy($orderColumn, $orderValue)->limit($quantity)->get();
        }
        elseif($articleID != null)
        {
            $articles = DB::table('articles')->join('categories', 'articles.idCategory', '=', 'categories.idCategory')->leftJoin('comments', 'comments.idReference', '=', 'articles.idArticle')->leftJoin('user_likes', 'user_likes.idReference', '=', 'articles.idArticle')->select('articles.idArticle as idarticle', 'categories.Name as category', 'articles.idUser as user', 'articles.Title as title', 'articles.Image as image', 'articles.Content as content', 'articles.Views as views', 'articles.Visible as visible', 'articles.Main as main', 'articles.created_at as create_date', 'articles.updated_at as modify_date', DB::raw('(select count(*) from comments where comments.idReference = articles.idArticle and comments.Type = "article" and comments.Visible = 1) as comments_count'), DB::raw('(select count(*) from user_likes where user_likes.idReference = articles.idArticle and user_likes.Type = "article" and user_likes.Reaction = "like") as likes_count'))->groupBy('articles.idArticle', 'categories.Name', 'articles.idUser', 'articles.Title', 'articles.Image', 'articles.Content', 'articles.Views', 'articles.Visible', 'articles.Main', 'articles.created_at', 'articles.updated_at', 'comments.idReference')->whereIn('articles.Visible', $whereVisible)->whereIn($whereInColumn, $whereInValues)->where('articles.idArticle', $articleID)->first();
        }
    }

    public static function addUsersData(&$articles)
    {
        foreach ($articles as $key => $article)
        {
            if(substr($article->content, -1) == '.') $article->content .= '..'; else $article->content .= '...';
            $article->user = UsersCache::by_id($article->user);
        }
    }

    public static function escapeLike($str)
    {
        return str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], $str);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = ArticlesCache::index($_SESSION['iduser']);
        return response()->json($articles);
    }

    public function latest_main($count)
    {
        if($count > 0)
        {
            $articles = ArticlesCache::latest_main($count);
            $articles[0]->user = UsersCache::by_id($articles[0]->user);
            return response()->json($articles);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data'], 204);
    }

    public function latest($count, Request $request)
    {
        if($count > 0)
        {
            $articles = ArticlesCache::latest($count);
            if($request->id)
            {
                foreach ($articles as $key => $article) {
                    if($article->idarticle == $request->id)
                    {
                        unset($articles[$key]);
                        break;
                    }
                }
            }
            $this->addUsersData($articles);
            return response()->json($articles);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data'], 204);
    }

    public function show_article($id)
    {
        if(isset($_SESSION['iduser']))
            $user = $_SESSION['iduser'];
        else
            $user = 'none';
        $articles = ArticlesCache::articleUser($id, $user);
        if($articles)
        {
            $articles->user = UsersCache::by_id($articles->user);
            Articles::where('idArticle', $id)->increment('Views', 1);
            return response()->json($articles);
        }
        return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    public static function BuildNeighboursData($ids)
    {
        $articles = array();
        self::buildArticleData($articles, [1], 'articles.idArticle', $ids, 'articles.idArticle', 'asc', 3, null, 'articles.Title', '');
        return $articles;
    }

    public function show_neighbours($id)
    {
        $articles = ArticlesCache::neighbours($id);
        $this->addUsersData($articles);
        return response()->json($articles);
    }

    public function filtrate($count, $phrase)
    {
        if(isset($phrase) && isset($count))
        {
            // uniknięcie zagrożenia SQL Injection
            $fixedPhrase = $this->escapeLike($phrase);
            $articles = array();
            $this->buildArticleData($articles, [1], 'articles.Main', [0, 1], 'articles.idArticle', 'desc', $count, null, 'articles.Title', $fixedPhrase);
            $this->addUsersData($articles);
            return response()->json($articles);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    public function by_category($count, Request $request)
    {
        if(isset($request->categories) && $count > 0)
        {
            $articles = ArticlesCache::by_category('idCategory', $request->categories, $count);
            $this->addUsersData($articles);
            return response()->json($articles);
        }
        else
            $articles = ArticlesCache::by_category('Main', [0, 1], $count);
        $this->addUsersData($articles);
        return response()->json($articles);
    }

    public function panel($days)
    {
        $articles = ArticlesCache::panel($days);
        return response()->json($articles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //if(isset($data['category']) && isset($data['title']) && isset($data['content']) && $request->file('image') != null)
        $check_file_msg = "";
        if(isset($request->category) && isset($request->title) && isset($request->content) && ValidatorController::checkUploadFile($request->file('image'), $check_file_msg))
        {
            $articles = new Articles;
            $articles->idCategory = $request->category;
            $articles->idUser = $_SESSION['iduser'];
            $articles->Title = $request->title;
            $articles->Content = $request->content;
            $articles->Views = 1;

            $image_name = 'articles' . $_SESSION['iduser'] . time() . $request->category . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationFolder = public_path('images') . '/articles/';
            $request->file('image')->move($destinationFolder, $image_name);
            $path = $destinationFolder . $image_name;

            $articles->Image = CloudinaryController::uploadImage($path, $image_name, 'articles');

            if(Articles::where('Title', $articles->Title)->where('idCategory', $articles->idCategory)->where('idUser', $articles->idUser)->exists())
            {
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
            }
            else
            {
                if($articles->save())
                {
                    $_SESSION['articles_count'] += 1;
                    return response()->json(['status' => true, 'error' => ''], 201);
                }
                else
                    return response()->json(['status' => false, 'error' => 'wrong data'], 204);
            }
            return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data ' . $check_file_msg]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(isset($request->category) && isset($request->title) && isset($request->content))
        {
            if(ValidatorController::checkUploadFile($request->file('image'), $check_file_msg))
            {
                $image_name = 'articles' . $_SESSION['iduser'] . time() . $request->category . '.' . $request->file('image')->getClientOriginalExtension();
                $destinationFolder = public_path('images') . '/articles/';
                $request->file('image')->move($destinationFolder, $image_name);
                $path = $destinationFolder . $image_name;

                $articleImage = CloudinaryController::uploadImage($path, $image_name, 'articles');
                if(Articles::where('idArticle', $id)->update([
                    'idCategory' => $request->category,
                    'Title' => $request->title,
                    'Content' => $request->content,
                    'Image' => $articleImage]))
                {
                    ArticlesCache::removeFromCache($id);
                    return response()->json(['status' => true, 'error' => ''], 202);
                }
            }
            else
            {
                if(Articles::where('idArticle', $id)->update([
                    'idCategory' => $request->category,
                    'Title' => $request->title,
                    'Content' => $request->content]))
                {
                    ArticlesCache::removeFromCache($id);
                    return response()->json(['status' => true, 'error' => '' . $check_file_msg]);
                }
            }
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data ' . $check_file_msg]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $article = ArticlesCache::article($id);
        if($article->main == 1) {
            $latest = ArticlesCache::latest(1);
            Articles::where('idArticle', $latest[0]->idarticle)->update(['Main' => 1]);
        }
        if(Articles::where('idArticle', $id)->where('idUser', $_SESSION['iduser'])->delete()) {
            ArticlesCache::removeFromCache($id);
            return response()->json(['status' => true, 'error' => ''], 202);
        }
        return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

    public function staff_show_article($id)
    {
        if(Articles::where('idArticle', $id)->count())
        {
            $articles = '';
            $this->buildArticleData($articles, [0, 1], 'articles.Main', [0, 1], 'articles.idArticle', 'asc', 1, $id, 'articles.Title', '');
            $this->addUsersData($articles);
            Articles::where('idArticle', $id)->increment('Views', 1);
            return response()->json($articles);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data'], 204);
    }

    public function staff_update(Request $request, $id)
    {
        $data = json_decode($request->getContent(), true);
        if(isset($data['content']))
        {
            if(Articles::where('idArticle', '=' , $id)->update(['Content' => $data['content']]))
            {
                ArticlesCache::removeFromCache($id);
                return response()->json(['status' => true, 'error' => ''], 202);
            }
            else
                return response()->json(['status' => false, 'error' => 'wrong data'], 204);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data'], 204);
    }

    public function staff_change_visibility($id)
    {
        if(DB::table('articles')->where('idArticle', $id)->update(['Visible' => DB::raw('ABS(Visible-1)')]))
        {
            ArticlesCache::removeFromCache($id);
            return response()->json(['status' => true, 'error' => ''], 202);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data'], 204);
    }

    public function staff_change_main($id)
    {
        if(DB::table('articles')->update(['Main' => DB::raw('(case when `idArticle` = ' . $id . ' then 1 when `idArticle` <> ' . $id . ' then 0 end)')]))
        {
            ArticlesCache::removeFromCache($id);
            return response()->json(['status' => true, 'error' => ''], 202);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data'], 204);
    }

    public function test_admin_delete()
    {
        if(Articles::where('idUser', $_SESSION['iduser'])->delete())
        {
            ArticlesCache::removeFromCache($id);
            return response()->json(['status' => true, 'error' => ''], 202);
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data'], 204);
    }
}