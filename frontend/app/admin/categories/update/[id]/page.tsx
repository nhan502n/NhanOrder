'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function UpdateCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const selected = localStorage.getItem('selectedCategory');
        const storedCategories = localStorage.getItem('categories');
    
        if (selected) {
            const cat = JSON.parse(selected);
            setName(cat.name || '');
            setDescription(cat.description || '');
            setParentId(cat.parent_id ? String(cat.parent_id) : '');
            setCurrentImage(cat.image || '');
        }
    
        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        if (image) formData.append('image', image);
        formData.append('description', description);
        formData.append('parent_id', parentId);

        const res = await fetch(`http://localhost:8000/api/category/${id}`, {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            alert('Cập nhật danh mục thành công!');
            router.push('/admin/categories');
        } else {
            alert('Lỗi khi cập nhật danh mục!');
        }
    };

    return (
        <main className="category-form-wrapper">
            <form onSubmit={handleSubmit} className="category-form">
                <h2 className="category-form-title">Sửa Danh Mục</h2>

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
                {currentImage && (
                    <img
                        src={`http://localhost:8000/img/${currentImage}`}
                        alt="Current"
                        className="category-image-preview"
                    />
                )}

                <label htmlFor="description" className="category-label">Mô tả:</label>
                <input
                    type="text"
                    id="description"
                    className="category-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="parent_id" className="category-label">Danh Mục Cha:</label>
                <select
                    id="parent_id"
                    className="category-input"
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                >
                    <option value="">-- Không có --</option>
                    {categories
                        .filter((cat) => String(cat.id) !== id)
                        .map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                </select>

                <input type="submit" value="Lưu" className="category-submit" />
            </form>
        </main>
    );
}
