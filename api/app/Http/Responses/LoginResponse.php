<?php

namespace App\Http\Responses;

use App\Http\Resources\UserResource;

class LoginResponse implements \Laravel\Fortify\Contracts\LoginResponse
{

    /**
     * @inheritDoc
     */
    public function toResponse($request)
    {
        //create a token for this user
        $token = $request->user()->createToken("Bearer");

        return response()->json([
            "message" =>"Authentication Successful",
            'auth_token' => $token->plainTextToken,
            'user' => UserResource::make($request->user())
        ]);
    }
}
