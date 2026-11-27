<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PostOwnerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $post = $request->route('post');

        if ($post && $post->user_id === $request->user()?->id) {
            return $next($request);
        }

        return response([
            'message' => 'Forbidden access'
        ], 403);
    }
}
