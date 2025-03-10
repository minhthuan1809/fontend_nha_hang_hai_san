const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;
export const getUser = async (
  token: string,
  search: string,
  page: number,
  limit: number
) => {
  try {
    const response = await fetch(
      `${API}/users?search=${search}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu người dùng",
    };
  }
};

//deleteUser
export const deleteUser = async (token: string, id: string) => {
  try {
    const response = await fetch(`${API}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi xóa người dùng",
    };
  }
};

// select role
export const getSelectRole = async () => {
  try {
    const response = await fetch(`${API}/users/select_role`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu vai trò",
    };
  }
};

//add user
export const addUser = async (token: string, data: any) => {
  try {
    const response = await fetch(`${API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi thêm người dùng",
    };
  }
};

//edit user
export const editUser = async (token: string, id: string, data: any) => {
  try {
    const response = await fetch(`${API}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi sửa người dùng",
    };
  }
};
