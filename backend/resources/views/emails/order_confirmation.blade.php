<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f6f6f6;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            background: #fff;
            padding: 20px;
            margin: 30px auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .title {
            color: #066EFF;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .btn {
            display: inline-block;
            background: #066EFF;
            color: #fff;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            margin-top: 20px;
        }
        .footer {
            margin-top: 40px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 class="title">Cảm ơn bạn đã đặt hàng tại NhanOrder!</h2>
        <p>Xin chào <strong>{{ $order['name'] }}</strong>,</p>
        <p>Chúng tôi đã nhận được đơn hàng của bạn với thông tin sau:</p>

        <ul>
            <li><strong>Địa chỉ:</strong> {{ $order['address'] }}</li>
            <li><strong>Số điện thoại:</strong> {{ $order['phone'] }}</li>
            <li><strong>Tổng tiền:</strong> {{ number_format($order['total'], 0, ',', '.') }} VND</li>
        </ul>

        <p>Chúng tôi sẽ xử lý đơn hàng trong thời gian sớm nhất.</p>

        <a href="{{ url('/') }}" class="btn">Quay lại trang chủ</a>

        <div class="footer">
            Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email này.<br>
            Trân trọng,<br>
            Đội ngũ NhanOrder
        </div>
    </div>
</body>
</html>
