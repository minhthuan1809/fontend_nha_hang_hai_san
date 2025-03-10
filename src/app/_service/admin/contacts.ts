const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;
// const token = process.env.NEXT_PUBLIC_TOKEN_SECRET;

// get contacts
export const getContacts = async (
  page: number,
  limit: number,
  search: string
) => {
  const res = await fetch(
    `${API}/send_contacts?page=${page}&limit=${limit}&search=${search}`
  );
  const data = await res.json();
  return data;
};

// delete contact
export const deleteContact = async (id: any, token: string) => {
  const res = await fetch(`${API}/send_contacts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
};

// update read contact
export const updateReadContact = async (id: any, token: string) => {
  const res = await fetch(`${API}/send_contacts/read/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
