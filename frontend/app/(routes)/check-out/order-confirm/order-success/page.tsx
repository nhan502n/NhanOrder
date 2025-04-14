'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function XacNhanDatHangPage() {
  useEffect(() => {
    // Gửi mail xác nhận đơn hàng
    const sendMail = async () => {
      try {
        const orderData = JSON.parse(localStorage.getItem('orderData') || '{}'); // nếu lưu ở localStorage
        const response = await fetch('http://localhost:8000/api/send-order-mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          console.error('Lỗi gửi mail:', await response.text());
        } else {
          console.log('Gửi mail thành công!');
        }
      } catch (error) {
        console.error('Gửi mail thất bại:', error);
      }
    };

    sendMail();

    alert('Đơn hàng đã được ghi nhận! Bạn sẽ được chuyển về trang chủ sau 5 giây.');
    const timer = setTimeout(() => {
      window.location.href = '/trang-chu';
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <div className="container">
        <div className="cart-process">
          <div className="cart-process-child">
            <i className="fa-solid fa-cart-shopping" style={{ color: '#ffffff', backgroundColor: '#066EFF' }}></i>
            <p>Kiểm tra</p>
          </div>
          <div className="cart-process-child">
            <i className="fa-regular fa-credit-card" style={{ color: '#ffffff', backgroundColor: '#066EFF' }}></i>
            <p>Thanh toán</p>
          </div>
          <div className="cart-process-child">
            <i className="fa-solid fa-check" style={{ color: '#ffffff', backgroundColor: '#066EFF' }}></i>
            <p>Xác nhận</p>
          </div>
        </div>
        <div className="cam_on_dat_hang">
          <Image
            src="http://localhost:8000/api/image/ty.jpg"
            alt="thank you for your order"
            width={500}
            height={300}
          />
          <h1>Đơn hàng của bạn đã được ghi nhận. Shop sẽ liên lạc với bạn trong thời gian sớm nhất.</h1>
        </div>
      </div>
    </main>
  );
}
