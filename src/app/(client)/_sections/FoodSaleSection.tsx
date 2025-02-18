import React, { useState } from "react";
import { ChefHat, Star } from "lucide-react";
import Link from "next/link";
import Icon from "@/app/_utils/Icon";

const PopularFoodSection = () => {
  const [menuItems, setMenuItems] = useState([
    {
      name: "Cá mặt quỷ chiên giòn",
      price: "180.000 đ",
      image: "https://picsum.photos/200",
      hot: true,
      rating: 4.8,
      category: "fish"
    },
    {
      name: "Ghẹ hấp xả", 
      price: "220.000 đ",
      image: "https://picsum.photos/200",
      hot: true,
      rating: 4.9,
      category: "crab"
    },
    {
      name: "Tôm chiên bột",
      price: "280.000 đ", 
      image: "https://picsum.photos/200",
      hot: true,
      rating: 4.7,
      category: "shrimp"
    },
    {
      name: "Cá chiên phượng hoàng",
      price: "560.000 đ",
      image: "https://picsum.photos/200", 
      hot: false,
      rating: 4.5,
      category: "fish"
    },
    {
      name: "Mực chiên giòn",
      price: "80.000 đ",
      image: "https://picsum.photos/200",
      hot: true,
      rating: 4.6,
      category: "squid"
    },
    {
      name: "Tôm tít chấy tỏi",
      price: "120.000 đ",
      image: "https://picsum.photos/200",
      hot: false,
      rating: 4.4,
      category: "shrimp"
    },
    {
      name: "Cua rang me",
      price: "180.000 đ",
      image: "https://picsum.photos/200",
      hot: false,
      rating: 4.4,
      category: "crab"
    },
    {
      name: "Mực xào sa tế",
      price: "150.000 đ",
      image: "https://picsum.photos/200",
      hot: false,
      rating: 4.4,
      category: "squid"
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = 
    activeFilter === "all" 
      ? menuItems
      : activeFilter === "hot"
      ? menuItems.filter(item => item.hot)
      : menuItems.filter(item => item.category === activeFilter);

  return (
    <div id="food-sale" className="w-full bg-gray-50 py-8 sm:py-12 md:py-16">
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
          <div className="inline-flex flex-wrap gap-2 bg-white shadow-md rounded-lg p-1">
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
              onClick={() => setActiveFilter("fish")}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all ${
                activeFilter === "fish"
                  ? "bg-[#d97706] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cá
            </button>
            <button
              onClick={() => setActiveFilter("shrimp")}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all ${
                activeFilter === "shrimp"
                  ? "bg-[#d97706] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Tôm
            </button>
            <button
              onClick={() => setActiveFilter("crab")}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all ${
                activeFilter === "crab"
                  ? "bg-[#d97706] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cua/Ghẹ
            </button>
        
          </div>
        </div>

        {/* Menu grid with improved cards */}
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <div className="relative">
                {/* Image container */}
                <div className="h-36 sm:h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Hot badge */}
                {item.hot && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Star size={10} className="fill-white" />
                      HOT
                    </span>
                  </div>
                )}

                {/* Price tag */}
                <div className="absolute -bottom-3 right-3">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {item.price}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-5">
                <Link href={`/products/${item.name}`} className="text-base font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {item.name}
                </Link>

                <div className="flex items-center justify-between mt-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`${
                            i < Math.floor(item.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      ({item.rating})
                    </span>
                  </div>

                  {/* Cart button */}
                  <button className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center transition-colors">
                    <Icon icon="ShoppingCart" className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
