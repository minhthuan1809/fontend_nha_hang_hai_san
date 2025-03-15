const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//upload image to cloudinary
export const uploadImageToCloudinary = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "m62izemi");

    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(
        `Lỗi khi tải ảnh lên Cloudinary: ${
          errorData.message || "Không xác định"
        }`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(
      "Không thể tải ảnh lên. Vui lòng kiểm tra cấu hình Cloudinary của bạn."
    );
  }
};

// thêm sản phẩm
export const uploadImageToCloudinaryAddProduct = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "visd9vrl");

    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(
        `Lỗi khi tải ảnh lên Cloudinary: ${
          errorData.message || "Không xác định"
        }`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(
      "Không thể tải ảnh lên. Vui lòng kiểm tra cấu hình Cloudinary của bạn."
    );
  }
};

// thêm quảng cáo

// thêm sản phẩm
export const uploadImageToCloudinaryAddAds = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "p6d0tdzq");

    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(
        `Lỗi khi tải ảnh lên Cloudinary: ${
          errorData.message || "Không xác định"
        }`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(
      "Không thể tải ảnh lên. Vui lòng kiểm tra cấu hình Cloudinary của bạn."
    );
  }
};

// avatar
export const uploadImageToCloudinaryAvatar = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "abltqjba");

    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(
        `Lỗi khi tải ảnh lên Cloudinary: ${
          errorData.message || "Không xác định"
        }`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(
      "Không thể tải ảnh lên. Vui lòng kiểm tra cấu hình Cloudinary của bạn."
    );
  }
};
