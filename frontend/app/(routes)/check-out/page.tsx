"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThanhToanPage() {
    const [user, setUser] = useState<any | null>(null);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        country: "Việt Nam",
        note: "",
        payment: "1",
    });
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/dang-nhap");
            return;
        }

        fetch("http://localhost:8000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setForm((prev) => ({
                    ...prev,
                    name: data.name,
                    email: data.email,
                }));
            });

        fetch("http://localhost:8000/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCartItems(data);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        fetch("http://localhost:8000/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("✅ Đặt hàng thành công!");
                router.push("/xac-nhan");
            })
            .catch(() => alert("❌ Có lỗi xảy ra"));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <main>
            <div className="container">
                <div className="Box-bill">
                    <div className="cart-process">
                        <div className="cart-process-child">
                            <i className="fa-solid fa-cart-shopping" style={{ color: "#fff", backgroundColor: "#066EFF" }} />
                            <p>Kiểm tra</p>
                        </div>
                        <div className="cart-process-child">
                            <i className="fa-regular fa-credit-card" style={{ color: "#fff" }} />
                            <p>Thanh toán</p>
                        </div>
                        <div className="cart-process-child">
                            <i className="fa-solid fa-check" style={{ color: "#fff" }} />
                            <p>Xác nhận</p>
                        </div>
                    </div>

                    <div className="col6">
                        <form onSubmit={handleSubmit} id="thanh_toan">
                            <h2 style={{ marginBottom: "20px" }}>
                                Điền thông tin thanh toán
                                <span style={{ float: "right", fontSize: 18, paddingTop: 5, fontWeight: 100 }}>
                                    <a style={{ color: "red" }} href="/xoa-thong-tin">
                                        Xóa thông tin
                                    </a>
                                </span>
                            </h2>

                            <label>Họ và tên *</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required />

                            <label>Địa chỉ email *</label>
                            <input type="text" name="email" value={form.email} onChange={handleChange} required />

                            <label>Số điện thoại *</label>
                            <input type="text" name="phone" value={form.phone} onChange={handleChange} required />

                            <label>Địa chỉ nhận hàng *</label>
                            <input type="text" name="address" value={form.address} onChange={handleChange} required />

                            <label>Quốc gia *</label>
                            <input type="text" name="country" value={form.country} onChange={handleChange} required />

                            <label>Ghi chú (tùy chọn)</label>
                            <textarea name="note" value={form.note} onChange={handleChange}></textarea>

                            <p>Phương Thức Thanh Toán:</p>
                            <label className="Payment-Bill">
                                Tiền Mặt
                                <input type="radio" name="payment" value="1" checked={form.payment === "1"} onChange={handleChange} />
                            </label>

                            <input type="submit" value="Đặt hàng" id="checkout" />
                        </form>
                    </div>

                    <div className="col3">
                        <div id="product-cart">
                            {cartItems.length === 0 ? (
                                <h2 style={{ textAlign: "center", lineHeight: "80px" }}>Giỏ hàng của bạn đang trống</h2>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <td className="cart-name-product">Tên Sản Phẩm</td>
                                            <td className="cart-col-product">Giá</td>
                                            <td className="cart-col-product">Số lượng</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="cart-name-product">{item.product.name}</td>
                                                <td className="cart-col-product">
                                                    {item.price.toLocaleString("vi-VN")}đ
                                                </td>
                                                <td className="cart-col-product">{item.quantity}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td>Tổng cộng:</td>
                                            <td colSpan={2} id="tongtien">{total.toLocaleString("vi-VN")}đ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
