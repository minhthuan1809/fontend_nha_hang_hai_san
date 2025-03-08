import { getProducts } from "@/app/_service/client/layout";
import CartProduct from "@/app/_shared/components/ui/Cart";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Icon from "@/app/_shared/utils/Icon";
import Link from "next/link";

const SuggestProduct = ({ data }: { data: string }) => {
  const [suggest, setSuggest] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts(1, data);
        if (response.ok) {
          setSuggest(response.data);
        } else {
          console.error("Failed to fetch suggested products");
        }
      } catch (error) {
        console.error("Error fetching suggested products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (data) {
      fetchProducts();
    }
  }, [data]);

  if (loading) {
    return (
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Sản phẩm gợi ý</h2>
        <div className="flex space-x-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-64 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (suggest.length === 0) {
    return null;
  }

  const groupProductsIntoSlides = () => {
    const slides = [];
    for (let i = 0; i < suggest.length; i += 4) {
      const group = suggest.slice(i, i + 4);
      slides.push(
        <SwiperSlide key={i} className="p-2">
          <CartProduct filteredItems={group} />
        </SwiperSlide>
      );
    }
    return slides;
  };

  return (
    <div className="mt-10 w-[95%] mx-auto py-4">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-xl font-bold mb-4 text-amber-600 ">
          Sản phẩm gợi ý
        </h2>
        <Link
          href={`/products`}
          className="text-amber-600 hover:text-amber-700 flex items-center gap-2 cursor-pointer  px-2 "
        >
          Xem tất cả <Icon icon="MoveRight" />
        </Link>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        className="w-full"
        allowTouchMove={true}
        grabCursor={true}
      >
        {groupProductsIntoSlides()}
      </Swiper>
    </div>
  );
};

export default SuggestProduct;
