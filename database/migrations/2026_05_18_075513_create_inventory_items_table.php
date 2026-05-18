<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory_items', function (Blueprint $table) {
            $table->id();
            $table->string('item_code')->nullable();
            $table->string('nup')->nullable();
            $table->string('item_name');
            $table->string('merk')->nullable();
            $table->string('type')->nullable();
            $table->string('category');
            $table->integer('quantity');
            $table->string('location')->nullable();
            $table->string('condition')->default('Good');
            $table->timestamps();
        });

        // Copy existing items from inventories table to preserve IDs
        DB::statement("
            INSERT INTO inventory_items (id, item_code, nup, item_name, merk, type, category, quantity, location, `condition`, created_at, updated_at)
            SELECT id, item_code, nup, item_name, merk, type, category, quantity, location, `condition`, created_at, updated_at
            FROM inventories
            WHERE type_inventory = 'item'
        ");
        
        // Delete copied items from original table to avoid confusion (optional, but good for separation)
        DB::table('inventories')->where('type_inventory', 'item')->delete();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert items back to inventories
        DB::statement("
            INSERT INTO inventories (id, item_code, nup, item_name, merk, type, category, quantity, location, `condition`, type_inventory, created_at, updated_at)
            SELECT id, item_code, nup, item_name, merk, type, category, quantity, location, `condition`, 'item', created_at, updated_at
            FROM inventory_items
        ");
        
        Schema::dropIfExists('inventory_items');
    }
};
