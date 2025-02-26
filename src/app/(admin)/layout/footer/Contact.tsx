import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import Loading from "@/app/_shared/components/Loading";
import InputChooseIcon from "@/app/_shared/components/ui/InputChooseIcon";
import {
  createContactFooter,
  deleteContactFooter,
  editContactFooter,
} from "@/app/_service/admin/footer";
import { enqueueSnackbar } from "notistack";

interface ContactItem {
  id: string;
  icon: string;
  type: string;
}

interface ContactProps {
  data: ContactItem[];
  setRefetch: (prev: any) => void;
}

export default function Contact({ data, setRefetch }: ContactProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    icon: "",
    type: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({ icon: "", type: "" });
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      if (!formData.icon || !formData.type) {
        enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
          variant: "warning",
        });
        return;
      }

      const response = editingId
        ? await editContactFooter(editingId, formData)
        : await createContactFooter(formData);

      if (!response.ok) {
        enqueueSnackbar(response.message || "Đã xảy ra lỗi", {
          variant: "error",
        });
        return;
      }

      enqueueSnackbar(response.message || "Thao tác thành công", {
        variant: "success",
      });
      setRefetch((prev: any) => !prev);
      resetForm();
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      enqueueSnackbar("Đã xảy ra lỗi hệ thống", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa thông tin liên hệ này?")) return;
    try {
      const response = await deleteContactFooter(id);
      if (!response.ok) {
        enqueueSnackbar(response.message || "Đã xảy ra lỗi", {
          variant: "error",
        });
        return;
      }
      enqueueSnackbar("Xóa thành công", {
        variant: "success",
      });
      setRefetch((prev: any) => !prev);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      enqueueSnackbar("Đã xảy ra lỗi hệ thống", {
        variant: "error",
      });
    }
  };

  const handleEdit = (item: ContactItem) => {
    setFormData({
      icon: item.icon,
      type: item.type,
    });
    setEditingId(item.id);
  };

  if (!data) return <Loading />;

  return (
    <>
      <Card className="mx-auto shadow-lg min-h-[500px]">
        <CardHeader className="pb-0 pt-6 px-6">
          <h1 className="text-2xl font-bold  w-full">Thông tin liên hệ</h1>
        </CardHeader>

        <CardBody className="p-6 overflow-visible">
          <div className="flex justify-between items-end gap-4 mt-6">
            <div className="flex flex-col justify-center md:flex-row gap-4 flex-1">
              <div className="w-full">
                <InputChooseIcon
                  dataValue={formData.icon}
                  setDataValue={(value) =>
                    setFormData((prev) => ({ ...prev, icon: value }))
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  label="Thông tin"
                  placeholder="Nhập thông tin"
                  className="w-full"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                />
              </div>
              <div>
                <Button
                  color="primary"
                  className="p-7"
                  startContent={
                    <Icon icon={editingId ? "Edit" : "Save"} size={18} />
                  }
                  isLoading={isLoading}
                  onPress={handleSave}
                >
                  {editingId ? "Cập nhật" : "Thêm"}
                </Button>
              </div>
            </div>
          </div>
          <Table aria-label="Bảng thông tin liên hệ" className="mt-6">
            <TableHeader>
              <TableColumn>LOGO</TableColumn>
              <TableColumn>ICON</TableColumn>
              <TableColumn>THÔNG TIN</TableColumn>
              <TableColumn>HÀNH ĐỘNG</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Icon icon={item.icon} />
                  </TableCell>
                  <TableCell>
                    <span className="px-4 py-2">{item.icon}</span>
                  </TableCell>
                  <TableCell>
                    <span className="px-4 py-2">{item.type}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        color="primary"
                        variant="light"
                        isIconOnly
                        onClick={() => handleEdit(item)}
                        startContent={<Icon icon="Edit" />}
                      />
                      <Button
                        color="danger"
                        variant="light"
                        isIconOnly
                        onClick={() => handleDelete(item.id)}
                      >
                        <Icon icon="Trash" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
