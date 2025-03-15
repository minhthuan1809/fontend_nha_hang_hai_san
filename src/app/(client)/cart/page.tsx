"use client";
import { getCard } from "@/app/_service/client/card";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PayCart from "./PayCart";
import Loading from "@/app/_shared/components/Loading";

export default function ShoppingCartPage() {
  const token = getCookie("token");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart") || "[]");

    getCard(token as string).then((response) => {
      if (response.ok) {
        // Filter products that are in the cart
        const filteredData = response.data.filter((item: any) =>
          dataCart.includes(item.id)
        );
        setData(filteredData);

        // Calculate total price
        const total = filteredData.reduce(
          (sum: any, item: any) => sum + item.price * item.quantity,
          0
        );
        setTotalPrice(total);
      }
      setLoading(false);
    });
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {data.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg mb-4">Giỏ hàng của bạn đang trống</p>
          <Link
            href="/products"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Chi tiết sản phẩm</h2>
              </div>
              <div className="divide-y">
                {data.map((item: any) => (
                  <div key={item.id} className="flex p-4 items-center">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="object-cover rounded w-full h-full"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold">{item.product_name}</h3>
                      <p className="text-red-500 font-medium">
                        Giá : {item.price.toLocaleString("vi-VN")}đ
                      </p>
                      <p>Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <PayCart
            data={data}
            totalPrice={totalPrice}
            onOpenChange={() => setIsOpen(!isOpen)}
          />
        </div>
      )}
    </div>
  );
}
