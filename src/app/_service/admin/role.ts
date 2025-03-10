const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;
export const getRole = async (
  token: string,
  search: string,
  page: number,
  limit: number
) => {
  try {
    const response = await fetch(
      `${API}/role?search=${search}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error;
  }
};

export const deleteRole = async (token: string, id: number) => {
  try {
    const response = await fetch(`${API}/role/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    throw error;
  }
};

// post
export const CreateRole = async (token: string, data: any) => {
  try {
    const response = await fetch(`${API}/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    console.error("Lỗi khi thêm mới:", error);
    throw error;
  }
};

// put
export const UpdateRole = async (token: string, data: any, id: number) => {
  try {
    const response = await fetch(`${API}/role/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    console.error("Lỗi khi cập nhật:", error);
    throw error;
  }
};
