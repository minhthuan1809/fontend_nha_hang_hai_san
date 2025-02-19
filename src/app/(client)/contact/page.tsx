import Icon from "@/app/_shared/utils/Icon";
import React from "react";
import SentContact from "./SentContact";
import Navigation from "@/app/_shared/components/ui/Navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ với nhà hàng hải sản Minh Thuận - Nơi mang đến cho bạn những món ăn hải sản tươi ngon nhất với giá cả hợp lý. Đặt bàn ngay hôm nay để nhận ưu đãi đặc biệt!",
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: "Phone",
      title: "Điện thoại",
      content: "0909090909",
    },
    {
      icon: "Mail",
      title: "Email",
      content: "minhthuan@gmail.com",
    },
    {
      icon: "MapPin",
      title: "Địa chỉ",
      content: "Số 123, Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh",
    },
    {
      icon: "Clock",
      title: "Thời gian làm việc",
      content: "8:00 - 18:00",
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl relative z-10 min-h-screen">
      {/* Breadcrumb */}
      <Navigation />

      {/* Map and Contact Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map */}
        <div className="w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.5118067091507!2d105.78673797465657!3d21.04773198735363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3f1b5d9e47%3A0x6f4ae1c1a3aa87e4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgxJDDtG5nIMOB!5e0!3m2!1svi!2s!4v1704811122297!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-4 border-2 border-amber-300 p-4 rounded-lg">
          {/* Title */}
          <h2 className="text-2xl font-bold mb-6 text-amber-500 ">
            Liên hệ với chúng tôi
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {contactInfo.map((item, index) => (
              <div key={index} className="bg-amber-50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Icon
                      icon={item.icon}
                      size={20}
                      className="text-amber-600"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 font-medium">
                      {item.title}
                    </span>
                    <span className="text-gray-800">{item.content}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <SentContact />
        </div>
      </div>
    </div>
  );
}
