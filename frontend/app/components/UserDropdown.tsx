// components/UserDropdown.tsx
"use client";
import Link from "next/link";

export default function UserDropdown({ user }: { user?: { id: number; name: string; role: number } }) {
    return (
        <div id="User" className="user-btn group">
            <span className="brand-color flex items-center gap-1 cursor-pointer">
                <i className="fa-solid fa-user fa-lg"></i>
                {user ? user.name : "Đăng Nhập"}
            </span>

            {user ? (
                <ul className="dropdown group-hover:block hidden absolute right-0 top-full bg-white rounded shadow-md z-50">
                    <li><Link href="/chinh-sua-thong-tin">Thay Đổi Thông Tin</Link></li>
                    <li><Link href="/xem-don-hang">Xem Đơn Hàng</Link></li>
                    {user.role === 1 && <li><Link href="/thong-ke-doanh-thu">Đi Đến Trang Quản Trị</Link></li>}
                    <li><Link href="/dang-xuat">Đăng Xuất</Link></li>
                </ul>
            ) : (
                <Link href="/dang-nhap" className="ml-2 text-white">Đăng Nhập</Link>
            )}
        </div>
    );
}
