"use client";

import React, { useEffect, useState } from "react";
import Icon from "../../utils/Icon";
import {
  CartStore,
  OverlayCartStore,
  RefreshCartStore,
} from "@/app/store/ZustandSStore";
import { getCard } from "@/app/_service/client/card";
import { getCookie } from "cookies-next";

export default function ShoppingCart() {
  const { setOverlayCart } = OverlayCartStore();
  const { dataCart, setDataCart } = CartStore();
  const { dataRefreshCart } = RefreshCartStore() as { dataRefreshCart: any };
  const token = getCookie("token");

  useEffect(() => {
    getCard(token as string).then((data) => {
      setDataCart(data);
    });
  }, [token, dataRefreshCart]);

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setOverlayCart(true)}
    >
      <Icon icon="ShoppingCart" size={30} />
      {dataCart?.data !== undefined && dataCart?.data?.length !== 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {dataCart?.data?.length}
        </span>
      )}
    </div>
  );
}
