<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Privileges extends Model
{
    protected $table = 'privileges';

	protected $primaryKey = 'idPrivilege';

    protected $fillable = [
    	'idPrivilege', 'Name', 'Tier'
    ];

    protected $hidden = [
    	'created_at', 'updated_at',
    ];

    public function belongsToUser() {
        return $this->belongsTo(User::class, 'idPrivilege', 'idPrivilege');
    }
}