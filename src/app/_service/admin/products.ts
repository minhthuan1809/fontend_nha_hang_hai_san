const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;
export const deleteProduct = async (id: string, token: string) => {
  const res = await fetch(`${API}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const updateProduct = async (id: string, product: any) => {
  const res = await fetch(`${API}/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
  return res.json();
};

//delete img
export const deleteImg = async (id: string, token: string) => {
  const res = await fetch(`${API}/products/img/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

// add img
export const addImgProduct = async (id: string, img: any, token: string) => {
  const res = await fetch(`${API}/products/img/${id}`, {
    method: "POST",
    body: JSON.stringify(img),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

// edit product
export const editProduct = async (id: string, product: any, token: string) => {
  const res = await fetch(`${API}/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

// add product
export const addProduct = async (product: any, token: string) => {
  const res = await fetch(`${API}/products`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
};
