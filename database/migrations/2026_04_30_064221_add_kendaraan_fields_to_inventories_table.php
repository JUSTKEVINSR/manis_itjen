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
            $table->string('type_inventory')->default('item')->after('id');
            $table->string('nup')->nullable()->after('quantity');
            $table->string('merk')->nullable()->after('nup');
            $table->string('type')->nullable()->after('merk'); // type of vehicle (e.g., motor, mobil)
            $table->string('bpkb')->nullable()->after('type');
            $table->string('no_stnk')->nullable()->after('bpkb');
        });

        Schema::table('inventory_outs', function (Blueprint $table) {
            $table->string('type_inventory')->default('item')->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventories', function (Blueprint $table) {
            $table->dropColumn(['type_inventory', 'nup', 'merk', 'type', 'bpkb', 'no_stnk']);
        });

        Schema::table('inventory_outs', function (Blueprint $table) {
            $table->dropColumn('type_inventory');
        });
    }
};
