chạy cả 2 Nextjs và Laravel

Nextjs: cd frontend && npm run dev

Laravel: cd backend && php artisan serve

chạy db: php artisan migrate

đưa dữ liệu có sẵn trong seeder lên db: php artisan db:seed hoặc php artisan db:seed --class="TênClass"

refresh db(mất hết dữ liệu có trong các bảng): php artisan migrate:refresh