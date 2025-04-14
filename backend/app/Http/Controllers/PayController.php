<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PayController extends Controller
{
    public function createVNPayUrl(Request $request)
    {
        $vnp_TmnCode = "IY7J3JRD"; // từ cổng VNPay
        $vnp_HashSecret = "QQ2O81F74E6LJ32M5D9H0AS70KEP4VCB"; // từ VNPay
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        // Chỉ cần trả về trang next.js xử lý kết quả
        $vnp_Returnurl = "http://localhost:3000/thanh-toan/xac-nhan-thanh-toan/vnpay/vnpay-return";

        $vnp_TxnRef = time(); // Mã giao dịch duy nhất
        // Trước khi chuyển sang thanh toán, bạn nên tạo đơn hàng và lưu vnp_TxnRef vào DB để đối chiếu sau
        // Ví dụ: Order::create([..., 'transaction_ref' => $vnp_TxnRef, 'payment_status' => 'pending']);

        $vnp_OrderInfo = 'Thanh toán đơn hàng QR';
        $vnp_OrderType = 'billpayment';
        $vnp_Amount = $request->amount * 100; // VNPay yêu cầu đơn vị đồng * 100
        $vnp_Locale = 'vn';
        $vnp_IpAddr = $request->ip();

        $inputData = [
            "vnp_Version"    => "2.1.0",
            "vnp_TmnCode"    => $vnp_TmnCode,
            "vnp_Amount"     => $vnp_Amount,
            "vnp_Command"    => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode"   => "VND",
            "vnp_IpAddr"     => $vnp_IpAddr,
            "vnp_Locale"     => $vnp_Locale,
            "vnp_OrderInfo"  => $vnp_OrderInfo,
            "vnp_OrderType"  => $vnp_OrderType,
            "vnp_ReturnUrl"  => $vnp_Returnurl,
            "vnp_TxnRef"     => $vnp_TxnRef,
        ];

        // Sắp xếp dữ liệu theo thứ tự key A-Z
        ksort($inputData);
        $hashdata = "";
        $query = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&';
            }
            $hashdata .= urlencode($key) . "=" . urlencode($value);
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
            $i = 1;
        }

        $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
        $vnp_Url .= "?" . $query . "vnp_SecureHash=" . $vnpSecureHash;

        return response()->json(['payUrl' => $vnp_Url]);
    }


    public function vnpayCallback(Request $request)
    {
        $vnp_HashSecret = "QQ2O81F74E6LJ32M5D9H0AS70KEP4VCB";
        $vnpData = $request->all();

        $vnp_SecureHash = $vnpData['vnp_SecureHash'] ?? '';
        unset($vnpData['vnp_SecureHash'], $vnpData['vnp_SecureHashType']);

        ksort($vnpData);
        $hashData = "";
        $i = 0;
        foreach ($vnpData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&';
            }
            $hashData .= urlencode($key) . "=" . urlencode($value);
            $i = 1;
        }
        $checkHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        if ($checkHash === $vnp_SecureHash && $request->vnp_ResponseCode == '00') {
            // Cập nhật đơn hàng, ví dụ:
            $order = \App\Models\Order::where('transaction_ref', $request->vnp_TxnRef)->first();
            if ($order) {
                $order->payment_status = 'done';
                $order->save();
            }
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
    }


}
