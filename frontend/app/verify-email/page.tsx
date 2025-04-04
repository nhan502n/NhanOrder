"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyEmail() {
  const [message, setMessage] = useState<string>("Đang xác thực...");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      axios.get(`http://localhost:8000/api/verify-email?token=${token}`)
        .then(response => {
          setMessage(response.data.message);
          setTimeout(() => router.push("/login"), 3000);
        })
        .catch(error => {
          setMessage(error.response?.data?.error || "Xác thực thất bại");
        });
    }
  }, [token, router]);

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{message}</h2>
    </div>
  );
}
