<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Articles extends Resource
{
    private $details;

    public function getDetails($details = false) {
        $this->details = $details;
        return $this;
    }

    public function toArray($request)
    {
        $resource = [
            'idArticle' => $this->idArticle ?? null,
            'category' => $this->hasCategory->Name ?? null,
            'user' => new Users($this->hasUser) ?? null,
            'title' => $this->Title ?? null,
            'image' => $this->Image ?? null,
            'content' => $this->Content ?? null,
            'views' => $this->Views ?? null,
            'visible' => $this->Visible ?? null,
            'main' => $this->Main ?? null,
            'created' => $this->created_at ?? null,
            'modified' => $this->updated_at ?? null,
            'commentsCount' => $this->commentsCount() ?? 0,
            'likesCount' => $this->likesCount() ?? 0,
        ];

        if($this->details) {
            $resource['comments'] = Comments::collection($this->hasComments) ?? [];
            $resource['usersLiked'] = Users::collection($this->belongsToManyUserLikes) ?? [];
        }

        return $resource;
    }

    public static function collection($resource) {
        return new ArticlesCollection($resource, get_called_class());
    }
}
