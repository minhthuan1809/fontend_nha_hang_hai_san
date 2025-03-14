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
  Select,
  SelectItem,
  Link,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import Loading from "@/app/_shared/components/Loading";
import {
  createSocialLinkFooter,
  deleteSocialLinkFooter,
  editSocialLinkFooter,
} from "@/app/_service/admin/footer";
import { enqueueSnackbar } from "notistack";
import InputChooseIcon from "@/app/_shared/components/ui/InputChooseIcon";
import { getCookie } from "cookies-next";

export const targets = [
  { key: "_blank", label: "_blank" },
  { key: "_self", label: "_self" },
  { key: "_parent", label: "_parent" },
];

interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  target: string;
}

interface SocialLinkProps {
  data: SocialLinkItem[];
  setRefetch: (prev: any) => void;
}

export default function SocialLink({ data, setRefetch }: SocialLinkProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    target: "_blank",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const token = getCookie("token");
  const resetForm = () => {
    setFormData({ platform: "", url: "", target: "_blank" });
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      if (!formData.platform || !formData.url || !formData.target) {
        enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
          variant: "warning",
        });
        return;
      }

      const response = editingId
        ? await editSocialLinkFooter(
            editingId,
            formData,
            token as unknown as string
          )
        : await createSocialLinkFooter(formData, token as unknown as string);

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
    if (!confirm("Bạn có chắc chắn muốn xóa liên kết mạng xã hội này?")) return;
    try {
      const response = await deleteSocialLinkFooter(id, token as string);
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

  const handleEdit = (item: SocialLinkItem) => {
    setFormData({
      platform: item.platform,
      url: item.url,
      target: item.target,
    });
    setEditingId(item.id);
  };

  if (!data) return <Loading />;

  return (
    <>
      <Card className="mx-auto shadow-lg min-h-[500px]">
        <CardHeader className="pb-0 pt-6 px-6">
          <h1 className="text-2xl font-bold w-full">Liên kết mạng xã hội</h1>
        </CardHeader>

        <CardBody className="p-6 overflow-visible">
          <div className="flex justify-between items-end gap-4 mt-6">
            <div className="flex flex-col justify-center md:flex-row gap-4 flex-1">
              <div className="w-full">
                <InputChooseIcon
                  dataValue={formData.platform}
                  setDataValue={(value: string) =>
                    setFormData((prev) => ({ ...prev, platform: value }))
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  label="Đường dẫn"
                  placeholder="Nhập URL"
                  className="w-full"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                />
              </div>
              <Select
                className="max-w-xs"
                items={targets}
                label="Target"
                placeholder="Chọn target"
                selectedKeys={[formData.target]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    target: e.target.value,
                  }))
                }
              >
                {(target) => (
                  <SelectItem key={target.key}>{target.label}</SelectItem>
                )}
              </Select>
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
          <div className="overflow-x-auto mt-6">
            <div className="hidden md:block">
              <Table aria-label="Bảng liên kết mạng xã hội" className="mt-6">
                <TableHeader>
                  <TableColumn>Icon</TableColumn>
                  <TableColumn>NỀN TẢNG</TableColumn>
                  <TableColumn>ĐƯỜNG DẪN</TableColumn>
                  <TableColumn>TARGET</TableColumn>
                  <TableColumn>HÀNH ĐỘNG</TableColumn>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <span className="px-4 py-2">
                          <Icon icon={item.platform} />
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="px-4 py-2">{item.platform}</span>
                      </TableCell>
                      <TableCell>
                        <Link href={item.url} target={"_blank"}>
                          {item.url}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-4 py-2">{item.target}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            color="primary"
                            variant="light"
                            isIconOnly
                            onPress={() => handleEdit(item)}
                            startContent={<Icon icon="Edit" />}
                          />
                          <Button
                            color="danger"
                            variant="light"
                            isIconOnly
                            onPress={() => handleDelete(item.id)}
                          >
                            <Icon icon="Trash" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="md:hidden">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-4 mb-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon icon={item.platform} />
                      <span className="font-medium">{item.platform}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        color="primary"
                        variant="light"
                        size="sm"
                        isIconOnly
                        onClick={() => handleEdit(item)}
                        startContent={<Icon icon="Edit" />}
                      />
                      <Button
                        color="danger"
                        variant="light"
                        size="sm"
                        isIconOnly
                        onClick={() => handleDelete(item.id)}
                      >
                        <Icon icon="Trash" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      <Link
                        href={item.url}
                        target={"_blank"}
                        className="text-blue-500 break-all"
                      >
                        {item.url}
                      </Link>
                    </div>
                    <div>Target: {item.target}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
