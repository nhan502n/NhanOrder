"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function NewProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const limit = 8;
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:8000/api/san-pham-moi?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data);
                setTotal(data.total);
            })
            .catch((error) => console.error("Lỗi khi lấy sản phẩm:", error));
    }, [page]);

    const totalPage = Math.ceil(total / limit);

    const addToCart = async (product: any) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("❌ Bạn phải đăng nhập trước khi thêm vào giỏ hàng.");
            router.push("/dang-nhap");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: 1,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("🛒 " + data.message);
            } else {
                alert("❌ Lỗi: " + (data.message || "Không thể thêm vào giỏ hàng"));
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            alert("❌ Có lỗi xảy ra khi thêm vào giỏ hàng.");
        }
    };

    return (
        <div className="layout-product-type">
            {products.map((sp) => (
                <div className="product" key={sp.id}>
                    <Link href={`/san-pham/${sp.slug}`}>
                        <div className="anh">
                            <Image
                                src={`http://localhost:8000/api/image/${sp.image}`}
                                alt={sp.name}
                                width={300}
                                height={300}
                                className="img-fluid"
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
                        <button
                            type="button"
                            className="btn-add-cart"
                            onClick={() => addToCart(sp)}
                        >
                            Chọn Mua <i className="lni lni-cart"></i>
                        </button>
                    </div>
                    <div className="tragop">Trả góp 0%</div>
                </div>
            ))}
        </div>
    );
}
