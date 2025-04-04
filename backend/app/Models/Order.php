<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    protected $table = 'orders';
    protected $primaryKey = 'id';
    // protected $delete_at = 'deleted';
    use SoftDeletes;
    protected $fillable = ['user_id','payment_method','payment_status','status'];
}
