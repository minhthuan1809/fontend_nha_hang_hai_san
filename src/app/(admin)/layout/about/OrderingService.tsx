//Không Gian
import Icon from "@/app/_shared/utils/Icon";
import { Button, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import ModalEdit from "./modal/ModalEdit";
import { getAboutOrdering } from "@/app/_service/admin/about";
import { enqueueSnackbar } from "notistack";
import { getCookie } from "cookies-next";

export default function Space({ data, setRefetch }: any) {
  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const token = getCookie("token");

  // handle save
  const handleSave = async (updatedData: any) => {
    const response = await getAboutOrdering(
      updatedData,
      updatedData?.id,
      token as string
    );
    if (response.ok) {
      setRefetch((prev: any) => !prev);
      setOpen(false);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
  return (
    <div className="mb-16 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold  mb-6 ">
        Chỉnh sửa Dịch Vụ Đặt Hàng Online
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {data.map((space: any) => (
          <div
            key={space.id}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <Icon
                icon={space.icon}
                className="w-12 h-12 text-blue-600 mb-4"
              />
              <Tooltip content="Chỉnh Sửa">
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  onClick={() => {
                    setDataEdit(space);
                    setOpen(true);
                  }}
                >
                  <Icon icon="Edit" className="w-6 h-6 text-blue-600 " />
                </Button>
              </Tooltip>
            </div>
            <h3 className="text-xl font-semibold mb-4">{space.title}</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• {space.description_one}</li>
              <li>• {space.description_two}</li>
              <li>• {space.description_three}</li>
              <li>• {space.description_four}</li>
            </ul>
          </div>
        ))}
      </div>
      <ModalEdit
        open={open}
        onOpenChange={setOpen}
        data={dataEdit}
        handleSave={handleSave}
      />
    </div>
  );
}
