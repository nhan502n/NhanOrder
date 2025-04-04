<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class PayController extends Controller


{
    protected $vnp_TmnCode;
    protected $vnp_HashSecret;
    protected $vnp_Url;
    protected $vnp_Returnurl;
    protected $vnp_apiUrl;
    protected $apiUrl;
    public function __construct()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$this->vnp_TmnCode = ""; //Mã định danh merchant kết nối (Terminal Id)
$this->vnp_HashSecret = ""; //Secret key
$this->vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
$this->vnp_Returnurl = "http://localhost/vnpay_php/vnpay_return.php";
$this->vnp_apiUrl = "http://sandbox.vnpayment.vn/merchant_webapi/merchant.html";
$this->apiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";



    }
    public function create(){
        {
            $order = new Order();
            $order -> user_id = 1;
            $order ->payment_method = 'Banking';
            $order->save();

            $cart = Session::get('cart', []);
            foreach ($cart as $item) {
                $orderDeatail = new OrderDetail();
                $orderDeatail ->order_id = $order->id;
                $orderDeatail -> product_id = $item['id'];
                $orderDeatail -> price = ($item['sale_price'])?$item['sale_price']: $item['price'];
                $orderDeatail -> quantity = $item['quantity'];
                $orderDeatail -> save();
            }
        $startTime = date("YmdHis");
        $expire = date('YmdHis',strtotime('+15 minutes',strtotime($startTime)));
$vnp_TxnRef = rand(1,10000); //Mã giao dịch thanh toán tham chiếu của merchant
$vnp_Amount = $_POST['amount']; // Số tiền thanh toán
$vnp_Locale = $_POST['language']; //Ngôn ngữ chuyển hướng thanh toán
$vnp_BankCode = $_POST['bankCode']; //Mã phương thức thanh toán
$vnp_IpAddr = $_SERVER['REMOTE_ADDR']; //IP Khách hàng thanh toán

$inputData = array(

    "vnp_Version" => "2.1.0",
    "vnp_TmnCode" => $this->vnp_TmnCode,
    "vnp_Amount" => $vnp_Amount* 100,
    "vnp_Command" => "pay",
    "vnp_CreateDate" => date('YmdHis'),
    "vnp_CurrCode" => "VND",
    "vnp_IpAddr" => $vnp_IpAddr,
    "vnp_Locale" => $vnp_Locale,
    "vnp_OrderInfo" => "Thanh toan GD:" . $vnp_TxnRef,
    "vnp_OrderType" => "other",
    "vnp_ReturnUrl" => $this->vnp_Returnurl,
    "vnp_TxnRef" => $vnp_TxnRef,
    "vnp_ExpireDate"=>$expire
);

if (isset($vnp_BankCode) && $vnp_BankCode != "") {
    $inputData['vnp_BankCode'] = $vnp_BankCode;
}

ksort($inputData);
$query = "";
$i = 0;
$hashdata = "";
foreach ($inputData as $key => $value) {
    if ($i == 1) {
        $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
    } else {
        $hashdata .= urlencode($key) . "=" . urlencode($value);
        $i = 1;
    }
    $query .= urlencode($key) . "=" . urlencode($value) . '&';
}

$vnp_Url = $this->vnp_Url . "?" . $query;
if (isset($this->vnp_HashSecret)) {
    $vnpSecureHash =   hash_hmac('sha512', $hashdata, $this->vnp_HashSecret);//
    $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
}
header('Location: ' . $vnp_Url);
die();
    }
}


public function result(Request $request){
    $vnp_SecureHash = $_GET['vnp_SecureHash'];
    $inputData = array();
    foreach ($_GET as $key => $value) {
        if (substr($key, 0, 4) == "vnp_") {
            $inputData[$key] = $value;
        }
    }

    unset($inputData['vnp_SecureHash']);
    ksort($inputData);
    $i = 0;
    $hashData = "";
    foreach ($inputData as $key => $value) {
        if ($i == 1) {
            $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
        } else {
            $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
            $i = 1;
        }
    }

    $secureHash = hash_hmac('sha512', $hashData, $this->vnp_HashSecret);
    if ($secureHash == $vnp_SecureHash) {
        if ($_GET['vnp_ResponseCode'] == '00') {
            $orderId = $_GET['vnp_TxnRef'];
            $order = Order::find($orderId);
            $order->payment_status = 'done';
            $order->save();
            Session::forget('cart');
            return view('payment.success');
        } else {
            return view('payment.fail');
        }
    } else {
        return view('payment.error');
    }
}
}
