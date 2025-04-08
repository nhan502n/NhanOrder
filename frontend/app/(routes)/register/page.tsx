'use client';

import { useState } from 'react';
import axios from 'axios';

type FormDataType = {
  name: string;
  email: string;
  password: string;
};

type ErrorType = {
  name?: string[];
  email?: string[];
  password?: string[];
};

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState<ErrorType>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError({});
    setLoading(true);

    try {
      // Gọi csrf cookie trước
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const res = await axios.post(
        'http://127.0.0.1:8000/api/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(res.data.message || 'Đăng ký thành công');
      setFormData({ name: '', email: '', password: '' });
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <input type="checkbox" id="Log-Reg" defaultChecked />
        <div className="box-login">
          <div className="form-action">
            <div className="form-register">
              <form onSubmit={handleSubmit}>
                <div className="dangnhap">
                  <label htmlFor="Log-Reg">
                    <a href="dang-nhap">
                      <div className="Login">Đăng Nhập</div>
                    </a>
                  </label>
                  <div className="Register" style={{ fontWeight: 'bolder' }}>
                    Đăng Ký
                  </div>
                </div>

                <p>Tên người dùng</p>
                <input
                  type="text"
                  placeholder="Nhập tên người dùng:"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {error?.name && <div className="error">{error.name[0]}</div>}

                <p>Email</p>
                <input
                  type="text"
                  placeholder="Email:"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {error?.email && <div className="error">{error.email[0]}</div>}

                <p>Mật khẩu</p>
                <input
                  type="password"
                  placeholder="Mật Khẩu:"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {error?.password && (
                  <div className="error">{error.password[0]}</div>
                )}

                {message && <div className="text-green-600 mt-2">{message}</div>}
                <button type="submit" disabled={loading} name="dangky">
                  {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>
              </form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
