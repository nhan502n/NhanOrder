<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    // Thêm order_id vào fillable
    protected $fillable = [
        'order_id',   // Thêm trường order_id vào đây
        'product_id',
        'quantity',
        'price',
    ];
}
