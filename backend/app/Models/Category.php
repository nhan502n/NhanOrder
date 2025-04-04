<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{   public function category(){
    return $this->belongsTo(Category::class);
}
    protected $table = 'categories';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = ['name', 'image', 'description'];

}
