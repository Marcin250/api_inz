<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserLikes extends Model
{
	protected $primaryKey = 'idUserLike';

    protected $table = 'user_likes';
    
    protected $fillable = [
    	'idUser', 'idReference', 'Type', 'Reaction',
    ];


}
