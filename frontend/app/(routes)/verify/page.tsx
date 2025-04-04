'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';
import axios from 'axios';

export default function VerifyAccountPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get('userId');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'verified' | 'error' | 'already'>('idle');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    if (!userId) return;
    setStatus('verifying');

    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/verify-email/${userId}`);
      setStatus('verified');
      setMessage(res.data.message);

      // Chuyển hướng đến trang đăng nhập sau 2s
      setTimeout(() => {
        router.push('/login?verified=true');
      }, 2000);
    } catch (error: any) {
      if (error.response?.status === 409) {
        setStatus('already');
        setMessage('Tài khoản này đã được xác minh trước đó.');
      } else {
        setStatus('error');
        setMessage('Xác minh thất bại. Vui lòng thử lại sau.');
      }
    }
  };

  const handleReject = () => {
    // 👉 Chuyển người dùng trở về email hoặc hiện thông báo
    alert('Nếu đây không phải bạn, vui lòng bỏ qua email này.');
    // Hoặc quay về trang chủ/email/...
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Xác minh tài khoản</h2>

      {status === 'idle' && (
        <>
          <p className="text-center mb-6">Đây có phải là bạn không?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReject}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600"
            >
              <X size={18} />
              Đây không phải là tôi
            </button>

            <button
              onClick={handleVerify}
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
            >
              <Check size={18} />
              Có, đó là tôi
            </button>
          </div>
        </>
      )}

      {status !== 'idle' && (
        <p className="text-center mt-6 text-lg text-blue-700 font-medium">{message}</p>
      )}
    </div>
  );
}
