<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserLikes extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            //'article' => new Articles($this->hasArticle),
            //'user' => new Users($this->hasUser),

            'article' => $this->hasArticle,
            'user' => $this->hasUser,
        ];
    }
}
