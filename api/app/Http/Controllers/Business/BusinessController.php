<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Http\Resources\BusinessResource;
use App\Models\Business;
use App\Models\User;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
    public function index(Business $business): BusinessResource
    {
        return BusinessResource::make($business);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => ['required', 'string', 'max:2'],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'cpf_cnpj' => ['required', 'string', 'max:18'],
            'zip_code' => ['required', 'string', 'max:9'],
            'street' => ['required', 'string', 'max:100'],
            'number' => ['required', 'string', 'max:10'],
            'neighborhood' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:2'],
            'phone' => ['required', 'string', 'max:15'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:100', 'unique:' . User::class],
            'website' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'logo' => ['nullable', 'string', 'max:100'],
            'opens_at' => ['nullable', 'string', 'max:5'],
            'closes_at' => ['nullable', 'string', 'max:5'],
            'status' => ['required', 'boolean'],
        ]);


        $business = Business::create([
            'user_id' => $request->user()->id,
            'type' => $request->type,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'cpf_cnpj' => $request->cpf_cnpj,
            'zip_code' => $request->zip_code,
            'street' => $request->street,
            'number' => $request->number,
            'neighborhood' => $request->neighborhood,
            'state' => $request->state,
            'phone' => $request->phone,
            'email' => $request->email,
            'website' => $request->website,
            'description' => $request->description,
            'logo' => $request->logo,
            'opens_at' => $request->opens_at,
            'closes_at' => $request->closes_at,
            'status' => $request->status,
        ]);

        return response()->json($business, 201);
    }

    public function update(Request $request, Business $business)
    {
        $request->validate([
            'type' => ['required', 'string', 'max:2'],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'cpf_cnpj' => ['required', 'string', 'max:18'],
            'zip_code' => ['required', 'string', 'max:9'],
            'street' => ['required', 'string', 'max:100'],
            'number' => ['required', 'string', 'max:10'],
            'neighborhood' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:2'],
            'phone' => ['required', 'string', 'max:15'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:100', 'unique:' . User::class],
            'website' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'logo' => ['nullable', 'string', 'max:100'],
            'opens_at' => ['nullable', 'string', 'max:5'],
            'closes_at' => ['nullable', 'string', 'max:5'],
            'status' => ['required', 'boolean'],
        ]);

        $business->update([
            'type' => $request->type,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'cpf_cnpj' => $request->cpf_cnpj,
            'zip_code' => $request->zip_code,
            'street' => $request->street,
            'number' => $request->number,
            'neighborhood' => $request->neighborhood,
            'state' => $request->state,
            'phone' => $request->phone,
            'email' => $request->email,
            'website' => $request->website,
            'description' => $request->description,
            'logo' => $request->logo,
            'opens_at' => $request->opens_at,
            'closes_at' => $request->closes_at,
            'status' => $request->status,
        ]);

        return response()->json($business, 200);
    }

    public function destroy(Business $business)
    {
        $business->delete();

        return response()->json(null, 204);
    }
}
