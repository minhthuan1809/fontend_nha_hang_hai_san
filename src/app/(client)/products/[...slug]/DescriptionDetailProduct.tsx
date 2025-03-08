import { Button } from "@nextui-org/react";
import React, { useState } from "react";

const DescriptionDetailProduct = ({ data }: { data: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-100 mt-4">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="text-orange-500"
            viewBox="0 0 16 16"
          >
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
          </svg>
          Mô tả sản phẩm
        </h2>

        <div className="relative">
          <div
            className={`prose max-w-none ${
              !isOpen ? "max-h-[40rem] overflow-hidden" : "max-h-full"
            }`}
            dangerouslySetInnerHTML={{
              __html: data
                .toString()
                .replace(
                  /<ol>/g,
                  '<ol class="list-decimal pl-6 space-y-2 my-4">'
                )
                .replace(/<ul>/g, '<ul class="list-disc pl-6 space-y-2 my-4">')
                .replace(
                  /<blockquote>/g,
                  '<blockquote class="border-l-4 border-orange-300 pl-4 italic my-6 text-gray-600">'
                )
                .replace(
                  /<p>/g,
                  '<p class="mb-4 text-gray-700 leading-relaxed">'
                )
                .replace(
                  /<h1>/g,
                  '<h1 class="text-2xl font-bold mb-4 text-gray-800">'
                )
                .replace(
                  /<h2>/g,
                  '<h2 class="text-xl font-semibold mb-3 text-gray-800">'
                )
                .replace(
                  /<h3>/g,
                  '<h3 class="text-lg font-semibold mb-3 text-gray-800">'
                ),
            }}
          />

          {!isOpen && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 border border-orange-500 rounded-full flex items-center gap-2 font-medium text-orange-600 hover:bg-orange-50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                  />
                </svg>
                Thu gọn
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                Xem thêm
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionDetailProduct;
