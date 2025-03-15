const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

export const getCard = async (token: string) => {
  try {
    const response = await fetch(`${API}/card`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu card",
    };
  }
};

// Xóa sản phẩm trong giỏ hàng
export const deleteCard = async (token: string, id: number) => {
  try {
    const response = await fetch(`${API}/card/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng",
    };
  }
};

// Thêm sản phẩm vào giỏ hàng
export const addCard = async (token: string, id: number) => {
  try {
    const response = await fetch(`${API}/card`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: id, quantity: 1 }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng",
    };
  }
};

// Trừ số lượng sản phẩm
export const MinusQuantity = async (token: string, id: number) => {
  try {
    const response = await fetch(`${API}/card/minus/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi trừ số lượng sản phẩm",
    };
  }
};
