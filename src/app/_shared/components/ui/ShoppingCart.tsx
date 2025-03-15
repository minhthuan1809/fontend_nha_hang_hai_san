import React from "react";
import Icon from "../../utils/Icon";

export default function ShoppingCart() {
  return (
    <div className="relative">
      <Icon icon="ShoppingCart" size={30} />
      <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
        2
      </span>
    </div>
  );
}
