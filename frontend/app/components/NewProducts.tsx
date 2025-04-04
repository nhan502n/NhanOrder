"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


export default function NewProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const limit = 8;
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");

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

    return (
        <div className="layout-product-type">
        {products.map((sp) => (
                <div className="product" key={sp.id}> {/* --- ĐÃ SỬA className = "product" đúng với CSS --- */}
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
    );
}