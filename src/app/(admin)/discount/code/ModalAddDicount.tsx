import {
  Button,
  Checkbox,
  DateRangePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { createDiscount, updateDiscount } from "@/app/_service/admin/discount";
import { enqueueSnackbar } from "notistack";
import { parseDate } from "@internationalized/date";

interface ModalAddDiscountProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEdit?: {
    id: number;
    code: string;
    name: string;
    discount_percent: string;
    start_time: string;
    end_time: string;
    quantity: string;
    status: boolean;
  };
  setIsEdit?: (isEdit: any) => void;
  setRefresh?: (refresh: boolean) => void;
}

export default function ModalAddDicount({
  isOpen,
  setIsOpen,
  isEdit,
  setIsEdit,
  setRefresh,
}: ModalAddDiscountProps) {
  const [form, setForm] = useState({
    name: "",
    discount_percent: "",
    start_time: "",
    end_time: "",
    quantity: "",
    status: false,
  });
  const [loading, setLoading] = useState(false);
  const token = getCookie("token");

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: isEdit.name,
        discount_percent: isEdit.discount_percent,
        start_time: isEdit.start_time,
        end_time: isEdit.end_time,
        quantity: isEdit.quantity,
        status: isEdit.status,
      });
    }
  }, [isEdit]);

  // Handle submit
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await createDiscount(token as string, form);
      if (res.ok) {
        setRefresh && setRefresh(true);
        enqueueSnackbar(res.message, { variant: "success" });
        onClose();
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Lỗi khi thêm mã giảm giá", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await updateDiscount(token as string, isEdit?.id, form);

      if (res.ok) {
        setRefresh && setRefresh(true);
        enqueueSnackbar(res.message, { variant: "success" });
        onClose();
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Lỗi khi cập nhật mã giảm giá", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setForm({
      name: "",
      discount_percent: "",
      start_time: "",
      end_time: "",
      quantity: "",
      status: true,
    });
    setIsEdit && setIsEdit(null);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-xl font-bold">
            {isEdit ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
          </h2>
        </ModalHeader>
        <ModalBody className="gap-4">
          <Input
            label="Tên mã giảm giá"
            placeholder="Nhập tên mã giảm giá"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            variant="bordered"
          />
          <Input
            label="Phần trăm giảm giá"
            placeholder="Nhập phần trăm giảm giá"
            value={form.discount_percent}
            type="number"
            onChange={(e) =>
              setForm({ ...form, discount_percent: e.target.value })
            }
            variant="bordered"
          />
          <DateRangePicker
            className="w-full"
            variant="bordered"
            label="Thời gian áp dụng"
            defaultValue={
              form.start_time && form.end_time
                ? {
                    start: parseDate(form.start_time.split(" ")[0]),
                    end: parseDate(form.end_time.split(" ")[0]),
                  }
                : undefined
            }
            onChange={(dates) =>
              setForm({
                ...form,
                start_time: dates?.start?.toString() || "",
                end_time: dates?.end?.toString() || "",
              })
            }
          />
          <Input
            label="Số lượng"
            placeholder="Nhập số lượng"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            type="number"
            variant="bordered"
          />
          <Checkbox
            isSelected={form.status}
            onValueChange={(value) => setForm({ ...form, status: value })}
          >
            Kích hoạt
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Hủy
          </Button>
          <Button
            color="primary"
            onPress={isEdit ? handleEdit : handleSubmit}
            isLoading={loading}
          >
            {isEdit ? "Cập nhật" : "Thêm mã"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
