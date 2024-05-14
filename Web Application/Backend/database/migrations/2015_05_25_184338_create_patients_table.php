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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->integer('age')->nullable();
            $table->string('current_city', 50)->nullable();
            $table->string('original_city', 50)->nullable();
            $table->string('gender', 7)->nullable();
            $table->string('status', 50)->nullable();
            $table->string('medication', 5)->nullable();
            $table->string('resources', 80)->nullable();
            $table->string('language', 30)->nullable();
            $table->string('problem', 40)->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
