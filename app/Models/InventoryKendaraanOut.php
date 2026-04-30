<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class InventoryKendaraanOut extends Model
{
    protected $table = 'inventory_outs';

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
        'surat_permohonan',
        'type_inventory'
    ];

    protected static function booted()
    {
        static::addGlobalScope('type_inventory', function (Builder $builder) {
            $builder->where('type_inventory', 'kendaraan');
        });

        static::creating(function ($model) {
            $model->type_inventory = 'kendaraan';
        });
    }

    public function inventory()
    {
        return $this->belongsTo(InventoryKendaraan::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
