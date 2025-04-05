<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Console\Commands\ClearUndefinedAccounts;
use App\Console\Commands\ClearTokensAfter5Mins;

class Kernel extends ConsoleKernel
{
    /**
     * Đăng ký các lệnh console của ứng dụng.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }

    /**
     * Định nghĩa các tác vụ lập lịch cho ứng dụng.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Thêm các tác vụ cần chạy theo lịch ở đây
        $schedule->command('accounts:clear-undefined')->everyMinute(); // Xóa tài khoản không xác minh email
        $schedule->command('accounts:clear-token')->everyMinute(); // Xóa token không sử dụng
    }
}
