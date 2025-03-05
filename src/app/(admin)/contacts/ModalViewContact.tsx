import Icon from "@/app/_shared/utils/Icon";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

function ViewContactModal({
  contact,
  open,
  onOpenChange,
}: {
  contact: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal isOpen={open} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        <ModalHeader>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              Từ: {contact?.name} - {contact?.gmail}
            </h1>
            <p className="text-sm text-gray-500">
              Ngày Gửi: {new Date(contact?.created_at).toLocaleString("vi-VN")}
            </p>
            <span className="flex items-center gap-2 text-sm text-gray-500 font-extralight border w-fit px-2 py-1 rounded-md ">
              <Icon icon="ChevronDown" />
              Gửi Đến Nhà Hàng
            </span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <p>
              <strong>Tiêu Đề:</strong> {contact?.title}
            </p>

            <p>
              <strong>Nội Dung:</strong> {contact?.content}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ViewContactModal;
