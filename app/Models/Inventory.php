<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $fillable = ['item_name', 'item_code', 'category', 'quantity', 'location', 'condition'];

    public function inventoryOuts()
    {
        return $this->hasMany(InventoryOut::class);
    }
}
