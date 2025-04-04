frontend/
│
├── app/                             # App Router (Next.js 13+)
│   ├── layout.tsx                   # Layout chính
│   ├── page.tsx                     # Trang chủ (/)
│   │
│   ├── user/                        # Khu vực dành cho người dùng
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # /user
│   │   ├── profile/
│   │   │   └── page.tsx             # /user/profile
│   │   └── orders/
│   │       └── page.tsx             # /user/orders
│   │
│   ├── admin/                       # Khu vực dành cho admin
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # /admin
│   │   ├── users/
│   │   │   └── page.tsx             # /admin/users
│   │   └── products/
│   │       └── page.tsx             # /admin/products
│   │
│   ├── api/                         # API routes
│       └── login/
│            └── route.ts             # POST /api/login
│   
├── public/
│   ├── fonts/                      # Font custom
│   │   ├── Roboto-Regular.woff2
│   │   └── OpenSans-Bold.ttf
│   │
│   ├── js/                         # File JavaScript thuần
│   │   └── javascript.js
│   │
│   └── css/                        # File CSS custom
│       └── styles.css
│   
│
├── styles/                # CSS hoặc file tailwind config
│   └── all.css
│
├── types/                 # Định nghĩa TypeScript types
│   └── user.ts
├── env.d.ts               # Email
├── .env.local             # Biến môi trường (API keys, DB, ...)
├── next.config.js         # Cấu hình Next.js
├── tsconfig.json          # Cấu hình TypeScript
├── package.json           # Thông tin package, dependencies
└── README.md              # <-----------------------------------Bạn đang ở đây