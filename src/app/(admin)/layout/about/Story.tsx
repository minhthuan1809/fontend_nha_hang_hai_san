import { updateAbout } from "@/app/_service/admin/about";
import { Button, Input, Textarea } from "@nextui-org/react";
import { getCookie } from "cookies-next/server";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

export default function Story({
  data,
  setRefetch,
}: {
  data: any;
  setRefetch: any;
}) {
  const [form, setForm] = useState({
    title: data.title,
    description_one: data.description_one,
    description_two: data.description_two,
  });
  const token = getCookie("token");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await updateAbout(form, token as unknown as string);
    if (response.ok) {
      enqueueSnackbar(response.message, { variant: "success" });
      setRefetch((prev: any) => !prev);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-2">
      <h1 className="text-2xl font-bold mb-4">Câu chuyện của chúng tôi</h1>
      <Input
        label="Tiêu đề"
        value={form.title}
        placeholder="Tiêu đề"
        variant="bordered"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Textarea
        label="Nội dung 1"
        value={form.description_one}
        placeholder="Nội dung"
        variant="bordered"
        onChange={(e) => setForm({ ...form, description_one: e.target.value })}
      />
      <Textarea
        label="Nội dung 2"
        value={form.description_two}
        placeholder="Nội dung"
        variant="bordered"
        onChange={(e) => setForm({ ...form, description_two: e.target.value })}
      />
      <Button color="primary" onClick={handleSubmit} isLoading={loading}>
        Lưu
      </Button>
    </div>
  );
}
