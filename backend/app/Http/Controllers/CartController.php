<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use League\CommonMark\Delimiter\Bracket;
use PhpParser\Node\Stmt\Break_;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('cart.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */


     public function store(Request $request)
     {
         // Kiểm tra nếu user chưa đăng nhập
         if (!Auth::check()) {
             return response()->json(['error' => 'Bạn cần đăng nhập để thêm vào giỏ hàng.'], 401);
         }

         // Lấy user ID từ auth
         $userId = Auth::id();

         // Kiểm tra đầu vào
         $request->validate([
             'product_id' => 'required|exists:products,id',
             'quantity' => 'required|integer|min:1'
         ]);

         // Tìm sản phẩm
         $product = Product::find($request->product_id);

         // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
         $cartItem = Cart::where('user_id', $userId)
                         ->where('product_id', $request->product_id)
                         ->first();

         if ($cartItem) {
             // Nếu đã có, tăng số lượng
             $cartItem->quantity += $request->quantity;
             $cartItem->save();
         } else {
             // Nếu chưa có, thêm mới
             $cartItem = Cart::create([
                 'user_id' => $userId,
                 'product_id' => $request->product_id,
                 'quantity' => $request->quantity,
                 'price' => $product->price
             ]);
         }

         return response()->json([
             'message' => 'Sản phẩm đã được thêm vào giỏ hàng!',
             'cart' => $cartItem
         ], 201);
     }





    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
