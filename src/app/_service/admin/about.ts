const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;
// const token = process.env.NEXT_PUBLIC_TOKEN_SECRET;

export const updateAbout = async (data: any, token: string) => {
  const response = await fetch(`${API}/about/story`, {
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

// get about space
export const getAboutSpace = async (data: any, id: any, token: string) => {
  const response = await fetch(`${API}/about/space/${id}`, {
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

// get about ordering
export const getAboutOrdering = async (data: any, id: any, token: string) => {
  const response = await fetch(`${API}/about/OrderingService/${id}`, {
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
//create item
export const createItem = async (data: any, token: string) => {
  const response = await fetch(`${API}/about/Item`, {
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

// delete item
export const deleteItem = async (id: any, token: string) => {
  const response = await fetch(`${API}/about/Item/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const _data = await response.json();
  return _data;
};

// update item
export const updateItem = async (data: any, id: any, token: string) => {
  const response = await fetch(`${API}/about/Item/${id}`, {
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

// get about ordering process
export const setAboutOrderingProcess = async (data: any, token: string) => {
  const response = await fetch(`${API}/about/OrderProcess`, {
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

// delete item
export const deleteItemOrderingProcess = async (id: any, token: string) => {
  const response = await fetch(`${API}/about/OrderProcess/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const _data = await response.json();
  return _data;
};
// update item
export const updateItemOrderingProcess = async (
  data: any,
  id: any,
  token: string
) => {
  const response = await fetch(`${API}/about/OrderProcess/${id}`, {
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

// get about commitment
export const updateAboutCommitment = async (data: any, token: string) => {
  const response = await fetch(`${API}/about/Commitment`, {
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
