import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import BackToTop from "./_shared/components/ui/BackToTop";
import TawkToChat from "./_shared/components/TawkToChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hải sản Minh Thuận",
  description: "Nhà hàng hải sản Minh Thuận - hàng đầu tại Hà Nội ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          {/* // chat */}
          <TawkToChat />
          {/* // back to top */}
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
