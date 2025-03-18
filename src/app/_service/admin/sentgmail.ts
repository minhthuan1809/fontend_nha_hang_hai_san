const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;
export const sentGmail = async (data: any) => {
  const response = await fetch(`${API}/send_contacts/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const _data = await response.json();
  return _data;
};

export const getHistory = async (token: string, searchTerm: string) => {
  const response = await fetch(
    `${API}/send_contacts/history?search=${searchTerm}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const _data = await response.json();
  return _data;
};

// delete history
export const deleteHistory = async (id: number, token: string) => {
  const response = await fetch(`${API}/send_contacts/history/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const _data = await response.json();
  return _data;
};
