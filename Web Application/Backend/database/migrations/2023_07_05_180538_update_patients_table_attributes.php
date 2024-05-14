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
        Schema::table('patients', function (Blueprint $table) {
            // 1. Delete 'country' column
            $table->dropColumn('country');

            // 2. Drop 'problem' column
            $table->dropColumn('problem');

            // 3. Drop 'language' column
            $table->dropColumn('language');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            // 1. Recreate 'original_city' column
           // $table->string('country', 50)->nullable();

            // 2. Recreate 'problem' column
            $table->string('problem', 40)->nullable();

            // 3. Recreate 'language' column
            $table->string('language', 30)->nullable();
        });
    }
};
