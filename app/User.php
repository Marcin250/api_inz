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

    public function postedArticles()
    {
        $postedArticles = $this->belongsTo(Articles::class, 'id', 'idUser');
        return $postedArticles
            ->where('Visible', 1)
            ->orderBy('created_at', 'desc')
            ->pluck('idArticle');
    }

    public function postedComments() {
        return $this->hasMany(Comments::class, 'idUser', 'id')
            ->where('Visible', 1)
            ->orderBy('created_at', 'desc');
    }

    public function likedArticles() {
        $likedArticles = $this->hasMany(UserLikes::class, 'idUser', 'id');
        return $likedArticles
            ->orderBy('created_at', 'desc')
            ->pluck('idReference');
    }

    public function belongsToManyArticles() {
        return $this->belongsToMany(Articles::class, 'user_likes', 'idUser', 'idReference');
    }

    public function articlesCount(): int
    {
        return (int) $this->postedArticles()->count();
    }

    public function commentsCount(): int
    {
        return (int) $this->postedComments()->count();
    }

    public function likesCount(): int
    {
        return (int) $this->likedArticles()->count();
    }

}