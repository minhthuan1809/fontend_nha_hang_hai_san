"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import TableHeader from "@tiptap/extension-table-header";
import Icon from "@/app/_shared/utils/Icon";
import { useState, useEffect } from "react";

interface TipTapEditorProps {
  content: string;
  onUpdate: (content: string) => void;
}

export default function TipTapEditor({ content, onUpdate }: TipTapEditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      TableHeader,
      Placeholder.configure({
        placeholder: "Nhập mô tả sản phẩm ở đây...",
      }),
    ],
    content: content || "",
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
      onUpdate(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

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
      <div className="flex flex-col gap-2 p-3">
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
                onClick={() => editor.chain().focus().toggleBulletList().run()}
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
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
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
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
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
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
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
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="border rounded-lg bg-white shadow-lg">
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
