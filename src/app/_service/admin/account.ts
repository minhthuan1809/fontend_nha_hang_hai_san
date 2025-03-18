const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

// lấy danh sách đại chỉ
export const getAddresses = async (token: any) => {
  try {
    const response = await fetch(`${API}/address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy danh sách địa chỉ",
    };
  }
};

// thêm đại chỉ
export const addAddress = async (address: any, token: any) => {
  try {
    const response = await fetch(`${API}/address`, {
      method: "POST",
      body: JSON.stringify(address),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi thêm địa chỉ",
    };
  }
};

// xóa đại chỉ
export const deleteAddress = async (id: string, token: any) => {
  try {
    const response = await fetch(`${API}/address/${id}`, {
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
      message: "Đã xảy ra lỗi khi xóa địa chỉ",
    };
  }
};

// cập nhật đại chỉ
export const updateAddress = async (id: string, address: any, token: any) => {
  try {
    const response = await fetch(`${API}/address/${id}`, {
      method: "PUT",
      body: JSON.stringify(address),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi cập nhật địa chỉ",
    };
  }
};

// change password
export const changePassword = async (data: any, token: any) => {
  try {
    const response = await fetch(`${API}/change_password`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi đổi mật khẩu",
    };
  }
};

// cập nhật thông tin tài khoản
export const updateAccount = async (data: any, token: any) => {
  try {
    const response = await fetch(`${API}/change_infor_user`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi cập nhật thông tin tài khoản",
    };
  }
};
