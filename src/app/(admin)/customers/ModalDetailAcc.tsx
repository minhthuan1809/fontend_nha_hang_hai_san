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

          <Table className="mt-4" aria-label="Danh sách địa chỉ">
            <TableHeader>
              <TableColumn>STT</TableColumn>
              <TableColumn>SDT</TableColumn>
              <TableColumn>Địa chỉ</TableColumn>
            </TableHeader>
            <TableBody>
              {data?.address && data.address.length > 0 ? (
                data.address.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.address}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="text-center">
                  <TableCell className="text-center ">-</TableCell>
                  <TableCell className="text-center">
                    Không có dữ liệu
                  </TableCell>
                  <TableCell className="text-center">-</TableCell>
                </TableRow>
              )}
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
