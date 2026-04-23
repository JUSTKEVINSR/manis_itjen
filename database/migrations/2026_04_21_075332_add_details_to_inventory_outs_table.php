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
        Schema::table('inventory_outs', function (Blueprint $table) {
            $table->string('duration')->nullable()->after('date_out');
            $table->date('return_date')->nullable()->after('duration');
            $table->string('kelengkapan')->nullable()->after('return_date');
            $table->string('status')->default('Borrowed')->after('kelengkapan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventory_outs', function (Blueprint $table) {
            $table->dropColumn(['duration', 'return_date', 'kelengkapan', 'status']);
        });
    }
};
