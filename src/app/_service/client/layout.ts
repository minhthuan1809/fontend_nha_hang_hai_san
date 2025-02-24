const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;

// Lấy dữ liệu navbar
export const getNavbar = async () => {
  const response = await fetch(`${API}/navbar`);
  const data = await response.json();
  return data;
};

// Lấy dữ liệu section header hero
export const getSectionHeaderHero = async () => {
  const response = await fetch(`${API}/hero_section`);
  const data = await response.json();
  return data;
};

// Lấy dữ liệu section introduction
export const getIntroduction = async () => {
  const response = await fetch(`${API}/introduction_section`);
  const data = await response.json();
  return data;
};

// Lấy dữ liệu section select
export const getSelectSection = async () => {
  const response = await fetch(`${API}/customer_choose_section`);
  const data = await response.json();
  return data;
};

// lấy footer
export const getFooter = async () => {
  const response = await fetch(`${API}/footer`);
  const data = await response.json();
  return data;
};

// section customer
export const getCustomerSection = async () => {
  const response = await fetch(`${API}/customer_section`);
  const data = await response.json();
  return data;
};
