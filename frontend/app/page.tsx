"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Slideshow from "@/app/components/Slideshow";
import NewProducts from "@/app/components/NewProducts";
import HotPromotion from "@/app/components/HotPromotion";

import Footer from "@/app/components/Footer";

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const limit = 8;
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");

    useEffect(() => {
        fetch(`http://localhost:8000/api/san-pham?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data);
                setTotal(data.total);
            })
            .catch((error) => console.error("Lỗi khi lấy sản phẩm:", error));
    }, [page]);

    const totalPage = Math.ceil(total / limit);

    return (
        <>
            <Header />
            <Nav />
            <div className="container">
              <Slideshow />
    <div className="title-product">
            <h2>Sản phẩm mới</h2>
        </div>
        <NewProducts />

            <div className="menu-boloc">
            <div className="menu-boloc-con"><a href="#">Bộ lọc</a></div>
            <div className="menu-boloc-con"><a href="#">Thương hiệu</a></div>
            <div className="menu-boloc-con"><a href="#">Giá bán</a></div>
            <div className="menu-boloc-con"><a href="#">Camera sau</a></div>
            <div className="menu-boloc-con"><a href="#">Camera trước</a></div>
            <div className="menu-boloc-con"><a href="#">Màn hình</a></div>
            <div className="menu-boloc-con"><a href="#">Độ phân giải màn hình</a></div>
            <div className="menu-boloc-con"><a href="#">Màn hình tràn viền</a></div>
            <div className="menu-boloc-con"><a href="#">RAM</a></div>
        </div>
        <div className="brand">
            <div className="thuonghieu">Thương hiệu: </div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/Samsung_r4o3-uh.webp" alt=""/></a> </div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/iphone_fmqr-gq.png" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/oppo.png" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/Realme.webp" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/Xiaomi_ru8d-2w.webp" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/vivo_40u2-a7.webp" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/Nokia_hrgh-42.webp" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/TCL_2owi-9h.webp" alt=""/></a></div>

        </div>
        <div className="title-product">
            <h2>Sản phẩm xem nhiều</h2>
        </div>
        <div className="layout-product-type">
                {products.map((sp) => (
                        <div className="product" key={sp.id}> {/* --- ĐÃ SỬA className = "product" đúng với CSS --- */}
                            <Link href={`/san-pham/${sp.slug}`}>
                                <div className="anh">
                                    <Image
                                        src={`http://localhost:8000/img/${sp?.image}`}

                                        alt={sp.name}
                                        width={300}
                                        height={300}
                                        className="img-fluid"
                                        unoptimized
                                    />
                                </div>
                                <div className="ten">{sp.name}</div>
                                <div className="gia">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(sp.price)}
                                </div>
                                {sp.sale_price > 0 && (
                                    <del>
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(sp.sale_price)}
                                    </del>
                                )}
                            </Link>
                            <div className="giohang">
                                <form action="/gio-hang" method="post">
                                    <input type="hidden" name="ID" value={sp.id} />
                                    <input type="hidden" name="Name" value={sp.name} />
                                    <input type="hidden" name="Image" value={sp.image} />
                                    <input type="hidden" name="Discount" value={sp.sale_price} />
                                    <input type="hidden" name="Price" value={sp.price} />
                                    <input type="hidden" name="Quantity" value="1" />
                                    <button type="submit" className="btn-add-cart">
                                        Chọn Mua <i className="lni lni-cart"></i>
                                    </button>
                                </form>
                            </div>
                            <div className="tragop">Trả góp 0%</div>
                        </div>
                ))}
            </div>
            <div className="banner-mid"> <img src="http://localhost:8000/api/image/banner-mid.jpg" alt=""/></div>
        <div className="foryou">
            SẢN PHẨM KHUYẾN MÃI NỔI BẬT!!
        </div>
        <div className="foryou-border">
                <HotPromotion />
        </div>
        <div className="history">
            THÔNG TIN HỮU ÍCH-MUA SẮM THÔNG MINH
        </div>
        <div className="tintuc">
            <div className="tintuc-left">
                <a href="#"><img src="http://localhost:8000/api/image/0301-MN-1_1162x652__2_.png" alt=""/>
                    Giáp Thìn Vui Bất Thình Lình - Ưu đãi đặc biệt mùa Tết 2024
                    <div className="ten-tacgia">Nguyễn Vũ Chi Mai</div>
                </a>
            </div>
            <div className="tintuc-right">

                <div className="tintuc-right-anh">
                    <div className="tintuc-right-copy">
                        <a href="#">
                            <img src="http://localhost:8000/api/image/0401-TTT-4_1162x652.png" alt=""/>
                            <div className="tintuc-right-chu">Hàng ngàn sản phẩm Xả Kho Giá Sốc đang chờ bạn tại 53 TTMS
                                Nguyễn Kim
                                <div className="ten-tacgia-2">Trương Thu Thảo</div>
                            </div>
                        </a>
                    </div>
                    <div className="tintuc-right-copy-1">
                        <a href="#">
                            <img className="tintuc-right-copy-1-img" src="http://localhost:8000/api/image/0901-TTT-1_1162x652.png" alt=""/>
                            <div className="tintuc-right-chu-1">Mua tủ lạnh, máy giặt Panasonic - Rước 40 máy giặt sấy
                                Panasonic cực xịn
                                <div className="ten-tacgia-2">Trương Thu Thảo</div>
                            </div>
                        </a>
                    </div>
                    <div className="tintuc-right-copy-1">
                        <a href="#">
                            <img className="tintuc-right-copy-1-img" src="http://localhost:8000/api/image/Catepage-Banner_1200x628px_4muz-rc.jpg"
                                alt=""/>
                            <div className="tintuc-right-chu-1">Đặt Trước Galaxy S24 Series Tại Nguyễn Kim Rước Ưu Đãi Cực
                                Khủng
                                <div className="ten-tacgia-2">Trương Thu Thảo</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
            <div className="uudai">
                <div className="title-uudai">
                    <img src="http://localhost:8000/api/image/Title-San-Uu-Dai-Noi-Bat-WEB.png" alt=""/>
                </div>
                <div className="text-uudai">ƯU ĐÃI THANH TOÁN</div>
                <div className="layout-uudai">
                    <img src="http://localhost:8000/api/image/uudai1.jpg" alt=""/>
                    <img src="http://localhost:8000/api/image/uudai2.jpg" alt=""/>
                    <img src="http://localhost:8000/api/image/uudai3.jpg" alt=""/>
                </div>
                <div className="text-uudai">ƯU ĐÃI THƯƠNG HIỆU</div>
                <div className="layout-uudai">
                    <img src="http://localhost:8000/api/image/uudai4.jpg" alt=""/>
                    <img src="http://localhost:8000/api/image/uudai5.jpg" alt=""/>
                    <img src="http://localhost:8000/api/image/uudai6.jpg" alt=""/>
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
}
