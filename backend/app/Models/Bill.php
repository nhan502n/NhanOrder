<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $table = 'bills'; // Chỉ định tên bảng

    protected $fillable = ['user_id', 'total_price', 'quality'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
