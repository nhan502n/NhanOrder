"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            const res = await fetch("http://localhost:8000/api/cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            setCartItems(data);
        };
        fetchCart();
    }, []);

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);

    const tongTien = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const updateQuantity = async (id: number, delta: number) => {
        const item = cartItems.find((i) => i.id === id);
        if (!item) return;
        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return;

        try {
            const res = await fetch(`http://localhost:8000/api/cart/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            if (res.ok) {
                setCartItems((prev) =>
                    prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
                );
            }
        } catch (err) {
            console.error("Lỗi cập nhật số lượng:", err);
        }
    };

    const deleteItem = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8000/api/cart/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.ok) {
                setCartItems((prev) => prev.filter((i) => i.id !== id));
            }
        } catch (err) {
            console.error("Lỗi xóa sản phẩm:", err);
        }
    };

    return (
        <div className="container">
            <div className="Box-Cart">
                <h1 style={{ marginTop: 20 }}>Giỏ Hàng Của Bạn</h1>
                <div className="col7">
                    <div id="product-cart">
                        {cartItems.length === 0 ? (
                            <div style={{ textAlign: "center", lineHeight: "80px" }}>
                                <h2>Giỏ hàng của bạn đang trống</h2>
                                <style>{`.cart-col-product, .cart-name-product, #tongtien{display: none;}`}</style>
                            </div>
                        ) : (
                            <table border={1}>
                                <tbody>
                                    <tr>
                                        <td colSpan={2} className="cart-name-product">Sản Phẩm</td>
                                        <td className="cart-col-product">Giá</td>
                                        <td className="cart-col-product" id="cart-col-product-qua">Số lượng</td>
                                        <td className="cart-col-product">Thành tiền</td>
                                        <td className="cart-col-product"></td>
                                    </tr>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="cart-col-product">
                                                <Image
                                                    src={`http://localhost:8000/api/image/${item.product.image}`}
                                                    alt={item.product.name}
                                                    height={80}
                                                    width={80}
                                                    style={{ padding: "10px 0" }}
                                                />
                                            </td>
                                            <td className="cart-name-product">{item.product.name}</td>
                                            <td className="cart-col-product">
                                                {formatCurrency(item.price)}
                                                <br />
                                                {item.product.old_price && item.product.old_price > item.price && (
                                                    <span style={{ textDecoration: "line-through", color: "rgba(206, 203, 203, 1)" }}>
                                                        {formatCurrency(item.product.old_price)}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="cart-col-product">
                                                <button className="btn-change-quantity" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <input
                                                    type="hidden"
                                                    value={item.product.quantity}
                                                />
                                                <button className="btn-change-quantity" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </td>
                                            <td className="cart-col-product">
                                                {formatCurrency(item.price * item.quantity)}
                                            </td>
                                            <td className="cart-col-product">
                                                <button className="btn-del-cart" onClick={() => deleteItem(item.id)}>Xóa</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <div className="col4">
                    <table border={1}>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <h2>Thông tin đơn hàng</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontSize: 25, whiteSpace: "nowrap" }}>Tổng tiền:</td>
                                <td
                                    style={{ color: "rgb(94, 23, 235)", fontSize: 25 }}
                                    id="tongtien"
                                >
                                    {formatCurrency(tongTien)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ padding: "20px 60px" }}>
                                    <p>
                                        Miễn phí vận chuyển cho đơn hàng từ 399.000đ - Giao hàng
                                        hỏa tốc trong vòng 4 giờ, áp dụng tại khu vực nội thành Hồ
                                        Chí Minh
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    {cartItems.length === 0 ? (
                                        <button id="checkout">Không Có Sản Phẩm</button>
                                    ) : (
                                        <button id="checkout">
                                            <Link href="/thanh-toan" style={{ color: "white" }}>
                                                Thanh toán
                                            </Link>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
