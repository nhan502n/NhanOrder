<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

Route::get('/',[PageController::class,'home']);
Route::get('/trang-chu',[PageController::class,'home']);
Route::get('/gioi-thieu',[PageController::class,'about']);
Route::get('/lien-he',[PageController::class,'contact']);

Route::post('/gio-hang',[CartController::class,'store']);

Route::get('/chi-tiet-san-pham/{slug}',[ProductController::class,'show']);
Route::get('/san-pham',[ProductController::class,'index']);


route::get('/dang-nhap',[UserController::class,'login']);
route::get('/dang-ky',[UserController::class,'register']);

Route::post('/register', [UserController::class, 'register']);
Route::get('/verify-email/{token}', [UserController::class, 'verifyEmail'])->name('verify.email');
// Route::get('/verify-account/{userId}', [UserController::class, 'showVerifyAccountPage'])->name('verify.account');
// Route::post('/verify-account', [UserController::class, 'verifyAccount'])->name('verify.account.submit');
