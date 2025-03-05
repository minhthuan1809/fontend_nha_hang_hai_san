"use client";
import Icon from "@/app/_shared/utils/Icon";
import {
  Button,
  Input,
  Table,
  TableCell,
  TableBody,
  TableColumn,
  TableHeader,
  Tooltip,
  TableRow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import React, { useState } from "react";
import ModalEdit from "./modal/ModalEdit";
import {
  createItem,
  deleteItem,
  getAboutSpace,
  updateItem,
} from "@/app/_service/admin/about";
import { enqueueSnackbar } from "notistack";
import InputChooseIcon from "@/app/_shared/components/ui/InputChooseIcon";

export default function SpaceMobile({ data, setRefetch }: any) {
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [edit, setEdit] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const [dataItem, setDataItem] = useState<any>({
    icon: "",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // handle save
  const handleSave = async (updatedData: any) => {
    const response = await getAboutSpace(updatedData, updatedData?.id);
    if (response.ok) {
      setRefetch((prev: any) => !prev);
      setOpen(false);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  // thêm item
  const handleAddItem = async () => {
    setLoading(true);
    const response = await createItem(dataItem);
    if (response.ok) {
      setRefetch((prev: any) => !prev);
      setOpen(false);
      setEdit(false);
      enqueueSnackbar(response.message, { variant: "success" });
      setDataItem({
        icon: "",
        title: "",
        description: "",
      });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    setLoading(false);
  };
  // handle edit
  const handleEdit = async () => {
    const response = await updateItem(dataItem, dataItem.id);
    if (response.ok) {
      setRefetch((prev: any) => !prev);
      setDataItem({
        icon: "",
        title: "",
        description: "",
      });
      setEdit(false);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
  // delete item
  const handleDeleteItem = async () => {
    const response = await deleteItem(selectedItemToDelete);
    if (response.ok) {
      setRefetch((prev: any) => !prev);
      setDeleteModalOpen(false);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  return (
    <div className="mb-16 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Chỉnh sửa không gian bếp</h2>

      {/* Kitchen Space Sections - Mobile Grid */}
      <div className="grid grid-cols-1 gap-4">
        {data.layout_space.map((space: any) => (
          <div
            key={space.id}
            className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 relative"
          >
            <Tooltip content="Chỉnh Sửa" className="absolute top-2 right-2">
              <Button
                isIconOnly
                color="primary"
                variant="light"
                onPress={() => {
                  setDataEdit(space);
                  setOpen(true);
                }}
                className="absolute top-2 right-2"
              >
                <Icon icon="Edit" className="w-5 h-5 text-blue-600" />
              </Button>
            </Tooltip>

            <div className="flex items-center mb-4">
              <Icon
                icon={space.icon}
                className="w-10 h-10 text-blue-600 mr-4"
              />
              <h3 className="text-lg font-semibold">{space.title}</h3>
            </div>

            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• {space.description_one}</li>
              <li>• {space.description_two}</li>
              <li>• {space.description_three}</li>
              <li>• {space.description_four}</li>
            </ul>
          </div>
        ))}
      </div>

      {/* Add/Edit Item Section - Mobile Friendly */}
      <div className="space-y-4 mt-8">
        <h1 className="text-2xl font-bold mb-4">Chỉnh sửa các mục</h1>
        <div className="flex flex-col gap-4">
          <InputChooseIcon
            dataValue={dataItem.icon}
            setDataValue={(value: any) =>
              setDataItem({ ...dataItem, icon: value })
            }
          />
          <Input
            label="Tiêu đề"
            placeholder="Tiêu đề"
            value={dataItem.title}
            onChange={(e) =>
              setDataItem({ ...dataItem, title: e.target.value })
            }
            size="sm"
          />
          <Input
            label="Nội dung"
            placeholder="Nội dung"
            value={dataItem.description}
            onChange={(e) =>
              setDataItem({ ...dataItem, description: e.target.value })
            }
            size="sm"
          />
          <Button
            color="primary"
            variant="solid"
            className="h-12"
            onPress={edit ? handleEdit : handleAddItem}
            isLoading={loading}
          >
            {edit ? "Sửa" : "Thêm"}
          </Button>
        </div>

        {/* Mobile Table with Action Buttons */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Danh sách mục</h2>
          <div className="space-y-4">
            {data.layout_benefit.map((space: any) => (
              <div
                key={space.id}
                className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <Icon icon={space.icon} className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">{space.title}</p>
                    <p className="text-sm text-gray-600">{space.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    isIconOnly
                    color="primary"
                    variant="light"
                    onClick={() => {
                      setDataItem(space);
                      setEdit(true);
                    }}
                  >
                    <Icon icon="Edit" className="w-5 h-5 text-blue-600" />
                  </Button>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => {
                      setSelectedItemToDelete(space.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <Icon icon="Trash" className="w-5 h-5 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Delete */}
      <Modal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Xác nhận xóa</ModalHeader>
              <ModalBody>Bạn có chắc chắn muốn xóa mục này không?</ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Hủy
                </Button>
                <Button color="danger" onPress={handleDeleteItem}>
                  Xóa
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Existing Modal Edit */}
      <ModalEdit
        open={open}
        onOpenChange={setOpen}
        data={dataEdit}
        handleSave={handleSave}
      />
    </div>
  );
}
