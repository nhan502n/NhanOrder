const nextConfig = {
  images: {
    domains: ["localhost"], // Cho phép lấy ảnh từ Laravel
  },
  async rewrites() {
      return [
        { source: '/trang-chu', destination: '/' },
        { source: '/home', destination: '/' },
          { source: '/gio-hang', destination: '/cart' },
          { source: '/san-pham', destination: '/products' },
          { source: '/dang-nhap', destination: '/login' },
          { source: '/dang-ky', destination: '/register' },
          { source: '/san-pham/:slug', destination: '/products/:slug' },

          
          { source: '/admin/quan-ly-san-pham', destination: '/admin/products' },
          { source: '/admin/them-san-pham', destination: '/admin/products/create' },
          { source: '/admin/quan-ly-danh-muc', destination: '/admin/categories' },
          { source: '/admin/them-danh-muc-san-pham', destination: '/admin/categories/create' },

      ];
  },
};

export default nextConfig;
