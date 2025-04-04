<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $email = 'nhan502n@gmail.com';

        // Kiểm tra nếu email chưa tồn tại thì mới insert
        if (!DB::table('users')->where('email', $email)->exists()) {
            DB::table('users')->insert([
                'name' => 'Ngo Duy Nhan',
                'email' => $email,
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]);
        }
    }
}
