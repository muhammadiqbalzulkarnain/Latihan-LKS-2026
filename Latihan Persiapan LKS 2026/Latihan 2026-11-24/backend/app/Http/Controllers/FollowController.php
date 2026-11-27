<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    // Following (Follow A User)
    public function follow(Request $request, User $user)
    {
        $fromUser = $request->user();
        $toUser = $user;
        $status = true;

        if ($toUser->id === $fromUser->id) {
            return response([
                'message' => 'You are not to allowed to follow yourself'
            ], 422);
        }

        $alreadyFollowed = $fromUser->followings()->where('following_id', $toUser->id)->first();

        if ($alreadyFollowed) {
            return response([
                'message' => "You are already followed",
                'status' => $alreadyFollowed->is_accepted ? 'following' : 'requested'
            ], 422);
        }

        if ($toUser->is_private) {
            $status = false;
        }

        Follow::create([
            'follower_id' => $fromUser->id,
            'following_id' => $toUser->id,
            'is_accepted' => $status
        ]);

        return response([
            'message' => 'Follow success',
            'status' => $status ? 'following' : 'requested'
        ], 200);
    }

    // Following (Unfolllow A User)
    public function unfollow(Request $request, User $user)
    {
        $fromUser = $request->user();
        $follow = $fromUser->followings->where('following_id', $user->id)->first();
        
        if ($follow) {
            $follow->delete();
            return response([], 204);
        }

        return response([
            'message' => 'You are not following the user'
        ], 422);
    }

    // Following (Get Following Users)
    public function getFollowers(User $user)
    {
        return response([
            'followers' => $user->followerUsers->map(function ($user) {
                return [
                    ...$user->makeHidden(['pivot', 'password'])->toArray(),
                    'is_requested' => !$user->pivot->is_accepted,
                ];
            })
        ], 200);
    }

    // Followers (Accept Follow Request)
    public function accept(Request $request, User $user)
    {
        $targetUser = $request->user()->followers()->where('follower_id', $user->id)->first();

        if ($targetUser && !$targetUser->is_accepted) {
            $targetUser->is_accepted = true;
            $targetUser->save();
            
            return response([
                'message' => 'Follow request accepted'
            ], 200);
        }

        if ($targetUser && $targetUser->is_accepted) {
            return response([
                'message' => 'Follow request is already accepted'
            ], 422);
        }

        return response([
            'message' => 'The user is not following you'
        ], 422);
    }

    // User (Get All User)
    public function getAll(Request $request)
    {
        $exceptId = $request->user()->follwoings()->pluck('following_id')->toArray();
        $exceptId[] = $request->user()->id;
        $user = User::all()->except($exceptId);

        return response([
            'users' => $user->makeHidden('password')
        ], 200);
    }

    // User (Get Detail User)
    public function getDetail(Request $request, User $user)
    {
        $isYourAccount = $user->id === $request->user()->id;
        $followingStatus = 'not following';
        $following = $request->user()->following()->where('following_id', $user->id)->first();

        if ($following && $following->is_accepted) {
            $followingStatus = 'following';
        } else if ($following && !$following->is_accepted) {
            $followingStatus = 'requested';
        }

        $extra = [];

        if ($followingStatus === 'following' || !$user->is_private || $isYourAccount) {
            $extra = [
                "posts" => $user->posts->load('attachment')
            ];
        }

        return response([
            ...$user->makeHidden(['password'])->toArray(),
            'is_your_account' => $isYourAccount,
            'following_status' => $followingStatus,
            'posts_count' => $user->posts()->count(),
            'followers_count' => $user->followers()->count(),
            'following_count' => $user->following()->count(),
            ...$extra,
        ], 200);
    }
}
