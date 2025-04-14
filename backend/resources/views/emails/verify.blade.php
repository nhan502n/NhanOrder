<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Xác minh email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f1f1f1;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            padding: 20px;
        }

        h1 {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 20px;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            background-color: #3498db;
            color: #ffffff;
            padding: 12px 25px;
            font-size: 18px;
            font-weight: bold;
            text-decoration: none;
            border-radius: 4px;
            text-align: center;
            margin-bottom: 20px;
        }

        .btn:hover {
            background-color: #2980b9;
        }

        .footer {
            text-align: center;
            font-size: 14px;
            color: #aaaaaa;
            padding-top: 20px;
        }

        .footer a {
            color: #3498db;
            text-decoration: none;
        }

        /* Responsiveness for mobile */
        @media only screen and (max-width: 600px) {
            .email-wrapper {
                width: 100% !important;
                padding: 10px;
            }

            h1 {
                font-size: 20px;
            }

            .btn {
                width: 100% !important;
                padding: 15px;
                font-size: 16px;
            }
        }
        .email-wrapper > a{
            color: #fff;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <h1>Xác minh tài khoản của bạn</h1>

        <p>Chào {{ $user->name }},</p>

        <p>Vui lòng nhấp vào liên kết dưới đây để xác minh email của bạn và hoàn tất việc đăng ký:</p>

        <div style="text-align: center;">
            <a href="{{ $url }}" class="btn" style="color: #fff;">Đi đến xác minh</a>
        </div>

        <p>Nếu bạn không yêu cầu tạo tài khoản, vui lòng bỏ qua email này.</p>

        <p>Trân trọng, <br> Đội ngũ {{ config('app.name') }}</p>

        <div class="footer">
            <p>Bạn nhận được email này vì bạn đã đăng ký tài khoản tại {{ config('app.name') }}.</p>
            <p>Vui lòng không trả lời email này. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
            <p><a href="{{ url('/') }}">Truy cập trang web</a></p>
        </div>
    </div>
</body>
</html>
