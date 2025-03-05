import React, { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/react";

export default function InputTiptap({
  title,
  setTitle,
}: {
  title: any;
  setTitle: (value: any) => void;
}) {
  const [value, setValue] = useState(title);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitle(value);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div>
      <Textarea
        className="w-full"
        placeholder="Nhập tiêu đề"
        label="Tiêu đề"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        variant="bordered"
      />
    </div>
  );
}
