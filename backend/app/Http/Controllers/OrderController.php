<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'email'   => 'required|email',
            'phone'   => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'note'    => 'nullable|string|max:255',
            'payment' => 'required|in:1,2,3,4',
        ]);

        // Map FE value to DB enum
        $paymentMethods = [
            '1' => 'COD',
            '2' => 'banking',
            '3' => 'walet',
            '4' => 'cart',
        ];
        $payment_method = $paymentMethods[$validated['payment']];

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id'        => $user->id,
                'email'          => $validated['email'],
                'phone'          => $validated['phone'],
                'address'        => $validated['address'],
                'note'           => $validated['note'] ?? '',
                'payment_method' => $payment_method,
                'payment_status' => 'pending',
                'status'         => 'pending',
            ]);

            // Lấy các item trong giỏ hàng
            $cartItems = Cart::where('user_id', $user->id)->get();

            foreach ($cartItems as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'quantity'   => $item->quantity,
                    'price'      => $item->price,
                ]);
            }

            // Xoá giỏ hàng sau khi đặt hàng
            Cart::where('user_id', $user->id)->delete();

            DB::commit();
            return response()->json(['message' => 'Đặt hàng thành công', 'order_id' => $order->id]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Đặt hàng thất bại', 'message' => $e->getMessage()], 500);
        }
    }
}
