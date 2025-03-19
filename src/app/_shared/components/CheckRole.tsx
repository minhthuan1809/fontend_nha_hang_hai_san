import { Button, Checkbox, Card, Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function CheckRole({
  data,
  setPermissions,
  permissions,
  handleSave,
  close,
}: {
  data: any;
  setPermissions: (value: any) => void;
  permissions: any;
  handleSave: () => void;
  close: (value: any) => void;
}) {
  const handlePermissionChange = (key: string) => {
    setPermissions((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(permissions).some(
      (value) => value === true
    );
    const newValue = !allSelected;

    const newPermissions: Record<string, boolean> = {};
    Object.keys(permissions).forEach((key) => {
      newPermissions[key] = newValue;
    });

    setPermissions(newPermissions);
  };

  console.log(permissions);
  useEffect(() => {
    if (data) {
      setPermissions(data);
    } else {
      setPermissions({
        get_user: false,
        delete_user: false,
        put_user: false,
        post_user: false,
        put_product: false,
        post_product: false,
        delete_product: false,
        get_role: false,
        put_role: false,
        post_role: false,
        delete_role: false,
        put_new: false,
        post_new: false,
        delete_new: false,
        put_nav_logo: false,
        post_nav_logo: false,
        delete_nav_logo: false,
        put_footer: false,
        post_footer: false,
        delete_footer: false,
        put_about: false,
        post_about: false,
        delete_about: false,
        put_header: false,
        post_header: false,
        delete_header: false,
        get_contacts: false,
        delete_contacts: false,
        get_discount: false,
        post_discount: false,
        put_discount: false,
        delete_discount: false,
        get_order: false,
        post_order: false,
        put_order: false,
        delete_order: false,
        get_stats: false,
      });
    }
  }, [data]);

  return (
    <Card className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          Phân quyền
        </h1>
        <Checkbox
          className="text-gray-600 hover:text-primary transition-colors"
          isSelected={Object.values(permissions).every(
            (value) => value === true
          )}
          onValueChange={handleSelectAll}
        >
          Chọn tất cả quyền
        </Checkbox>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Quản lý người dùng
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0 pl-3">
            <Checkbox
              isSelected={permissions.get_user}
              onValueChange={() => handlePermissionChange("get_user")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xem người dùng
            </Checkbox>
            <Checkbox
              isSelected={permissions.delete_user}
              onValueChange={() => handlePermissionChange("delete_user")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xóa người dùng
            </Checkbox>
            <Checkbox
              isSelected={permissions.put_user}
              onValueChange={() => handlePermissionChange("put_user")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Sửa người dùng
            </Checkbox>
            <Checkbox
              isSelected={permissions.post_user}
              onValueChange={() => handlePermissionChange("post_user")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Thêm người dùng
            </Checkbox>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Quản lý sản phẩm
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0 pl-3">
            <Checkbox
              isSelected={permissions.put_product}
              onValueChange={() => handlePermissionChange("put_product")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Sửa sản phẩm
            </Checkbox>
            <Checkbox
              isSelected={permissions.post_product}
              onValueChange={() => handlePermissionChange("post_product")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Thêm sản phẩm
            </Checkbox>
            <Checkbox
              isSelected={permissions.delete_product}
              onValueChange={() => handlePermissionChange("delete_product")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xóa sản phẩm
            </Checkbox>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Quản lý Vai trò
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
            <Checkbox
              isSelected={permissions.get_role}
              onValueChange={() => handlePermissionChange("get_role")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xem vai trò
            </Checkbox>
            <Checkbox
              isSelected={permissions.put_role}
              onValueChange={() => handlePermissionChange("put_role")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Sửa vai trò
            </Checkbox>
            <Checkbox
              isSelected={permissions.post_role}
              onValueChange={() => handlePermissionChange("post_role")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Thêm vai trò
            </Checkbox>
            <Checkbox
              isSelected={permissions.delete_role}
              onValueChange={() => handlePermissionChange("delete_role")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xóa vai trò
            </Checkbox>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Quản lý tin tức
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
            <Checkbox
              isSelected={permissions.put_new}
              onValueChange={() => handlePermissionChange("put_new")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Sửa tin tức
            </Checkbox>
            <Checkbox
              isSelected={permissions.post_new}
              onValueChange={() => handlePermissionChange("post_new")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Thêm tin tức
            </Checkbox>
            <Checkbox
              isSelected={permissions.delete_new}
              onValueChange={() => handlePermissionChange("delete_new")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xóa tin tức
            </Checkbox>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Quản lý đơn hàng
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
            <Checkbox
              isSelected={permissions.get_order}
              onValueChange={() => handlePermissionChange("get_order")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xem đơn hàng
            </Checkbox>
            <Checkbox
              isSelected={permissions.put_order}
              onValueChange={() => handlePermissionChange("put_order")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Sửa đơn hàng & xác nhận
            </Checkbox>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Quản lý khuyến mãi
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
            <Checkbox
              isSelected={permissions.get_discount}
              onValueChange={() => handlePermissionChange("get_discount")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xem khuyến mãi
            </Checkbox>
            <Checkbox
              isSelected={permissions.put_discount}
              onValueChange={() => handlePermissionChange("put_discount")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Sửa khuyến mãi
            </Checkbox>
            <Checkbox
              isSelected={permissions.post_discount}
              onValueChange={() => handlePermissionChange("post_discount")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Thêm khuyến mãi
            </Checkbox>
            <Checkbox
              isSelected={permissions.delete_discount}
              onValueChange={() => handlePermissionChange("delete_discount")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xóa khuyến mãi
            </Checkbox>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Quản lý liên hệ
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
            <Checkbox
              isSelected={permissions.get_contacts}
              onValueChange={() => handlePermissionChange("get_contacts")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xem liên hệ
            </Checkbox>

            <Checkbox
              isSelected={permissions.delete_contacts}
              onValueChange={() => handlePermissionChange("delete_contacts")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xóa liên hệ
            </Checkbox>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Thống kê
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
            <Checkbox
              isSelected={permissions.get_stats}
              onValueChange={() => handlePermissionChange("get_stats")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Xem thống kê
            </Checkbox>
          </div>
        </Card>

        <Card className="p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Quản lý giao diện
          </h2>

          <div className="space-y-4 md:space-y-6 pl-3">
            <div>
              <h3 className="font-medium mb-2 md:mb-3 text-gray-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Menu và Logo
              </h3>
              <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
                <Checkbox
                  isSelected={permissions.put_nav_logo}
                  onValueChange={() => handlePermissionChange("put_nav_logo")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Sửa Menu và logo
                </Checkbox>
                <Checkbox
                  isSelected={permissions.post_nav_logo}
                  onValueChange={() => handlePermissionChange("post_nav_logo")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Thêm Menu và logo
                </Checkbox>
                <Checkbox
                  isSelected={permissions.delete_nav_logo}
                  onValueChange={() =>
                    handlePermissionChange("delete_nav_logo")
                  }
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Xóa Menu và logo
                </Checkbox>
              </div>
            </div>

            <Divider />

            <div>
              <h3 className="font-medium mb-2 md:mb-3 text-gray-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Chân trang
              </h3>
              <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
                <Checkbox
                  isSelected={permissions.put_footer}
                  onValueChange={() => handlePermissionChange("put_footer")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Sửa chân trang
                </Checkbox>
                <Checkbox
                  isSelected={permissions.post_footer}
                  onValueChange={() => handlePermissionChange("post_footer")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Thêm chân trang
                </Checkbox>
                <Checkbox
                  isSelected={permissions.delete_footer}
                  onValueChange={() => handlePermissionChange("delete_footer")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Xóa chân trang
                </Checkbox>
              </div>
            </div>

            <Divider />

            <div>
              <h3 className="font-medium mb-2 md:mb-3 text-gray-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Giới thiệu
              </h3>
              <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
                <Checkbox
                  isSelected={permissions.put_about}
                  onValueChange={() => handlePermissionChange("put_about")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Sửa Giới thiệu
                </Checkbox>
                <Checkbox
                  isSelected={permissions.post_about}
                  onValueChange={() => handlePermissionChange("post_about")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Thêm Giới thiệu
                </Checkbox>
                <Checkbox
                  isSelected={permissions.delete_about}
                  onValueChange={() => handlePermissionChange("delete_about")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Xóa Giới thiệu
                </Checkbox>
              </div>
            </div>

            <Divider />

            <div>
              <h3 className="font-medium mb-2 md:mb-3 text-gray-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Trang chủ
              </h3>
              <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 pl-3">
                <Checkbox
                  isSelected={permissions.put_header}
                  onValueChange={() => handlePermissionChange("put_header")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Sửa trang chủ
                </Checkbox>
                <Checkbox
                  isSelected={permissions.post_header}
                  onValueChange={() => handlePermissionChange("post_header")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Thêm trang chủ
                </Checkbox>
                <Checkbox
                  isSelected={permissions.delete_header}
                  onValueChange={() => handlePermissionChange("delete_header")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Xóa trang chủ
                </Checkbox>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-end gap-4">
        <Button
          color="danger"
          size="lg"
          className="w-full md:w-auto px-8 font-medium"
          onPress={() => close(false)}
        >
          Hủy
        </Button>
        <Button
          color="primary"
          size="lg"
          className="w-full md:w-auto px-8 font-medium"
          onPress={handleSave}
        >
          {data ? "Cập nhật" : "Lưu thay đổi"}
        </Button>
      </div>
    </Card>
  );
}
