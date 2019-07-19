<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Articles extends Resource
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
            'idArticle' => $this->idArticle,
            'category' => $this->hasCategory->Name,
            'user' => new Users($this->hasUser),
            'title' => $this->Title,
            'image' => $this->Image,
            'content' => $this->Content,
            'views' => $this->Views,
            'created' => $this->created_at,
            'modified' => $this->updated_at
        ];
    }
}
