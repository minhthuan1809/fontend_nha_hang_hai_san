"use client";

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  OverlayLoginStore,
  OverlayRegisterStore,
} from "@/app/store/ZustandSStore";
import { getNavbar } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";

type Navbar = {
  brand: {
    alt_text: "";
    brand_name: "";
    logo_url: "";
  };
  navigation: {
    name: string;
    url: string;
    is_active: boolean;
    parent_id: null;
  }[];
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { dataOverlayLogin, setOverlayLogin } = OverlayLoginStore();
  const { dataOverlayRegister, setOverlayRegister } = OverlayRegisterStore();
  const [navData, setNavData] = useState<Navbar | null>(null);

  useEffect(() => {
    const fetchNavbar = async () => {
      const response = await getNavbar();
      if (response.ok) {
        setNavData(response.data);
      }
    };
    fetchNavbar();
  }, []);

  // Đóng menu khi chọn item trên mobile
  const handleNavItemClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  if (!navData) {
    return <Loading />;
  }

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="py-2 bg-white shadow-sm dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      maxWidth="xl"
    >
      <NavbarContent className="gap-0 sm:gap-2 overflow-hidden ">
        <img
          src={navData?.brand.logo_url}
          alt={navData?.brand.alt_text}
          width={80}
          height={80}
          className="bg-white "
        />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-1 text-black justify-center flex-grow"
        justify="center"
      >
        {navData.navigation.slice(0, 5).map((item: any, index: number) => (
          <NavbarItem key={index}>
            <Link
              href={item.url}
              onClick={handleNavItemClick}
              className={`px-3 py-2 text-sm lg:text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
                pathname === item.url
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400"
              }`}
            >
              {item.name}
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
            variant={dataOverlayLogin ? "solid" : "light"}
          >
            {navData.navigation[5]?.name || "Đăng Nhập"}
          </Button>
          <span className="text-gray-400 hidden md:block">/</span>
          <Button
            className={`px-3 py-1 text-sm lg:text-base font-medium hidden md:block ${
              dataOverlayRegister
                ? "bg-amber-600 text-white"
                : "bg-transparent text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400"
            }`}
            onClick={() => setOverlayRegister(!dataOverlayRegister)}
            variant={dataOverlayRegister ? "solid" : "light"}
          >
            {navData.navigation[6]?.name || "Đăng ký"}
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
        {navData.navigation.slice(0, 5).map((item: any) => (
          <NavbarMenuItem key={item.id} className="my-1">
            <Link
              href={item.url}
              onClick={handleNavItemClick}
              className={`w-full py-2 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors block px-4 ${
                pathname === item.url
                  ? "text-amber-600 dark:text-amber-400 bg-gray-50 dark:bg-gray-800"
                  : "text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400"
              }`}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}

        <div className="flex flex-col gap-3 mt-6">
          <Button
            className={`w-full font-medium py-2 rounded-lg transition-colors bg-amber-600 text-white`}
            onClick={() => {
              setOverlayLogin(!dataOverlayLogin);
              setIsMenuOpen(false);
            }}
          >
            {navData.navigation[5]?.name || "Đăng nhập"}
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
            }}
          >
            {navData.navigation[6]?.name || "Đăng ký"}
          </Button>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
