"use client";
import Navigation from "@/app/_shared/components/ui/Navigation";
import React, { Suspense, useEffect, useState } from "react";

import Link from "next/link";
import Pagination from "@/app/_shared/components/ui/Pagination";
import { removeAccentsAndSpaces } from "@/app/_shared/utils/removeAccentsAndSpaces";

import { getNews } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";
import { useSearchParams } from "next/navigation";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [total, setTotal] = useState(0);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNews(6, page);
      if (response.ok) {
        setNews(response.data);
        setTotal(response.total_pages);
      } else {
      }
    };
    fetchNews();
  }, [page]);

  // loading
  if (news.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl min-h-screen">
      <Navigation />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {news.map((item: any, index: number) => {
          if (item.status !== "1") return null;
          return (
            <Link
              href={`/news/${removeAccentsAndSpaces(item.title)}?number=${
                item.id
              }`}
              key={index}
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full h-52 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="object-cover w-full h-full"
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
                    {new Date(item.created_at).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* // pagination */}
      <Pagination page={page} total={total} />
    </div>
  );
}

function NewsPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <NewsPage />
    </Suspense>
  );
}

export default NewsPageWrapper;
