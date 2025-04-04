<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                "name" => "samsung galaxy s24 ultra 128gb",
                "slug" => "samsung-galaxy-s24-ultra-128gb",
                "image" => "s24ultra.png",
                "price" => 26990000,
                "sale_price" => null,
                "category_id" => 5,
                "quantity" => 11,
            ],
            [
                "name" => "xiaomi 14T pro 512gb",
                "slug" => "xiaomi-14T-pro-512gb",
                "image" => "4tpro.png",
                "price" => 17990000,
                "sale_price" => 13240000,
                "category_id" => 4,
                "quantity" => 3,
            ],
            [
                "name" => "samsung galaxy s24 128gb",
                "slug" => "samsung-galaxy-s24-128gb",
                "image" => "s24ultra.png",
                "price" => 24990000,
                "sale_price" => null,
                "category_id" => 5,
                "quantity" => 11,
            ],[
                "name" => "sq",
                "slug" => "samsung-galaxy-s24-18gb",
                "image" => "s24ultra.png",
                "price" => 24990000,
                "sale_price" => null,
                "category_id" => 5,
                "quantity" => 11,
            ],
        ]);
    }
}
