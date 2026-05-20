<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class InventoryItemOut extends Model
{
    protected $table = 'inventory_item_outs';

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
        return $this->belongsTo(InventoryItem::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
