// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UserDropdown from "@/app/components/UserDropdown";

export default function Header({ user }: { user?: { id: number; name: string; role: number } }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="header-color">
            <header className="header-container">

                {/* logo */}
                <div className="logo">
                    <Link href="/trang-chu">
                        <Image src="http://localhost:8000/api/image/NhanOrder-AB-1.png" alt="Logo" width={150} height={50} />
                    </Link>
                </div>

                {/* Search */}
                <form action="/tim-kiem" method="GET" className="search-box">
                    <input
                        type="text"
                        name="search"
                        placeholder="Bạn cần tìm gì?"
                        autoComplete="off"
                    />
                    <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>

                {/* Phone, Cart, User */}
                <div className="header-actions">
                    <a href="tel:18006800" className="header-link">Gọi mua: (+84) 358 93 7695</a>

                    <Link href="/gio-hang" className="header-link">
                        <i className="fa-solid fa-cart-shopping" style={{ marginRight: 5 }}></i>
                    </Link>

                    
                    <div className="header-actions">
                    <span className="flex items-center gap-1">
                        
                        {user ? user.name : <Link href="/dang-nhap" className="header-link"><i className="fa-solid fa-user" style={{ marginRight: 5 }}></i></Link>}
                    </span>


                    {user && (
                        <ul className="absolute right-0 top-full mt-2 bg-white text-black rounded shadow w-48 hidden group-hover:block z-50">
                            <li><Link href="/chinh-sua-thong-tin" className="block px-4 py-2 hover:bg-gray-100">Thay Đổi Thông Tin</Link></li>
                            <li><Link href="/xem-don-hang" className="block px-4 py-2 hover:bg-gray-100">Xem Đơn Hàng</Link></li>
                            {user.role === 1 && (
                                <li><Link href="/thong-ke-doanh-thu" className="block px-4 py-2 hover:bg-gray-100">Trang Quản Trị</Link></li>
                            )}
                            <li><Link href="/dang-xuat" className="block px-4 py-2 hover:bg-gray-100">Đăng Xuất</Link></li>
                        </ul>
                    )}
                </div>

                </div>

            </header>
        </div>
    );
}
