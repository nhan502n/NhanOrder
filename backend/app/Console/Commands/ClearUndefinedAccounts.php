<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Carbon\Carbon;

class ClearUndefinedAccounts extends Command
{
    protected $signature = 'accounts:clear-undefined';

    protected $description = 'Xóa tài khoản vv chưa xác minh email sau 5 phút';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $users = User::whereNull('email_verified_at')
            ->where('created_at', '<', Carbon::now()->subMinutes(1))
            ->get();

        $this->info('Tìm thấy ' . $users->count() . ' tài khoản chưa xác minh.');

        foreach ($users as $user) {
            $user->forceDelete();
            $this->info('Đã xóa tài khoản: ' . $user->email);
        }

        $this->info('Hoàn tất việc xóa tài khoản chưa xác minh email.');
    }
}
