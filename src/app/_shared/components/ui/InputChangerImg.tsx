import { Button, Input } from "@nextui-org/react";
import Icon from "../../utils/Icon";

export default function InputChangerImg({
  selectedImage,
  isLoading,
  onChange,
  dataInput,
}: {
  selectedImage: any;
  isLoading: boolean;
  onChange: (value: any) => void;
  dataInput: any;
}) {
  const handleCameraClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onChange(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div>
      <Input
        type="text"
        label="Link hình ảnh"
        value={dataInput || selectedImage || ""}
        placeholder="Nhập link hình ảnh"
        variant="bordered"
        endContent={
          <Button
            isIconOnly
            color="primary"
            variant="light"
            isLoading={isLoading}
            onClick={handleCameraClick}
          >
            <Icon icon="Camera" className="w-5 h-5 cursor-pointer" />
          </Button>
        }
      />
    </div>
  );
}
