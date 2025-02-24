"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { deleteMenu } from "@/app/_service/admin/navbar";
import AdminEditLogo from "./AdminEditLogo";
import { enqueueSnackbar } from "notistack";
import ModalUrl from "./ModalUrl";
import { getNavbar } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";

const LayoutsPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [brand, setBrand] = useState<any>(null);
  const [navigation, setNavigation] = useState<any[]>([]);
  const [isOpenModalUrl, setIsOpenModalUrl] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>(null);
  useEffect(() => {
    const fetchMenu = async () => {
      const response = await getNavbar();
      setNavigation(response.data?.navigation);
      setBrand(response.data?.brand);
    };
    fetchMenu();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa menu này không?")) return;
    const response = await deleteMenu(id);
    enqueueSnackbar(response.message, {
      variant: response.ok ? "success" : "error",
    });
    if (response.ok) {
      setRefresh(!refresh);
    }
  };

  const handleEdit = (item: any) => {
    console.log("item ", item);
    setIsOpenModalUrl(true);
    setDataEdit(item);
  };

  if (!brand) {
    return <Loading />;
  }
  return (
    <div className="p-2 md:p-6 space-y-4 md:space-y-8  mx-auto">
      {/* Brand Information Section */}
      <AdminEditLogo
        brand={brand}
        setBrand={setBrand}
        setRefresh={setRefresh}
      />
      {/* Navigation Menu Section */}
      <Card className="shadow-md md:shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Menu điều hướng
          </h2>
          <Button
            color="primary"
            size="sm"
            className="w-full md:w-auto hover:opacity-90 transition-opacity"
            startContent={<span>+</span>}
            onPress={() => setIsOpenModalUrl(true)}
          >
            Thêm mới
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className="p-2 md:p-6 overflow-auto">
          <div className="hidden md:block">
            <Table
              aria-label="Menu navigation"
              classNames={{
                wrapper: "min-h-[400px]",
                table: "border-collapse border-spacing-0",
                th: "bg-gray-50 dark:bg-gray-900 text-sm font-semibold",
                td: "py-4",
              }}
              selectionMode="single"
              defaultSelectedKeys={["1"]}
            >
              <TableHeader>
                <TableColumn className="text-center">TÊN MENU</TableColumn>
                <TableColumn className="text-center">ĐƯỜNG DẪN</TableColumn>
                <TableColumn className="text-center">VỊ TRÍ</TableColumn>
                <TableColumn className="text-center">THAO TÁC</TableColumn>
              </TableHeader>
              <TableBody>
                {navigation && navigation.length > 0 ? (
                  navigation.map((item: any, index: number) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                    >
                      <TableCell className="font-medium text-center">
                        <div className="flex items-center justify-center gap-2">
                          {item.parent_id === null && (
                            <span className="text-primary">●</span>
                          )}
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300 text-center">
                        <span className="hover:text-primary transition-colors">
                          {item.url}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
                            {item.order_position}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            color="primary"
                            variant="flat"
                            className="hover:opacity-90 transition-opacity"
                            onPress={() => handleEdit(item)}
                          >
                            Chỉnh sửa
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            className="hover:opacity-90 transition-opacity"
                            onPress={() => handleDelete(item.id)}
                          >
                            Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">
                      Không có dữ liệu menu
                    </TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">-</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-4">
            {navigation.map((item: any) => (
              <Card key={item.id} className="w-full">
                <CardBody className="p-4 space-y-3">
                  <div className="flex items-center justify-center gap-2 font-medium">
                    {item.parent_id === null && (
                      <span className="text-primary">●</span>
                    )}
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    {item.url}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm">Vị trí:</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
                      {item.order_position}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      className="flex-1 hover:opacity-90 transition-opacity"
                      onPress={() => handleEdit(item)}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      className="flex-1 hover:opacity-90 transition-opacity"
                      onPress={() => handleDelete(item.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
      {/* Modal Url */}
      <ModalUrl
        isOpen={isOpenModalUrl}
        setIsOpen={setIsOpenModalUrl}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default LayoutsPage;
