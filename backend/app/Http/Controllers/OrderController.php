<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;
use App\Mail\OrderConfirmationMail;
use Illuminate\Support\Facades\Mail;
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

        // Map FE value to DB enum values (the ones defined in migration)
        $paymentMethods = [
            '1' => 'COD',
            '2' => 'vnpay',
            '3' => 'momo',
            '4' => 'payos',
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
            DB::rollBack();
            return response()->json(['error' => 'Đặt hàng thất bại', 'message' => $e->getMessage()], 500);
        }
    }
    public function sendOrderConfirmation(Request $request)
        {
            $orderData = [
                'name' => $request->name,
                'address' => $request->address,
                'phone' => $request->phone,
                'total' => $request->total,
            ];

            // Gửi email
            Mail::to($request->email)->send(new OrderConfirmationMail($orderData));

            return response()->json(['message' => 'Đặt hàng thành công, email đã được gửi.']);
        }
}
