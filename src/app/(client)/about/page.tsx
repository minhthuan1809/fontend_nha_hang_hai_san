"use client";
import React, { useEffect, useState } from "react";
import Icon from "@/app/_shared/utils/Icon";
import { getAbout } from "@/app/_service/client/layout";

const AboutDetail = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [orderingProcess, setOrderingProcess] = useState<any>([]);
  const [onlineService, setOnlineService] = useState<any>([]);
  const [spaceData, setSpaceData] = useState<any>([]);
  const [benefits, setBenefits] = useState<any>([]);
  const [commitment, setCommitment] = useState<any>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      const data = await getAbout();
      if (data.ok) {
        setAboutData(data.data.layout_story[0]);
        setOrderingProcess(data.data.layout_ordering_process);
        setOnlineService(data.data.layout_ordering_online);
        setSpaceData(data.data.layout_space);
        setBenefits(data.data.layout_benefit);
        setCommitment(data.data.layout_commitment[0]);
      }
    };
    fetchAbout();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* History Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
            {aboutData ? aboutData.title : "Câu Chuyện Của Chúng Tôi"}
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-4">
              {aboutData ? aboutData.description_one : ""}
            </p>
            <p className="text-gray-700">
              {aboutData ? aboutData.description_two : ""}
            </p>
          </div>
        </div>

        {/* Kitchen Workspace Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
            Không Gian
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spaceData.map((space: any) => (
              <div key={space.id} className="bg-white rounded-lg shadow-lg p-6">
                <Icon
                  icon={space.icon}
                  className="w-12 h-12 text-amber-600 mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">{space.title}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {space.description_one}</li>
                  <li>• {space.description_two}</li>
                  <li>• {space.description_three}</li>
                  <li>• {space.description_four}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-8 gap-2 mb-16">
          {benefits.map((benefit: any) => (
            <div
              key={benefit.id}
              className="bg-white md:p-6 py-4 rounded-lg shadow-lg text-center"
            >
              <Icon
                icon={benefit.icon}
                size={48}
                className="text-amber-600 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Online Service Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
            Dịch Vụ Đặt Hàng Online
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {onlineService.map((service: any) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <Icon
                  icon={service.icon}
                  size={48}
                  className="text-amber-600 mb-4"
                />
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {service.description_one}</li>
                  <li>• {service.description_two}</li>
                  <li>• {service.description_three}</li>
                  <li>• {service.description_four}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Ordering Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
            Quy Trình Đặt Hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {orderingProcess.map((process: any) => (
              <div
                key={process.id}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <Icon
                  icon={process.icon}
                  size={48}
                  className="text-amber-600 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-amber-600 mb-6 ">
            {commitment ? commitment?.title : ""}
          </h2>
          <div className="text-gray-700 space-y-4 ">
            <p>• {commitment ? commitment.description_one : ""}</p>
            <p>• {commitment ? commitment.description_two : ""}</p>
            <p>• {commitment ? commitment.description_three : ""}</p>
            <p>• {commitment ? commitment.description_four : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDetail;
