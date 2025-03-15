import { addAddress, updateAddress } from "@/app/_service/admin/account";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  Input,
  Button,
  ModalFooter,
} from "@nextui-org/react";
import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { getCookie } from "cookies-next";

export default function ModalEditAddAddress({
  open,
  setOpen,
  data,
  setData,
  reload,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
  setData: (data: any) => void;
  reload: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
  });
  const token = getCookie("token");

  // validate form
  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: false,
      phone: false,
      address: false,
    };

    if (!data.name) {
      newErrors.name = true;
      isValid = false;
    }

    if (!data.phone) {
      newErrors.phone = true;
      isValid = false;
    } else if (data.phone.length < 10 || data.phone.length > 11) {
      newErrors.phone = true;
      isValid = false;
    }

    if (!data.address) {
      newErrors.address = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
        variant: "error",
      });
      return false;
    }

    return true;
  };

  // close modal
  const handleCloseModal = () => {
    setOpen(false);
    setData({
      name: "",
      phone: "",
      address: "",
    });
    setErrors({
      name: false,
      phone: false,
      address: false,
    });
  };

  // thêm địa chỉ
  const handleAddAddress = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await addAddress(data, token);
      if (res.ok) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        handleCloseModal();
        reload();
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // cập nhật địa chỉ
  const handleUpdateAddress = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await updateAddress(data.id, data, token);
      if (res.ok) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        handleCloseModal();
        reload();
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={open} onClose={handleCloseModal}>
      <ModalContent>
        <ModalHeader>
          <h1 className="text-2xl font-bold">
            {data.id ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
          </h1>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Input
            type="text"
            label="Tên gợi nhớ"
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
              setErrors({ ...errors, name: false });
            }}
            isRequired
            isInvalid={errors.name}
            errorMessage={errors.name && "Vui lòng nhập tên gợi nhớ"}
          />
          <Input
            type="number"
            label="Số điện thoại"
            maxLength={11}
            value={data.phone}
            onChange={(e) => {
              setData({ ...data, phone: e.target.value });
              setErrors({ ...errors, phone: false });
            }}
            isRequired
            isInvalid={errors.phone}
            errorMessage={
              errors.phone && "Vui lòng nhập số điện thoại (10-11 số)"
            }
          />
          <Input
            type="text"
            label="Địa chỉ"
            value={data.address}
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
              setErrors({ ...errors, address: false });
            }}
            isRequired
            isInvalid={errors.address}
            errorMessage={errors.address && "Vui lòng nhập địa chỉ"}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            Hủy
          </Button>
          <Button
            isLoading={loading}
            color="warning"
            disabled={loading}
            onPress={data.id ? handleUpdateAddress : handleAddAddress}
          >
            {data.id ? "Cập nhật" : "Thêm"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
