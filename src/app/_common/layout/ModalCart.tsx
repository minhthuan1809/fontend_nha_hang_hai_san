"use client";

import React, { useState } from "react";
import Icon from "@/app/_shared/utils/Icon";
import {
  CartStore,
  OverlayCartStore,
  RefreshCartStore,
} from "@/app/store/ZustandSStore";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Button,
  Divider,
  Tooltip,
  Checkbox,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { addCard, deleteCard, MinusQuantity } from "@/app/_service/client/card";
import { getCookie } from "cookies-next";
import { enqueueSnackbar } from "notistack";

export default function ModalCart() {
  const dataOverlayCart = OverlayCartStore((state) => state.dataOverlayCart);
  const setOverlayCart = OverlayCartStore((state) => state.setOverlayCart);
  const dataCart = CartStore((state) => state.dataCart);
  const router = useRouter();
  const token = getCookie("token");
  const dataRefreshCart = RefreshCartStore(
    (state: any) => state.dataRefreshCart
  );
  const setRefreshCart = RefreshCartStore((state: any) => state.setRefreshCart);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  console.log(dataCart);

  // Tính tổng tiền cho các sản phẩm được chọn
  const calculateTotal = () => {
    if (!dataCart?.data?.length) return 0;
    return dataCart.data.reduce(
      (total: number, item: any) =>
        selectedItems.includes(item.id)
          ? total + item.price * item.quantity
          : total,
      0
    );
  };

  // Format tiền VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Xử lý chọn tất cả
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(dataCart?.data?.map((item: any) => item.id) || []);
    } else {
      setSelectedItems([]);
    }
  };

  // Xử lý chọn từng sản phẩm
  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  // Xóa sản phẩm trong giỏ hàng
  const handleDeleteCart = (id: number) => {
    deleteCard(token as string, id).then((data) => {
      if (data.ok) {
        enqueueSnackbar(data.message, {
          variant: "success",
        });
        setRefreshCart(!dataRefreshCart);
        setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      } else {
        enqueueSnackbar(data.message, {
          variant: "error",
        });
      }
    });
  };

  // Thêm số lượng sản phẩm
  const handleUpdateQuantity = (item: any) => {
    addCard(token as string, item.product_id).then((data) => {
      if (data.ok) {
        setRefreshCart(!dataRefreshCart);
      } else {
        enqueueSnackbar(data.message, { variant: "error" });
      }
    });
  };

  // trừ số lượng sản phẩm
  const handleMinusQuantity = (item: any) => {
    MinusQuantity(token as string, item.id).then((data: any) => {
      if (data.ok) {
        setRefreshCart(!dataRefreshCart);
      } else {
        enqueueSnackbar(data.message, { variant: "error" });
      }
    });
  };

  const handleDataCart = () => {
    localStorage.setItem("dataCart", JSON.stringify(selectedItems));
    setOverlayCart(false);
    router.push("/cart");
  };

  return (
    <Drawer
      isOpen={dataOverlayCart}
      onOpenChange={() => setOverlayCart(false)}
      placement="left"
      size="md"
      classNames={{
        base: "bg-gradient-to-b from-white to-ar-50",
        header: "bg-transparent",
        footer: "bg-white/80 backdrop-blur-md border-t border-ar-100",
      }}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-3">
              <div className="w-[95%]">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="ShoppingCart"
                      size={24}
                      className="text-amber-400"
                    />
                    <h3 className="text-xl font-semibold">Giỏ hàng của bạn</h3>
                  </div>
                  {dataCart?.data?.length > 0 && (
                    <Checkbox
                      isSelected={selectAll}
                      onValueChange={handleSelectAll}
                    >
                      Chọn tất cả
                    </Checkbox>
                  )}
                </div>
              </div>
              <Divider className="bg-ar-100" />
            </DrawerHeader>
            <div className="border-b border-ar-100 "></div>
            <DrawerBody className="px-4">
              {dataCart?.data?.length ? (
                dataCart.data.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 mb-5 p-3 rounded-lg border border-ar-100 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <Checkbox
                      isSelected={selectedItems.includes(item.id)}
                      onValueChange={(checked) =>
                        handleSelectItem(item.id, checked)
                      }
                    ></Checkbox>
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-800 line-clamp-1">
                        {item.product_name}
                      </h4>
                      <p className="text-ar-600 font-semibold mt-1">
                        {formatCurrency(item.price)}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-gray-500"
                            onPress={() => handleMinusQuantity(item)}
                          >
                            <Icon icon="Minus" size={16} />
                          </Button>
                          <span className="px-3 font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-gray-500"
                            onPress={() => handleUpdateQuantity(item)}
                          >
                            <Icon icon="Plus" size={16} />
                          </Button>
                        </div>

                        <Tooltip content="Xóa sản phẩm" color="danger">
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="light"
                            className="ml-2"
                            onPress={() => handleDeleteCart(item.id)}
                          >
                            <Icon icon="Trash" size={18} />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Icon
                    icon="ShoppingBag"
                    size={50}
                    className="text-gray-300 mb-4"
                  />
                  <h4 className="text-gray-500 text-lg font-medium">
                    Giỏ hàng trống
                  </h4>
                  <p className="text-gray-400 mt-2">
                    Hãy thêm sản phẩm vào giỏ hàng của bạn
                  </p>
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-4"
                    onPress={() => {
                      onClose();
                      setOverlayCart(false);
                      router.push("/products");
                    }}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>
              )}
            </DrawerBody>

            {selectedItems.length > 0 && (
              <>
                <Divider className="bg-amber-400" />

                <DrawerFooter className="flex flex-col gap-4">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Tạm tính:</span>
                      <span className="font-semibold">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span className="font-semibold">Miễn phí</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium">Tổng cộng:</span>
                      <span className="font-bold text-red-500">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end w-full">
                    <Button
                      variant="bordered"
                      color="warning"
                      className="flex-1 sm:flex-none"
                      onPress={() => {
                        onClose();
                        setOverlayCart(false);
                        router.push("/products");
                      }}
                    >
                      Tiếp tục mua sắm
                    </Button>
                    <Button
                      color="warning"
                      className="flex-1 sm:flex-none"
                      onPress={() => {
                        handleDataCart();
                      }}
                    >
                      <Icon icon="CreditCard" size={18} className="mr-1" />
                      Thanh toán
                    </Button>
                  </div>
                </DrawerFooter>
              </>
            )}
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
