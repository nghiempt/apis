<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'account';
    protected $fillable
      = [
        'id',
        'name',
        'created_at', 
        'updated_at', 
        'deleted_at',
      ];
}
