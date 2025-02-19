import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm",
  description:
    "Danh sách sản phẩm tại nhà hàng hải sản Minh Thuận Danh sách các món ăn tươi ngon, hải sản chất lượng cao, phục vụ tận tình.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
