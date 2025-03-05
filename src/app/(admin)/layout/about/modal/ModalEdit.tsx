import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import InputChooseIcon from "@/app/_shared/components/ui/InputChooseIcon";

export default function ModalEdit({
  open,
  onOpenChange,
  data,
  handleSave,
}: {
  open: boolean;
  onOpenChange: (open: any) => void;
  data: any;
  handleSave: (updatedData: any) => void;
}) {
  const [editedData, setEditedData] = useState(data);
  // handle input change
  const handleInputChange = (key: string, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  // set data to edited data
  useEffect(() => {
    setEditedData(data);
  }, [data]);

  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      size="2xl"
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-center text-primary">
              Chỉnh sửa
            </h2>
          </ModalHeader>

          <ModalBody className="space-y-4">
            <InputChooseIcon
              dataValue={editedData?.icon}
              setDataValue={(value) => handleInputChange("icon", value)}
            />
            <Input
              label="Tiêu đề"
              variant="bordered"
              value={editedData?.title}
              onValueChange={(value) => handleInputChange("title", value)}
              className="mb-2"
            />
            <Input
              label="Mô tả 1"
              variant="bordered"
              value={editedData?.description_one}
              onValueChange={(value) =>
                handleInputChange("description_one", value)
              }
              className="mb-2"
            />
            <Input
              label="Mô tả 2"
              variant="bordered"
              value={editedData?.description_two}
              onValueChange={(value) =>
                handleInputChange("description_two", value)
              }
              className="mb-2"
            />
            <Input
              label="Mô tả 3"
              variant="bordered"
              value={editedData?.description_three}
              onValueChange={(value) =>
                handleInputChange("description_three", value)
              }
              className="mb-2"
            />
            <Input
              label="Mô tả 4"
              variant="bordered"
              value={data?.description_four}
              onValueChange={(value) =>
                handleInputChange("description_four", value)
              }
              className="mb-2"
            />
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onPress={() => handleSave(editedData)}>
              Lưu thay đổi
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
