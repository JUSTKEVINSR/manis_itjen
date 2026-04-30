<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class InventoryKendaraan extends Model
{
    protected $table = 'inventories';

    protected $fillable = ['item_name', 'item_code', 'category', 'quantity', 'location', 'condition', 'type_inventory', 'nup', 'merk', 'type', 'bpkb', 'no_stnk'];

    protected static function booted()
    {
        static::addGlobalScope('type_inventory', function (Builder $builder) {
            $builder->where('type_inventory', 'kendaraan');
        });

        static::creating(function ($model) {
            $model->type_inventory = 'kendaraan';
        });
    }

    public function inventoryOuts()
    {
        return $this->hasMany(InventoryKendaraanOut::class);
    }
}
