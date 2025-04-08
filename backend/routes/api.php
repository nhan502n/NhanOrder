<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;

/*
|--------------------------------------------------------------------------
| Public API routes
|--------------------------------------------------------------------------
*/

Route::middleware('api')->group(function () {
    // Auth
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::get('/verify-email', [UserController::class, 'verifyEmail']);

    // Trang chủ
    Route::get('/', [PageController::class, 'home']);
    Route::get('/trang-chu', [PageController::class, 'home']);

    // Hình ảnh sản phẩm
    Route::get('/image/{filename}', function ($filename) {
        $path = public_path("img/" . $filename);
        if (!file_exists($path)) {
            return response()->json(['error' => 'File không tồn tại'], 404);
        }
        return Response::file($path);
    });

    // Sản phẩm
    Route::get('/san-pham', [ProductController::class, 'getProducts']);
    Route::get('/san-pham-moi', [ProductController::class, 'getNewProducts']);
    Route::get('/san-pham-khuyen-mai', [ProductController::class, 'hotPromotion']);
    Route::get('/san-pham/{slug}', [ProductController::class, 'show']); // Xem chi tiết theo slug

    // Danh mục
    Route::get('/category', [CategoryController::class, 'getCategories']);

    // Đặt hàng (không cần auth nếu cho phép đặt hàng không đăng nhập)
    Route::post('/order', [OrderController::class, 'add']);
});


/*
|--------------------------------------------------------------------------
| Protected API routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum'])->group(function () {
    // Thông tin user đang login
    Route::get('/me', function (Request $request) {
        return response()->json($request->user());
    });

    // CRUD User (dành cho admin hoặc quản lý)
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);

    // CRUD sản phẩm
    Route::post('/san-pham', [ProductController::class, 'addProduct']);
    Route::patch('/san-pham/{id}', [ProductController::class, 'update']);
    Route::delete('/san-pham/{id}', [ProductController::class, 'destroy']);

    // CRUD danh mục
    Route::post('/category', [CategoryController::class, 'store']);
    Route::patch('/category/{id}', [CategoryController::class, 'update']);
    Route::delete('/category/{id}', [CategoryController::class, 'destroy']);

    // Giỏ hàng
    Route::get('/cart', [CartController::class, 'getCartItems']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
});
