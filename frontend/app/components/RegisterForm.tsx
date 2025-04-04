"use client";

import { useForm } from "react-hook-form";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

// ✅ Thêm kiểu cho props
interface RegisterFormProps {
  onSubmit: (data: RegisterFormInputs) => Promise<void>;
  loading: boolean;
  errorMessage: string; // ✅ Thêm error message từ parent
}

export default function RegisterForm({ onSubmit, loading, errorMessage }: RegisterFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Đăng ký</h2>
      
      {/* Hiển thị lỗi từ API */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1">Tên tài khoản</label>
          <input {...register("name", { required: "Tên tài khoản là bắt buộc" })} className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" {...register("email", { required: "Email là bắt buộc" })} className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mật khẩu</label>
          <input type="password" {...register("password", { required: "Mật khẩu là bắt buộc" })} className="w-full p-2 border rounded" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        {/* Button có loading state */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}
