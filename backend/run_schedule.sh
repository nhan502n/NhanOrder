#!/bin/bash
cd /mnt/c/xampp/htdocs/.NhanOrder/backend
php artisan schedule:run >> storage/logs/schedule.log 2>&1
