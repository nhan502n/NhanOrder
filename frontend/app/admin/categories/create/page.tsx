'use client';

import { useState, useEffect } from 'react';

export default function CreateCategoryPage() {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');
    const [categories, setCategories] = useState<any[]>([]); // danh sách category để chọn làm cha

    useEffect(() => {
        // Lấy danh sách danh mục cha
        fetch('http://localhost:8000/api/category')
            .then((res) => res.json())
            .then((data) => setCategories(data.data))
            .catch((err) => console.error('Lỗi khi tải danh mục:', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        if (image) formData.append('image', image);
        formData.append('description', description);
        if (parentId) formData.append('parent_id', parentId);

        try {
            const res = await fetch('http://localhost:8000/api/category', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                alert('Thêm danh mục thành công!');
            } else {
                alert('Lỗi khi thêm danh mục');
            }
        } catch (err) {
            console.error('Lỗi khi gửi yêu cầu:', err);
        }
    };

    return (
        <main className="category-form-wrapper">
            <form onSubmit={handleSubmit} className="category-form">
                <h2>Thêm Danh Mục</h2>

                <label htmlFor="name" className="category-label">Tên Danh Mục:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="category-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="image" className="category-label">Ảnh Danh Mục:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    className="category-input"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                />

                <label htmlFor="description" className="category-label">Mô Tả:</label>
                <textarea
                    id="description"
                    name="description"
                    className="category-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                />

                <label htmlFor="parent_id" className="category-label">Danh Mục Cha:</label>
                <select
                    id="parent_id"
                    name="parent_id"
                    className="category-input"
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                >
                    <option value="">-- Không có (Danh mục gốc) --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <input type="submit" value="Thêm" className="category-submit" />
            </form>
        </main>
    );
}
