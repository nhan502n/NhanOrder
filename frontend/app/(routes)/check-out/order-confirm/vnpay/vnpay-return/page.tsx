"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VnpayReturnPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  // Hàm xử lý kết quả VNPay bằng cách gửi các tham số callback về cho backend
  // để backend kiểm tra secure hash, cập nhật trạng thái đơn hàng, v.v.
  const processVnpayReturn = async (params: any) => {
    try {
      const res = await fetch("http://localhost:8000/api/vnpay-callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage("Thanh toán thành công!");
      } else {
        setStatusMessage("Thanh toán thất bại!");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi xử lý VNPay return:", error);
      setStatusMessage("Có lỗi xảy ra khi xử lý thanh toán.");
    }
    setLoading(false);
  };

  useEffect(() => {
    // Chuyển query params thành object để gửi về backend
    const params = Object.fromEntries([...searchParams.entries()]);
    processVnpayReturn(params);
  }, [searchParams]);

  return (
    <main>
      <div className="container">
        {loading ? (
          <p>Đang xử lý kết quả thanh toán...</p>
        ) : (
          <div>
            <h2>{statusMessage}</h2>
            <p>Chi tiết giao dịch:</p>
            <pre>{JSON.stringify(Object.fromEntries([...searchParams.entries()]), null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
