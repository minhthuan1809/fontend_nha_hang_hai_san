const token = process.env.NEXT_PUBLIC_TOKEN_SECRET;
const API_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
// Xóa section header
export const deleteHeroSection = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/hero_section/${id}`, {
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
      message: "Đã xảy ra lỗi",
    };
  }
};

// Thêm section header
export const addHeroSection = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/hero_section`, {
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
      message: "Đã xảy ra lỗi",
    };
  }
};

// Cập nhật section header
export const updateHeroSection = async (id: string, data: any) => {
  try {
    const response = await fetch(`${API_URL}/hero_section/${id}`, {
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
      message: "Đã xảy ra lỗi",
    };
  }
};

// new hero section
export const newHeroSection = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/hero_section`, {
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
      message: "Đã xảy ra lỗi",
    };
  }
};

// Cập nhật thông tin thương hiệu
export const updateLogo = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/logo`, {
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
      message: "Đã xảy ra lỗi",
    };
  }
};

export const updateCustomerSection = async (data: any) => {
  try {
    const response = await fetch(
      `${API_URL}/customer_section/customer_img_section`,
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
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi",
    };
  }
};

// delete customer section
export const deleteCustomerSection = async (id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/customer_section/customer__section/${id}`,
      {
        method: "DELETE",
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
      message: "Đã xảy ra lỗi",
    };
  }
};

// sửa customer section
export const editCustomerSection = async (id: string, data: any) => {
  try {
    const response = await fetch(
      `${API_URL}/customer_section/customer__section/${id}`,
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
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi",
    };
  }
};
// new khách hàng
export const newCustomerSection = async (data: any) => {
  try {
    const response = await fetch(
      `${API_URL}/customer_section/customer__section`,
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
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi",
    };
  }
};

// Cập nhật giới thiệu
export const updateIntroduction = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/introduction_section`, {
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
      message: "Đã xảy ra lỗi",
    };
  }
};

//customer_choose_section/customer__section

export const updateCustomerChooseSection = async (data: any) => {
  try {
    const response = await fetch(
      `${API_URL}/customer_choose_section/customer__section`,
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
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi",
    };
  }
};

// get customer choose section
export const getCustomerChooseSectionItem = async () => {
  try {
    const response = await fetch(
      `${API_URL}/customer_choose_section/customer__section`,
      {
        method: "GET",
      }
    );
    return response.json();
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi",
    };
  }
};

// delete customer choose section item
export const deleteCustomerChooseSectionItem = async (id: string) => {
  try {
    const response = await fetch(
      `${API_URL}/customer_choose_section/item/${id}`,
      {
        method: "DELETE",
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
      message: "Đã xảy ra lỗi",
    };
  }
};

// add customer choose section item
export const addCustomerChooseSectionItem = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/customer_choose_section/item`, {
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
      message: "Đã xảy ra lỗi",
    };
  }
};

// update customer choose section item
export const updateCustomerChooseSectionItem = async (
  id: string,
  data: any
) => {
  try {
    const response = await fetch(
      `${API_URL}/customer_choose_section/item/${id}`,
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
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi",
    };
  }
};
