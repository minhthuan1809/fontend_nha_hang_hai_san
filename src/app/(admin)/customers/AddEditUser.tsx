import { uploadImageToCloudinary } from "@/app/_service/admin/upload_img_cloudinary";
import { addUser, editUser, getSelectRole } from "@/app/_service/admin/user";
import InputChangerImg from "@/app/_shared/components/ui/InputChangerImg";
import {
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

type RoleType = {
  id: string;
  name: string;
};

export default function AddEditUser({
  dataEdit,
  onClose,
  setDataEdit,
  refetch,
}: {
  dataEdit: any;
  onClose: (value: boolean) => void;
  setDataEdit: (value: any) => void;
  refetch: () => void;
}) {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [dataSubmit, setDataSubmit] = useState({
    fullName: dataEdit?.fullName || "",
    email: dataEdit?.email || "",
    password: dataEdit?.password || "",
    roleId: dataEdit?.roleId || "2", // Mặc định là user với id = 2
    avatar: dataEdit?.avatar || "",
    status: dataEdit?.status || false,
  });
  const token = getCookie("token");

  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email không được để trống");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Email không hợp lệ");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Mật khẩu không được để trống");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Mật khẩu phải từ 6 ký tự trở lên");
      return false;
    }
    setPasswordError("");
    return true;
  };

  useEffect(() => {
    const fetchRole = async () => {
      const response = await getSelectRole();
      if (response.ok) {
        setRoles(response.data);
      }
    };
    fetchRole();
  }, []);

  //call api create
  const ApiCallCreate = async (data: any) => {
    setLoading(true);
    const addUserResponse = await addUser(token as string, data);
    if (addUserResponse.ok) {
      enqueueSnackbar(addUserResponse.message, {
        variant: "success",
      });
      handleClose();
      refetch();
    } else {
      enqueueSnackbar(addUserResponse.message, {
        variant: "error",
      });
    }
    setLoading(false);
  };
  //handle submit
  const handleSubmit = async () => {
    if (!validateEmail(dataSubmit.email)) {
      return;
    }
    if (!validatePassword(dataSubmit.password)) {
      return;
    }
    if (!avatar) {
      ApiCallCreate({
        fullName: dataSubmit.fullName,
        email: dataSubmit.email,
        password: dataSubmit.password,
        roleId: dataSubmit.roleId,
        status: dataSubmit.status,
      });
      return;
    }
    const uploadImage = await uploadImageToCloudinary(avatar);
    if (uploadImage.secure_url) {
      ApiCallCreate({
        fullName: dataSubmit.fullName,
        email: dataSubmit.email,
        password: dataSubmit.password,
        roleId: dataSubmit.roleId,
        status: dataSubmit.status,
        avatar: uploadImage.secure_url,
      });
    } else {
      enqueueSnackbar(uploadImage.message, {
        variant: "error",
      });
    }
  };

  //call api
  const CallApi = async (id: string, data: any) => {
    setLoading(true);
    const addUserResponse = await editUser(token as string, id, data);
    if (addUserResponse.ok) {
      enqueueSnackbar(addUserResponse.message, {
        variant: "success",
      });
      handleClose();
      refetch();
    } else {
      enqueueSnackbar(addUserResponse.message, {
        variant: "error",
      });
    }
    setLoading(false);
  };

  //upload image to cloudinary
  const handleEdit = async () => {
    if (!validateEmail(dataSubmit.email)) {
      return;
    }
    if (!avatar) {
      CallApi(dataEdit.id, {
        fullName: dataSubmit.fullName,
        email: dataSubmit.email,
        ...(dataSubmit.password !== "" && { password: dataSubmit.password }),
        roleId: dataSubmit.roleId,
        status: dataSubmit.status,
        avatar: dataEdit.avatar,
      });
    } else {
      const uploadImage = await uploadImageToCloudinary(avatar);
      if (uploadImage.secure_url) {
        CallApi(dataEdit.id, {
          fullName: dataSubmit.fullName,
          email: dataSubmit.email,
          ...(dataSubmit.password !== "" && { password: dataSubmit.password }),
          roleId: dataSubmit.roleId,
          status: dataSubmit.status,
          avatar: uploadImage.secure_url,
        });
      } else {
        enqueueSnackbar("Lỗi khi tải ảnh lên", {
          variant: "error",
        });
      }
    }
  };
  const handleClose = () => {
    setDataSubmit({
      fullName: "",
      email: "",
      password: "",
      roleId: "2",
      avatar: "",
      status: false,
    });
    setDataEdit(null);
    onClose(false);
    setAvatar("");
  };

  return (
    <Modal isOpen={true} onClose={handleClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">Thêm khách hàng</h1>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center justify-between">
              <img
                src={avatar || dataSubmit.avatar}
                alt=""
                className="w-20 h-20 rounded-full"
              />
              <div className="w-full">
                <InputChangerImg
                  selectedImage={dataSubmit.avatar}
                  onChange={(value: any) => {
                    setAvatar(value);
                  }}
                  dataInput={avatar || dataSubmit.avatar}
                  isLoading={isLoading}
                />
              </div>
            </div>
            <Input
              label="Tên khách hàng"
              placeholder="Nhập tên khách hàng"
              variant="bordered"
              value={dataSubmit.fullName}
              onChange={(e) =>
                setDataSubmit({ ...dataSubmit, fullName: e.target.value })
              }
            />
            <Input
              label="Email"
              placeholder="Nhập email"
              variant="bordered"
              value={dataSubmit.email}
              onChange={(e) => {
                setDataSubmit({ ...dataSubmit, email: e.target.value });
                validateEmail(e.target.value);
              }}
              isInvalid={!!emailError}
              errorMessage={emailError}
            />
            <Input
              label="Mật khẩu"
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              type="password"
              variant="bordered"
              value={dataSubmit.password}
              onChange={(e) => {
                setDataSubmit({ ...dataSubmit, password: e.target.value });
                validatePassword(e.target.value);
              }}
              isInvalid={!!passwordError}
              errorMessage={passwordError}
            />
            <Select
              label="Vai trò"
              placeholder="Chọn vai trò"
              variant="bordered"
              selectedKeys={[dataSubmit.roleId]}
              onChange={(e) =>
                setDataSubmit({ ...dataSubmit, roleId: e.target.value })
              }
            >
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </Select>
            <Checkbox
              isSelected={dataSubmit.status}
              onValueChange={(value) =>
                setDataSubmit({ ...dataSubmit, status: value })
              }
            >
              Khóa tài khoản
            </Checkbox>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleClose}>
            Hủy
          </Button>
          <Button
            color="primary"
            onPress={dataEdit ? handleEdit : handleSubmit}
            isLoading={loading}
            isDisabled={loading}
          >
            {dataEdit ? "Cập nhật" : "Thêm"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
