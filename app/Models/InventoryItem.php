<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    protected $table = 'inventory_items';

    protected $fillable = [
        'item_name', 
        'item_code', 
        'nup', 
        'merk', 
        'type', 
        'category', 
        'quantity', 
        'location', 
        'condition'
    ];

    public function inventoryOuts()
    {
        return $this->hasMany(InventoryItemOut::class, 'inventory_id');
    }
}
