<?php

use App\Console\Commands\ClearTokensAfter5Mins;
use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Console\Commands\ClearUndefinedAccounts;

Artisan::command('inspire', function () {
    /** @var ClosureCommand $this */
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
// Schedule::command('verify:clear-expired')->hourly();


Artisan::command('accounts:clear-undefined', function () {
    $this->call(ClearUndefinedAccounts::class);
})->purpose('Display an inspiring quote')->hourly();
Schedule::command('accounts:clear-undefined')->everyMinute();


Artisan::command('accounts:clear-tokens', function () {
    $this->call(ClearTokensAfter5Mins::class);
})->purpose('Display an inspiring quote')->hourly();
Schedule::command('accounts:clear-tokens')->everyMinute();
