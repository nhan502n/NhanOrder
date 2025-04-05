// app/Providers/ScheduleServiceProvider.php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Console\Scheduling\Schedule;

class ScheduleServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->app->booted(function () {
            $schedule = app(Schedule::class);
            $schedule->command('verify_tokens:clear')->everyMinute();
        });
    }

    public function register()
    {
        // Đăng ký service provider (nếu có)
    }
}
