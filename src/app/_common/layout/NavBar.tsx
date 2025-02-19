"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { OverlayLoginStore, OverlayRegisterStore } from "@/app/store/ZustandSStore";
import Login from "../auth/Login";

const navItems = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Sản phẩm", 
    href: "/products",
  },
  {
    label: "Giới thiệu",
    href: "/about",
  },
  {
    label: "Liên hệ",
    href: "/contact",
  },
  {
    label: "Tin tức",
    href: "/news",
  },

];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { dataOverlayLogin, setOverlayLogin } = OverlayLoginStore();
  const { dataOverlayRegister, setOverlayRegister } = OverlayRegisterStore();

  // Kiểm tra kích thước màn hình và cập nhật state
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Kiểm tra khi component mount
    checkIsMobile();
    
    // Theo dõi sự thay đổi kích thước màn hình
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Đóng menu khi chọn item trên mobile
  const handleNavItemClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="py-2 bg-white shadow-sm dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      maxWidth="xl">
      <NavbarContent className="gap-0 sm:gap-2">
        <NavbarBrand>
      
        <Avatar
        className="w-[5rem] h-[5rem] bg-white text-large"
        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.15752-9/476910520_1976798496147567_3316850609173496871_n.png?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeG9rl0p6_I41QRDhQy64BpGrYwEG4xAFIqtjAQbjEAUinH6vLA-mx-HjT2g3TD0qU7o0ooePG_hLOXHrvRCOvsr&_nc_ohc=_-OmregOGi0Q7kNvgFPk-GQ&_nc_oc=AdhWp0qc0gsv5Z6E-9RhkrLB5pvb2MAtItBordLBlayMR4FcFeJRftfaWN3dhO-o1Ow&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&oh=03_Q7cD1gE-XNJYwRJIajjLkPNv79GcIoZFgi1pVNQ2OraIzszs_g&oe=67DA22C1"
      />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-1 text-black justify-center flex-grow"
        justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              onClick={handleNavItemClick}
              className={`px-3 py-2 text-sm lg:text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
                pathname === item.href
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400"
              }`}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <Button
            className={`px-3 py-1 text-sm lg:text-base font-medium ${
              dataOverlayLogin
                ? "bg-amber-600 text-white"
                : "bg-transparent text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400"
            }`}
            onClick={() => setOverlayLogin(!dataOverlayLogin)}
            variant={dataOverlayLogin ? "solid" : "light"}>
            Đăng Nhập
          </Button>
          <span className="text-gray-400 hidden md:block">/</span>
          <Button
            className={`px-3 py-1 text-sm lg:text-base font-medium hidden md:block ${
              dataOverlayRegister
                ? "bg-amber-600 text-white"
                : "bg-transparent text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400"
            }`}
            onClick={() => setOverlayRegister(!dataOverlayRegister)}
            variant={dataOverlayRegister ? "solid" : "light"}>
            Đăng ký
          </Button>
        </div>
        
        {/* Di chuyển nút toggle sang bên phải */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Menu mobile */}
      <NavbarMenu className="pt-4 pb-6 px-4 bg-white dark:bg-gray-900 overflow-auto max-h-[80vh]">
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href} className="my-1">
            <Link
              href={item.href}
              onClick={handleNavItemClick}
              className={`w-full py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors block px-4 ${
                pathname === item.href
                  ? "text-amber-600 dark:text-amber-400 bg-gray-50 dark:bg-gray-800"
                  : "text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400"
              }`}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        <div className="flex flex-col gap-3 mt-6">
          <Button
            className={`w-full font-medium py-2 rounded-lg transition-colors bg-amber-600 text-white`}
            onClick={() => {
              setOverlayLogin(!dataOverlayLogin);
              setIsMenuOpen(false);
            }}>
            Đăng nhập
          </Button>
          <Button
            className={`w-full font-medium py-2 rounded-lg transition-colors ${
              dataOverlayRegister
                ? "bg-amber-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => {
              setOverlayRegister(!dataOverlayRegister);
              setIsMenuOpen(false);
            }}>
            Đăng ký
          </Button>
        </div>
      </NavbarMenu>

    </Navbar>
  );
}