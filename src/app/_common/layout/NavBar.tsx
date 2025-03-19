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
import { usePathname, useRouter } from "next/navigation";
import {
  OverlayLoginStore,
  OverlayRegisterStore,
  useStore,
} from "@/app/store/ZustandSStore";
import { getNavbar } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";
import { deleteCookie, getCookie } from "cookies-next";
import { authUser, logout } from "@/app/_service/client/auth";
import Icon from "@/app/_shared/utils/Icon";
import { enqueueSnackbar } from "notistack";
import ShoppingCart from "@/app/_shared/components/ui/ShoppingCart";

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
    id: string | number;
  }[];
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { dataOverlayLogin, setOverlayLogin } = OverlayLoginStore();
  const { dataOverlayRegister, setOverlayRegister } = OverlayRegisterStore();
  const [navData, setNavData] = useState<Navbar | null>(null);
  const token = getCookie("token");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { setDataUsers } = useStore() as { setDataUsers: (data: any) => void };

  useEffect(() => {
    const fetchNavbar = async () => {
      const response = await getNavbar();
      if (response.ok) {
        setNavData(response.data);
      }
    };
    fetchNavbar();
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      const response = await authUser(token as string);

      if (response.ok) {
        setDataUsers(response.data);
        if (response.data.level === 2) {
          setUser(response.data);
        } else {
          router.push("/admin");
        }
      } else {
        router.push("/");
        setUser(null);
        enqueueSnackbar(response.message, {
          variant: "error",
        });
        deleteCookie("token");
      }
    };
    fetchUser();
  }, [token]);

  const handleNavItemClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Đăng xuất
  const handleLogout = async () => {
    const response = await logout(token as string);
    if (response.ok) {
      deleteCookie("token");
      setUser(null);

      router.push("/");
    } else {
      enqueueSnackbar("Đã xảy ra lỗi khi đăng xuất", {
        variant: "error",
      });
      router.push("/");
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
      <NavbarContent className="gap-0 sm:gap-2 overflow-hidden">
        <Link href="/">
          <img
            src={navData?.brand.logo_url}
            alt={navData?.brand.alt_text}
            width={80}
            height={80}
            className="bg-white"
          />
        </Link>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-1 text-black justify-center flex-grow"
        justify="center"
      >
        {navData.navigation.slice(0, 5).map((item: any, index: number) => (
          <NavbarItem key={index}>
            <Link
              href={item.url}
              onPress={handleNavItemClick}
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
        {!user ? (
          <div className="hidden sm:flex items-center gap-2 cursor-pointer relative">
            <Button
              className={`px-3 py-1 text-sm lg:text-base font-medium ${
                dataOverlayLogin
                  ? "bg-amber-600 text-white"
                  : "bg-transparent text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400"
              }`}
              onPress={() => setOverlayLogin(!dataOverlayLogin)}
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
              onPress={() => setOverlayRegister(!dataOverlayRegister)}
              variant={dataOverlayRegister ? "solid" : "light"}
            >
              {navData.navigation[6]?.name || "Đăng ký"}
            </Button>
          </div>
        ) : (
          <>
            <div className="h-full items-center gap-2 hidden sm:flex group cursor-pointer relative ">
              <div className="flex items-center gap-2 hover:text-amber-600">
                <Icon icon="User" size={30} />
              </div>
              {/* hover */}
              <div
                className="absolute top-[3.6rem] right-6 lg:-right-1
              mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2 z-10 hidden group-hover:block"
              >
                <ul className="space-y-2 w-[15rem]">
                  <div className="flex items-center gap-2">
                    <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden border border-gray-200 dark:border-gray-800">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-700 text-sm font-medium dark:text-gray-200">
                        {user?.name.charAt(0).toUpperCase() +
                          user?.name.slice(1)}
                      </span>
                      <span className="text-gray-400 text-sm truncate md:w-full w-[20vw] ">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <div className=" pb-1 w-full border-b border-gray-200 dark:border-gray-800"></div>
                  <li>
                    {[
                      {
                        name: "Thông tin tài khoản",
                        icon: "CircleUser",
                        url: "/account",
                        id: "account",
                      },
                      {
                        name: "Lịch sử mua hàng",
                        icon: "History",
                        url: "/order-history",
                        id: "order-history",
                      },
                    ].map((item: any) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg"
                      >
                        <Icon icon={item.icon} size={20} /> {item.name}
                      </Link>
                    ))}
                  </li>
                  <li
                    onClick={handleLogout}
                    className="flex text-red-500 items-center gap-2 px-4 py-2  hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Icon icon="LogOut" size={20} /> Đăng xuất
                  </li>
                </ul>
              </div>
            </div>

            {/*  cart */}
            <ShoppingCart />
          </>
        )}

        {/* Menu mobile */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Menu mobile */}
      <NavbarMenu className="pt-4 pb-6 px-4 bg-white dark:bg-gray-900 overflow-auto max-h-[80vh]">
        {user && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 mt-5">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon icon="CircleUser" size={20} />
                Thông tin tài khoản
              </Link>
              <Link
                href="/order-history"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon icon="History" size={20} />
                Lịch sử mua hàng
              </Link>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-4" />
          </div>
        )}

        {navData.navigation.slice(0, 5).map((item: any) => (
          <NavbarMenuItem key={item.id} className="my-1">
            <Link
              href={item.url}
              onPress={handleNavItemClick}
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

        {!user ? (
          <div className="flex flex-col gap-3 mt-6">
            <Button
              className="w-full font-medium py-2 rounded-lg transition-colors bg-amber-600 text-white"
              onPress={() => {
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
              onPress={() => {
                setOverlayRegister(!dataOverlayRegister);
                setIsMenuOpen(false);
              }}
            >
              {navData.navigation[6]?.name || "Đăng ký"}
            </Button>
          </div>
        ) : (
          <Button
            className="w-full font-medium py-2 rounded-lg transition-colors bg-red-500 text-white mt-6"
            onPress={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
          >
            Đăng xuất
          </Button>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
