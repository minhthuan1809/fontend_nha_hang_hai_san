"use client";
import React, { useState, useEffect, Suspense, useCallback } from "react";
import CartProduct from "@/app/_shared/components/ui/Cart";
import Pagination from "@/app/_shared/components/ui/Pagination";
import Navigation from "@/app/_shared/components/ui/Navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "@/app/_service/client/layout";
import Icon from "@/app/_shared/utils/Icon";
import Loading from "@/app/_shared/components/Loading";
import { dataFilter } from "@/app/_shared/utils/dataFilter";
import {
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
  Chip,
} from "@nextui-org/react";

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

    // Lọc theo danh mục
    if (categoryFilter) {
      result = result.filter((item) => {
        if (categoryFilter === "all") {
          return item;
        }
        return item.category === categoryFilter;
      });
    }

    // Lọc theo giá và đánh giá
    if (sortBy) {
      switch (sortBy) {
        case "price-asc":
          result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "price-desc":
          result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    // Lọc theo trạng thái
    result = result.filter((item) => !item.status);

    setFilteredItems(result);
  }, [searchTerm, sortBy, categoryFilter, menuItems]);

  const sortOptions = [
    { value: "", label: "Sắp xếp theo" },
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

        <div className="my-8">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Thanh tìm kiếm */}
              <div className="w-full md:w-96">
                <Input
                  type="text"
                  placeholder="Tìm kiếm món ăn..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateURL({ search: e.target.value });
                  }}
                  startContent={
                    <Icon icon="Search" className="text-default-400" />
                  }
                  className="w-full"
                  size="lg"
                />
              </div>

              {/* Bộ lọc */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <Select
                  placeholder="Sắp xếp theo"
                  selectedKeys={sortBy ? [sortBy] : []}
                  className="w-full sm:w-48"
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    updateURL({ sort: e.target.value });
                  }}
                  size="lg"
                >
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  placeholder="Tất cả danh mục"
                  selectedKeys={categoryFilter ? [categoryFilter] : []}
                  className="w-full sm:w-48"
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    updateURL({ category: e.target.value });
                  }}
                  size="lg"
                >
                  {dataFilter.map((category) => (
                    <SelectItem
                      key={category.key}
                      value={category.key}
                      textValue={category.value}
                    >
                      {category.value}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Hiển thị kết quả */}
            <div className="text-sm text-default-500 flex items-center gap-2">
              Hiển thị {filteredItems.length} món ăn
              {categoryFilter && (
                <>
                  trong danh mục
                  <Chip variant="flat">
                    {dataFilter.find((c) => c.key === categoryFilter)?.value}
                  </Chip>
                </>
              )}
              {searchTerm && (
                <>
                  với từ khóa
                  <Chip variant="flat">"{searchTerm}"</Chip>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Lưới sản phẩm */}
        <div className="mb-12">
          <CartProduct filteredItems={filteredItems} />
        </div>

        <Pagination page={page} total={totalPage} />
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
