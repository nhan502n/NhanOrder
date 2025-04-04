<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'carts'; // Tên bảng trong database

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'price',
    ];

    /**
     * Quan hệ với model User (Mỗi giỏ hàng thuộc về một người dùng)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Quan hệ với model Product (Mỗi giỏ hàng có một sản phẩm)
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
