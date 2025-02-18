'use client'
import React from "react";
import Icon from "@/app/_utils/Icon";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#1A1A1A] text-white py-12 border-t border-amber-800/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Giới thiệu */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-amber-300">Giới thiệu</h3>
              <p className="text-gray-300 leading-relaxed">
                Là một nhà hàng sang trọng với không gian ấm cúng và phong cách hiện đại. Chúng tôi phục vụ các món ăn đặc sắc được chế biến từ những nguyên liệu tươi ngon nhất cùng đồ uống chất lượng cao.
              </p>
              <div className="flex items-center gap-4 pt-6">
                <Link href="/">
                  <div className="w-10 h-10 rounded-full bg-amber-800/30 flex items-center justify-center hover:bg-amber-700 transition-colors duration-300">
                    <Icon icon="Facebook" className="text-amber-200" size={22}/>
                  </div>
                </Link>
                <Link href="/">
                  <div className="w-10 h-10 rounded-full bg-amber-800/30 flex items-center justify-center hover:bg-amber-700 transition-colors duration-300">
                    <Icon icon="Instagram" className="text-amber-200" size={22}/>
                  </div>
                </Link>
                <Link href="/">
                  <div className="w-10 h-10 rounded-full bg-amber-800/30 flex items-center justify-center hover:bg-amber-700 transition-colors duration-300">
                    <Icon icon="Youtube" className="text-amber-200" size={22}/>
                  </div>
                </Link>
              </div>
            </div>

            {/* Liên hệ */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-amber-300">Liên hệ</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <Icon icon="Map" size={22} className="text-amber-400 mt-1" />
                  <span className="leading-relaxed">123 Đường ABC, Quận XYZ</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="Phone" size={22} className="text-amber-400 mt-1" />
                  <span className="leading-relaxed">(123) 456-7890</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="Phone" size={22} className="text-amber-400 mt-1" />
                  <span className="leading-relaxed">info@example.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="Clock" size={22} className="text-amber-400 mt-1" />
                  <span className="leading-relaxed">
                    <p>Thứ 2 - Thứ 5: 11:00 - 22:00</p>
                    <p>Thứ 6 - Chủ Nhật: 11:00 - 23:00</p>
                  </span>
                </li>
              </ul>
            </div>

            {/* Đăng ký nhận ưu đãi */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-amber-300">Đặt bàn & Ưu đãi</h3>
              <div className="bg-gradient-to-b from-amber-950/40 to-gray-900 p-6 rounded-lg border border-amber-800/30 shadow-lg">
                <p className="text-gray-300 mb-4 leading-relaxed">Đặt bàn ngay hôm nay hoặc đăng ký nhận thông tin về các khuyến mãi đặc biệt và thực đơn mới!</p>
                <form onSubmit={(e) => e.preventDefault()}>
                  <Input
                    type="email"
                    placeholder="Nhập email của bạn"
                    size="lg"
                    radius="sm"
                    classNames={{
                      inputWrapper: "bg-black/30 border border-amber-800/30 focus-within:border-amber-500"
                    }}
                    startContent={<Icon icon="Email" className="text-amber-400" size={20}/>}
                  />
                  <Button 
                    size="lg" 
                    className="w-full mt-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 transition-colors duration-300 font-medium"
                  >
                    Đăng ký ngay
                  </Button>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Bằng cách đăng ký, bạn đồng ý với các điều khoản và chính sách bảo mật của chúng tôi.
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-amber-800/20 mt-12 pt-8 text-gray-400">
            <p>&copy; 2025 Minh Thuận. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/" className="text-sm hover:text-amber-300 transition-colors">Chính sách bảo mật</Link>
              <Link href="/" className="text-sm hover:text-amber-300 transition-colors">Điều khoản sử dụng</Link>
              <Link href="/" className="text-sm hover:text-amber-300 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}