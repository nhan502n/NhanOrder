import ProductList from './ProductList';

async function getProducts(page: number, limit: number) {
    const res = await fetch(`http://localhost:8000/api/san-pham?page=${page}&limit=${limit}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Lấy dữ liệu sản phẩm thất bại');
    }

    return res.json();
}

export default async function QuanLySanPhamPage({ searchParams }: { searchParams: { page?: string } }) {
    const pageNum = parseInt(searchParams.page || '1', 10);
    const limit = 10;

    const data = await getProducts(pageNum, limit);

    return (
        <ProductList
            products={data.data}
            pageNum={pageNum}
            limit={limit}
            total={data.total}
        />
    );
}
