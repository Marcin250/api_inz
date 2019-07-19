<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    protected $table = 'articles';

	protected $primaryKey = 'idArticle';

    protected $fillable = [
    	'idArticle', 'Topic', 'Image', 'Content', 'Views',
    ];

    protected $hidden = [
    	'idCategory', 'idUser',
    ];

    public function hasCategory()
    {
        return $this->hasOne(Categories::class, 'idCategory', 'idCategory');
    }

    public function hasUser()
    {
        return $this->hasOne(User::class, 'id', 'idUser');
    }
}