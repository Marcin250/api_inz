<?php
namespace App;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'provider', 'provider_id', 'image',
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
}