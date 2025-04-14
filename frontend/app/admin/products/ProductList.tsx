'use client';

import Link from 'next/link';
import Image from 'next/image';

type Product = {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
    sale_price: number | null;
    quantity: number;
    rating: number;
    category: {
        id: number;
        name: string;
    };
};

type Props = {
    products: Product[];
    pageNum: number;
    limit: number;
    total: number;
};

export default function ProductList({ products, pageNum, limit, total }: Props) {
    const totalPage = Math.ceil(total / limit);

    return (
        <main className="container">
            <h1 className="title-page">Quản lý Sản phẩm</h1>

            <Link className="btn-add" href="/admin/them-san-pham">
                Thêm Sản Phẩm
            </Link>

            <table className="category-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình Ảnh</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Danh Mục</th>
                        <th>Giá</th>
                        <th>Số Lượng Trong Kho</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(products) && products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                <Image
                                    className="category-image"
                                    src={`http://localhost:8000/api/image/${product.image}`}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    unoptimized
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category?.name || 'Chưa phân loại'}</td>
                            <td>
                                {product.sale_price ? (
                                    <>
                                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                                            {product.sale_price.toLocaleString()} VNĐ
                                        </span><br />
                                        <del>{product.price.toLocaleString()} VNĐ</del>
                                    </>
                                ) : (
                                    <>{product.price.toLocaleString()} VNĐ</>
                                )}
                            </td>
                            <td>{product.quantity}</td>
                            <td>
                                <Link
                                    className="btn-edit"
                                    href={`/admin/sua-san-pham/${product.id}`}
                                    onClick={() => {
                                        localStorage.setItem('selectedProduct', JSON.stringify(product));
                                    }}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <div className="pagination">
                {Array.from({ length: totalPage || 1 }, (_, i) => (
                    <Link
                        key={i + 1}
                        className={pageNum === i + 1 ? 'active' : ''}
                        href={`/admin/quan-ly-san-pham?page=${i + 1}`}
                    >
                        {i + 1}
                    </Link>
                ))}
            </div>
        </main>
    );
}

// Hàm xóa sản phẩm
const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    try {
        const res = await fetch(`http://localhost:8000/api/product/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            alert("Xóa sản phẩm thành công!");
            location.reload();
        } else {
            alert("Xóa thất bại!");
        }
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
    }
};
