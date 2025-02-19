import Navigation from "@/app/_shared/components/ui/Navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/app/_shared/components/ui/Pagination";
import { removeAccentsAndSpaces } from "@/app/_shared/utils/removeAccentsAndSpaces";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Tin tức tại nhà hàng hải sản Minh Thuận Tin tức mới nhất, tin tức hải sản, tin tức hải sản tại Hà Nội",
};

export default function NewsPage() {
  const news = [
    {
      title: "Món ăn truyền thống ngày Tết",
      image: "https://picsum.photos/200/300",
      description:
        "Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyền",
      date: "25/01/2024",
    },
    {
      title: "Món ăn truyền thống ngày Tết",
      image: "https://picsum.photos/200/300",
      description:
        "Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyền",
      date: "25/01/2024",
    },
    {
      title: "Món ăn truyền thống ngày Tết",
      image: "https://picsum.photos/200/300",
      description:
        "Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyền",
      date: "25/01/2024",
    },
    {
      title: "Món ăn truyền thống ngày Tết",
      image: "https://picsum.photos/200/300",
      description:
        "Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyền",
      date: "25/01/2024",
    },
    {
      title: "Món ăn truyền thống ngày Tết",
      image: "https://picsum.photos/200/300",
      description:
        "Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyền",
      date: "25/01/2024",
    },
    {
      title: "Món ăn truyền thống ngày Tết",
      image: "https://picsum.photos/200/300",
      description:
        "Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyền",
      date: "25/01/2024",
    },
    {
      title: "Món ăn truyền thống ngày Tết",
      image: "https://picsum.photos/200/300",
      description:
        "Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyền",
      date: "25/01/2024",
    },
    {
      title: "Món ăn truyền thống ngày Tết",
      image: "https://picsum.photos/200/300",
      description:
        "Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyền",
      date: "25/01/2024",
    },
    {
      title: "Món ăn truyền thống ngày Tết",
      image: "https://picsum.photos/200/300",
      description:
        "Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyền Khám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyềnKhám phá những món ăn không thể thiếu trong dịp Tết cổ truyền",
      date: "25/01/2024",
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl min-h-screen">
      <Navigation />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {news.map((item, index) => (
          <Link
            href={`/news/${removeAccentsAndSpaces(item.title)}`}
            key={index}
          >
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-amber-500 transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-5 transition-all duration-300">
                  {item.description}
                </p>
                <span className="text-sm text-gray-500 transition-all duration-300">
                  {item.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* // pagination */}
      <Pagination />
    </div>
  );
}
