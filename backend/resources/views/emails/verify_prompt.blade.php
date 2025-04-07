<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Xác minh tài khoản</title>
    <style>
        body {
            background-color: #000;
            color: white;
            font-family: 'Arial', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
            padding: 0 20px;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 2rem;
            font-weight: 700;
        }

        .logo {
            max-width: 120px;
            margin-bottom: 2rem;
        }

        .description {
            font-size: 1rem;
            margin-bottom: 1.5rem;
            color: #ccc;
        }

        .button-group {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
            max-width: 500px;
        }

        .btn {
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: bold;
            border: 2px solid white;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-block;
        }

        .btn-no {
            background-color: transparent;
            color: #f44336;
            border-color: #f44336;
        }

        .btn-yes {
            background-color: transparent;
            color: #4caf50;
            border-color: #4caf50;
        }

        .btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .g-recaptcha {
            margin-top: 1rem;
        }

        @media (max-width: 600px) {
            h1 {
                font-size: 1.5rem;
            }

            .btn {
                font-size: 1rem;
                padding: 0.8rem 1.5rem;
            }
        }
    </style>
</head>
<body>

    <!-- Logo của công ty -->
    <img src="{{ asset('img/NhanOrder-AB-1.png') }}" alt="{{ config('app.name') }}" class="logo">

    <h1>Có phải bạn vừa đăng ký tài khoản ở {{ config('app.name') }}?</h1>

    <!-- Mô tả ngắn gọn cho người dùng -->
    <p class="description">Nếu bạn không phải là người đăng ký tài khoản, bạn có thể bỏ qua email này. Nếu bạn đăng ký, vui lòng xác nhận.</p>

    <!-- Các nút xác nhận và từ chối -->
    <div class="button-group">
        <a href="{{ $rejectUrl }}" class="btn btn-no">❌ Đó không phải là tôi</a>
        <a href="{{ $confirmUrl }}" class="btn btn-yes">✔️ Có, đó là tôi</a>
    </div>

</body>
</html>
