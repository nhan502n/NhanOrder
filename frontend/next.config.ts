const nextConfig = {
  images: {
    domains: ["localhost"], // Cho phép lấy ảnh từ Laravel
  },
  async rewrites() {
      return [
        { source: '/trang-chu', destination: '/' },
        { source: '/home', destination: '/' },
          { source: '/gio-hang', destination: '/cart' },
          { source: '/thanh-toan', destination: '/check-out' },
          { source: '/thanh-toan/xac-nhan-dat-hang', destination: '/check-out/order-confirm' },
          { source: '/thanh-toan/xac-nhan-dat-hang/dat-hang-thanh-cong', destination: '/check-out/order-confirm/order-success' },
          { source: '/thanh-toan/xac-nhan-dat-hang/vnpay', destination: '/check-out/order-confirm/vnpay' },

          { source: '/thanh-toan/xac-nhan-dat-hang/vnpay/vnpay-return', destination: '/check-out/order-confirm/vnpay/vnpay-return' },
          { source: '/san-pham', destination: '/products' },
          { source: '/dang-nhap', destination: '/login' },
          { source: '/dang-ky', destination: '/register' },
          { source: '/san-pham/:slug', destination: '/products/:slug' },

          
          { source: '/admin/quan-ly-san-pham', destination: '/admin/products' },
          { source: '/admin/them-san-pham', destination: '/admin/products/create' },
          { source: '/admin/quan-ly-danh-muc', destination: '/admin/categories' },
          { source: '/admin/them-danh-muc-san-pham', destination: '/admin/categories/create' },
          { source: '/admin/sua-danh-muc-san-pham/:id', destination: '/admin/categories/update/:id' },


      ];
  },
};

export default nextConfig;
