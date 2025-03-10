import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import {
  addCustomerChooseSectionItem,
  updateCustomerChooseSectionItem,
} from "@/app/_service/admin/home";
import InputChooseIcon from "@/app/_shared/components/ui/InputChooseIcon";
import { getCookie } from "cookies-next";
export default function ModalAddEditItem({
  isOpen,
  setIsOpen,
  setRefresh,
  editingItem,
  setEditingItem,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setRefresh: (value: any) => void;
  editingItem: any;
  setEditingItem: (value: any) => void;
}) {
  const token = getCookie("token");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  // set form data
  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || "",
        description: editingItem.description || "",
        icon: icon || editingItem.icon || "",
      });
      setIcon(editingItem.icon || "");
    }
  }, [editingItem]);

  // onclose modal
  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      icon: "",
    });
    setIcon("");
  };

  // update
  const handleUpdate = async () => {
    setLoading(true);
    const res = await updateCustomerChooseSectionItem(
      editingItem.id,
      {
        title: formData.title,
        description: formData.description,
        icon: icon,
      },
      token as unknown as string
    );
    setLoading(false);
    if (res.ok) {
      enqueueSnackbar(res.message, { variant: "success" });
      setRefresh((prev: any) => !prev);
      handleCloseModal();
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };

  // add
  const handleAdd = async () => {
    setLoading(true);
    const res = await addCustomerChooseSectionItem(
      {
        title: formData.title,
        description: formData.description,
        icon: icon,
      },
      token as unknown as string
    );
    setLoading(false);
    if (res.ok) {
      enqueueSnackbar(res.message, { variant: "success" });
      setRefresh((prev: any) => !prev);
      handleCloseModal();
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };

  const [icon, setIcon] = useState(editingItem?.icon || "");

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {editingItem ? "Sửa thẻ" : "Thêm thẻ mới"}
        </ModalHeader>
        <ModalBody>
          <Input
            label="Tiêu đề"
            placeholder="Nhập tiêu đề"
            name="title"
            value={formData?.title}
            onChange={handleChange}
          />
          <Input
            label="Mô tả"
            placeholder="Nhập mô tả"
            name="description"
            value={formData?.description}
            onChange={handleChange}
          />

          {/* Icon */}
          <InputChooseIcon dataValue={icon} setDataValue={setIcon} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCloseModal}>
            Hủy
          </Button>
          <Button
            color="primary"
            isLoading={loading}
            onPress={editingItem ? handleUpdate : handleAdd}
          >
            {editingItem ? "Sửa" : "Thêm mới"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
