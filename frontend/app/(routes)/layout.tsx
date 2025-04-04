"use client";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Danh sách các trang không hiển thị Nav
    const hiddenNavPages = ["/san-pham"]; // Thêm đường dẫn trang cần ẩn vào đây

    return (
        <div>
            <Header />
            {!hiddenNavPages.includes(pathname) && <Nav />}
            <main>{children}</main>
            <Footer />
        </div>
    );
}
