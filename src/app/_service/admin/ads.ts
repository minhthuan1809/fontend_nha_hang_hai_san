// xóa quảng cáo
const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;
export const deleteAd = async (id: number, token: string) => {
  try {
    const response = await fetch(`${API}/ads/${id}`, {
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
      message: "Đã xảy ra lỗi khi xóa quảng cáo",
    };
  }
};
// edit quảng cáo
export const editAd = async (id: number, data: any, token: string) => {
  try {
    const response = await fetch(`${API}/ads/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi sửa quảng cáo",
    };
  }
};

// thêm quảng cáo
export const addAd = async (data: any, token: string) => {
  try {
    const response = await fetch(`${API}/ads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi thêm quảng cáo",
    };
  }
};
