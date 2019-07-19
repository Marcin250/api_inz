<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $table = 'comments';

    protected $primaryKey = 'idComment';

    protected $fillable = [
        'idReference', 'idSubReference', 'Type', 'Content', 'Visible', 'created_at', 'updated_at'
    ];

    protected $hidden = [
        'idUser',
    ];

    public function hasUser()
    {
        return $this->hasOne(User::class, 'id', 'idUser');
    }
}
