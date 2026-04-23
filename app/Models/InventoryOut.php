<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryOut extends Model
{
    protected $fillable = [
        'inventory_id', 
        'staff_id', 
        'quantity', 
        'date_out', 
        'notes',
        'duration',
        'return_date',
        'kelengkapan',
        'status',
        'surat_permohonan'
    ];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
