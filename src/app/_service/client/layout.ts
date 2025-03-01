const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

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
export const getNews = async (limit: number, page: number) => {
  try {
    const response = await fetch(`${API}/news?limit=${limit}&page=${page}`);
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
