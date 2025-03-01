"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "../_shared/utils/Icon";
import { cn } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    {
      name: "Trang Chủ",
      href: "/",
      icon: "Home",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "LayoutDashboard",
      submenu: [
        {
          name: "Thống Kê",
          href: "/dashboard/stats",
          icon: "LineChart",
        },
        {
          name: "Báo Cáo",
          href: "/dashboard/reports",
          icon: "FileText",
        },
      ],
    },
    {
      name: "Sản Phẩm",
      href: "/product",
      icon: "ShoppingBag",
    },
    {
      name: "Danh Mục",
      href: "/categories",
      icon: "FolderTree",
    },
    {
      name: "Khách Hàng",
      href: "/customers",
      icon: "Users",
    },
    {
      name: "Đơn Hàng",
      href: "/orders",
      icon: "Package",
    },
    {
      name: "Bài Viết",
      href: "/articles",
      icon: "FileText",
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
          name: "Header",
          href: "/layout/header?section=hero",
          icon: "Layout",
        },
        {
          name: "Footer",
          href: "/layout/footer",
          icon: "Footprints",
        },
      ],
    },
    {
      name: "Liên Hệ",
      href: "/contact",
      icon: "PhoneCall",
    },
  ];

  const toggleSubmenu = (name: string) => {
    setActiveMenu(activeMenu === name ? null : name);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-white shadow-lg hover:bg-gray-100 transition-colors"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <Icon icon={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
      </button>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
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
        {/* Logo area */}
        <div className="h-16 border-b flex items-center justify-between px-6">
          {(!isCollapsed || isMobile) && (
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin
            </h2>
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

        {/* Navigation */}
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

                  {/* Submenu */}
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
                            {}
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

        {/* Logout button */}
        <div>
          <div className="p-4">
            <button
              className={cn(
                "w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg p-3 transition-all duration-200 hover:shadow-lg",
                isCollapsed && !isMobile ? "px-2" : "px-4"
              )}
            >
              <Icon icon="Settings" className="w-5 h-5" />
              {(!isCollapsed || isMobile) && (
                <span className="font-medium">Cài Đặt</span>
              )}
            </button>
          </div>
          <div className="p-4 border-t">
            <button
              className={cn(
                "w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg p-3 transition-all duration-200 hover:shadow-lg",
                isCollapsed && !isMobile ? "px-2" : "px-4"
              )}
            >
              <Icon icon="LogOut" className="w-5 h-5" />
              {(!isCollapsed || isMobile) && (
                <span className="font-medium">Đăng Xuất</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
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
