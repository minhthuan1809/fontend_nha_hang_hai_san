const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

//ads
export const getAds = async () => {
  try {
    const response = await fetch(`${API}/ads`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu ads",
    };
  }
};

// Lấy dữ liệu navbar
export const getNavbar = async () => {
  try {
    const response = await fetch(`${API}/navbar`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu navbar",
    };
  }
};

// Lấy dữ liệu section header hero
export const getSectionHeaderHero = async () => {
  try {
    const response = await fetch(`${API}/hero_section`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu hero section",
    };
  }
};

// Lấy dữ liệu section introduction
export const getIntroduction = async () => {
  try {
    const response = await fetch(`${API}/introduction_section`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu introduction",
    };
  }
};

// Lấy dữ liệu section select
export const getSelectSection = async () => {
  try {
    const response = await fetch(`${API}/customer_choose_section`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu select section",
    };
  }
};

// lấy footer
export const getFooter = async () => {
  try {
    const response = await fetch(`${API}/footer`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu footer",
    };
  }
};

// section customer
export const getCustomerSection = async () => {
  try {
    const response = await fetch(`${API}/customer_section`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu customer section",
    };
  }
};

// get contact
export const getContact = async () => {
  try {
    const response = await fetch(`${API}/contacts`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu contact",
    };
  }
};

// get news
export const getNews = async (limit: number, page: number, search: string) => {
  try {
    const response = await fetch(
      `${API}/news?limit=${limit}&page=${page}&search=${search}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu news",
    };
  }
};

// get news detail
export const getNewsDetail = async (id: any) => {
  try {
    const response = await fetch(`${API}/news/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu news detail",
    };
  }
};

// contacts
export const CreateContact = async (data: any, token: string) => {
  try {
    const response = await fetch(`${API}/send_contacts`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        gmail: data.email,
        title: data.title,
        content: data.message,
      }),
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi tạo contact",
    };
  }
};

// get about
export const getAbout = async () => {
  try {
    const response = await fetch(`${API}/about`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu about",
    };
  }
};

// get products
export const getProducts = async (page: number, search: string) => {
  try {
    const response = await fetch(
      `${API}/products?limit=30&page=${page}&search=${search}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu products",
    };
  }
};

// get products detail
export const getProductsDetail = async (id: any) => {
  try {
    const response = await fetch(`${API}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu products detail",
    };
  }
};
