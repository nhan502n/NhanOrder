<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class ClearTokensAfter5Mins extends Command
{   // Mã dùng 5p (Lấy lại mk, thay đổi in4)
    protected $signature = 'accounts:clear-tokens';

    protected $description = 'Xóa token đã tạo sau 5p không sử dụng';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $users = User::whereNotNull('verify_token')
            ->where('updated_at', '<', Carbon::now()->subMinutes(5))
            // ->whereNull('email_verified_at')  Dành cho user muốn lấy lại mk nên ko cần
            ->get();

        $this->info('Tìm thấy ' . $users->count() . ' token chưa được sử dụng.');

        foreach ($users as $user) {
            $user->verify_token = null;
            $user->save();
            $this->info('Đã xóa token của tài khoản: ' . $user->email);
        }

        $this->info('Hoàn tất việc xóa token không sử dụng.');
    }
}
