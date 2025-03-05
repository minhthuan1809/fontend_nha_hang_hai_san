import { setCopyRightFooter } from "@/app/_service/admin/footer";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Button, Input } from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import { enqueueSnackbar } from "notistack";

interface CopyRightData {
  text: string;
}

export default function CopyRight({
  data,
  setRefetch,
}: {
  data: CopyRightData;
  setRefetch: (prev: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataCopyRight, setDataCopyRight] = useState("");
  const [errors, setErrors] = useState({
    content: "",
  });

  useEffect(() => {
    setDataCopyRight(data?.text);
  }, [data]);

  // validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      content: "",
    };

    if (!dataCopyRight) {
      newErrors.content = "Vui lòng nhập nội dung";
      isValid = false;
    } else if (dataCopyRight.length > 200) {
      newErrors.content = "Nội dung không được vượt quá 200 ký tự";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // handle save
  const handleSave = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      const response = await setCopyRightFooter(dataCopyRight);

      if (!response || !response.ok) {
        enqueueSnackbar(
          response?.message || "Đã xảy ra lỗi khi xử lý phản hồi",
          {
            variant: "error",
          }
        );
        return;
      }

      enqueueSnackbar("Cập nhật thành công", {
        variant: "success",
      });
      setRefetch((prev: any) => !prev);
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      enqueueSnackbar("Đã xảy ra lỗi hệ thống", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto shadow-lg w-full">
      <CardHeader className="pb-0 pt-6 px-6">
        <h1 className="text-2xl font-bold w-full">Bản quyền</h1>
      </CardHeader>
      <CardBody className="p-6 overflow-visible">
        <div className="flex flex-col gap-4">
          <Input
            label="Nội dung"
            placeholder="Nhập nội dung bản quyền"
            value={dataCopyRight}
            isInvalid={!!errors.content}
            errorMessage={errors.content}
            onChange={(e) => {
              setDataCopyRight(e.target.value);
              if (errors.content) {
                setErrors((prev) => ({ ...prev, content: "" }));
              }
            }}
          />
          <div className="flex justify-end">
            <Button
              color="primary"
              startContent={<Icon icon="Save" size={18} />}
              isLoading={isLoading}
              onPress={handleSave}
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
