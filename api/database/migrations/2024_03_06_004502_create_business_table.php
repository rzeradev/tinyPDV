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
            $table->ulid('id')->primary();
            $table->foreignUlid('user_id')->nullable()->references('id')->on('users')->onDelete('set null');
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
            $table->string('website', 100)->nullable();
            $table->string('logo', 100)->nullable();
            $table->text('description')->nullable();
            $table->string('opens_at', 5)->nullable();
            $table->string('closes_at', 5)->nullable();
            $table->boolean('status')->default(true);
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
