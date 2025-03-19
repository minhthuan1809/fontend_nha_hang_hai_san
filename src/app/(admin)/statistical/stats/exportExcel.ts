import * as XLSX from "xlsx";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const exportToExcel = (statsData: any) => {
  // Tạo dữ liệu cho từng phần
  const productData =
    statsData?.productStats?.map((item: any) => ({
      ID: item.id,
      "Tên sản phẩm": item.name,
      Giá: formatCurrency(item.price),
      "Số đơn": item.order_count,
      "Số lượng": item.total_quantity,
      "Doanh thu": formatCurrency(item.total_revenue),
    })) || [];

  const paymentData = () => {
    const data =
      statsData?.paymentMethodStats?.map((item: any) => ({
        "Phương thức": item.method,
        Mã: item.method_code,
        "Số đơn": item.total_orders,
        "Doanh thu": formatCurrency(item.total_revenue),
      })) || [];

    const totalRevenue = data.reduce((sum: number, item: any) => {
      return sum + (parseFloat(item["Doanh thu"].replace(/[^\d]/g, "")) || 0);
    }, 0);

    return [
      ...data,
      {
        "Phương thức": "Tổng cộng",
        Mã: "",
        "Số đơn": data.reduce(
          (sum: number, item: any) => sum + item["Số đơn"],
          0
        ),
        "Doanh thu": formatCurrency(totalRevenue),
      },
    ];
  };

  const discountData =
    statsData?.discountStats?.map((item: any) => ({
      "Mã giảm giá": item.discount_code,
      "Số lần dùng": item.times_used,
      "Tổng giảm": formatCurrency(item.total_discount_amount),
    })) || [];

  // Tạo workbook mới
  const wb = XLSX.utils.book_new();

  // Tạo và định dạng các worksheet
  const sheets = [
    { name: "Sản phẩm", data: productData },
    { name: "Thanh toán", data: paymentData() },
    { name: "Mã giảm giá", data: discountData },
  ];

  sheets.forEach((sheet) => {
    if (sheet.data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(sheet.data);
      XLSX.utils.sheet_add_json(ws, sheet.data, {
        origin: "A2",
        skipHeader: true,
      });

      // Thêm style cho header
      const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
      const headers = Object.keys(sheet.data[0]);

      // Thêm header vào A1
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

      // Style cho header
      for (let i = 0; i <= range.e.c; i++) {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
        if (!ws[cellRef]) ws[cellRef] = {};
        ws[cellRef].s = {
          fill: { fgColor: { rgb: "FF000000" } }, // Nền đen
          font: { color: { rgb: "FFFFFFFF" }, bold: true }, // Chữ trắng và đậm
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      }

      // Border cho tất cả các ô
      for (let r = 1; r <= range.e.r + 1; r++) {
        for (let c = 0; c <= range.e.c; c++) {
          const cellRef = XLSX.utils.encode_cell({ r, c });
          if (!ws[cellRef]) ws[cellRef] = {};
          ws[cellRef].s = {
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          };
        }
      }

      // Điều chỉnh độ rộng cột
      const colWidths = headers.map((header) => ({
        wch: Math.max(
          header.length,
          ...sheet.data.map((row: any) => String(row[header]).length),
          15
        ),
      }));
      ws["!cols"] = colWidths;

      XLSX.utils.book_append_sheet(wb, ws, sheet.name);
    }
  });

  // Xuất file với ngày giờ
  const now = new Date();
  const dateStr = now.toLocaleDateString("vi-VN").replace(/\//g, "-");
  const timeStr = now.toLocaleTimeString("vi-VN").replace(/:/g, "-");
  const fileName = `Thong_ke_${dateStr}_${timeStr}.xlsx`;

  XLSX.writeFile(wb, fileName);
};
