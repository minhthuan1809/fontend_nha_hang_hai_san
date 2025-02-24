const token = process.env.NEXT_PUBLIC_TOKEN_SECRET;

// Thêm menu
export const addMenu = async (menu: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/navbar`,
    {
      method: "POST",
      body: JSON.stringify(menu),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

// Chỉnh sửa menu
export const editMenu = async (id: number, menu: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/navbar/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(menu),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

// Xóa menu
export const deleteMenu = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/navbar/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};
