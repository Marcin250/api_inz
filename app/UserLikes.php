<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserLikes extends Model
{
	protected $primaryKey = 'idUserLike';

    protected $table = 'user_likes';
    
    protected $fillable = [
    	'idUser', 'idReference', 'Type', 'Reaction', 'created_at'
    ];

    protected $hidden = [
        'idReference', 'updated_at',
    ];

    protected $appends = [
        'idArticle'
    ];

    public function hasUser()
    {
        return $this->hasOne(User::class, 'id', 'idUser');
    }

    public function hasArticle()
    {
        return $this->hasOne(Articles::class, 'idArticle', 'idReference');
    }

    protected function getIdArticleAttribute () {
        return $this->idReference;
    }
}
