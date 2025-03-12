import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";

export default function ModalDetailAcc({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: any;
}) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="3xl"
      aria-label="Chi tiết tài khoản"
    >
      <ModalContent>
        <ModalHeader>Chi tiết tài khoản</ModalHeader>
        <ModalBody>
          <div className="flex gap-4 justify-between items-center">
            <div className="w-44 h-44 rounded-full overflow-hidden">
              <img
                src={data?.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="font-bold">Họ và tên</p>
                  <p>{data?.fullName}</p>
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p>{data?.email}</p>
                </div>
                <div>
                  <p className="font-bold">Vai trò</p>
                  <p>{data?.level}</p>
                </div>
                <div>
                  <p className="font-bold">Trạng thái</p>
                  <p>{!data?.status ? "Hoạt động" : "Khóa"}</p>
                </div>
                <div>
                  <p className="font-bold">Ngày tạo</p>
                  <p>{data?.created_at}</p>
                </div>
                <div>
                  <p className="font-bold">Ngày cập nhật</p>
                  <p>{data?.updated_at}</p>
                </div>
              </div>
            </div>
          </div>

          <Table className="mt-4">
            <TableHeader>
              <TableColumn className="text-center">STT</TableColumn>
              <TableColumn className="text-center">SDT</TableColumn>
              <TableColumn className="text-center">Địa chỉ</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  <div
                    className="cursor-pointer hover:text-primary transition-all duration-300 hover:underline"
                    onClick={() => {
                      navigator.clipboard.writeText("0909090909");
                      enqueueSnackbar("Đã copy số điện thoại", {
                        variant: "success",
                      });
                    }}
                  >
                    0909090909
                  </div>
                </TableCell>
                <TableCell>
                  tòa nhà saigon centre – tháp 2, 67 lê lợi, phường bến nghé,
                  quận 1,
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Đóng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
