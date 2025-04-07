<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác minh tài khoản</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #fff;
            background-color: #000;
            margin: 0;
            padding: 0;
        }
        .email-wrapper {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #333;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #fff;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #bbb;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <h1>Xác minh tài khoản của bạn</h1>

        @if(isset($message))
            <p>{{ $message }}</p>
        @else
            <p>Chúc mừng, tài khoản của bạn đã được xác minh thành công!</p>
            <p>Bạn có thể sử dụng tài khoản của mình để đăng nhập và truy cập các tính năng.</p>
        @endif

        <div class="footer">
            <p>Bạn nhận được email này vì bạn đã đăng ký tài khoản tại {{ config('app.name') }}.</p>
            <p>Vui lòng không trả lời email này. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
            <p><a href="{{ url('/') }}">Truy cập trang web</a></p>
        </div>
    </div>
</body>
</html>
