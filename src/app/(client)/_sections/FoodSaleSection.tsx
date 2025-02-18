import React, { useState } from "react";
import { ChefHat, Search, Star } from "lucide-react";
import Link from "next/link";

const PopularFoodSection = () => {
  const [menuItems, setMenuItems] = useState([
    {
      name: "Cá mặt quỷ chiên giòn",
      price: "180.000 đ",
      image: "https://picsum.photos/200",
      hot: true,
      rating: 4.8,
    },
    {
      name: "Ghẹ hấp xả",
      price: "220.000 đ",
      image: "https://picsum.photos/200",
      hot: true,
      rating: 4.9,
    },
    {
      name: "Tôm chiên bột",
      price: "280.000 đ",
      image: "https://picsum.photos/200",
      hot: true,
      rating: 4.7,
    },
    {
      name: "Cá chiên phượng hoàng",
      price: "560.000 đ",
      image: "https://picsum.photos/200",
      hot: false,
      rating: 4.5,
    },
    {
      name: "Mực chiên giòn",
      price: "80.000 đ",
      image: "https://picsum.photos/200",
      hot: true,
      rating: 4.6,
    },
    {
      name: "Tôm tít chấy tỏi",
      price: "120.000 đ",
      image: "https://picsum.photos/200",
      hot: false,
      rating: 4.4,
    },
    {
      name: "Tôm tít chấy tỏi",
      price: "120.000 đ",
      image: "https://picsum.photos/200",
      hot: false,
      rating: 4.4,
    },
    {
      name: "Tôm tít chấy tỏi",
      price: "120.000 đ",
      image: "https://picsum.photos/200",
      hot: false,
      rating: 4.4,
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems =
    activeFilter === "all"
      ? menuItems
      : activeFilter === "hot"
      ? menuItems.filter((item) => item.hot)
      : menuItems.filter((item) => !item.hot);

  return (
    <div className="w-full bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto px-2 sm:px-4">
        {/* Header with decorative elements */}
        <div className="text-center mb-8 sm:mb-12 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-6">
            <ChefHat size={36} className="text-[#d97706]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 pt-8">
            Tinh Hoa Ẩm Thực Biển
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Thưởng thức những món hải sản tươi ngon được chế biến bởi đầu bếp
            với hơn 20 năm kinh nghiệm
          </p>
          <div className="h-1 w-16 sm:w-20 bg-[#d97706] mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-6 sm:mb-10">
          <div className="inline-flex bg-white shadow-md rounded-lg p-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all ${
                activeFilter === "all"
                  ? "bg-[#d97706] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveFilter("hot")}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all ${
                activeFilter === "hot"
                  ? "bg-[#d97706] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Món hot
            </button>
            <button
              onClick={() => setActiveFilter("other")}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all ${
                activeFilter === "other"
                  ? "bg-[#d97706] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Món khác
            </button>
          </div>
        </div>

        {/* Menu grid with improved cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filteredItems.map((item, index) => {
            if (index > 7) return;
            return (
              <div key={index} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative">
                    {/* Image container with aspect ratio */}
                    <div className="h-[12rem] sm:h-[14rem] md:h-[16rem] relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Hot badge */}
                    {item.hot && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs font-medium px-2 sm:px-3 py-1 rounded-full shadow-md flex items-center">
                          <Star size={12} className="mr-1 fill-white" />
                          HOT
                        </span>
                      </div>
                    )}

                    {/* Price tag */}
                    <div className="absolute bottom-3 right-3 bg-white/95 text-[#d97706] font-bold text-sm sm:text-base px-2 sm:px-3 py-1 rounded-lg shadow-md">
                      {item.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 md:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 group-hover:text-[#d97706] transition-colors line-clamp-2">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < Math.floor(item.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs sm:text-sm text-gray-500">
                        ({item.rating})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-14">
          <Link
            href="/products"
            className="inline-flex items-center bg-[#d97706] text-white font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md hover:bg-[#d97706d7] transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>Xem thêm thực đơn </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularFoodSection;
