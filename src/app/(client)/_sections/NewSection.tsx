"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { getNewsHeader } from "@/app/_service/client/layout";
import { removeAccentsAndSpaces } from "@/app/_shared/utils/removeAccentsAndSpaces";
import { useRouter } from "next/navigation";
export default function NewSection() {
  const [newsData, setNewsData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchNewsHeader = async () => {
      const response = await getNewsHeader();
      if (response.ok && response.data) {
        setNewsData(response.data);
      }
    };
    fetchNewsHeader();
  }, []);

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-4xl font-bold text-amber-600 mb-4">
            Tin Tức & Ưu Đãi Đặc Biệt
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="w-28 h-1 bg-amber-600 rounded-full"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newsData.map((item: any, index: number) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-4">
                <h2 className="text-base font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.created_at).toLocaleDateString("vi-VN")}
                  </span>
                  <button
                    className="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-medium transition-colors group text-xs"
                    onClick={() => {
                      router.push(
                        `/news/${removeAccentsAndSpaces(item.title)}?number=${
                          item.id
                        }`
                      );
                    }}
                  >
                    Chi tiết
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
