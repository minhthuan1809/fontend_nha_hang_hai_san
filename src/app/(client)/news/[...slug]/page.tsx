"use client";
import Navigation from "@/app/_shared/components/ui/Navigation";
import React, { Suspense, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { getNewsDetail } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";

function NewsDetailPage() {
  const [newsDetail, setNewsDetail] = useState<any>(null);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const id = searchParams.get("number");
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const response = await getNewsDetail(id);
      if (response.ok && response.success) {
        if (response.data.status === "1") {
          setNewsDetail(response.data);
          setLoading(false);
        } else {
          router.push("/news");
          setLoading(false);
        }
      } else {
        console.error("Lỗi khi lấy chi tiết tin tức");
      }
    };
    fetchNews();
  }, [id]);

  if (!newsDetail || loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl min-h-screen">
      <Navigation />

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">{newsDetail.title}</h1>

        <div
          className="prose max-w-none"
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
    </div>
  );
}

function NewsDetailPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <NewsDetailPage />
    </Suspense>
  );
}

export default NewsDetailPageWrapper;
