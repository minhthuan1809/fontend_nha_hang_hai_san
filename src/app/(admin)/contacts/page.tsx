"use client";

import {
  deleteContact,
  getContacts,
  updateReadContact,
} from "@/app/_service/admin/contacts";
import Loading from "@/app/_shared/components/Loading";
import Pagination from "@/app/_shared/components/ui/Pagination";
import { Button, Input } from "@nextui-org/react";

import { useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, {
  Suspense,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import ViewContactModal from "./ModalViewContact";
import Icon from "@/app/_shared/utils/Icon";
import { getCookie } from "cookies-next";
import ModalSendGmail from "./ModalSendGmail";
import { deleteHistory, getHistory } from "@/app/_service/admin/sentgmail";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [dataModalContact, setDataModalContact] = useState(null);
  const [activeContact, setActiveContact] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  const [reload, setReload] = useState(false);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const token = getCookie("token");
  const [openModalSendGmail, setOpenModalSendGmail] = useState(false);
  const [form, setForm] = useState({
    email: "",
    subject: "",
    content: "",
  });
  const [openHistory, setOpenHistory] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    const res = await getContacts(
      Number(page),
      Number(limit),
      searchTerm,
      token as string
    );
    const resHistory = await getHistory(token as string, searchTerm);
    if (resHistory.ok) {
      setHistory(resHistory.data || []);
    } else {
      enqueueSnackbar(res.message, {
        variant: "error",
      });
    }

    if (res.ok) {
      setContacts(res.data || []);
      setTotalPages(res.total_pages);
    } else {
      console.error(res.message);
    }
    setIsLoading(false);
  }, [page, limit, searchTerm, reload]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchContacts();
    }, 500);
    return () => clearTimeout(timeout);
  }, [fetchContacts]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa liên hệ này không?")) return;
    const res = await deleteContact(id, token as string);
    if (res.ok) {
      fetchContacts();
      enqueueSnackbar(res.message, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(res.message, {
        variant: "error",
      });
    }
  };

  // handle read contact
  const handleReadContact = async (contact: any) => {
    const data = await updateReadContact(contact.id, token as string);
    if (data.ok) {
      setReload((prev) => !prev);
    } else {
      enqueueSnackbar(data.message, {
        variant: "error",
      });
    }
  };

  // handle view contact
  const handleView = async (contact: any) => {
    handleReadContact(contact);
    setViewModalOpen(true);
    setDataModalContact(contact);
  };

  const toggleActionMenu = (contactId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActionMenu(showActionMenu === contactId ? null : contactId);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return `Hôm nay, ${date.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      }

      if (date.toDateString() === yesterday.toDateString()) {
        return `Hôm qua, ${date.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      }

      return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  //handleDeleteHistory
  const handleDeleteHistory = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa lịch sử này không?")) return;
    const res = await deleteHistory(id, token as string);
    if (res.ok) {
      enqueueSnackbar(res.message, {
        variant: "success",
      });
      fetchContacts();
    } else {
      enqueueSnackbar(res.message, {
        variant: "error",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[calc(100vh-50px)]">
      <div className="p-6 border-b bg-white sticky top-0 z-10">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {openHistory ? "Lịch sử" : "Danh Sách Liên Hệ"}
          </h2>
          <div className="flex-1"></div>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <Input
              placeholder="Tìm kiếm liên hệ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={
                <Icon icon="SearchIcon" className="w-5 h-5 text-gray-500" />
              }
              className="w-full md:w-80"
              size="md"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-white border-2 hover:border-blue-500",
              }}
            />
            <div className="flex gap-2 items-center justify-center">
              <Button
                color="primary"
                className="px-9"
                size="md"
                startContent={<Icon icon="SendIcon" className="w-5 h-5" />}
                onPress={() => {
                  setOpenModalSendGmail(true);
                  setForm({
                    email: "",
                    subject: "",
                    content: "",
                  });
                }}
              >
                Gửi Email
              </Button>
              <Button
                color="danger"
                size="md"
                className="px-9"
                onPress={() => {
                  setOpenHistory(!openHistory);
                }}
              >
                {openHistory ? "Hộp thư" : "Lịch sử"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <Icon icon="SearchIcon" className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Không tìm thấy liên hệ
          </h3>
          <p className="text-gray-600 text-center max-w-lg">
            Không có liên hệ nào phù hợp với tìm kiếm của bạn. Vui lòng thử lại
            với từ khóa khác.
          </p>
        </div>
      ) : (
        <>
          {openHistory ? (
            <div>
              <div className="overflow-hidden">
                <div className="overflow-y-auto max-h-[calc(100vh-220px)]">
                  {history.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 pt-10">
                        Không có lịch sử nào
                      </p>
                    </div>
                  ) : (
                    history.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="border-b  transition-all duration-200 p-6 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setDataModalContact(item);
                          setViewModalOpen(true);
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold text-lg text-gray-900">
                              {item.gmail}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(item.created_at).toLocaleString("vi-VN")}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="font-medium text-gray-900 mb-1">
                            Tiêu đề : {item.title}
                          </div>
                          <div className="text-gray-600 line-clamp-2">
                            Nội dung : {item.content.slice(0, 250)}
                          </div>
                        </div>
                        <span
                          className="text-red-500 cursor-pointer hover:text-red-600 hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteHistory(item.id);
                          }}
                        >
                          Xóa
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-hidden">
                <div className="overflow-y-auto max-h-[calc(100vh-220px)]">
                  {contacts.map((contact: any) => (
                    <div
                      key={contact.id}
                      className={`border-b hover:bg-gray-50 transition-all duration-200 ${
                        activeContact === contact.id ? "bg-blue-50" : ""
                      } ${!contact.is_read ? "bg-gray-100" : ""}`}
                      onClick={() => handleView(contact)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold text-lg text-gray-900">
                              {contact.name}
                            </div>
                            <div
                              className={`text-xs px-3 py-1 rounded-full ${
                                contact.is_read
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {contact.is_read ? "Đã đọc" : "Chưa đọc"}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatDate(contact.created_at)}
                          </div>
                        </div>

                        <div className="text-sm text-blue-600 mb-2">
                          {contact.gmail}
                        </div>

                        <div className="mb-4">
                          <div className="font-medium text-gray-900 mb-1">
                            Tiêu đề : {contact.title}
                          </div>
                          <div className="text-gray-600 line-clamp-2">
                            Nội dung : {contact.content}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="flat"
                              className="bg-gray-100 hover:bg-gray-200"
                              onPress={(e) => {
                                handleView(contact);
                              }}
                              startContent={
                                <Icon icon="EyeIcon" className="w-4 h-4" />
                              }
                            >
                              Xem chi tiết
                            </Button>
                            <Button
                              size="sm"
                              variant="flat"
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                              onPress={() => {
                                setOpenModalSendGmail(true);
                                setForm({
                                  email: contact.gmail,
                                  subject: "",
                                  content: "",
                                });
                              }}
                              startContent={
                                <Icon icon="SendIcon" className="w-4 h-4" />
                              }
                            >
                              Trả lời
                            </Button>
                          </div>

                          <div className="relative">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onClick={(e) => toggleActionMenu(contact.id, e)}
                            >
                              <Icon
                                icon="MoreVerticalIcon"
                                className="w-5 h-5"
                              />
                            </Button>

                            {showActionMenu === contact.id && (
                              <div
                                ref={actionMenuRef}
                                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl z-20 border overflow-hidden"
                              >
                                <div
                                  className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(contact.id);
                                    setShowActionMenu(null);
                                  }}
                                >
                                  <Icon icon="TrashIcon" className="w-4 h-4" />
                                  Xóa liên hệ
                                </div>
                                <div
                                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReadContact(contact);
                                  }}
                                >
                                  <Icon icon="EyeIcon" className="w-4 h-4" />
                                  Đánh dấu đã đọc
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center p-6 border-t bg-gray-50">
                  <Pagination total={totalPages} page={Number(page)} />
                </div>
              </div>
            </>
          )}
          <ModalSendGmail
            open={openModalSendGmail}
            onOpenChange={setOpenModalSendGmail}
            data={form}
            setForm={setForm}
            setReload={setReload}
          />
        </>
      )}

      <ViewContactModal
        contact={dataModalContact}
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
      />
    </div>
  );
}

function Super() {
  return (
    <Suspense fallback={<Loading />}>
      <Contacts />
    </Suspense>
  );
}

export default Super;
