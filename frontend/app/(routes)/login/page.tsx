"use client";  // Make sure this is a Client Component

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';  // Import useSearchParams

const LoginPage = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      setMessage('Đăng ký thành công! Vui lòng đăng nhập.');
    } else if (verified === 'already_verified') {
      setMessage('Tài khoản của bạn đã được xác minh.');
    }
  }, [searchParams]);

  return (
    <div>
      {message && <div className="alert alert-success">{message}</div>}
      <h2>Đăng Nhập</h2>
      <form>
        {/* Form đăng nhập */}
      </form>
    </div>
  );
};

export default LoginPage;
