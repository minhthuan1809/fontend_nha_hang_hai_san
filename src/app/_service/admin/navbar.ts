const API_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
// Thêm menu
export const addMenu = async (menu: any, token: string) => {
  const response = await fetch(`${API_URL}/navbar`, {
    method: "POST",
    body: JSON.stringify(menu),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Chỉnh sửa menu
export const editMenu = async (id: number, menu: any, token: string) => {
  const response = await fetch(`${API_URL}/navbar/${id}`, {
    method: "PUT",
    body: JSON.stringify(menu),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Xóa menu
export const deleteMenu = async (id: number, token: string) => {
  const response = await fetch(`${API_URL}/navbar/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
