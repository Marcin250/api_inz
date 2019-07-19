<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Users extends Resource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
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
            //'likedArticles' => UserLikes::collection($this->hasLikedArticles()) ?? [],
            //'latestComments' => Comments::collection($this->hasComments) ?? [],
        ];
    }
}
