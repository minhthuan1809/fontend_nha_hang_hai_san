import React from "react";
import { ArrowRight, Clock, Star } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Món Mới: Hải Sản Tươi Sống",
    description:
      "Thưởng thức hương vị biển cả với các loại hải sản tươi ngon nhất",
    category: "Món mới",
    image: "https://picsum.photos/400/300",
  },
  {
    id: 2,
    title: "Khuyến Mãi Đặc Biệt",
    description: "Giảm giá 25% cho nhóm trên 6 người vào các ngày trong tuần",
    category: "Ưu đãi",
    image: "https://picsum.photos/400/301",
  },
  {
    id: 3,
    title: "Set Menu Hải Sản Cao Cấp",
    description:
      "Combo dành cho 4-6 người với các món hải sản tươi sống đặc sắc",
    category: "Set Menu",
    image: "https://picsum.photos/400/302",
  },
  {
    id: 4,
    title: "Món Đặc Biệt Cuối Tuần",
    description: "Các món hải sản đặc biệt chỉ phục vụ vào cuối tuần",
    category: "Đặc biệt",
    image: "https://picsum.photos/400/303",
  },
];

export default function NewSection() {
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 md:h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-2 md:top-4 left-2 md:left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full font-medium shadow-md">
                  {item.category}
                </span>
              </div>

              <div className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex justify-between items-center pt-3 md:pt-4 border-t border-gray-100">
                  <span className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    Mới cập nhật
                  </span>
                  <button className="flex items-center gap-1 text-amber-500 hover:text-amber-600 font-medium transition-colors group text-xs md:text-sm">
                    Chi tiết
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform" />
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
