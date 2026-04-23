<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PenanggungJawab extends Model
{
    protected $fillable = ['staff_id', 'position'];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
