"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function HotPromotion() {
    const [hotProducts, setHotProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const limit = 8;
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");

    useEffect(() => {
        fetch("http://localhost:8000/api/san-pham-khuyen-mai")
            .then((res) => res.json())
            .then((data) => setHotProducts(data.data))
            .catch((error) => console.error("Lỗi khi lấy sản phẩm khuyến mãi:", error));
    }, []);

    return (
        <div className="layout-product-type" >
            {hotProducts.map((sp) => (
                <div className="product" id="product-hot" key={sp.id} >
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
                            {sp.sale_price.toLocaleString()}đ
                            <del>{sp.price.toLocaleString()}đ</del>
                        </div>
                        <div className="tragop">
                            Giảm {Number(sp.discount_percent).toFixed(0)}%
                        </div>

                    </Link>
                </div>
            ))}
        </div>
    );
}
