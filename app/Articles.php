<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    protected $table = 'articles';

	protected $primaryKey = 'idArticle';

    protected $fillable = [
    	'idArticle', 'Topic', 'Image', 'Content', 'Views', 'Visible', 'Main'
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

    public function hasComments() {
        return $this->hasMany(Comments::class, 'idReference', 'idArticle')
            ->where('Visible', 1)
            ->where('idSubReference', 0)
            ->orderBy('created_at', 'desc');
    }

    public function belongsToManyUserLikes() {
        return $this->belongsToMany(User::class, 'user_likes', 'idReference', 'idUser');
    }

    public function commentsCount(): int
    {
        return (int) $this->hasComments()->count();
    }

    public function likesCount(): int
    {
        return (int) $this->belongsToManyUserLikes()->count();
    }

}