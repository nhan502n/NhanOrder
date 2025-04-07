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
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 2rem;
        }

        .button-group {
            display: flex;
            gap: 1.5rem;
        }

        .btn {
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: bold;
            border: 2px solid white;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
        }

        .btn-no {
            background-color: transparent;
            color: #f44336;
        }

        .btn-yes {
            background-color: transparent;
            color: #4caf50;
        }

        .btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .g-recaptcha {
            margin-top: 1rem;
        }
    </style>
    <!-- Include the Google reCAPTCHA script -->
    <script src="https://www.google.com/recaptcha/enterprise.js?render=6Lf2egwrAAAAAEPFqMJM5lqV3YRZXqUBbGKLMnc3" async defer></script>
</head>
<body>

    <h1>Có phải bạn vừa đăng ký tài khoản ở {{ config('app.name') }}?</h1>

    <div class="button-group">
        <a href="{{ $rejectUrl }}" class="btn btn-no">❌ Đó không phải là tôi</a>
        <a href="{{ $confirmUrl }}" class="btn btn-yes">✔️ Có, đó là tôi</a>
    </div>

    <!-- reCAPTCHA widget -->
    <div class="g-recaptcha" data-sitekey="6Lf2egwrAAAAAEPFqMJM5lqV3YRZXqUBbGKLMnc3"></div>

    <!-- Add your form action for verifying CAPTCHA if necessary -->
    <button type="submit" onclick="submitForm()">Xác nhận</button>

    <script>
        function submitForm() {
            const response = grecaptcha.getResponse();
            if (response.length == 0) {
                alert("Vui lòng xác minh bạn không phải là robot.");
            } else {
                // Submit your form here
                alert("Captcha verified. Form can be submitted.");
            }
        }
    </script>

</body>
</html>
