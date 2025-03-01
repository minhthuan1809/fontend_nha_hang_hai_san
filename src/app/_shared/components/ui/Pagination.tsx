"use client";
import { Pagination as PaginationUI } from "@nextui-org/react";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Pagination({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  const router = useRouter();
  const pathName = usePathname();
  // change page
  const changePage = (page: number) => {
    router.push(`${pathName}?page=${page}`);
  };
  if (total <= 1) return null;
  // render
  return (
    <div className="flex justify-center items-center my-12">
      <PaginationUI
        total={total}
        initialPage={page}
        showShadow
        color="warning"
        onChange={(page) => changePage(page)}
      />
    </div>
  );
}
