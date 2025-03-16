"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Chip,
} from "@nextui-org/react";
import ModalEditAddress from "@/app/(admin)/orders/confirm/ModalEditAddress";

export default function ModalViewOder({
  isOpen,
  onOpenChange,
  data,
  submitEditAddress,
  _status,
}: any) {
  const [isOpenEditAddress, setIsOpenEditAddress] = useState(false);
  if (!data) return null;

  const formatCurrency = (value: string) => {
    return parseInt(value).toLocaleString("vi-VN") + "đ";
  };

  const statusColorMap: {
    [key: string]: {
      bg: string;
      text: string;
      label: string;
    };
  } = {
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      label: "Chờ xác nhận",
    },
    processing: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      label: "Đang xử lý",
    },
    completed: {
      bg: "bg-green-100",
      text: "text-green-600",
      label: "Hoàn tất",
    },
    canceled: {
      bg: "bg-red-100",
      text: "text-red-600",
      label: "Đã hủy",
    },
  };

  const status = data.status || "pending";
  const statusColor = statusColorMap[status] || statusColorMap.pending;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        <ModalHeader>
          <div className="flex justify-between items-center w-[97%]">
            <h2 className="text-xl font-bold">Chi tiết đơn hàng #{data.id}</h2>
            <Chip
              size="lg"
              className={`${statusColor.bg} ${statusColor.text} font-medium`}
            >
              {statusColor.label}
            </Chip>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-6 pb-6">
            <div className="flex items-center gap-4">
              <img
                src={data.user.avatar}
                alt={data.user.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
              />
              <div>
                <h3 className="font-semibold text-lg">{data.user.fullName}</h3>
                <p className="text-gray-600">{data.user.email}</p>
                <p className="text-gray-600">{data.phone}</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium mb-3">Thông tin giao hàng</h4>
                {_status && (
                  <span
                    className="text-amber-600 font-medium cursor-pointer hover:text-amber-500 transition-colors hover:underline"
                    onClick={() => setIsOpenEditAddress(true)}
                  >
                    Chỉnh sửa
                  </span>
                )}
              </div>
              <div>
                <p className="text-gray-600">Địa chỉ: {data.address}</p>
                <p className="text-gray-600">
                  Ghi chú: {data.note || "Không có"}
                </p>
                <p className="text-gray-600">
                  Phương thức:{" "}
                  {data.payment_method === "cod"
                    ? "Thanh toán khi nhận hàng"
                    : "Chuyển khoản"}
                </p>
              </div>
            </div>

            <div className="border rounded-lg p-4 h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <h4 className="font-medium mb-3">Sản phẩm</h4>
              {data.products.map((product: any) => (
                <div key={product.id} className="flex items-center gap-4 mb-4">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium">{product.name}</h5>
                    <p className="text-gray-600">
                      {product.price.toLocaleString("vi-VN")}đ x{" "}
                      {product.quantity}
                    </p>
                    <p className="font-medium text-amber-600">
                      ={" "}
                      {(product.price * product.quantity).toLocaleString(
                        "vi-VN"
                      )}
                      đ
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Thanh toán</h4>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tạm tính:</span>
                <span>{formatCurrency(data.final_total)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span>{formatCurrency(data.free_of_charge)}</span>
              </div>
              {data.discount_code && (
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Giảm giá:</span>
                  <span className="text-green-600">
                    {data.discount_code} (-{data.discount_percent}%)
                  </span>
                </div>
              )}
              <div className="flex justify-between font-medium text-lg mt-2 pt-2 border-t">
                <span>Tổng cộng:</span>
                <span className="text-amber-600">
                  {formatCurrency(data.final_total)}
                </span>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>

      {/* Modal edit address */}
      {_status && (
        <ModalEditAddress
          isOpen={isOpenEditAddress}
          onOpenChange={setIsOpenEditAddress}
          data={data}
          submit={submitEditAddress}
        />
      )}
    </Modal>
  );
}
