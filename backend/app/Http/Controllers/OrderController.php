<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function add(Request $request)
    {
        $order=new Order();
        $order->user_id=$request->user_id;
        $order->payment_method=$request->payment_method;
        $order->payment_status=$request->payment_status;
        $order->status=$request->status;
        $order->save();
        return response()->json($order,201);

    }

}
