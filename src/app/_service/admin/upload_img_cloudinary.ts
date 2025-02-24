export const uploadImageToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "m62izemi");

    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
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
