// app/layout.tsx
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
// import "@/public/css/bootstrap.min.css";
// import "@/public/css/LineIcons.3.0.css";
// import "@/public/css/tiny-slider.css";
// import "@/public/css/glightbox.min.css";
// import "@/public/css/main.css";
import "@/styles/style.css";
import "@/styles/all.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NhanStore",
  description: "Best store!!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script src="/js/bootstrap.min.js" strategy="beforeInteractive" />
        <Script src="/js/javascript.js" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Script src="/js/tiny-slider.js" strategy="afterInteractive" />
        <Script src="/js/glightbox.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
