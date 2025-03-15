const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

// get all order
export const getAllOrder = async (token: string) => {
  try {
    const res = await fetch(`${API}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy danh sách đơn hàng",
    };
  }
};

// confirm order
export const confirmOrder = async (
  token: string,
  id: string,
  status: string
) => {
  try {
    const res = await fetch(`${API}/orders/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return res.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi xác nhận đơn hàng",
    };
  }
};
