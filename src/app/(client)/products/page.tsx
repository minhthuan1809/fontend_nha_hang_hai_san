"use client";
import React, { useState, useEffect, Suspense, useCallback } from "react";
import CartProduct from "@/app/_shared/components/ui/Cart";
import Pagination from "@/app/_shared/components/ui/Pagination";
import Navigation from "@/app/_shared/components/ui/Navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "@/app/_service/client/layout";
import Icon from "@/app/_shared/utils/Icon";
import Loading from "@/app/_shared/components/Loading";

const MenuPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const page = parseInt(searchParams.get("page") || "1");

  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || ""
  );

  const [filteredItems, setFilteredItems] = useState(menuItems);
  const updateURL = (params: {
    search?: string;
    sort?: string;
    category?: string;
  }) => {
    const url = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.set(key, value);
      } else {
        url.delete(key);
      }
    });

    router.push(`?${url.toString()}`);
  };

  useEffect(() => {
    let result = [...menuItems];

    if (categoryFilter) {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (sortBy) {
      switch (sortBy) {
        case "price-asc":
          result.sort(
            (a, b) =>
              parseInt(a.price.replace(/\D/g, "")) -
              parseInt(b.price.replace(/\D/g, ""))
          );
          break;
        case "price-desc":
          result.sort(
            (a, b) =>
              parseInt(b.price.replace(/\D/g, "")) -
              parseInt(a.price.replace(/\D/g, ""))
          );
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    setFilteredItems(result);
  }, [searchTerm, sortBy, categoryFilter, menuItems]);

  const categories = [
    { value: "fish", label: "Cá" },
    { value: "shrimp", label: "Tôm" },
    { value: "crab", label: "Cua/Ghẹ" },
    { value: "squid", label: "Mực" },
    { value: "drink", label: "Đồ uống" },
  ];

  const sortOptions = [
    { value: "price-asc", label: "Giá tăng dần" },
    { value: "price-desc", label: "Giá giảm dần" },
    { value: "rating", label: "Đánh giá cao" },
  ];

  const fetchData = useCallback(async () => {
    const response = await getProducts(page, searchTerm);
    setMenuItems(response.data);
    setTotalPage(response.total_pages);
  }, [page, searchTerm]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Navigation />

        <div className="my-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            {/* Search Bar */}
            <div className="w-full md:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm món ăn..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateURL({ search: e.target.value });
                  }}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Icon icon="Search" className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <select
                className="w-full sm:w-48 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 shadow-sm bg-white"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  updateURL({ sort: e.target.value });
                }}
              >
                <option value="">Sắp xếp theo</option>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                className="w-full sm:w-48 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 shadow-sm bg-white"
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  updateURL({ category: e.target.value });
                }}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Status */}
          <div className="text-sm text-gray-500">
            Hiển thị {filteredItems.filter((item) => !item.status).length} món
            ăn
            {categoryFilter && ` trong danh mục `}
            <strong className="text-amber-500  p-1">
              {categoryFilter &&
                categories.find((c) => c.value === categoryFilter)?.label}
            </strong>
            {searchTerm && ` với từ khóa "${searchTerm}"`}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          <CartProduct filteredItems={filteredItems} />
        </div>

        <Pagination page={1} total={totalPage} />
      </div>
    </div>
  );
};

const MenuPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MenuPageContent />
    </Suspense>
  );
};

export default MenuPage;
