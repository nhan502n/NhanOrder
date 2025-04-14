<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'image', 'description', 'parent_id'];

    // Danh mục cha
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Danh sách danh mục con
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
}

