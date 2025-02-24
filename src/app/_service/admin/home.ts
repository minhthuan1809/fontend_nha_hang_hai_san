const token = process.env.NEXT_PUBLIC_TOKEN_SECRET;
// Xóa section header
export const deleteHeroSection = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/hero_section/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

// Thêm section header
export const addHeroSection = async (data: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/hero_section`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

// Cập nhật section header
export const updateHeroSection = async (id: string, data: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/hero_section/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

// Cập nhật thông tin thương hiệu
export const updateLogo = async (data: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/logo`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const updateCustomerSection = async (data: any) => {
  console.log("data", data);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/customer_section/customer_img_section`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

// delete customer section
export const deleteCustomerSection = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/customer_section/customer__section/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

// sửa customer section
export const editCustomerSection = async (id: string, data: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/customer_section/customer__section/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

// Cập nhật giới thiệu
export const updateIntroduction = async (data: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CLIENT_URL}/introduction_section`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};
