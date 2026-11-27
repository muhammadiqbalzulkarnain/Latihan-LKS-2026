<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    const UPDATED_AT = null;
    protected $fillable = [
        'full_name',
        'bio',
        'username',
        'password',
        'is_private'
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function followingUsers()
    {
        return $this->belongsToMany(User::class, 'follow', 'follower_id', 'following_id')->withPivot(['is_accepted']);
    }

    public function followerUsers()
    {
        return $this->belongsToMany(User::class, 'follow', 'following_id', 'follower_id')->withPivot(['is_accepted']);
    }

    public function followings()
    {
        return $this->hasMany(Follow::class, 'follower_id');
    }

    public function followers()
    {
        return $this->hasMany(Follow::class, 'following_id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
