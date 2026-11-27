<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    static public function notFound()
    {
        return response([
            'message' => 'User not found'
        ], 404);
    }

    // Auth (Register)
    public function register(Request $request)
    {
        $validated = $request->validate([
            'full_name' =>'required',
            'bio' => 'required|max:100',
            'username' => 'required|min:3|unique:users,username|regex:/^[a-zA-Z0-9._]+$/',
            'password' => 'required|min:6',
            'is_private' => 'boolean'
        ]);

        $user = User::create($validated);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'message' => 'Register success',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    // Auth (Login)
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('username', $validated['username']);

        if ($user && password_verify($request->password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;

            return response([
                'message' => 'Login success',
                'token' => $token,
                'user' => $user
            ], 200);
        }

        return response([
            'message' => 'Wrong username or password'
        ], 401);
    }

    // Auth (Logout)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response([
            'message' => 'Logout success'
        ], 200);
    }
}   
?>