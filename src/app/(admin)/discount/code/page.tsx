"use client";
import React, { useEffect, useState } from "react";
import { deleteDiscount, getDiscount } from "@/app/_service/admin/discount";
import { getCookie } from "cookies-next";
import Loading from "@/app/_shared/components/Loading";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Badge,
  Chip,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import { enqueueSnackbar } from "notistack";
import ModalAddDicount from "./ModalAddDicount";

export default function Page() {
  const token = getCookie("token");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<any>(null);

  useEffect(() => {
    if (token) {
      getDiscount(token as string, "").then((response) => {
        if (response.ok) {
          setData(response.data || []);
        }
        setLoading(false);
      });
    }
  }, [token, refresh]);

  const handleDeleteDiscount = (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mã giảm giá này không?")) return;
    if (!token) return;

    deleteDiscount(id, token as string).then((response: any) => {
      if (response.ok) {
        setRefresh((prev) => !prev);
        enqueueSnackbar(response.message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(response.message, {
          variant: "error",
        });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  const columns = [
    { name: "MÃ GIẢM GIÁ", uid: "code" },
    { name: "Tên mã", uid: "name" },
    { name: "PHẦN TRĂM GIẢM", uid: "discount_percent" },
    { name: "THỜI GIAN BẮT ĐẦU", uid: "start_time" },
    { name: "THỜI GIAN KẾT THÚC", uid: "end_time" },
    { name: "SỐ LƯỢNG", uid: "quantity" },
    { name: "TRẠNG THÁI", uid: "status" },
    { name: "HÀNH ĐỘNG", uid: "action" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Mã giảm giá</h1>
        <Button
          color="primary"
          className="mb-4"
          onPress={() => setIsOpen(true)}
        >
          Thêm mã
        </Button>
      </div>
      <Table aria-label="Bảng mã giảm giá">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"Không tìm thấy mã giảm giá nào"}>
          {data?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>
                <div
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => {
                    navigator.clipboard.writeText(row.code);
                    enqueueSnackbar("Đã sao chép mã giảm giá", {
                      variant: "success",
                    });
                  }}
                >
                  {row.code}
                </div>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.discount_percent}%</TableCell>
              <TableCell>
                {new Date(row.start_time).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </TableCell>
              <TableCell>
                {new Date(row.end_time).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>
                {row.status ? (
                  <Chip color="success">Hoạt động</Chip>
                ) : (
                  <Chip color="danger">Không hoạt động</Chip>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className="text-blue-500 cursor-pointer"
                    onClick={() => {
                      setIsEdit(row);
                      setIsOpen(true);
                    }}
                  >
                    <Icon icon="Edit" />
                  </div>
                  <div
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteDiscount(row.id)}
                  >
                    <Icon icon="Trash" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalAddDicount
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setRefresh={setRefresh}
      />
    </div>
  );
}
