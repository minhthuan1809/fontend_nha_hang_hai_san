"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import ArticlesPage from "./Tiptap";
import { getNews } from "@/app/_service/client/layout";
import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Chip,
  Card,
  CardBody,
  Input,
} from "@nextui-org/react";
import Detail from "./detail";
import { deleteNews } from "@/app/_service/admin/articles";
import { enqueueSnackbar } from "notistack";
import Pagination from "@/app/_shared/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/_shared/components/Loading";
import Icon from "@/app/_shared/utils/Icon";
import { getCookie } from "cookies-next";

function NewsTable() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [newsDetail, setNewsDetail] = useState<any>(null);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [reload, setReload] = useState(false);
  const searchParams = useSearchParams();
  const pageParams = Number(searchParams.get("page")) || 1;
  const [openTiptap, setOpenTiptap] = useState(
    localStorage.getItem("openTiptap") === "true" || false
  );
  const [dataEdit, setDataEdit] = useState<any>(null);
  const [search, setSearch] = useState("");
  const token = getCookie("token");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNews(20, pageParams, search);
      if (data.ok) {
        setNewsData(data.data);
        setTotal(data.total_pages);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  }, [pageParams, reload, search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [fetchData]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleViewDetail = (id: number) => {
    setIsOpenDetail(true);
    setNewsDetail(id);
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Bạn có chắc là muốn xóa không ?")) return;
    const response = await deleteNews(id, token as string);
    if (response.ok) {
      setReload(!reload);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  if (openTiptap) {
    return (
      <ArticlesPage
        setReload={() => setReload(!reload)}
        onClose={() => setOpenTiptap((pre) => !pre)}
        idEdit={dataEdit}
        setIdEdit={setDataEdit}
      />
    );
  }

  return (
    <Card className="shadow-lg border border-gray-200 rounded-lg">
      <CardBody className="hidden md:block">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Quản lý tin tức</h2>
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <Input
              placeholder="Tìm kiếm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-xl w-full"
              startContent={<Icon icon="Search" />}
            />
            <Button
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 transition duration-200"
              onClick={() => {
                setOpenTiptap((pre) => !pre);
                localStorage.setItem("openTiptap", "true");
              }}
            >
              Thêm mới
            </Button>
          </div>
        </div>

        <Table
          aria-label="Bảng tin tức"
          className="mb-4"
          isStriped
          isHeaderSticky
          shadow="sm"
          selectionMode="single"
          classNames={{
            table: "min-w-full",
            thead: "bg-gray-100",
          }}
        >
          <TableHeader>
            <TableColumn className="font-bold">STT</TableColumn>
            <TableColumn className="font-bold">Tiêu đề</TableColumn>
            <TableColumn className="font-bold">Mô tả</TableColumn>
            <TableColumn className="font-bold">Hình ảnh</TableColumn>
            <TableColumn className="font-bold">Ngày tạo</TableColumn>
            <TableColumn className="font-bold">Trạng thái</TableColumn>
            <TableColumn className="font-bold">Hành động</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              <div className="text-center text-gray-500">Không có dữ liệu</div>
            }
            isLoading={loading}
          >
            {newsData.length === 0 ? (
              <TableRow>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell className="text-center">Không có dữ liệu</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            ) : (
              newsData.map((item: any, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    {item.title}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.description.slice(0, 500)}...
                  </TableCell>
                  <TableCell>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{formatDate(item.created_at)}</TableCell>
                  <TableCell>
                    <Chip
                      color={item.status === "1" ? "success" : "warning"}
                      variant="flat"
                      size="sm"
                    >
                      {item.status === "1" ? "Đã đăng" : "Bản nháp"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Tooltip content="Xem chi tiết">
                        <Button
                          isIconOnly
                          color="primary"
                          variant="light"
                          aria-label="Xem chi tiết"
                          onClick={() => handleViewDetail(item.id)}
                        >
                          <Icon icon="Eye" size={18} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Chỉnh sửa">
                        <Button
                          isIconOnly
                          color="warning"
                          variant="light"
                          aria-label="Chỉnh sửa"
                          onClick={() => {
                            setDataEdit(item.id);
                            setOpenTiptap((pre) => !pre);
                            localStorage.setItem("openTiptap", "true");
                            localStorage.setItem("dataEditTiptap", item.id);
                          }}
                        >
                          <Icon icon="Edit" size={18} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Xóa">
                        <Button
                          isIconOnly
                          color="danger"
                          variant="light"
                          aria-label="Xóa"
                          onClick={() => handleDeleteNews(item.id)}
                        >
                          <Icon icon="Trash2" size={18} />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Detail
          onOpen={setIsOpenDetail}
          isOpen={isOpenDetail}
          data={newsDetail}
        />
        <div className="flex justify-center">
          <Pagination total={total} page={page} />
        </div>
      </CardBody>

      {/* // mobile */}
      <Card className="block md:hidden shadow-lg rounded-lg overflow-hidden">
        <CardBody className="p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
            Quản lý tin tức
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <Input
                placeholder="Tìm kiếm tin tức..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                startContent={<Icon icon="Search" />}
              />
              <Button
                color="primary"
                className="bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg shadow-md px-4 py-2 text-white font-semibold"
                onClick={() => {
                  setOpenTiptap((pre) => !pre);
                  localStorage.setItem("openTiptap", "true");
                }}
              >
                Thêm mới
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <ul className="space-y-4">
              {newsData.map((item: any) => (
                <li
                  key={item.id}
                  className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                >
                  <div className="w-full h-60 mb-4">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-600">
                      {item.description.slice(0, 200)}...
                    </p>
                    <p className="text-gray-500">
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-between mt-2">
                    <div className="flex gap-2">
                      {" "}
                      <Button
                        isIconOnly
                        color="primary"
                        variant="light"
                        aria-label="Xem chi tiết"
                      >
                        <Icon icon="Eye" size={20} />
                      </Button>
                      <Button
                        isIconOnly
                        color="warning"
                        variant="light"
                        aria-label="Chỉnh sửa"
                      >
                        <Icon icon="Edit" size={20} />
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        aria-label="Xóa"
                      >
                        <Icon icon="Trash2" size={20} />
                      </Button>
                    </div>

                    <p
                      className={`text-gray-500 text-sm border border-gray-200 rounded-lg  font-bold flex items-center justify-center px-2 py-1 ${
                        item.status === "1"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.status === "1" ? "Đã đăng" : "Bản nháp"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardBody>
      </Card>
    </Card>
  );
}

const NewsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <NewsTable />
    </Suspense>
  );
};
export default NewsPage;
