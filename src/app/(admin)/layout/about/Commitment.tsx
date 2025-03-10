//cam kết
import { updateAboutCommitment } from "@/app/_service/admin/about";
import { Button, Input } from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function Commitment({ data, setRefetch }: any) {
  const [dataEdit, setDataEdit] = useState<any>();
  const [loading, setLoading] = useState(false);
  const token = getCookie("token");
  useEffect(() => {
    setDataEdit(data);
  }, [data]);

  const handleSave = async () => {
    const res = await updateAboutCommitment(dataEdit, token as string);
    if (res.ok) {
      setRefetch((pre: any) => !pre);
      enqueueSnackbar(res.message, { variant: "success" });
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
    setLoading(false);
  };
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Cam Kết Chất Lượng</h1>
      <Input
        label="Tiêu đề"
        value={dataEdit?.title || ""}
        placeholder="Tiêu đề"
        onChange={(e) => setDataEdit({ ...dataEdit, title: e.target.value })}
      />
      <Input
        label="Mô tả 1"
        value={dataEdit?.description_one || ""}
        placeholder="Mô tả 1"
        onChange={(e) =>
          setDataEdit({ ...dataEdit, description_one: e.target.value })
        }
      />
      <Input
        label="Mô tả 2"
        value={dataEdit?.description_two || ""}
        placeholder="Mô tả 2"
        onChange={(e) =>
          setDataEdit({ ...dataEdit, description_two: e.target.value })
        }
      />
      <Input
        label="Mô tả 3"
        value={dataEdit?.description_three || ""}
        placeholder="Mô tả 3"
        onChange={(e) =>
          setDataEdit({ ...dataEdit, description_three: e.target.value })
        }
      />
      <Input
        label="Mô tả 4"
        value={dataEdit?.description_four || ""}
        placeholder="Mô tả 4"
        onChange={(e) =>
          setDataEdit({ ...dataEdit, description_four: e.target.value })
        }
      />
      <Button onClick={handleSave} color="primary" isLoading={loading}>
        Lưu
      </Button>
    </div>
  );
}
