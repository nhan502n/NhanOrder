<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $table = 'orders';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'email',
        'phone',
        'address',
        'note',
        'payment_method',
        'payment_status',
        'status',
    ];

    // Quan hệ với bảng order_items
    public function items()
    {
        return $this->hasMany(OrderDetail::class);
    }


    // Quan hệ với bảng users (nếu cần)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
