<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    protected $table = 'follow';

    protected $fillable = [
        'follower_id',
        'following_id',
        'is_accepted'
    ];

    const UPDATED_AT = null;
}
