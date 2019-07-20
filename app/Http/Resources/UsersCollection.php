<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UsersCollection extends AnonymousResourceCollection
{
    private $details;

    public function getDetails($details = false) {
        $this->details = $details;
        return $this;
    }

    public function toArray($request){
        return $this->collection->map(function(Users $resource) use($request){
            return $resource->getDetails($this->details)->toArray($request);
        })->all();

    }
}