const API = process.env.NEXT_PUBLIC_API_CLIENT_URL;
// Đăng nhập
export const authLogin = async (data: any) => {
  try {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi đăng nhập",
    };
  }
};
// Lấy thông tin user
export const authUser = async (token: string) => {
  try {
    const response = await fetch(`${API}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi lấy thông tin user",
    };
  }
};
// Đăng ký
export const authRegister = async (data: any) => {
  try {
    const response = await fetch(`${API}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi đăng ký",
    };
  }
};

// Gửi lại mã xác thực
export const authResendEmailCode = async (data: any) => {
  try {
    const response = await fetch(`${API}/auth/register?resend=true`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi gửi lại mã xác thực",
    };
  }
};
// Xác thực email
export const authVerifyEmailCode = async (data: any) => {
  try {
    const response = await fetch(`${API}/auth/register?verify=true`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi xác thực email",
    };
  }
};

// Đăng xuất
export const logout = async (token: string) => {
  try {
    const response = await fetch(`${API}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const _data = await response.json();
    return _data;
  } catch (error) {
    return {
      ok: false,
      message: "Đã xảy ra lỗi khi đăng xuất",
    };
  }
};
