"use client";
import React, { Suspense } from "react";
import Section_hero from "./Section_hero";
import Section_Introduction from "./Section_Introduction";
import CustomersSayTitle from "./_CustomersSay/CustomersSayTitle";
import Icon from "@/app/_shared/utils/Icon";
import { Tooltip } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomerChooseTitle from "./_CustomerChoose/CustomerChooseTitle";
import Loading from "@/app/_shared/components/Loading";

const PageContent = () => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const router = useRouter();

  const data = [
    {
      icon: "Image",
      path: "?section=hero",
      title: "Panner",
    },
    {
      icon: "Info",
      path: "?section=introduction",
      title: "Giới Thiệu",
    },
    {
      icon: "MessageSquare",
      path: "?section=customers-say",
      title: "Khách Hàng Nói",
    },
    {
      icon: "User",
      path: "?section=customer-choose",
      title: "Khách Hàng Chọn Chúng Tôi",
    },
  ];

  return (
    <div className="relative">
      <div className="fixed bottom-[3rem] left-1/2 transform -translate-x-1/2 z-40 bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
        <div className="flex gap-6">
          {data.map((item, index) => (
            <Tooltip
              content={item.title}
              key={index}
              placement="top"
              color="primary"
              showArrow
            >
              <div className="relative" onClick={() => router.push(item.path)}>
                <Icon
                  icon={item.icon}
                  className={`w-8 h-8 cursor-pointer hover:text-blue-600 ${
                    section === item.path.split("=")[1] ? "text-blue-600" : ""
                  }`}
                />
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      {section === "hero" && <Section_hero />}
      {section === "introduction" && <Section_Introduction />}
      {section === "customers-say" && <CustomersSayTitle />}
      {section === "customer-choose" && <CustomerChooseTitle />}
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PageContent />
    </Suspense>
  );
}
