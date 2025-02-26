"use client";
import { addMenu, editMenu } from "@/app/_service/admin/navbar";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const ModalUrl = ({
  isOpen,
  setIsOpen,
  dataEdit,
  setDataEdit,
  setRefresh,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataEdit: any;
  setDataEdit: React.Dispatch<React.SetStateAction<any>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState(dataEdit?.name || "");
  const [url, setUrl] = useState(dataEdit?.url || "");
  const [orderPosition, setOrderPosition] = useState(
    dataEdit?.order_position || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataEdit) {
      setName(dataEdit.name || "");
      setUrl(dataEdit.url || "");
      setOrderPosition(dataEdit.order_position || "");
    }
  }, [dataEdit]);
  // handle close
  const handleClose = () => {
    setIsOpen(false);
    setName("");
    setUrl("");
    setOrderPosition("");
    setDataEdit("");
  };

  // handle add
  const handleAdd = async () => {
    if (name === "" || url === "" || orderPosition === "") {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
        variant: "error",
      });
      return;
    } else {
      setLoading(true);
      try {
        const res = await addMenu({
          name,
          url,
          order_position: orderPosition,
        });
        if (res.ok) {
          enqueueSnackbar(res.message, {
            variant: "success",
          });
          handleClose();
          setRefresh((prev: any) => !prev);
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
    }
  };
  // handle edit
  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await editMenu(dataEdit.id, {
        name,
        url,
        order_position: orderPosition,
      });

      if (res.ok) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        handleClose();
        setRefresh((prev: any) => !prev);
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      placement="center"
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-sm",
        base: "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl",
        header: "border-b border-gray-200 dark:border-gray-700",
        footer: "border-t border-gray-200 dark:border-gray-700",
        closeButton: "hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {dataEdit ? "Chỉnh sửa menu" : "Thêm mới menu"}
          </h2>
        </ModalHeader>
        <ModalBody className="space-y-6 py-6">
          <Input
            label="Tên menu"
            placeholder="Nhập tên menu của bạn"
            variant="bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="transition-all duration-300 focus-within:scale-[1.01]"
            labelPlacement="outside"
          />
          <Input
            label="Đường dẫn menu"
            placeholder="Nhập đường dẫn menu"
            variant="bordered"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Input
            label="Số thứ tự"
            placeholder="Nhập vị trí hiển thị"
            type="number"
            variant="bordered"
            value={orderPosition}
            onChange={(e) => setOrderPosition(e.target.value)}
            className="transition-all duration-300  focus-within:scale-[1.01]"
            labelPlacement="outside"
            min={0}
          />
        </ModalBody>
        <ModalFooter className="flex gap-3">
          <Button
            color="danger"
            variant="light"
            onPress={handleClose}
            className="flex-1 font-medium hover:bg-danger/20"
            isDisabled={loading}
          >
            Hủy bỏ
          </Button>
          <Button
            color="primary"
            className="flex-1 font-medium bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity"
            onPress={dataEdit ? handleEdit : handleAdd}
            isLoading={loading}
          >
            {loading ? "Đang xử lý..." : dataEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUrl;
