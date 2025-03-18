const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

// get all order
export const getAllOrder = async (
  token: string,
  page: number,
  search: string
) => {
  try {
    const res = await fetch(
      `${API}/orders?page=${page}&limit=30&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy danh sách đơn hàng",
    };
  }
};

// confirm order && sửa địa chỉ
export const confirmOrder = async (token: string, id: string, data: any) => {
  try {
    const res = await fetch(`${API}/orders/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();

    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi xác nhận đơn hàng",
    };
  }
};

// get history order
export const getHistoryOrder = async (
  token: string,
  page: number,
  search: string
) => {
  try {
    const res = await fetch(
      `${API}/history_order?page=${page}&limit=30&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy lịch sử đơn hàng",
    };
  }
};
