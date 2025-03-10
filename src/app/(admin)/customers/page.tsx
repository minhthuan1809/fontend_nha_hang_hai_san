"use client";
import { deleteUser, getUser } from "@/app/_service/admin/user";
import { getCookie } from "cookies-next";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Input,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import Pagination from "@/app/_shared/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import AddEditUser from "./AddEditUser";
import Loading from "@/app/_shared/components/Loading";
type UserType = {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  role_id: string;
  created_at: string;
  updated_at: string;
  status: boolean;
  level: string;
};

function CustomerPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");
  const token = getCookie("token") as string;
  const [total, setTotal] = useState(0);
  const [dataEdit, setDataEdit] = useState<any | null>(null);

  const SearchParamsWrapper = () => {
    const page = Number(useSearchParams().get("page")) || 1;
    return (
      <CustomerContent
        page={page}
        users={users}
        setUsers={setUsers}
        search={search}
        token={token}
        total={total}
        setTotal={setTotal}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        setSearch={setSearch}
      />
    );
  };

  return (
    <Suspense fallback={<Loading />}>
      <SearchParamsWrapper />
    </Suspense>
  );
}

function CustomerContent({
  page,
  users,
  setUsers,
  search,
  token,
  total,
  setTotal,
  dataEdit,
  setDataEdit,
  setSearch,
}: {
  page: number;
  users: UserType[];
  setUsers: (users: UserType[]) => void;
  search: string;
  token: string;
  total: number;
  setTotal: (total: number) => void;
  dataEdit: any;
  setDataEdit: (data: any) => void;
  setSearch: (search: string) => void;
}) {
  const [openAddEditUser, setOpenAddEditUser] = useState(false);

  const fetchUser = useCallback(async () => {
    const response = await getUser(token, search, page, 20);
    if (response.ok) {
      setUsers(response.data);
      setTotal(response.total_pages);
    }
  }, [search, page, token, setUsers, setTotal]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [fetchUser]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) return;
    const response = await deleteUser(token, id);

    if (response.ok) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      fetchUser();
    } else {
      enqueueSnackbar(response.message, {
        variant: "error",
      });
    }
  };

  const columns = [
    { name: "KHÁCH HÀNG", uid: "user" },
    { name: "NGÀY TẠO", uid: "created" },
    { name: "NGÀY CẬP NHẬT", uid: "updated" },
    { name: "VAI TRÒ", uid: "role" },
    { name: "TRẠNG THÁI", uid: "status" },
    { name: "CHỨC NĂNG", uid: "function" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thông tin khách hàng</h1>
      <div className="flex justify-end gap-2">
        <Input
          placeholder="Tìm kiếm"
          className="mb-4"
          variant="bordered"
          radius="sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button color="primary" onClick={() => setOpenAddEditUser(true)}>
          <Icon icon="Plus" /> Thêm
        </Button>
      </div>
      <Table aria-label="Bảng thông tin khách hàng">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item: UserType) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={item.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold">
                      {item.fullName.charAt(0).toUpperCase() +
                        item.fullName.slice(1)}
                    </p>
                    <p className="text-sm text-gray-500">{item.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.updated_at}</TableCell>
              <TableCell>{item.created_at}</TableCell>
              <TableCell>{item.level}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {!item?.status ? (
                    <Chip color="success">Hoạt động</Chip>
                  ) : (
                    <Chip color="danger">Khóa </Chip>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex gap-2">
                  {item.level !== "super_admin" && (
                    <>
                      <div
                        className="flex gap-2 text-primary cursor-pointer"
                        onClick={() => {
                          setOpenAddEditUser(true);
                          setDataEdit(item);
                        }}
                      >
                        <Icon icon="Edit" />
                      </div>
                      <div
                        className="flex gap-2 text-danger cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Icon icon="Trash" />
                      </div>
                      <div className="flex gap-2 text-primary cursor-pointer">
                        <Icon icon="Eye" />
                      </div>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination page={page} total={total} />
      {openAddEditUser && (
        <AddEditUser
          onClose={setOpenAddEditUser}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          refetch={fetchUser}
        />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CustomerPage />
    </Suspense>
  );
}
