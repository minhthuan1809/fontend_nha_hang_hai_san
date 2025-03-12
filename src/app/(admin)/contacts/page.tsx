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
  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    const res = await getContacts(
      Number(page),
      Number(limit),
      searchTerm,
      token as string
    );

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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[calc(100vh-50px)]">
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex flex-col md:flex-row gap-3">
          <h2 className="text-xl font-semibold text-gray-800 ">
            Danh Sách Liên Hệ
          </h2>
          <div className="flex-1"></div>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={
                <Icon icon="SearchIcon" className="w-4 h-4 text-gray-400" />
              }
              className="w-full md:w-64"
              size="sm"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-gray-50 hover:bg-gray-100",
              }}
            />
            <Button
              isIconOnly
              variant="flat"
              className="bg-gray-50 hover:bg-gray-100"
              size="sm"
            >
              <Icon icon="FilterIcon" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Icon icon="SearchIcon" className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            Không tìm thấy liên hệ
          </h3>
          <p className="text-gray-500 max-w-md">
            Không có liên hệ nào phù hợp với tìm kiếm của bạn. Vui lòng thử lại
            với từ khóa khác.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-y-auto max-h-[calc(100vh-220px)]">
            {contacts.map((contact: any) => (
              <div
                key={contact.id}
                className={`border-b  cursor-pointer transition-colors duration-150 ${
                  activeContact === contact.id ? "bg-blue-50" : ""
                } ${!contact.is_read ? "bg-gray-300" : ""}`}
                onClick={() => handleView(contact)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-900">
                        {contact.name}
                      </div>
                      <div className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {contact.is_read ? "Đã đọc" : "Mới"}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(contact.created_at)}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-1 truncate">
                    {contact.gmail}
                  </div>

                  <div className="mb-2">
                    <div className="font-medium text-gray-800">
                      {contact.title}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {contact.content}
                    </div>
                  </div>

                  <div className="flex justify-between mt-2">
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="flat"
                        className="bg-transparent hover:bg-gray-100 px-2 h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(contact);
                        }}
                      >
                        <Icon icon="EyeIcon" className="w-4 h-4 mr-1" />
                        <span className="text-xs">Xem</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        className="bg-transparent hover:bg-gray-100 px-2 h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Icon icon="SendIcon" className="w-4 h-4 mr-1" />
                        <span className="text-xs">Trả lời</span>
                      </Button>
                    </div>

                    <div className="relative">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="bg-transparent hover:bg-gray-100 h-8"
                        onClick={(e) => toggleActionMenu(contact.id, e)}
                      >
                        <Icon icon="MoreVerticalIcon" className="w-4 h-4" />
                      </Button>

                      {showActionMenu === contact.id && (
                        <div
                          ref={actionMenuRef}
                          className="absolute right-0 top-full  mt-1 w-48 bg-white rounded-md shadow-lg z-20 border overflow-hidden"
                        >
                          <div
                            className="px-4 py-2 w-full text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(contact.id);
                              setShowActionMenu(null);
                            }}
                          >
                            <Icon
                              icon="TrashIcon"
                              className="w-4 h-4 inline-block mr-2"
                            />
                            Xóa liên hệ
                          </div>
                          <div
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReadContact(contact);
                            }}
                          >
                            <Icon
                              icon="EyeIcon"
                              className="w-4 h-4 inline-block mr-2"
                            />
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

          <div className="flex justify-center p-4 border-t bg-gray-50">
            <Pagination total={totalPages} page={Number(page)} />
          </div>
        </div>
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
