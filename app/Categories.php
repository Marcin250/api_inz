<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
	protected $table = 'categories';

	protected $primaryKey = 'idCategory';

    protected $fillable = [
    	'idCategory', 'Name',
    ];

    protected $hidden = [
    	'created_at', 'updated_at',
    ];

    public function articles() {
        return $this->belongsTo(Articles::class, 'idCategory', 'idCategory');
    }
}
