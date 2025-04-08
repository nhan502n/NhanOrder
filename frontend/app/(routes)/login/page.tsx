'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      setMessage('Đăng ký thành công! Vui lòng đăng nhập.');
    } else if (verified === 'already_verified') {
      setMessage('Tài khoản của bạn đã được xác minh.');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // Lấy CSRF cookie trước khi login
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const res = await axios.post(
        'http://127.0.0.1:8000/api/login',
        {
          email: formData.email,
          password: formData.password
        },
        {
          withCredentials: true
        }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);

      setMessage('Đăng nhập thành công!');
      console.log('Thông tin người dùng:', res.data.user);

      // router.push("/asm/dashboard");

    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Tài khoản chưa được xác minh. Vui lòng kiểm tra email.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="error text-red-500 mt-2">{error}</div>}

      <div className="container">
        <input type="checkbox" id="Log-Reg" defaultChecked />
        <div className="box-login">
          <div className="form-action">
            <div className="form-register">
              <form onSubmit={handleSubmit}>
                <div className="dangnhap">
                  <div className="Register" style={{ fontWeight: 'bolder' }}>
                    Đăng Nhập
                  </div>
                  <label htmlFor="Log-Reg">
                    <a href="/dang-ky">
                      <div className="Login">Đăng Ký</div>
                    </a>
                  </label>
                </div>

                <p>Email</p>
                <input
                  type="text"
                  placeholder="Email:"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <p>Mật khẩu</p>
                <input
                  type="password"
                  placeholder="Mật Khẩu:"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <br />
                <a href="/asm/quen-mat-khau">Quên mật khẩu</a><br />
                <button type="submit" name="dangnhap" disabled={loading}>
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button><br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
