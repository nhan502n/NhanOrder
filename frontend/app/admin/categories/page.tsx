"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 5; // Số danh mục mỗi trang

    useEffect(() => {
        fetch(`http://localhost:8000/api/danh-muc-san-pham?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.data);
                setTotal(data.total);
            })
            .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    return (
        <main className="container">
            <h1 className="title-page">Quản lý Danh mục</h1>
            <Link className="btn-add" href="/admin/them-danh-muc-san-pham">
                Thêm Danh Mục
            </Link>
            <table className="category-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Danh Mục</th>
                        <th>Ảnh</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <img
                                    className="category-image"
                                    width="100"
                                    height="100"
                                    src={`http://localhost:8000/api/image/${category.image}`}
                                    alt={category.name}
                                />
                            </td>
                            <td>
                                <Link className="btn-edit" href={`/admin/categories/edit/${category.id}`}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(category.id)}
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
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        className={page === i + 1 ? "active" : ""}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </main>
    );
}

// Hàm xóa danh mục
const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;

    try {
        const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            alert("Xóa thành công!");
            location.reload();
        } else {
            alert("Xóa thất bại!");
        }
    } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
    }
};
