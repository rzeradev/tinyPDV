<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BusinessResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'cpf_cnpj' => $this->cpf_cnpj,
            'zip_code' => $this->zip_code,
            'street' => $this->street,
            'number' => $this->number,
            'neighborhood' => $this->neighborhood,
            'state' => $this->state,
            'phone' => $this->phone,
            'email' => $this->email,
            'website' => $this->website,
            'description' => $this->description,
            'logo' => $this->logo,
            'opens_at' => $this->opens_at,
            'closes_at' => $this->closes_at,
            'status' => $this->status,
        ];
    }
}
