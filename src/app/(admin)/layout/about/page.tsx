"use client";
import { getAbout } from "@/app/_service/client/layout";
import React, { useEffect, useState } from "react";
import Story from "./Story";
import Loading from "@/app/_shared/components/Loading";
import Space from "./Space";
import OrderingService from "./OrderingService";
import OrderProcess from "./OrderProcess";
import Commitment from "./Commitment";

export default function page() {
  const [data, setData] = useState<any>(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAbout();
      if (response.ok) {
        setData(response.data);
      } else {
        console.error("Lỗi khi lấy dữ liệu:", response.message);
      }
    };
    fetchData();
  }, [refetch]);

  if (!data || !data.layout_story) {
    return <Loading />; // Thông báo khi dữ liệu chưa có
  }

  return (
    <div className="space-y-10">
      <Story data={data.layout_story[0]} setRefetch={setRefetch} />
      <Space
        data={{
          layout_space: data.layout_space,
          layout_benefit: data.layout_benefit,
        }}
        setRefetch={setRefetch}
      />
      <OrderingService
        data={data.layout_ordering_online}
        setRefetch={setRefetch}
      />
      <OrderProcess
        data={data.layout_ordering_process}
        setRefetch={setRefetch}
      />
      <Commitment data={data.layout_commitment[0]} setRefetch={setRefetch} />
    </div>
  );
}
