import {
  deleteCustomerChooseSectionItem,
  updateCustomerChooseSection,
} from "@/app/_service/admin/home";
import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import ModalAddEditItem from "../modal/ModalAddEditItem";
import { getCookie } from "cookies-next";
export default function CustomerChooseItem({
  data,
  setRefresh,
}: {
  data: any;
  setRefresh: any;
}) {
  const token = getCookie("token");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  // handle delete
  const handleDelete = async (id: any) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mục này không?")) return;
    setLoadingId(id);
    const response = await deleteCustomerChooseSectionItem(id, token as string);
    if (response.ok) {
      enqueueSnackbar(response.message, { variant: "success" });
      setRefresh((prev: any) => !prev);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoadingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoadingId("submit");
    const response = await updateCustomerChooseSection(
      formData,
      token as unknown as string
    );
    if (response.ok) {
      enqueueSnackbar(response.message, { variant: "success" });
      setRefresh((prev: any) => !prev);
      setIsModalOpen(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoadingId(null);
  };
  return (
    <div className="mt-4 flex flex-col items-center w-full border-2 rounded-lg p-4 ">
      <div className="w-full overflow-x-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Thẻ</h1>
          <Button
            size="sm"
            color="primary"
            className="mb-4 text-xs md:text-sm"
            startContent={<Icon icon="Plus" className="w-4 h-4" />}
            onClick={() => {
              setFormData({
                title: "",
                description: "",
                icon: "",
              });
              setIsModalOpen(true);
            }}
          >
            Thêm mới
          </Button>
        </div>

        {/* Desktop view */}
        <div className="hidden md:block">
          <Table
            aria-label="Danh sách mục khách hàng chọn"
            className="min-w-full"
          >
            <TableHeader>
              <TableColumn className="text-center text-sm md:text-base">
                ICON
              </TableColumn>
              <TableColumn className="text-center text-sm md:text-base">
                TIÊU ĐỀ
              </TableColumn>
              <TableColumn className="text-center text-sm md:text-base">
                MÔ TẢ
              </TableColumn>
              <TableColumn className="text-center text-sm md:text-base">
                THAO TÁC
              </TableColumn>
            </TableHeader>
            <TableBody>
              {data?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Icon
                        icon={item.icon}
                        className="w-6 h-6 md:w-8 md:h-8"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm md:text-lg text-center">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-sm md:text-lg text-center">
                    {item.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 m justify-center">
                      <Button
                        size="sm"
                        variant="light"
                        onPress={() => {
                          setIsModalOpen(true);
                          setEditingItem(item);
                        }}
                        isDisabled={loadingId === item.id}
                        className="text-xs md:text-sm"
                      >
                        <Icon icon="Edit" className="text-blue-500" />
                      </Button>
                      <Button
                        size="sm"
                        onPress={() => handleDelete(item.id)}
                        isLoading={loadingId === item.id}
                        className="text-xs md:text-sm"
                        variant="light"
                      >
                        <Icon icon="Trash" className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-4">
          {data?.map((item: any) => (
            <Card key={item.id} className="w-full">
              <CardBody className="p-4 space-y-3">
                <div className="flex items-center justify-center">
                  <Icon icon={item.icon} className="w-8 h-8" />
                </div>
                <div className="text-center font-medium">{item.title}</div>
                <div className="text-sm text-gray-600 text-center">
                  {item.description}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => {
                      setIsModalOpen(true);
                      setEditingItem(item);
                    }}
                    isDisabled={loadingId === item.id}
                    className="flex-1"
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="bordered"
                    onPress={() => handleDelete(item.id)}
                    className="flex-1"
                  >
                    Xóa
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      {/* modal add edit item */}
      <ModalAddEditItem
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setRefresh={setRefresh}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
    </div>
  );
}
