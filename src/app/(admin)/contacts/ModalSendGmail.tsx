import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { sentGmail } from "@/app/_service/admin/sentgmail";
import { enqueueSnackbar } from "notistack";

export default function ModalSendGmail({
  open,
  onOpenChange,
  data,
  setForm,
  setReload,
}: {
  open?: boolean;
  onOpenChange?: (open: any) => void;
  data?: any;
  setForm?: (data: any) => void;
  setReload?: (reload: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const handleSendEmail = async () => {
    try {
      setLoading(true);
      const res = await sentGmail({
        content: data?.content,
        gmail: data?.email,
        title: data?.subject,
      });

      if (res.ok) {
        enqueueSnackbar(res.message, { variant: "success" });
        onOpenChange?.(false);
        setReload?.((reload: any) => !reload);
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={open} onOpenChange={onOpenChange} size="3xl">
      <ModalContent>
        <ModalHeader>
          <h2 className="text-xl font-bold">Gửi Email</h2>
        </ModalHeader>
        <ModalBody className="gap-4">
          <Input
            type="email"
            label="Email người nhận"
            placeholder="Nhập email người nhận"
            value={data?.email}
            onChange={(e) => setForm?.({ ...data, email: e.target.value })}
            variant="bordered"
          />
          <Input
            type="text"
            label="Tiêu đề"
            placeholder="Nhập tiêu đề email"
            value={data?.subject}
            onChange={(e) => setForm?.({ ...data, subject: e.target.value })}
            variant="bordered"
          />
          <Textarea
            label="Nội dung"
            placeholder="Nhập nội dung email"
            value={data?.content}
            onChange={(e) => setForm?.({ ...data, content: e.target.value })}
            variant="bordered"
            minRows={8}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={() => onOpenChange?.(false)}
          >
            Hủy
          </Button>
          <Button
            color="primary"
            onPress={handleSendEmail}
            isLoading={loading}
            isDisabled={loading}
          >
            Gửi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
