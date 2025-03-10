"use client";
import {
  CreateRole,
  deleteRole,
  getRole,
  UpdateRole,
} from "@/app/_service/admin/role";
import Icon from "@/app/_shared/utils/Icon";
import {
  Button,
  Input,
  Table,
  TableCell,
  TableBody,
  TableColumn,
  TableRow,
  TableHeader,
} from "@nextui-org/react";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { getCookie } from "cookies-next";
import Pagination from "@/app/_shared/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/_shared/components/Loading";
import CheckRole from "@/app/_shared/components/ui/CheckRole";
import { enqueueSnackbar } from "notistack";
import NotFound from "@/app/not-found";

function PermissionPage() {
  const [roles, setRoles] = useState([]);
  const token = getCookie("token");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const page = Number(useSearchParams().get("page")) || 1; // Thêm giá trị mặc định là 1 nếu page là null
  const [loading, setLoading] = useState(false);
  const [checkRole, setCheckRole] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>({});
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<any>(
    dataEdit.permissions || {}
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (dataEdit?.name) {
      setName(dataEdit.name);
    }
  }, [dataEdit]);

  // Fetch role
  const fetchRole = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRole(token as string, search, page, 20);
      if (!response.ok) {
        setError(true);
      } else {
        setError(false);
        setRoles(response.data);
        setTotal(response.total_pages);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  }, [token, search, page]);

  // Gọi fetchRole khi các dependencies thay đổi
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchRole();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [fetchRole]);

  // Xóa quyền
  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có muốn xóa quyền này không?")) return;
    try {
      const response = await deleteRole(token as string, id);
      if (response.success) {
        enqueueSnackbar(response.message, {
          variant: "success",
        });
        fetchRole();
      } else {
        enqueueSnackbar(response.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Lỗi khi xóa quyền:", {
        variant: "error",
      });
    }
  };

  // Thêm quyền
  const handleSave = async () => {
    if (!name) {
      enqueueSnackbar("Tên quyền không được để trống", {
        variant: "error",
      });
      return;
    }
    const data = {
      name: name,
      permissions: permissions,
    };
    const response = await CreateRole(token as string, data);
    if (response.ok) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      fetchRole();
      setCheckRole(false);
    } else {
      enqueueSnackbar(response.message, {
        variant: "error",
      });
    }
  };

  // Cập nhật quyền
  const handleUpdate = async () => {
    console.log("permissions", permissions);

    const data = {
      name: name,
      permissions: permissions,
    };
    const response = await UpdateRole(token as string, data, dataEdit.id);
    if (response.ok) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      fetchRole();
      setCheckRole(false);
    } else {
      enqueueSnackbar(response.message, {
        variant: "error",
      });
    }
  };
  if (error) {
    return <NotFound />;
  }
  if (loading) {
    return <Loading />;
  }
  if (checkRole) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
        <div className=" border-gray-400 pb-4 bg-white shadow-md p-4 rounded-lg">
          <h1 className="text-2xl font-bold text-primary">
            {dataEdit.name ? "Cập nhật quyền" : "Thêm quyền"}
          </h1>
          <div className="mt-4">
            <Input
              startContent={<Icon icon="Users" />}
              placeholder="Tên quyền"
              label="Tên quyền"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <CheckRole
          data={dataEdit.permissions}
          setPermissions={setPermissions}
          permissions={permissions}
          handleSave={dataEdit ? handleUpdate : handleSave}
          close={(value) => setCheckRole(value)}
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md  space-y-6">
      <h1 className="text-2xl font-bold mb-6">Cấp quyền</h1>

      <div className="flex justify-end gap-2">
        <Input
          placeholder="Tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          color="primary"
          onClick={() => {
            setDataEdit("");
            setCheckRole(true);
          }}
        >
          <Icon icon="Plus" /> Thêm
        </Button>
      </div>
      <Table aria-label="Bảng cấp quyền" className="mt-4">
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>Tên quyền</TableColumn>
          <TableColumn>Hành động</TableColumn>
        </TableHeader>
        <TableBody>
          {roles.length > 0 ? (
            roles
              .filter((role: any) => role.name !== "user")
              .map((role: any, index: number) => (
                <TableRow key={role.id}>
                  <TableCell className="w-20">{index + 1}</TableCell>
                  <TableCell>{role.name}</TableCell>

                  <TableCell className="w-28">
                    <div className="flex items-center gap-2">
                      <div
                        className="mr-2 cursor-pointer text-primary "
                        onClick={() => {
                          setCheckRole((prev) => !prev);
                          setDataEdit(role);
                        }}
                      >
                        <Icon icon="Edit" />
                      </div>
                      <div
                        className="mr-2 cursor-pointer text-red-500"
                        onClick={() => {
                          handleDelete(role.id);
                        }}
                      >
                        <Icon icon="Trash" />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">Không có dữ liệu</TableCell>
              <TableCell className="text-center">-</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination */}
      <Pagination total={total} page={page} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PermissionPage />
    </Suspense>
  );
}
