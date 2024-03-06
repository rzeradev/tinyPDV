<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('business', function (Blueprint $table) {
            // id autoincrement, type, first_name, last_name, cpf_cnpj, zip_code, street, number, neighborhood, state, phone, email, website, logo, description, open_hours status, created_at, updated_at, softdelete
            $table->id();
            $table->string('type', 2);
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('cpf_cnpj', 18);
            $table->string('zip_code', 9);
            $table->string('street', 100);
            $table->string('number', 10);
            $table->string('neighborhood', 100);
            $table->string('state', 2);
            $table->string('phone', 15);
            $table->string('email', 100);
            $table->string('website', 100);
            $table->string('logo', 100);
            $table->text('description');
            $table->string('open_hours', 100);
            $table->enum('status', ['E', 'D'])->default('E');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business');
    }
};
