'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "../../styles/admin.css";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navLinks = [
        { href: "/admin/thong-ke-doanh-thu", match: "/admin/thong-ke-doanh-thu", label: "Thống Kê Doanh Thu" },
        { href: "/admin/quan-ly-tai-khoan", match: "/admin/quan-ly-tai-khoan", label: "Quản Lý Tài Khoản" },
        { href: "/admin/quan-ly-danh-muc", match: "/admin/quan-ly-danh-muc|/admin/them-danh-muc-san-pham|/admin/sua-danh-muc-san-pham", label: "Quản Lý Danh Mục Sản Phẩm" },
        { href: "/admin/quan-ly-san-pham", match: "/admin/quan-ly-san-pham|/admin/them-san-pham|/admin/sua-san-pham", label: "Quản Lý Sản Phẩm" },
        { href: "/admin/quan-ly-don-hang", match: "/admin/quan-ly-don-hang", label: "Quản Lý Đơn Hàng" },
    ];

    return (
        <div className="admin-layout">
            {/* Header */}
            <header>
                <div className="header-container-admin">
                    <div className="left_header">
                        <Link href="/" style={{ color: '#fff' }}>
                            Quay về trang chủ <i className="fa-solid fa-house"></i>
                        </Link>
                    </div>
                    <div className="right_header">
                        <Image
                            src="http://localhost:8000/api/image/NhanOrder-AB-1.png"
                            width={200}
                            height={80}
                            alt="Logo"
                        />
                    </div>
                </div>
            </header>

            {/* Sidebar + Main Content */}
            <div className="admin-container">
                <nav>
                    <div className="nav-grid">
                        <Image
                            width={250}
                            height={90}
                            src="http://localhost:8000/api/image/NhanOrder-2.png"
                            alt="logo"
                        />

                        {navLinks.map((item) => {
                            const isActive = new RegExp(`^(${item.match})`).test(pathname);
                            return (
                                <li key={item.href} className={`nav-item ${isActive ? 'active' : ''}`}>
                                    <Link href={item.href}>{item.label}</Link>
                                </li>
                            );
                        })}
                    </div>
                </nav>

                <main>{children}</main>
            </div>
        </div>
    );
}
