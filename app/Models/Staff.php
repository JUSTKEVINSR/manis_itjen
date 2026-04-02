<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $fillable = ['name', 'nik', 'jabatan', 'departemen', 'phone'];

    public function inventoryOuts()
    {
        return $this->hasMany(InventoryOut::class);
    }
}
