"use client";

import React from "react";
import Icon from "../../utils/Icon";
import Link from "next/link";
import { removeAccentsAndSpaces } from "../../utils/removeAccentsAndSpaces";
import { addCard } from "@/app/_service/client/card";
import { getCookie } from "cookies-next";
import { RefreshCartStore } from "@/app/store/ZustandSStore";
import { enqueueSnackbar } from "notistack";

export default function CartProduct({
  filteredItems,
}: {
  filteredItems: any[];
}) {
  const token = getCookie("token");
  const { dataRefreshCart, setRefreshCart } = RefreshCartStore() as {
    dataRefreshCart: boolean;
    setRefreshCart: (value: boolean) => void;
  };
  if (!filteredItems || filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Icon
          icon="ShoppingCart"
          className="w-20 h-20 text-amber-300 mb-4 animate-pulse"
        />
        <p className="text-gray-600 text-xl font-medium">Chưa có sản phẩm</p>
        <p className="text-gray-400 text-sm mt-2">
          Hãy thêm sản phẩm vào giỏ hàng của bạn
        </p>
      </div>
    );
  }

  const handleAddCard = (id: number) => {
    addCard(token as string, id).then((data) => {
      if (data.ok) {
        setRefreshCart(!dataRefreshCart);
        enqueueSnackbar(data.message, { variant: "success" });
      } else {
        enqueueSnackbar(data.message, { variant: "error" });
      }
    });
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 w-full">
        {filteredItems
          .filter((item) => item && !item.status)
          .map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              <div className="relative">
                <div className="h-40 sm:h-52 overflow-hidden">
                  <div className="w-full h-[150px] sm:h-[650px]">
                    <img
                      src={item?.image || item?.images}
                      alt={item?.name || "Sản phẩm"}
                      className="w-full h-full sm:h-[250px] object-cover transform transition-transform duration-500"
                    />
                  </div>
                  {item?.name && (
                    <Link
                      href={`/products/${removeAccentsAndSpaces(item.name)}/${
                        item.id
                      }`}
                      className="hidden group-hover:flex absolute top-0 left-0 w-full h-full bg-black/30 gap-2 items-center justify-center"
                    >
                      <span className="text-white border border-white px-2 py-1 rounded-md">
                        Xem chi tiết
                      </span>
                    </Link>
                  )}
                </div>

                {/* Nhãn món hot */}
                {item?.hot && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Icon icon="Star" size={12} className="fill-white" />
                      HOT
                    </span>
                  </div>
                )}

                {/* Lớp phủ khi hết hàng */}
                {item?.quantity === "0" && (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transform -rotate-6 shadow-xl border border-red-400">
                      Tạm hết hàng
                    </div>
                  </div>
                )}

                {/* Nhãn giá */}
                <div className="absolute -bottom-3 right-3">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                    {item?.price}
                  </div>
                </div>
              </div>

              <div className="p-3 pt-4">
                {item.name ? (
                  <Link
                    href={`/products/${removeAccentsAndSpaces(item.name)}/${
                      item.id
                    }`}
                    className="text-md font-bold text-gray-800 mb-1 group-hover:text-amber-600 transition-colors line-clamp-2 hover:underline  "
                  >
                    {item.name}
                  </Link>
                ) : (
                  <div className="text-sm font-bold text-gray-800 mb-1 line-clamp-2">
                    {item.name}
                  </div>
                )}

                <div className="flex items-center justify-between ">
                  {/* Đánh giá sao */}
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          icon="Star"
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(Number(item.star))
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-500 ml-1">
                      ({item.star ? Number(item.star) : 0})
                    </span>
                  </div>

                  {/* Nút thêm vào giỏ hàng */}
                  <button
                    disabled={item.quantity === "0"}
                    onClick={() => handleAddCard(item.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      item.quantity === "0"
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-amber-100 hover:bg-amber-200"
                    }`}
                  >
                    <Icon
                      icon="ShoppingCart"
                      className={`w-4 h-4 ${
                        item.quantity === "0"
                          ? "text-gray-400"
                          : "text-amber-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Số lượng đã bán */}
                <div className="mt-2 flex items-center">
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-1">
                      <Icon
                        icon="ShoppingBag"
                        size={14}
                        className="text-gray-400 mr-1"
                      />
                      <span className="text-xs font-medium text-gray-500">
                        Đã bán: {item.quantity_sold}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <Icon
                        icon="Package"
                        size={14}
                        className="text-gray-400 "
                      />
                      Còn: {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
