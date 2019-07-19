<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Statuses extends Model
{
    protected $table = 'statuses';

	protected $primaryKey = 'idStatus';

    protected $fillable = [
    	'idStatus', 'Name',
    ];

    protected $hidden = [
    	'created_at', 'updated_at',
    ];

    public function belongsToUser() {
        return $this->belongsTo(User::class, 'idStatus', 'idStatus');
    }
}