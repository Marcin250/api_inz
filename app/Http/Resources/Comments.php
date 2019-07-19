<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Comments extends Resource
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
            'idComment' => $this->idComment,
            'user' => new Users($this->hasUser),
            'content' => $this->Content,
            'visible' => $this->Visible,
            'created' =>$this->created_at,
            'modified' =>$this->updated_at,
            'comments' => $this->collection(\App\Comments::where('idSubReference', $this->idComment)->orderBy('created_at', 'desc')->get())
        ];
    }
}
