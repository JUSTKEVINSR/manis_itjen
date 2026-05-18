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
        Schema::table('inventories', function (Blueprint $table) {
            $table->string('category')->nullable()->change();
            $table->integer('quantity')->nullable()->change();
            $table->string('condition')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventories', function (Blueprint $table) {
            $table->string('category')->nullable(false)->change();
            $table->integer('quantity')->nullable(false)->change();
            $table->string('condition')->default('Good')->nullable(false)->change();
        });
    }
};
