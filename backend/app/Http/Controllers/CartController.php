<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Lấy giỏ hàng của user
    public function getCartItems(Request $request)
    {
        $user = $request->user();

        $carts = Cart::with('product')
            ->where('user_id', $user->id)
            ->get();

        return response()->json($carts);
    }

    // Thêm sản phẩm vào giỏ
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity');

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        $existingItem = Cart::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if ($existingItem) {
            $existingItem->quantity += $quantity;
            $existingItem->save();
        } else {
            $product = Product::findOrFail($productId);

            Cart::create([
                'user_id' => $user->id,
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $product->price, // hoặc sale_price nếu cần
            ]);
        }

        return response()->json([
            'message' => 'Đã thêm vào giỏ hàng thành công!',
        ]);
    }



    // Cập nhật số lượng
    public function update(Request $request, $id)
    {
        $cart = Cart::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart->quantity = $request->quantity;
        $cart->save();

        return response()->json($cart);
    }


    // Xoá sản phẩm khỏi giỏ
    public function destroy(Request $request, $id)
    {
        $cart = Cart::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $cart->delete();

        return response()->json(['message' => 'Xóa thành công']);
    }

}
