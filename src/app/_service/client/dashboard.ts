const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

// lấy dữ liệu dashboard
export const getDashboard = async () => {
  try {
    const res = await fetch(`${API}/dashboard`);
    return res.json();
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu dashboard:", error);
    throw error;
  }
};
