"use client";
import { deleteAddress, getAddresses } from "@/app/_service/admin/account";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import { enqueueSnackbar } from "notistack";
import ModalEditAddAddress from "./ModalEditAddAddress";

export default function page() {
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const token = getCookie("token");
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAddresses(token);
      if (data.ok) {
        setAddresses(data.data);
      }
    };
    fetchAddresses();
  }, [reload]);

  const handleDelete = (id: string) => {
    if (!confirm("Bạn có chắc chắn  muốn xóa địa chỉ này không?")) return;
    deleteAddress(id, token).then((res) => {
      if (res.ok) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        setReload(!reload);
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh sách địa chỉ</h1>
        {addresses.length < 5 && (
          <Button color="warning" onPress={() => setOpen(true)}>
            Thêm địa chỉ
          </Button>
        )}
      </div>

      {/* Bảng cho màn hình lớn */}
      <div className="hidden md:block">
        <Table aria-label="Danh sách địa chỉ">
          <TableHeader>
            <TableColumn>Tên gợi nhớ</TableColumn>
            <TableColumn>Số điện thoại</TableColumn>
            <TableColumn>Địa chỉ</TableColumn>
            <TableColumn>Hành động</TableColumn>
          </TableHeader>
          <TableBody>
            {addresses.length === 0 ? (
              <TableRow>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">Không có địa chỉ</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
              </TableRow>
            ) : (
              addresses.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          setAddress(item);
                          setOpen(true);
                        }}
                      >
                        <Icon icon="Edit" />
                      </span>
                      <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Icon icon="Trash" />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Giao diện cho mobile */}
      <div className="md:hidden">
        {addresses.length === 0 ? (
          <div className="text-center py-4">Không có địa chỉ</div>
        ) : (
          <div className="grid gap-4">
            {addresses.map((item: any) => (
              <Card key={item.id} className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          setAddress(item);
                          setOpen(true);
                        }}
                      >
                        <Icon icon="Edit" />
                      </span>
                      <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Icon icon="Trash" />
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Số điện thoại: </span>
                    {item.phone}
                  </div>
                  <div>
                    <span className="text-gray-500">Địa chỉ: </span>
                    {item.address}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ModalEditAddAddress
        open={open}
        setOpen={setOpen}
        reload={() => setReload(!reload)}
        data={address}
        setData={setAddress}
      />
    </div>
  );
}
