<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                "name" => "Dien thoai",
                "image" => "phone.jpg",
                "parent_id" => null,
            ],
            [
                "name" => "Iphone",
                "image" => "iphone_fmqr-gq.png",
                "parent_id" => 1,
            ],
            [
                "name" => "Samsung",
                "image" => "Samsung_r4o3-uh.webp",
                "parent_id" => 1,
            ],
            [
                "name" => "Xiaomi",
                "image" => "Xiaomi_ru8d-2w.webp",
                "parent_id" => 1,
            ],
            [
                "name" => "Samsung galaxy S",
                "image" => "Samsung_r4o3-uh.webp",
                "parent_id" => 3,
            ],
            [
                "name" => "Samsung galaxy A",
                "image" => "Samsung_r4o3-uh.webp",
                "parent_id" => 3,
            ],[
                "name" => "Realme",
                "image" => "Realme.webp",
                "parent_id" => 1,
            ]
        ]);
    }
}
