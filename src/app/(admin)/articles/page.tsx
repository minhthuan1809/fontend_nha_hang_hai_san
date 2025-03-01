"use client";

import React, { Suspense, useEffect, useState } from "react";
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
} from "@nextui-org/react";
import Detail from "./detail";
import { deleteNews } from "@/app/_service/admin/articles";
import { enqueueSnackbar } from "notistack";
import Pagination from "@/app/_shared/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/_shared/components/Loading";
import Icon from "@/app/_shared/utils/Icon";

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getNews(20, pageParams);
        if (data.ok) {
          setNewsData(data.data);
          setTotal(data.total_pages);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageParams, reload]);

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
    console.log(id);
    setIsOpenDetail(true);
    setNewsDetail(id);
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Bạn có chắc là muốn xóa không ?")) return;
    const response = await deleteNews(id);
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
    <Card className="shadow-md">
      <CardBody>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Quản lý tin tức</h2>
          <Button
            color="primary"
            className="bg-blue-600"
            onClick={() => {
              setOpenTiptap((pre) => !pre);
              localStorage.setItem("openTiptap", "true");
            }}
          >
            <Icon icon="Plus" size={18} /> Thêm mới
          </Button>
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
            emptyContent={<div>Không có dữ liệu</div>}
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
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    {item.title}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.description}
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
