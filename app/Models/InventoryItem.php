<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class InventoryItem extends Model
{
    protected $table = 'inventories';

    protected $fillable = ['item_name', 'item_code', 'category', 'quantity', 'location', 'condition', 'type_inventory'];

    protected static function booted()
    {
        static::addGlobalScope('type_inventory', function (Builder $builder) {
            $builder->where('type_inventory', 'item');
        });

        static::creating(function ($model) {
            $model->type_inventory = 'item';
        });
    }

    public function inventoryOuts()
    {
        return $this->hasMany(InventoryItemOut::class);
    }
}
