<p>Chào {{ $user->name }},</p>
<p>Vui lòng nhấp vào liên kết dưới đây để xác minh email của bạn:</p>
<a href="{{ $url }}">Xác minh Email</a>

<!-- Hiển thị token trong email để kiểm tra -->
<p>Token xác minh của bạn là: {{ $user->verify_token }}</p>
