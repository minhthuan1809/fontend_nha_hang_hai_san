"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";

import TableHeader from "@tiptap/extension-table-header";
import Icon from "@/app/_shared/utils/Icon";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import InputChangerImg from "@/app/_shared/components/ui/InputChangerImg";
import { createNews, updateNews } from "@/app/_service/admin/articles";
import { enqueueSnackbar } from "notistack";
import { uploadImageToCloudinary } from "@/app/_service/admin/upload_img_cloudinary";
import { getNewsDetail } from "@/app/_service/client/layout";
import InputTiptap from "./InputTiptap";

export default function ArticlesPage({
  onClose,
  setReload,
  idEdit,
  setIdEdit,
}: {
  onClose: () => void;
  setReload: () => void;
  idEdit: number;
  setIdEdit: (id: number) => void;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [dataEdit, setDataEdit] = useState<any>(null);
  const dataEditId = localStorage.getItem("dataEditTiptap");

  // Fetch edit data
  useEffect(() => {
    if (idEdit || dataEditId) {
      const fetchData = async () => {
        const response = await getNewsDetail(idEdit || Number(dataEditId));
        if (response.ok) {
          setDataEdit(response.data);
          setTitle(response.data.title);
          setIsShow(response.data.status === 1 ? true : false);
        } else {
          enqueueSnackbar("Failed to fetch news details", { variant: "error" });
        }
      };
      fetchData();
    }
  }, [idEdit, dataEditId]);

  // Editor setup
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        TextStyle,
        TableHeader,
        Placeholder.configure({
          placeholder: "Nhập nội dung của bạn ở đây...",
        }),
      ],
      content: `${dataEdit?.description || ""}`,
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl p-8 focus:outline-none min-h-[70vh]",
        },
      },
      onUpdate: ({ editor }) => {
        const words = editor
          .getText()
          .split(/\s+/)
          .filter((word) => word.length > 0);
        setWordCount(words.length);
      },
    },
    [dataEdit]
  );

  // Update selected format based on editor state
  useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      if (editor.isActive("heading", { level: 1 })) {
        setSelectedFormat("h1");
      } else if (editor.isActive("heading", { level: 2 })) {
        setSelectedFormat("h2");
      } else if (editor.isActive("heading", { level: 3 })) {
        setSelectedFormat("h3");
      } else if (editor.isActive("paragraph")) {
        setSelectedFormat("p");
      } else {
        setSelectedFormat("");
      }
    };

    editor.on("selectionUpdate", updateSelection);
    editor.on("transaction", updateSelection);

    return () => {
      editor.off("selectionUpdate", updateSelection);
      editor.off("transaction", updateSelection);
    };
  }, [editor]);

  // Save content
  const saveContent = async () => {
    setIsSaving(true);
    if (!editor) return;
    const content = editor.getHTML();

    try {
      const image_url = await uploadImageToCloudinary(image);
      if (image_url.secure_url) {
        const response = await createNews({
          title,
          description: content,
          image_url: image_url.secure_url,
          status: isShow,
        });

        if (response.ok) {
          enqueueSnackbar(response.message, { variant: "success" });
          setReload();
          onClose();
        } else {
          enqueueSnackbar(response.message, { variant: "error" });
        }
      }
    } catch (error) {
      enqueueSnackbar("Error uploading image", { variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // Call API to update news
  const callApiUpdateNews = async (id: number, data: any) => {
    const response = await updateNews(id, data);
    if (response.ok) {
      enqueueSnackbar(response.message, { variant: "success" });
      setReload();
      onClose();
      localStorage.removeItem("dataEdit");
      localStorage.removeItem("openTiptap");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    return response;
  };

  // Save edited content
  const saveContentEdit = async () => {
    setIsSaving(true);
    if (!editor) return;
    const content = editor.getHTML();
    try {
      if (image) {
        const image_url = await uploadImageToCloudinary(image);
        if (image_url.secure_url) {
          await callApiUpdateNews(idEdit, {
            title,
            description: content,
            image_url: image_url.secure_url,
            status: isShow,
          });
        } else {
          enqueueSnackbar("Lỗi khi tải ảnh lên", { variant: "error" });
        }
      } else {
        await callApiUpdateNews(idEdit || Number(dataEditId), {
          title,
          description: content,
          image_url: dataEdit.image_url,
          status: isShow,
        });
      }
    } catch (error) {
      enqueueSnackbar("Error saving content", { variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // Format dropdown
  const FormatDropdown = () => {
    if (!editor) return null;

    const formats = [
      {
        value: "p",
        label: "Văn bản thường",
        action: () => editor.chain().focus().setParagraph().run(),
      },
      {
        value: "h1",
        label: "Tiêu đề 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        value: "h2",
        label: "Tiêu đề 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        value: "h3",
        label: "Tiêu đề 3",
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      },
    ];

    return (
      <div className="relative inline-block">
        <select
          className="appearance-none bg-white border rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedFormat}
          onChange={(e) => {
            const format = formats.find((f) => f.value === e.target.value);
            if (format) format.action();
          }}
        >
          <option value="" disabled>
            Định dạng
          </option>
          {formats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <Icon icon="ChevronDown" className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    );
  };

  const MenuBar = () => {
    if (!editor) return null;

    return (
      <div>
        <h1 className="text-2xl font-bold p-3 pl-4">Chỉnh sửa bài viết</h1>
        <div className="flex flex-col gap-2 p-3">
          <div className="flex items-center flex-col md:flex-row justify-between gap-10">
            <div className="w-[20rem] h-[20rem] rounded-lg overflow-hidden">
              <img
                src={image || dataEdit?.image_url}
                alt="image"
                className="w-full h-full"
              />
            </div>
            <div className="flex-1 space-y-5">
              <InputChangerImg
                selectedImage={image || dataEdit?.image_url}
                isLoading={loading}
                onChange={setImage}
                dataInput={image || dataEdit?.image_url}
              />
              <InputTiptap title={title} setTitle={setTitle} />
              <div className="flex items-center">
                <div className="flex gap-4">
                  <Checkbox isSelected={isShow} onValueChange={setIsShow}>
                    Hiện thị
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b p-3 flex flex-wrap gap-2 justify-between bg-white shadow-sm">
            <div className="flex flex-wrap gap-2 items-center">
              <FormatDropdown />

              <div className="flex border rounded-md overflow-hidden bg-gray-50">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 ${
                    editor.isActive("bold")
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  title="Đậm (Ctrl+B)"
                >
                  <Icon icon="Bold" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 ${
                    editor.isActive("italic")
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  title="Nghiêng (Ctrl+I)"
                >
                  <Icon icon="Italic" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={`p-2 ${
                    editor.isActive("strike")
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  title="Gạch ngang"
                >
                  <Icon icon="Strikethrough" className="w-4 h-4" />
                </button>
              </div>

              <div className="flex border rounded-md overflow-hidden bg-gray-50">
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`p-2 ${
                    editor.isActive("bulletList")
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  title="Danh sách không thứ tự"
                >
                  <Icon icon="List" className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`p-2 ${
                    editor.isActive("orderedList")
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  title="Danh sách có thứ tự"
                >
                  <Icon icon="ListOrdered" className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={`p-2 ${
                    editor.isActive("blockquote")
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  title="Trích dẫn"
                >
                  <Icon icon="Quote" className="w-4 h-4" />
                </button>
              </div>

              <div className="flex border rounded-md overflow-hidden bg-gray-50">
                <button
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                  className="p-2 hover:bg-gray-100"
                  title="Đường kẻ ngang"
                >
                  <Icon icon="Minus" className="w-4 h-4" />
                </button>
              </div>

              <div className="flex border rounded-md overflow-hidden bg-gray-50">
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                  className={`p-2 ${
                    !editor.can().undo()
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  title="Hoàn tác (Ctrl+Z)"
                >
                  <Icon icon="RotateCcw" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                  className={`p-2 ${
                    !editor.can().redo()
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  title="Làm lại (Ctrl+Y)"
                >
                  <Icon icon="RotateCw" className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">{wordCount} từ</div>

              <Button
                onClick={() => {
                  if (idEdit || dataEditId) {
                    saveContentEdit();
                  } else {
                    saveContent();
                  }
                }}
                disabled={isSaving}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  isSaving
                    ? "bg-blue-400 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white transition-colors`}
              >
                {isSaving ? (
                  <>
                    <Icon icon="Loader" className="w-4 h-4 animate-spin" />
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <>
                    <Icon icon="Save" className="w-4 h-4" />
                    <span>{idEdit || dataEditId ? "Cập nhật" : "Lưu"}</span>
                  </>
                )}
              </Button>
              <Button
                onClick={() => {
                  if (editor.getHTML()) {
                    if (
                      confirm(
                        "Bạn có chắc chắn muốn hủy việc chỉnh sửa nội dung không?"
                      )
                    ) {
                      editor.commands.setContent("");
                      onClose();
                      localStorage.removeItem("dataEditTiptap");
                      localStorage.removeItem("openTiptap");
                    }
                  } else {
                    onClose();
                  }
                }}
                color="danger"
              >
                <Icon icon="X" className="w-4 h-4" />
                <span>Hủy</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // CSS for each format type for visual representation in editor
  const editorStyles = `
    .ProseMirror h1 {
      font-size: 2em;
      font-weight: bold;
      margin-top: 0.67em;
      margin-bottom: 0.67em;
    }
    .ProseMirror h2 {
      font-size: 1.5em;
      font-weight: bold;
      margin-top: 0.83em;
      margin-bottom: 0.83em;
    }
    .ProseMirror h3 {
      font-size: 1.17em;
      font-weight: bold;
      margin-top: 1em;
      margin-bottom: 1em;
    }
    .ProseMirror blockquote {
      border-left: 4px solid #e2e8f0;
      padding-left: 1rem;
      font-style: italic;
    }
    .ProseMirror ul {
      list-style-type: disc;
      padding-left: 1.5em;
    }
    .ProseMirror ol {
      list-style-type: decimal;
      padding-left: 1.5em;
    }
    .ProseMirror table {
      width: 100%;
      border-collapse: collapse;
    }
    .ProseMirror th, .ProseMirror td {
      border: 1px solid #e2e8f0;
      padding: 8px;
      text-align: left;
    }
  `;

  return (
    <div className="border rounded-lg bg-white shadow-lg">
      <style>{editorStyles}</style>
      <div>
        <MenuBar />
      </div>
      <div className="border-t h-[calc(100vh-10rem)] overflow-y-auto">
        <EditorContent editor={editor} className="editor-content" />
      </div>
      <div className="border-t p-3 text-xs text-gray-500 flex justify-between">
        <span>Phiên bản 1.0.2</span>
      </div>
    </div>
  );
}
