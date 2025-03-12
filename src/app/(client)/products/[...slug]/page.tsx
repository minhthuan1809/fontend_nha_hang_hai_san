"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProductsDetail } from "@/app/_service/client/layout";
import NotFound from "@/app/not-found";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Loading from "@/app/_shared/components/Loading";
import DescriptionDetailProduct from "./DescriptionDetailProduct";
import SuggestProduct from "./SuggestProduct";

interface Image {
  id: number;
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  quantity_sold: number;
  category: string;
  hot: number;
  star: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  images: Image[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = params.slug?.[1];
        if (!slug) {
          setLoading(false);
          return;
        }

        const response = await getProductsDetail(slug);
        if (response.ok && response.success) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (!params.slug?.[1] || params.slug?.length > 2) {
    return <NotFound />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <NotFound />;
  }

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => Math.min(product.quantity, prev + 1));
  };

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng`);
  };

  const formatCategory = (category: string): string => {
    const translations: Record<string, string> = {
      fish: "Cá",
      shrimp: "Tôm",
      crab: "Cua/Ghẹ",
      squid: "Mực",
    };

    for (const [english, vietnamese] of Object.entries(translations)) {
      category = category.replace(new RegExp(english, "gi"), vietnamese);
    }

    return category;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-6">
        <div>
          {product.hot === 1 && (
            <div className="bg-yellow-400 text-blue-800 font-bold py-2 px-6 rounded-lg inline-block shadow-md">
              Sống
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Phần Gallery Ảnh */}
          <div className="md:w-1/2 p-6">
            {product.images && product.images.length > 0 ? (
              <div className="gallery-container">
                <div className="h-[400px] flex items-center justify-center w-full rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={thumbsSwiper || product.images[0].image_url}
                    alt={`${product.name} - ảnh chính`}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>

                {product.images.length > 1 && (
                  <Swiper
                    modules={[Navigation, Thumbs]}
                    slidesPerView={4}
                    spaceBetween={12}
                    watchSlidesProgress
                    className="thumbs-swiper mt-6"
                  >
                    {product.images.map((image) => (
                      <SwiperSlide key={image.id} className="cursor-pointer">
                        <div className="h-24 border-2 border-gray-200 rounded-lg overflow-hidden hover:border-amber-500 transition-colors">
                          <img
                            src={image.image_url}
                            alt={`${product.name} thumbnail ${image.id}`}
                            className="h-full w-full object-cover"
                            onClick={() => setThumbsSwiper(image.image_url)}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            ) : (
              <div className="flex h-[400px] items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
                <span className="text-gray-500 font-medium">
                  Không có hình ảnh
                </span>
              </div>
            )}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="md:w-1/2 p-8 bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center mb-6">
              <div className="flex mr-3">{renderStars(product.star)}</div>
              <span className="text-gray-600 font-medium">
                ({product.star}/5)
              </span>
            </div>

            <div className="text-3xl font-bold text-red-600 mb-6">
              {product.price}
            </div>

            <div className="space-y-6">
              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-32">
                  Tình trạng:
                </span>
                {product.quantity > 0 ? (
                  <span className="text-green-600 font-semibold">
                    Còn hàng ({product.quantity})
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">Hết hàng</span>
                )}
              </div>

              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-32">Đã bán:</span>
                <span className="font-semibold">{product.quantity_sold}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-32">
                  Danh mục:
                </span>
                <span className="capitalize text-blue-600 font-semibold">
                  {formatCategory(product.category)}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-700 font-medium w-32">
                  Số lượng:
                </span>
                <div className="flex items-center">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="w-10 h-10 rounded-l-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center border border-gray-300"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-16 h-10 flex items-center justify-center border-y border-gray-300 bg-white font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="w-10 h-10 rounded-r-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center border border-gray-300"
                    disabled={quantity >= product.quantity}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={product.quantity <= 0}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>

        <DescriptionDetailProduct data={product.description} />
        <SuggestProduct data={product.category} />
      </div>
    </div>
  );
}
