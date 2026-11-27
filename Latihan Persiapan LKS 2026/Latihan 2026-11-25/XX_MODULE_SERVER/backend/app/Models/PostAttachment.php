<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostAttachment extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'post_id',
        'storage_path'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
