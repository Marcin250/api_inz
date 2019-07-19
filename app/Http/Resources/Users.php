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
            'category' => $this->hasPrivilege->Name,
            'status' => $this->hasStatus->Name,
            'created' =>$this->created_at
        ];
    }
}
