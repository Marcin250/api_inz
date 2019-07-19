<?php
namespace App;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'id', 'name', 'email', 'provider', 'provider_id', 'image',
    ];

    protected $hidden = [
        'provider', 'provider_id', 'idPrivilege', 'idStatus',
    ];

    public function hasPrivilege()
    {
        return $this->hasOne(Privileges::class, 'idPrivilege', 'idPrivilege');
    }

    public function hasStatus()
    {
        return $this->hasOne(Statuses::class, 'idStatus', 'idStatus');
    }

    public function hasArticles()
    {
        return $this->hasMany(Articles::class, 'idUser', 'id');
    }

    public function hasComments() {
        return $this->hasMany(Comments::class, 'idUser', 'id');
    }

    public function hasLikedArticles() {
        return $this->hasMany(UserLikes::class, 'idUser', 'id');
    }

    public function articlesCount(): int
    {
        return (int) $this->hasArticles()->count();
    }

    public function commentsCount(): int
    {
        return (int) $this->hasComments()->count();
    }

    public function likesCount(): int
    {
        return (int) $this->hasLikedArticles()->count();
    }

}