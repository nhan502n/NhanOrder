// components/Nav.tsx
"use client";

import Link from "next/link";

export default function Nav() {
    return (
        <div className="nav-artical-background-color">
            <nav>
                <div className="menu-sp">
                    <ul>
                        <li>
                            <span>Danh mục sản phẩm</span>
                            <ul>
                                <li><Link href="#">Samsung</Link></li>
                                <li><Link href="#">Iphone</Link></li>
                                <li><Link href="#">Oppo</Link></li>
                                <li><Link href="#">Realme</Link></li>
                                <li><Link href="#">Xiaomi</Link></li>
                                <li><Link href="#">Vivo</Link></li>
                                <li><Link href="#">Nokia</Link></li>
                                <li><Link href="#">TCL</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="nav-menu">
                    <Link href="/giao-hang">Giao lắp chuyên nghiệp</Link>|
                    <Link href="/bao-hanh">Bảo hành nhanh gọn</Link>|
                    <Link href="#">Tổng hợp khuyến mãi</Link>|
                    <Link href="#">Bán hàng doanh nghiệp</Link>
                </div>
            </nav>
        </div>
    );
}
