<?php

// app/Console/Commands/ClearExpiredVerifyTokens.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Carbon\Carbon;

class ClearExpiredVerifyTokens extends Command
{
    protected $signature = 'verify_tokens:clear';
    protected $description = 'Xóa token xác minh đã hết hạn';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Logic xóa token hết hạn
        $users = User::whereNotNull('verify_token')
            ->where('created_at', '<', Carbon::now()->subHours(24)) // Giả sử token hết hạn sau 24h
            ->get();

        foreach ($users as $user) {
            $user->verify_token = null;
            $user->save();
        }

        $this->info('Đã xóa verify token hết hạn!');
    }
}
