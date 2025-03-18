import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import { cancelOrder } from "@/app/_service/client/layout";
import { enqueueSnackbar } from "notistack";
import { getCookie } from "cookies-next";

interface ModalCancelOderProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id: string | number;
}

export default function ModalCancelOder({
  isOpen,
  onOpenChange,
  id,
}: ModalCancelOderProps) {
  const [reason, setReason] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const token = getCookie("token") as string;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (reason === "") {
        enqueueSnackbar("Vui lòng nhập lý do hủy đơn hàng", {
          variant: "error",
        });
        return;
      }
      const response = await cancelOrder(token, id, reason);
      console.log(response);
      if (response.ok) {
        setLoading(false);
        onOpenChange(false);
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi hủy đơn hàng", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Hủy đơn hàng
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-gray-600">
                Vui lòng cho chúng tôi biết lý do bạn muốn hủy đơn hàng này
              </p>
              <Textarea
                label="Lý do hủy đơn"
                placeholder="Nhập lý do hủy đơn hàng..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button>
              <Button
                color="warning"
                onPress={() => {
                  handleSubmit();
                }}
                isDisabled={!reason.trim()}
                isLoading={loading}
              >
                Xác nhận
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
