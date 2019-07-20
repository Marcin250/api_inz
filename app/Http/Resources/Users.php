<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Users extends Resource
{
    private $details;

    public function getDetails($details = false) {
        $this->details = $details;
        return $this;
    }

    public function toArray($request)
    {
        $resource = [
            'idUser' => $this->id,
            'name' => $this->Name,
            'email' => $this->Email,
            'image' => $this->Image,
            'privilege' => $this->hasPrivilege->Name,
            'tier' => $this->hasPrivilege->Tier,
            'status' => $this->hasStatus->Name,
            'created' =>$this->created_at,
            'articlesCount' => $this->articlesCount(),
            'commentsCount' => $this->commentsCount(),
            'likesCount' => $this->likesCount(),
        ];

        if($this->details) {
            $resource['postedComments'] = Comments::collection($this->postedComments) ?? [];
            $resource['likedArticles'] = Articles::collection($this->belongsToManyArticles) ?? [];
        }

        return $resource;
    }

    public static function collection($resource) {
        return new UsersCollection($resource, get_called_class());
    }
}
