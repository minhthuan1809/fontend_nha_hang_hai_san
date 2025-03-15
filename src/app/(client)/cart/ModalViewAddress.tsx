import Icon from "@/app/_shared/utils/Icon";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import React from "react";

export default function ModalViewAddress({
  isOpen,
  onOpenChange,
  data,
  setAddress,
  address,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  data: any;
  setAddress: any;
  address: any;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="md"
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-gray-800">Danh sách địa chỉ</h2>
          <p className="text-sm text-gray-500">
            Vui lòng chọn địa chỉ giao hàng
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4 py-2">
            {data.map((item: any, index: number) => (
              <div
                key={index}
                className={`border rounded-lg p-4 hover:bg-amber-50 transition-colors cursor-pointer relative ${
                  index === address ? "border-amber-500" : "border-gray-200"
                }`}
                onClick={() => {
                  setAddress(index);
                  onOpenChange();
                }}
              >
                {index === address && (
                  <div className="absolute top-2 right-2 text-amber-500">
                    <Icon icon="Check" />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Tên người nhận:</span>
                    <span className="font-semibold text-gray-900">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">SĐT:</span>
                    <span className="font-semibold text-gray-900">
                      {item.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Địa chỉ:</span>
                    <span className="font-semibold text-gray-900">
                      {item.address}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
