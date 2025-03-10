import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import InputChooseIcon from "@/app/_shared/components/ui/InputChooseIcon";
import Icon from "@/app/_shared/utils/Icon";
import Loading from "@/app/_shared/components/Loading";
import {
  deleteItemOrderingProcess,
  setAboutOrderingProcess,
  updateItemOrderingProcess,
} from "@/app/_service/admin/about";
import { enqueueSnackbar } from "notistack";
import { getCookie } from "cookies-next";

export default function OrderProcessMobile({ data, setRefetch }: any) {
  const [dataItem, setDataItem] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const token = getCookie("token");

  useEffect(() => {
    setDataItem(data);
  }, [data]);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const response = await updateItemOrderingProcess(
        dataItem,
        dataItem?.id,
        token as string
      );
      if (response.ok) {
        setRefetch((prev: any) => !prev);
        enqueueSnackbar(response.message, { variant: "success" });
        setEdit(false);
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    setLoading(true);
    try {
      const response = await setAboutOrderingProcess(dataItem, token as string);
      if (response.ok) {
        setRefetch((prev: any) => !prev);
        setDataItem(null);
        enqueueSnackbar(response.message, { variant: "success" });
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: any) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mục này không?")) return;
    try {
      const response = await deleteItemOrderingProcess(id, token as string);
      if (response.ok) {
        setRefetch((prev: any) => !prev);
        enqueueSnackbar(response.message, { variant: "success" });
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra", { variant: "error" });
    }
  };

  if (!dataItem) return <Loading />;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Quy trình đặt món</h1>

        {/* Mobile-Friendly Input Section */}
        <div className="space-y-4">
          <InputChooseIcon
            dataValue={dataItem?.icon || ""}
            setDataValue={(value: any) =>
              setDataItem({ ...dataItem, icon: value })
            }
            aria-label="Chọn biểu tượng"
          />

          <Input
            label="Tiêu đề"
            placeholder="Tiêu đề"
            value={dataItem?.title}
            onChange={(e) =>
              setDataItem({ ...dataItem, title: e.target.value })
            }
            size="sm"
            aria-label="Nhập tiêu đề"
          />

          <Input
            label="Nội dung"
            placeholder="Nội dung"
            value={dataItem?.description}
            onChange={(e) =>
              setDataItem({ ...dataItem, description: e.target.value })
            }
            size="sm"
            aria-label="Nhập nội dung"
          />

          <Button
            color="primary"
            variant="solid"
            className="w-full h-12"
            onPress={edit ? handleEdit : handleAddItem}
            isLoading={loading}
            aria-label={edit ? "Sửa mục" : "Thêm mục"}
          >
            {edit ? "Sửa" : "Thêm"}
          </Button>
        </div>

        {/* Mobile List View */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Danh sách quy trình</h2>
          <div className="space-y-4">
            {data.map((space: any) => (
              <div
                key={space.id}
                className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <Icon
                    icon={space?.icon}
                    className="w-6 h-6 text-blue-600"
                    aria-label={`Biểu tượng của ${space?.title}`}
                  />
                  <div>
                    <p className="font-medium">{space?.title}</p>
                    <p className="text-sm text-gray-600">
                      {space?.description}
                    </p>
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
                    aria-label={`Chỉnh sửa ${space?.title}`}
                  >
                    <Icon icon="Edit" className="w-5 h-5 text-blue-600" />
                  </Button>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => {
                      handleDeleteItem(space?.id);
                    }}
                    aria-label={`Xóa ${space?.title}`}
                  >
                    <Icon icon="Trash" className="w-5 h-5 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
