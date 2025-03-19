"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "../_shared/utils/Icon";
import { cn, Tooltip } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { authUser, logout } from "../_service/client/auth";
import { enqueueSnackbar } from "notistack";
import NotFound from "../not-found";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false); // Thay đổi giá trị mặc định thành false
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [dataUsers, setDataUsers] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // Kiểm tra quyền admin trước khi render giao diện
  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const token = getCookie("token");

        if (!token) {
          if (mounted) {
            setIsAdmin(true);
            setIsLoading(false);
          }
          return;
        }

        const res = await authUser(token as string);

        if (mounted) {
          setDataUsers(res.data);
          if (!res.ok || res.data.level === 2) {
            setIsAdmin(true);
            deleteCookie("token");
          }
          setIsLoading(false);
        }
      } catch (error) {
        if (mounted) {
          router.push("/");
          deleteCookie("token");
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [router]);

  // Check if mobile and handle resize
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const isMobileView = window.innerWidth < 768;
        setIsMobile(isMobileView);
        if (!isMobileView) {
          setIsMobileMenuOpen(false);
        }
      }, 100);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    {
      name: "Tổng quan",
      href: "/dashboard",
      icon: "Home",
    },
    {
      name: "Thông Kê",
      href: "/statistical",
      icon: "LayoutDashboard",
      submenu: [
        {
          name: "Doanh thu",
          href: "/statistical/stats",
          icon: "LineChart",
        },
      ],
    },
    {
      name: "Đơn Hàng",
      href: "/orders",
      icon: "Package",
      submenu: [
        {
          name: "Xác nhận đơn hàng",
          href: "/orders/confirm",
          icon: "CheckCircle",
        },
        {
          name: "Lịch Sử Đơn Hàng",
          href: "/orders/history",
          icon: "History",
        },
        {
          name: "Lịch Sử Thanh Toán",
          href: "/orders/history-pay",
          icon: "History",
        },
      ],
    },
    {
      name: "Mã Giảm Giá",
      href: "/discount",
      icon: "DollarSign",
      submenu: [
        {
          name: "Tạo Mã Giảm Giá",
          href: "/discount/code",
          icon: "DollarSign",
        },
        {
          name: "Lịch Sử Sử Dụng",
          href: "/discount/history",
          icon: "Calendar",
        },
      ],
    },
    {
      name: "Sản Phẩm",
      href: "/product",
      icon: "ShoppingBag",
    },
    {
      name: "Khách Hàng",
      href: "/customers",
      icon: "Users",
    },

    {
      name: "Bài Viết",
      href: "/articles",
      icon: "FileText",
    },
    {
      name: "Liên Hệ",
      href: "/contacts",
      icon: "PhoneCall",
    },
    {
      name: "Phân Quyền",
      href: "/permissions",
      icon: "Shield",
    },
    {
      name: "Giao Diện",
      href: "/layout",
      icon: "Palette",
      submenu: [
        {
          name: "Menu",
          href: "/layout/menu",
          icon: "Menu",
        },
        {
          name: "Trang Chủ",
          href: "/layout/header?section=hero",
          icon: "Layout",
        },
        {
          name: "Chân Trang",
          href: "/layout/footer",
          icon: "Footprints",
        },
        {
          name: "Giới Thiệu",
          href: "/layout/about",
          icon: "Info",
        },
      ],
    },
  ];

  const toggleSubmenu = (name: string) => {
    setActiveMenu(activeMenu === name ? null : name);
  };

  const handleLogout = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const token = getCookie("token") as string;
      const response = await logout(token);

      if (response.ok) {
        deleteCookie("token");
        router.push("/");
        enqueueSnackbar(response.message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(response.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi đăng xuất", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  if (isAdmin) {
    return <NotFound />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-white shadow-lg hover:bg-gray-100 transition-colors"
        aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
      >
        <Icon icon={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
      </button>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 flex flex-col",
          isMobile
            ? isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0",
          isMobile ? "w-72" : isCollapsed ? "w-20" : "w-72"
        )}
      >
        <div className="h-16 border-b flex items-center justify-between px-6 cursor-pointer">
          {(!isCollapsed || isMobile) && (
            <div
              className="flex items-center gap-2"
              onClick={() => router.push("/settings")}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-600">
                <img
                  src={dataUsers?.avatar}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-black">{dataUsers?.name}</span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  Cấp bậc :
                  <span className="text-sm text-green-600">
                    {dataUsers?.level === 3 ? "Cao nhất" : "Admin"}
                  </span>
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden md:block"
          >
            <div
              className={`transform transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            >
              <Icon icon="ChevronLeft" className="w-5 h-5 text-gray-500" />
            </div>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group ${
                      pathname.startsWith(item.href) ||
                      item.submenu.some((sub) => pathname === sub.href)
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex-shrink-0 w-6 h-6 ${
                          pathname.startsWith(item.href) ||
                          item.submenu.some((sub) => pathname === sub.href)
                            ? "text-blue-600"
                            : "text-gray-500"
                        } group-hover:text-blue-600 transition-colors`}
                      >
                        <Icon icon={item.icon} />
                      </div>
                      {(!isCollapsed || isMobile) && (
                        <span
                          className={`text-md font-medium ${
                            pathname.startsWith(item.href) ||
                            item.submenu.some((sub) => pathname === sub.href)
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          {item.name}
                        </span>
                      )}
                    </div>
                    {(!isCollapsed || isMobile) && (
                      <div
                        className={`transform transition-transform duration-200 ${
                          activeMenu === item.name ? "rotate-180" : ""
                        }`}
                      >
                        <Icon
                          icon="ChevronDown"
                          className="w-5 h-5 text-gray-400"
                        />
                      </div>
                    )}
                  </button>

                  {activeMenu === item.name && (!isCollapsed || isMobile) && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors group ${
                            pathname === subitem.href.split("?")[0]
                              ? "bg-blue-50"
                              : ""
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div
                            className={`w-6 h-6 mr-3 ${
                              pathname === subitem.href.split("?")[0]
                                ? "text-blue-600"
                                : "text-gray-400"
                            } group-hover:text-blue-600 transition-colors`}
                          >
                            <Icon icon={subitem.icon} />
                          </div>
                          <span
                            className={
                              pathname === subitem.href.split("?")[0]
                                ? "text-blue-600"
                                : "text-gray-600"
                            }
                          >
                            {subitem.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group ${
                    pathname === item.href ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 ${
                      pathname === item.href ? "text-blue-600" : "text-gray-500"
                    } group-hover:text-blue-600 transition-colors`}
                  >
                    <Icon icon={item.icon} />
                  </div>
                  {(!isCollapsed || isMobile) && (
                    <span
                      className={`ml-3 font-medium ${
                        pathname === item.href
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg p-3 transition-all duration-200 hover:shadow-lg",
                isCollapsed && !isMobile ? "px-2" : "px-4"
              )}
            >
              <Icon icon="LogOut" className="w-5 h-5" />
              {(!isCollapsed || isMobile) && (
                <span className="font-medium">
                  {isLoading ? (
                    <div className="animate-spin">
                      <Icon icon="LoaderCircle" />
                    </div>
                  ) : (
                    "Đăng Xuất"
                  )}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      <main
        className={cn(
          "flex-1 transition-all duration-300",
          isMobile ? "ml-0" : isCollapsed ? "ml-20" : "ml-72"
        )}
      >
        <div className="mx-auto p-4 md:p-8 pt-20 md:pt-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
