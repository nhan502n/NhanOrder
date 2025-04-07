<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CorsMiddleware;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;



Route::middleware([CorsMiddleware::class])->group(function () {
    Route::post('/register', [UserController::class, 'register']);
});



Route::get('/image/{filename}', function ($filename) {
    $path = public_path("img/" . $filename);

    if (!file_exists($path)) {
        return response()->json(['error' => 'File không tồn tại'], 404);
    }

    return Response::file($path);
});

Route::get('/',[PageController::class,'home']);
Route::get('/trang-chu',[PageController::class,'home']);


Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());
});
// route::get('user',[ProductController::class,'login']);

Route::post('/register', [UserController::class, 'register']);
Route::get('/verify-email', [UserController::class, 'verifyEmail']);
// route::put('user/{id}',function($id){
//     return response()->json(["message"=>"user $id updated!"]);
// });
// route::delete('user/{id}',function($id){
//     return response()->json(["message"=>"user $id deleted!"]);
// });

route::get('/category',[CategoryController::class,'getCategories']);
route::post('category',[CategoryController::class,'store']);
Route::delete('category/{id}',[CategoryController::class,'destroy']);
Route::patch('category/{id}',[CategoryController::class,'update']);

Route::get('/chi-tiet-san-pham/{id}',[ProductController::class,'show']);
route::post('chi-tiet-san-pham',[ProductController::class,'show']);
route::delete('chi-tiet-san-pham/{id}',[ProductController::class,'show']);

Route::get('/san-pham', [ProductController::class, 'getProducts']);
Route::post('/san-pham', [ProductController::class, 'addProduct']);
Route::get('/san-pham/{slug}', [ProductController::class, 'show']);
Route::delete('/san-pham/{id}', [ProductController::class, 'destroy']);
Route::patch('/san-pham/{id}', [ProductController::class, 'update']);

route::get('/san-pham-moi',[ProductController::class,'getNewProducts']);
Route::get('/san-pham-khuyen-mai', [ProductController::class, 'hotPromotion']);

route::post('order',[OrderController::class,'add']);

route::resource('user',UserController::class);
route::get('user',[UserController::class,"index"]);
route::get('user/{id}',[UserController::class,"show"]);
route::post('user',[UserController::class,"register"]);
route::put('user/{id}',[UserController::class,"update"]);
route::delete('user/{id}',[UserController::class,"destroy"]);

route::get('cart',[CartController::class,"show"]);
Route::middleware('auth:api')->post('/cart', [CartController::class, 'store']);
route::put('cart/{id}',[CartController::class,"update"]);
route::delete('cart/{id}',[CartController::class,"destroy"]);
