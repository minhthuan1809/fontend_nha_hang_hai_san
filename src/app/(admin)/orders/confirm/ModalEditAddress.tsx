"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Textarea,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function ModalEditAddress({
  isOpen,
  onOpenChange,
  data,
  submit,
}: any) {
  const [phone, setPhone] = useState(data?.phone || "");
  const [address, setAddress] = useState(data?.address || "");

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-2xl font-bold">Chỉnh sửa địa chỉ</h2>
        </ModalHeader>
        <ModalBody>
          <Input
            type="number"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={phone}
            className="mt-4"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Textarea
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            className="mt-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onOpenChange}>
            Hủy
          </Button>
          <Button
            color="primary"
            variant="flat"
            onPress={() => submit(data.id, address, phone)}
          >
            Lưu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
