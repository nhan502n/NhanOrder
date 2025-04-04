"use client"
import "@/public/css/admin.css";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export default function ThemSanPham() {
    const [form, setForm] = useState({
        name: '',
        slug: '',
        image: '', // chỉ lưu tên file
        price: '',
        sale_price: '',
        description: '',
        category_id: 0,
        quantity: 1,
    });

    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/danh-muc-san-pham')
            .then(res => res.json())
            .then(data => setCategories(data.data || [])) // Lấy mảng `data`
            .catch(err => console.error("Không thể load danh mục", err));
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === 'price' || name === 'sale_price' || name === 'quantity' || name === 'category_id'
                ? Number(value)
                : value
        });
    };

    // Xử lý khi chọn file
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setForm({ ...form, image: selectedFile.name }); // chỉ lấy tên file
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!file) {
            alert("Vui lòng chọn ảnh!");
            return;
        }
    
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("slug", form.slug);
        formData.append("price", form.price.toString());
        formData.append("sale_price", form.sale_price.toString());
        formData.append("description", form.description);
        formData.append("category_id", form.category_id.toString());
        formData.append("quantity", form.quantity.toString());
        formData.append("image", file); // Gửi file ảnh
    
        try {
            const response = await fetch("http://localhost:8000/api/san-pham", {
                method: "POST",
                body: formData,
            });
            
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                alert("Thêm sản phẩm thành công!");
                console.log(data);
            } else {
                alert("Lỗi khi thêm sản phẩm!");
                console.error(data);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra!");
        }
    };
    

    return (
        <div className="container">
            <form className="admin-form" onSubmit={handleSubmit}>
                <label className="admin-label">Tên sản phẩm:</label>
                <input className="admin-input" type="text" name="name" value={form.name} onChange={handleChange} required />

                <label className="admin-label">Slug:</label>
                <input className="admin-input" type="text" name="slug" value={form.slug} onChange={handleChange} required />

                <label className="admin-label">Hình ảnh (chọn file):</label>
                <input className="admin-input" type="file" accept="image/*" onChange={handleFileChange} required />
                <div style={{marginBottom: '10px'}}>Tên file: {form.image}</div>

                <label className="admin-label">Giá:</label>
                <input className="admin-input" type="number" name="price" value={form.price} onChange={handleChange} required />

                <label className="admin-label">Giá khuyến mãi:</label>
                <input className="admin-input" type="number" name="sale_price" value={form.sale_price} onChange={handleChange} />

                <label className="admin-label">Mô tả:</label>
                <textarea className="admin-textarea" name="description" value={form.description} onChange={handleChange}></textarea>

                <label className="admin-label">Số lượng:</label>
                <input className="admin-input" type="number" name="quantity" value={form.quantity} onChange={handleChange} required />

                <label className="admin-label">Danh mục:</label>
                <select className="admin-select" name="category_id" value={form.category_id} onChange={handleChange} required>
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <button className="admin-button" type="submit">Thêm Sản Phẩm</button>
            </form>
        </div>
    );
}
