"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Nav from "@/app/components/Nav";
import PriceRange from "@/app/components/PriceRange";
import "@/public/css/bootstrap.min.css";
import "@/public/css/LineIcons.3.0.css";
import "@/public/css/tiny-slider.css";
import "@/public/css/glightbox.min.css";
import "@/public/css/main.css";

export default function ProductList() {
    const [products, setProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const limit = 9;

    const searchParams = useSearchParams();
    const router = useRouter();

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

    // Xử lý chuyển trang
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPage) {
            router.push(`?page=${newPage}`);
        }
    };
        const pathname = usePathname();
    
        // Danh sách các trang không hiển thị Nav
        const hiddenNavPages = ["/san-pham"];
    return (
    <>
    {!hiddenNavPages.includes(pathname) && <Nav />}
      {/* Start Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">Danh sách sản phẩm</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-nav">
                <li>
                  <a href="/trang-chu">
                    <i className="lni lni-home"></i> Trang chủ
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">Shop</a>
                </li>
                <li>Shop Grid</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumbs */}

      {/* Start Product Grids */}
      <section className="product-grids section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-12">
              {/* Start Product Sidebar */}
              <div className="product-sidebar">
                {/* Start Single Widget */}
                <div className="single-widget search">
                  <h3>Search Product</h3>
                  <form action="#">
                    <input type="text" placeholder="Search Here..." />
                    <button type="submit">
                      <i className="lni lni-search-alt"></i>
                    </button>
                  </form>
                </div>
                {/* End Single Widget */}
                {/* Start Single Widget */}
                <div className="single-widget">
                  <h3>All Categories</h3>
                  <ul className="list">
                    <li>
                      <a href="product-grids.html">Computers & Accessories </a>
                      <span>(1138)</span>
                    </li>
                    <li>
                      <a href="product-grids.html">Smartphones & Tablets</a>
                      <span>(2356)</span>
                    </li>
                    <li>
                      <a href="product-grids.html">TV, Video & Audio</a>
                      <span>(420)</span>
                    </li>
                  </ul>
                </div>
                {/* End Single Widget */}
                {/* Start Single Widget */}
                <div className="single-widget range">
                  <PriceRange />
                </div>
              </div>
              {/* End Product Sidebar */}
            </div>
            <div className="col-lg-9 col-12">
              <div className="product-grids-head">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-grid"
                    role="tabpanel"
                    aria-labelledby="nav-grid-tab"
                  >
                    <div className="row">
                {products.map((product) => (
                    <div className="col-lg-4 col-md-6 col-12" key={product.id}>
                        {/* Start Single Product */}
                        <div className="single-product">
                            <div className="product-image">
                                <img src={`http://localhost:8000/api/image/${product.image}`} alt={product.name} />
                                <div className="button">
                                    <a href={`/san-pham/${product.slug}`} className="btn">
                                        <i className="lni lni-cart"></i> Add to Cart
                                    </a>
                                </div>
                            </div>
                            <div className="product-info">
                                <span className="category">{product.category?.name}</span>
                                <h4 className="title">
                                    <a href={`/san-pham/${product.slug}`}>{product.name}</a>
                                </h4>
                                <ul className="review">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <li key={index}>
                                            <i className={index < product.rating ? "lni lni-star-filled" : "lni lni-star"}></i>
                                        </li>
                                    ))}
                                    <li>
                                        <span>{product.rating} Review(s)</span>
                                    </li>
                                </ul>
                                <div className="price">
                                    <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}</span>
                                </div>
                            </div>
                        </div>
                        {/* End Single Product */}
                    </div>
                ))}
            </div>
            {/* Phân trang */}
            <div className="pagination">
                <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
                    Trước
                </button>
                {[...Array(totalPage)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={page === pageNumber ? "active" : ""}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                <button disabled={page >= totalPage} onClick={() => handlePageChange(page + 1)}>
                    Sau
                </button>
            </div>

            <style jsx>{`
                .pagination {
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }
                .pagination button {
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    background: white;
                    cursor: pointer;
                }
                .pagination button.active {
                    background: #007bff;
                    color: white;
                }
                .pagination button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-list"
                    role="tabpanel"
                    aria-labelledby="nav-list-tab"
                  ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Product Grids */}
    </>
  );
}
