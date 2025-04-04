'use client';

import { useState } from 'react';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu
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
      const res = await axios.post('http://127.0.0.1:8000/api/register', formData);
      setMessage(res.data.message);
      setFormData({ name: '', email: '', password: '' }); // reset form nếu muốn
    } catch (err: any) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Đăng ký</h1>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Tên đăng nhập */}
        <div className="mb-4">
          <label className="block mb-1">Tên đăng nhập</label>
          <input
            type="text"
            name="name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
          />
          {error?.name && <p className="text-red-500 text-sm">{error.name[0]}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
          />
          {error?.email && <p className="text-red-500 text-sm">{error.email[0]}</p>}
        </div>

        {/* Mật khẩu */}
        <div className="mb-4">
          <label className="block mb-1">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded"
            value={formData.password}
            onChange={handleChange}
          />
          {error?.password && <p className="text-red-500 text-sm">{error.password[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>
    </div>
  );
}
