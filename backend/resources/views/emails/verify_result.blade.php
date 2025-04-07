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
            font-size: 1.8rem;
            margin-bottom: 20px;
        }
        p {
            font-size: 1rem;
            line-height: 1.5;
            color: #ddd;
        }
        .btn {
            display: inline-block;
            padding: 12px 25px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #bbb;
            text-align: center;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        .footer p {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <h1>{{ $Noti }}</h1>

        @if(isset($message))
            <p>{{ $message }}</p>
        @else
            <p>Chúc mừng tài khoản của bạn đã được xác minh thành công.</p>
            <p>Bây giờ bạn có thể sử dụng tài khoản của mình để đăng nhập và truy cập tất cả các tính năng của {{ config('app.name') }}. Chúng tôi vinh hạnh được phục vụ bạn.</p>
        @endif

        <div class="footer">
            <p>Bạn nhận được email này vì bạn đã đăng ký tài khoản tại {{ config('app.name') }}.</p>
            <p>Vui lòng không trả lời email này. Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ với chúng tôi qua địa chỉ email hỗ trợ.</p>

        @if(isset($webURL))
        <p>{!! $webURL !!}</p>
        @else
            <p><a href="https://mail.google.com/mail/">Quay lại Gmail</a></p>
            @endif
        </div>
    </div>
</body>
</html>
