const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

export const getStats = async (token: string, date: any) => {
  let formattedDate;

  if (date) {
    formattedDate = date.year + "-" + date.month + "-" + date.day;
  } else {
    const today = new Date();
    formattedDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  }

  try {
    const response = await fetch(`${API}/stats?date=${formattedDate}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu thống kê:", error);
    throw error;
  }
};
