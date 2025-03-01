const API_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
const token = process.env.NEXT_PUBLIC_TOKEN_SECRET;

// delete news
export const deleteNews = async (id: any) => {
  try {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// update news
export const updateNews = async (id: any, data: any) => {
  const response = await fetch(`${API_URL}/news/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const _data = await response.json();
  return _data;
};

//  news detail
export const createNews = async (data: any) => {
  const response = await fetch(`${API_URL}/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const _data = await response.json();
  return _data;
};
