<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $table = 'comments';

    protected $primaryKey = 'idComment';

    protected $fillable = [
        'idReference', 'idSubReference', 'idUser', 'Type', 'Content', 'Visible', 'created_at', 'updated_at'
    ];

    protected $hidden = [
    ];

    public function hasUser()
    {
        return $this->hasOne(User::class, 'id', 'idUser');
    }
}
