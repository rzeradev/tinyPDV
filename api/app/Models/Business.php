<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'business';

    protected $fillable = [
        'type',
        'first_name',
        'last_name',
        'cpf_cnpj',
        'zip_code',
        'street',
        'number',
        'neighborhood',
        'state',
        'phone',
        'email',
        'website',
        'description',
        'logo',
        'opens_at',
        'closes_at',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];
}
