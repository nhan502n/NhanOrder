"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function XacNhanDatHangPage() {
  const [data, setData] = useState<any | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  // Lấy dữ liệu đơn hàng được lưu sau khi đặt hàng (nếu chưa có thì hiển thị thông báo)
  useEffect(() => {
    const stored = localStorage.getItem("orderConfirm");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data)
    return <div>Đang tải dữ liệu đơn hàng...</div>;

  const { form, cartItems, total } = data;

  const getPaymentLabel = (payment: string) => {
    switch (payment) {
      case "1":
        return "Tiền mặt";
      case "2":
        return "VNPay";
      case "3":
        return "Momo";
      case "4":
        return "PayOS";
      default:
        return "Không rõ";
    }
  };

  const handleDatHang = async () => {
    if (form.payment === "2") {
      // Nếu chọn VNPay, dùng token để gọi API của backend qua route chung, ví dụ "/api/create-vnpay-url"
      try {
        setIsRedirecting(true);
        // Lấy token từ localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Không tìm thấy token, vui lòng đăng nhập lại.");
          setIsRedirecting(false);
          router.push("/dang-nhap");
          return;
        }
        const res = await fetch("http://localhost:8000/api/create-vnpay-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: total }),
        });

        let result;
        try {
          result = await res.json();
        } catch (e) {
          const text = await res.text();
          console.error("Server trả về không phải JSON:", text);
          alert("Lỗi từ server (không phải JSON), xem console để biết thêm.");
          setIsRedirecting(false);
          return;
        }

        console.log("VNPay response:", result);
        if (result.payUrl) {
          // Điều hướng sang URL thanh toán trả về (VNPay)
          window.location.href = result.payUrl;
        } else {
          alert("Không lấy được đường dẫn thanh toán VNPay.");
          setIsRedirecting(false);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API VNPay:", err);
        alert("Đã xảy ra lỗi khi tạo thanh toán VNPay.");
        setIsRedirecting(false);
      }
    } else {
      alert("✅ Đặt hàng thành công!");
      router.push("/thanh-toan/xac-nhan-dat-hang/dat-hang-thanh-cong");
    }
  };

  return (
    <main>
      <div className="container">
        <div className="Box-bill-confirm">
          <div className="cart-process">
            <div className="cart-process-child">
              <i className="fa-solid fa-cart-shopping" style={{ color: "#fff", backgroundColor: "#066EFF" }}></i>
              <p>Kiểm tra</p>
            </div>
            <div className="cart-process-child">
              <i className="fa-regular fa-credit-card" style={{ color: "#fff", backgroundColor: "#066EFF" }}></i>
              <p>Thanh toán</p>
            </div>
            <div className="cart-process-child">
              <i className="fa-solid fa-check" style={{ color: "#fff" }}></i>
              <p>Xác nhận</p>
            </div>
          </div>

          <div className="col6">
            <form id="thong_tin_nguoi_nhan">
              <h2>Thông tin người nhận</h2>
              <table border={1}>
                <tbody>
                  <tr>
                    <td className="left">Họ và tên:</td>
                    <td>{form.name}</td>
                  </tr>
                  <tr>
                    <td className="left">Số điện thoại:</td>
                    <td>{form.phone}</td>
                  </tr>
                  <tr>
                    <td className="left">Email:</td>
                    <td>{form.email}</td>
                  </tr>
                  <tr>
                    <td className="left">Địa chỉ:</td>
                    <td>{form.address}</td>
                  </tr>
                  {form.note && (
                    <tr>
                      <td className="left">Ghi chú:</td>
                      <td>{form.note}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="left">Quốc gia:</td>
                    <td>{form.country}</td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>

          <div className="col4">
            <div id="chi_tiet_don_hang">
              <h2>Thông tin đơn hàng</h2>
              <table style={{ textAlign: "left" }}>
                <tbody>
                  {cartItems.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>Tên sản phẩm</td>
                      <td>
                        {item.product.name}
                        <br />
                        <span>
                          {item.quantity} x {item.price.toLocaleString("vi-VN")}đ
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Phương thức thanh toán</td>
                    <td>{getPaymentLabel(form.payment)}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Tổng cộng:</td>
                    <td style={{ fontWeight: "bold" }}>
                      {total.toLocaleString("vi-VN")}đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="btn-order"
              onClick={handleDatHang}
              disabled={isRedirecting}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#066EFF",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isRedirecting
                ? "Đang chuyển hướng..."
                : "Đặt hàng"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
