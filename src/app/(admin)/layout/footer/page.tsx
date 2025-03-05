"use client";
import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import Loading from "@/app/_shared/components/Loading";
import { getFooter } from "@/app/_service/client/layout";
import SocialLink from "./SocialLink";
import IntroductionFooter from "./IntroductionFooter";
import CopyRight from "./CopyRight";

export default function Footer() {
  const [data, setData] = useState<any>([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getFooter();

      if (response.ok) {
        setData(response.data);
      }
    };
    fetchData();
  }, [refetch]);
  if (!data) return <Loading />;
  return (
    <div className="space-y-10">
      <IntroductionFooter data={data.introduction} setRefetch={setRefetch} />
      <Contact data={data.contacts} setRefetch={setRefetch} />
      <SocialLink data={data.social_links} setRefetch={setRefetch} />
      <CopyRight data={data.copyright} setRefetch={setRefetch} />
    </div>
  );
}
