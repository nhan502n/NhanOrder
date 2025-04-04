// app/admin/AdminLayout.tsx (hoặc /components/AdminLayout.tsx)
"use client"

import Link from "next/link";
import Image from "next/image";
import "@/public/css/admin.css"; // nhớ import css admin riêng

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Quản Trị</title>
                <link rel="shortcut icon" href="/images/logo/logo.svg" type="image/x-icon" />
            </head>
            <body>
                {/* Header */}
                <header>
                    <div className="header-container-admin">
                        <div className="left_header">
                            <Link href="/" style={{ color: '#fff' }}>
                                Quay về trang chủ <i className="fa-solid fa-house"></i>
                            </Link>
                        </div>
                        <div className="right_header">
                            <Image src="/images/logo/logo.svg" width={200} height={80} alt="Logo" />
                        </div>
                    </div>
                </header>
        <div className="admin-container">
            <nav>
                <div className="nav-grid">
                    <Image width={300} height={80} src="/images/logo/logo.svg" alt="logo" />

                    <li><Link href="/admin/thong-ke-doanh-thu">Thống Kê Doanh Thu</Link></li>
                    <li><Link href="/admin/quan-ly-tai-khoan">Quản Lý Tài Khoản</Link></li>
                    <li><Link href="/admin/quan-ly-danh-muc">Quản Lý Danh Mục Sản Phẩm</Link></li>
                    <li><Link href="/admin/quan-ly-san-pham">Quản Lý Sản Phẩm</Link></li>
                    <li><Link href="/admin/quan-ly-don-hang">Quản Lý Đơn Hàng</Link></li>
                </div>
            </nav>

            <main>
                {children}
            </main>
        </div>
        <script src="/js/thongke.js"></script>
            </body>
        </html>
    );
}
