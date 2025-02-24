import React, { useEffect, useState } from "react";
import { getSelectSection } from "@/app/_service/client/layout";
import Icon from "@/app/_shared/utils/Icon";
import Loading from "@/app/_shared/components/Loading";

type SelectSection = {
  img_title: {
    title: string;
    image_url: string;
  }[];
  item: {
    icon: string;
    title: string;
    description: string;
  }[];
};

const SelectSection = () => {
  const [features, setFeatures] = useState<SelectSection | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSelectSection();
      setFeatures(data.data);
    };

    fetchData();
  }, []);

  if (!features) {
    return <Loading />;
  }
  return (
    <div className="relative py-24 bg-amber-50">
      <div
        className="absolute inset-0  bg-fixed bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url(${features?.img_title[0].image_url})`,
        }}
      ></div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {features?.img_title[0].title}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="w-28 h-1 bg-amber-600 rounded-full"></span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
          {features?.item.map((feature: any, index: number) => (
            <div
              key={index}
              className="group p-6 bg-white/90 backdrop-blur-sm rounded-lg border border-amber-200 hover:border-amber-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-amber-100 text-amber-700 rounded-full p-4 group-hover:bg-amber-700 group-hover:text-white transition-colors duration-300">
                  <Icon icon={feature.icon} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900">
                  {feature.title.charAt(0).toUpperCase() +
                    feature.title.slice(1)}
                </h3>
                <p className="text-amber-700">
                  {feature.description.charAt(0).toUpperCase() +
                    feature.description.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectSection;
