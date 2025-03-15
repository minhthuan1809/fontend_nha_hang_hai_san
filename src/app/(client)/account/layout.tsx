import BackToTop from "@/app/_shared/components/ui/BackToTop";
import AcountNav from "./AcountNav";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Tài khoản của tôi
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Menu bên trái */}
        <AcountNav />

        {/* Nội dung chính */}
        <div className="md:col-span-3 bg-white rounded-lg shadow-md p-6">
          {children}
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
