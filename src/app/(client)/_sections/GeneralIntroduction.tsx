import { getIntroduction } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";
import React, { useEffect, useState } from "react";
type Introduction = {
  title: string;
  description: string;
  content: string;
  image_url: string;
};
export default function GeneralIntroduction() {
  const [data, setData] = useState<Introduction[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIntroduction();
      setData(data.data);
    };
    fetchData();
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="relative px-4 py-16  flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${data[0]?.image_url})` }}
      ></div>
      <div className="container mx-auto md:w-3/5 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl relative z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-amber-600 font-sans tracking-tight">
          {data[0]?.title}
        </h1>

        <div className="space-y-8 text-gray-800">
          <p className="text-lg md:text-xl text-center leading-relaxed">
            {data[0]?.description}
          </p>

          <p className="text-lg md:text-xl text-center leading-relaxed italic font-medium border-l-4 border-amber-500 pl-6 mx-auto max-w-3xl">
            {data[0]?.content}
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2">
            <span>Đặt bàn ngay</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
