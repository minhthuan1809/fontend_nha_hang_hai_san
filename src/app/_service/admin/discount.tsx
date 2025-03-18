const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

// Get discount
export const getDiscount = async (token: string, coupon: string) => {
  try {
    const res = await fetch(`${API}/discount?search=${coupon}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy mã giảm giá:", error);
    throw error;
  }
};
// Get discount by id
export const getDiscountByCoupon = async (token: string, search: string) => {
  try {
    const res = await fetch(`${API}/discount/search?search=${search}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy mã giảm giá:", error);
    throw error;
  }
};
// Create discount
export const createDiscount = async (token: string, data: any) => {
  try {
    const res = await fetch(`${API}/discount`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        discount_percent: data.discount_percent,
        quantity: data.quantity,
        start_time: data.start_time,
        end_time: data.end_time,
      }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi tạo mã giảm giá:", error);
    throw error;
  }
};

//deleteDiscount
export const deleteDiscount = async (id: string, token: string) => {
  try {
    const res = await fetch(`${API}/discount/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi xóa mã giảm giá:", error);
    throw error;
  }
};

// Update discount
export const updateDiscount = async (token: string, id: any, data: any) => {
  try {
    const res = await fetch(`${API}/discount/${id}`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        discount_percent: data.discount_percent,
        quantity: data.quantity,
        start_time: data.start_time,
        end_time: data.end_time,
      }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi cập nhật mã giảm giá:", error);
    throw error;
  }
};

// get discount history
export const getDiscountHistory = async (token: string) => {
  try {
    const res = await fetch(`${API}/history_discount`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử mã giảm giá:", error);
    throw error;
  }
};
