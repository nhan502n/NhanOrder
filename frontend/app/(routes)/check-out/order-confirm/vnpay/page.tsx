"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function XacNhanVnpayPage() {
    const searchParams = useSearchParams();
    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        const responseCode = searchParams.get("vnp_ResponseCode");
        const transactionNo = searchParams.get("vnp_TransactionNo");
        const amount = searchParams.get("vnp_Amount");

        if (responseCode === "00" && amount) {
            const amountValue = parseInt(amount);
            setResult(`✅ Thanh toán thành công! Mã giao dịch: ${transactionNo}, Số tiền: ${(amountValue / 100).toLocaleString()}đ`);
        } else {
            setResult("❌ Thanh toán thất bại hoặc bị hủy.");
        }
    }, [searchParams]);

    return (
        <div className="container" style={{ padding: "40px" }}>
            <h1>Kết quả thanh toán</h1>
            <p>{result || "Đang kiểm tra kết quả thanh toán..."}</p>
        </div>
    );
}
