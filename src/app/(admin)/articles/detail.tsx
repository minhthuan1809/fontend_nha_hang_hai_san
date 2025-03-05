"use client";
import { getNewsDetail } from "@/app/_service/client/layout";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Detail({
  onOpen,
  isOpen,
  data,
}: {
  onOpen: (a: any) => void;
  isOpen: boolean;
  data: any;
}) {
  const [newsDetail, setNewsDetail] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNewsDetail(data);
      if (response.ok && response.success) {
        setNewsDetail(response.data);
      } else {
        console.error("Lỗi khi lấy chi tiết tin tức");
      }
    };
    fetchData();
  }, [data]);

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpen} size="3xl" placement="left">
      <DrawerContent>
        <DrawerHeader className="flex flex-col md:flex-row justify-between items-start gap-2">
          <h2 className="text-lg font-semibold">
            {newsDetail ? newsDetail.title : ""}
          </h2>
        </DrawerHeader>
        <DrawerBody>
          {newsDetail && newsDetail.description ? (
            <div className="mt-4">
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: newsDetail.description
                    .replace(/<ol>/g, '<ol class="list-decimal pl-4">')
                    .replace(/<ul>/g, '<ul class="list-disc">')
                    .replace(
                      /<blockquote>/g,
                      '<blockquote class="border-gray-300 pl-4 border-solid m-2 italic border-l-2">""'
                    )
                    .replace(/<\/blockquote>/g, '""</blockquote>')
                    .replace(/<p>/g, '<p class="mb-4">')
                    .replace(/<h1>/g, '<h1 class="text-2xl font-bold mb-2">')
                    .replace(/<h2>/g, '<h2 class="text-xl font-bold mb-2">')
                    .replace(/<h3>/g, '<h3 class="text-lg font-bold mb-2">'),
                }}
              />
            </div>
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button color="danger" variant="light" onPress={onOpen}>
            Đóng
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
