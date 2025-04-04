<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $table = 'products';
    protected $primaryKey = 'id';

    protected $fillable = ['name', 'slug', 'image', 'price', 'description', 'rating', 'category_id'];

    protected $attributes = [
        'name' => 'Product Name',
        'slug' => 'product-name',
        'image' => 'đang tải hình ảnh',
        'price' => 0,
        'sale_price' => null,
        'description' => 'Product Description',
        'rating' => 0,
        'category_id' => 1,
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
