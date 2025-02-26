import { setIntroductionFooter } from "@/app/_service/admin/footer";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import { enqueueSnackbar } from "notistack";

interface IntroductionData {
  title: string;
  description: string;
}

export default function IntroductionFooter({
  data,
  setRefetch,
}: {
  data: IntroductionData;
  setRefetch: (prev: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  // set form data
  useEffect(() => {
    setFormData({
      title: data?.title || "",
      description: data?.description || "",
    });
  }, [data]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề";
      isValid = false;
    } else if (formData.title.length > 100) {
      newErrors.title = "Tiêu đề không được vượt quá 100 ký tự";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả";
      isValid = false;
    } else if (formData.description.length > 500) {
      newErrors.description = "Mô tả không được vượt quá 500 ký tự";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      const response = await setIntroductionFooter(formData);

      if (!response.ok) {
        enqueueSnackbar(response.message || "Đã xảy ra lỗi", {
          variant: "error",
        });
        return;
      }

      enqueueSnackbar("Cập nhật thành công", {
        variant: "success",
      });
      setRefetch((prev: boolean) => !prev);
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
    <Card className="mx-auto shadow-lg">
      <CardHeader className="pb-0 pt-6 px-6">
        <h1 className="text-2xl font-bold w-full">Giới thiệu</h1>
      </CardHeader>
      <CardBody className="p-6 overflow-visible">
        <div className="flex flex-col gap-4">
          <Input
            label="Tiêu đề"
            placeholder="Nhập tiêu đề"
            value={formData.title}
            isInvalid={!!errors.title}
            errorMessage={errors.title}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, title: e.target.value }));
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: "" }));
              }
            }}
          />
          <Textarea
            label="Mô tả"
            placeholder="Nhập mô tả"
            value={formData.description}
            isInvalid={!!errors.description}
            errorMessage={errors.description}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, description: e.target.value }));
              if (errors.description) {
                setErrors((prev) => ({ ...prev, description: "" }));
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
