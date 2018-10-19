<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    public function pins() {
        return $this->hasMany(Pin::class);
    }
}
