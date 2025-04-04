"use client";
import "@/public/css/admin.css";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function Dashboard() {
    const [orderStats, setOrderStats] = useState<any>(null);
    const [revenueData, setRevenueData] = useState<any>({ labels: [], data: [] });
    const [productNew, setProductNew] = useState([]);
    const [postNew, setPostNew] = useState([]);
    const [commentsNew, setCommentsNew] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu
        Promise.all([
            fetch("http://localhost:8000/api/dashboard").then(res => res.json()),
            fetch("http://localhost:8000/api/san-pham-moi").then(res => res.json()),
            fetch("http://localhost:8000/api/bai-viet-moi").then(res => res.json()),
            fetch("http://localhost:8000/api/binh-luan-moi").then(res => res.json()),
        ]).then(([dashboard, products, posts, comments]) => {
            setOrderStats(dashboard);
            setRevenueData(dashboard.revenue_chart);
            setProductNew(products);
            setPostNew(posts);
            setCommentsNew(comments);
            renderOrderChart(dashboard);
            renderRevenueChart(dashboard.revenue_chart);
        });
    }, []);

    const renderOrderChart = (data: any) => {
        const ctx = document.getElementById("orderChart") as HTMLCanvasElement;
        if (!ctx) return;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Tổng Đơn Hàng", "Đơn Hàng Thành Công", "Đơn Hàng Chờ", "Tổng Sản Phẩm", "Tổng Bài Viết"],
                datasets: [{
                    label: 'Thống kê tổng quan',
                    data: [data.count_order, data.order_success, data.order_pending, data.total_product, data.total_post],
                    backgroundColor: ['#4bc0c0', '#36a2eb', '#ffce56', '#ff6384', '#9966ff'],
                    borderWidth: 1
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    };

    const renderRevenueChart = (data: any) => {
        const ctx = document.getElementById("revenueChart") as HTMLCanvasElement;
        if (!ctx) return;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Doanh thu theo ngày',
                    data: data.data,
                    borderColor: '#5e17eb',
                    backgroundColor: '#5e17eb',
                    borderWidth: 2,
                    tension: 0.4,
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    };

    if (!orderStats) return <p>Đang tải dữ liệu...</p>;

    return (
        <main>
            <h1 className="Title-Page-Main">Dashboard</h1>

            <div className="Thong-ke-doanh-thu">
                <canvas id="revenueChart" height="500"></canvas>
            </div>
            <div className="Thong-ke-tren-tong-don-hang">
                <canvas id="orderChart" height="500"></canvas>
            </div>

            <div className="Thong-ke-tren-tong-don-hang">
                <div className="Tong-doanh-thu">
                    <h2>Tổng Doanh Thu</h2>
                    <div className="box-item-thong-ke">
                        <p>{orderStats.total_revenue.toLocaleString()} VNĐ</p>
                        <i className="fa-solid fa-money-bill"></i>
                    </div>
                </div>
                <div className="Tong-don-hang">
                    <h2>Tổng Đơn Hàng</h2>
                    <div className="box-item-thong-ke">
                        <p>{orderStats.count_order}</p>
                        <i className="fa-solid fa-boxes-stacked"></i>
                    </div>
                </div>
                <div className="Tong-san-pham">
                    <h2>Đơn Thành Công</h2>
                    <div className="box-item-thong-ke">
                        <p>{orderStats.order_success}</p>
                        <i className="fa-brands fa-dropbox"></i>
                    </div>
                </div>
                <div className="Tong-san-pham">
                    <h2>Đơn Chờ Xác Nhận</h2>
                    <div className="box-item-thong-ke">
                        <p>{orderStats.order_pending}</p>
                        <i className="fa-solid fa-hourglass-half"></i>
                    </div>
                </div>
                <div className="Tong-san-pham">
                    <h2>Tổng Sản Phẩm</h2>
                    <div className="box-item-thong-ke">
                        <p>{orderStats.total_product}</p>
                        <i className="fa-solid fa-times-circle"></i>
                    </div>
                </div>
                <div className="Tong-san-pham">
                    <h2>Tổng Bài Viết</h2>
                    <div className="box-item-thong-ke">
                        <p>{orderStats.total_post}</p>
                        <i className="fa-solid fa-box-open"></i>
                    </div>
                </div>
            </div>

            <div className="Thong-Ke-SP-BV-Moi">
                <div className="box-product-new">
                    <h3>Danh Sách Sản Phẩm Mới</h3>
                    {productNew.map((product: any) => (
                        <a key={product.id} href={`/product/detail/${product.id}`} className="product-new-item">
                            <img src={product.image} alt="" />
                            <div className="product-new-item-info">
                                <h3>{product.name}</h3>
                                <p>{product.discount}</p>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="box-post-new">
                    <h3>Danh Sách Bài Viết Mới</h3>
                    {postNew.map((post: any) => (
                        <a key={post.id} href={`/bai-viet/${post.id}`} className="post-new-item">
                            <img src={post.image} alt="" />
                            <div className="post-new-item-info">
                                <h3>{post.name}</h3>
                                <p>{post.create_date}</p>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="box-comment-product-new">
                    <h3>Danh Sách Bình Luận Mới</h3>
                    {commentsNew.map((comment: any) => (
                        <a key={comment.id} href={`/product/detail/${comment.product_id}`} className="comment-new-item">
                            <div className="comment-new-item-info">
                                <h3>{comment.user_name}</h3>
                                <p>{comment.content}</p>
                                <span>{comment.sent_date}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </main>
    );
}
