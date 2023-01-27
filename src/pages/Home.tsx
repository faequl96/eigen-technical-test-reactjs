import React, { useState, useEffect, useContext } from "react";
import { Breadcrumb, Carousel, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { API } from "../config/Api";
import { AppContext } from "../contexts/AppContexts";

interface DataType {
  title: string;
  urlToImage: string;
  url: string;
  description: string;
  content: string;
  author: string;
  source: { name: string };
}

const Home: React.FC = () => {
  const [dataArticles, setDataArticles] = useState<DataType[]>([]);
  const navigate = useNavigate();
  const contexts = useContext(AppContext);

  useEffect(() => {
    async function getDataTrans() {
      const res = await API.get(
        `/top-headlines?country=${contexts.country}&category=general`
      );
      setDataArticles(res.data.articles);
    }
    getDataTrans();
  }, [contexts.country]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item className="text-black font-semibold">
          Home
        </Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{ background: colorBgContainer }}
        className="!h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh]"
      >
        <Carousel className="!h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh]">
          <div className="!h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh]">
            <div className="p-3 !h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh] text-white bg-[#001529]">
              <div className="!h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] w-[100%] relative">
                <div className="w-full !h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] !overflow-hidden">
                  <img
                    src={dataArticles[0]?.urlToImage}
                    className="max-w-none h-full md:!h-auto md:!w-full"
                  />
                </div>
                <div
                  className="!h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] absolute top-0 left-0 !pb-6 right-0 bg-black bg-opacity-60 py-4 px-6 flex flex-col justify-between"
                  onClick={() =>
                    navigate(`/article-detail/${dataArticles[0]?.title}`)
                  }
                >
                  <div>
                    <h2 className="text-start leading-10 font-extrabold text-4xl">
                      {dataArticles[0]?.title}
                    </h2>
                    <p className="text-start leading-6 mt-6 text-lg">
                      {dataArticles[0]?.description}
                    </p>
                  </div>
                  <div className="flex justify-between h-10 items-center">
                    <div className="text-red-500 font-bold leading-6">
                      Author :{" "}
                      <span className="text-slate-200 font-bold leading-6">
                        {dataArticles[0]?.author}
                      </span>
                    </div>
                    <div className="text-red-500 font-bold leading-6">
                      Source :{" "}
                      <a
                        href={dataArticles[0]?.source.name}
                        className="text-blue-500 font-bold"
                      >
                        {dataArticles[0]?.source.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="!h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh]">
            <div className="p-3 !h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh] text-white bg-[#001529]">
              <div className="!h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] w-[100%] relative">
                <div className="w-full !h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] !overflow-hidden">
                  <img
                    src={dataArticles[1]?.urlToImage}
                    className="max-w-none h-full md:!h-auto md:!w-full"
                  />
                </div>
                <div
                  className="!h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] absolute top-0 left-0 !pb-6 right-0 bg-black bg-opacity-60 py-4 px-6 flex flex-col justify-between"
                  onClick={() =>
                    navigate(`/article-detail/${dataArticles[1]?.title}`)
                  }
                >
                  <div>
                    <h2 className="text-start leading-10 font-extrabold text-4xl">
                      {dataArticles[1]?.title}
                    </h2>
                    <p className="text-start leading-6 mt-6 text-lg">
                      {dataArticles[1]?.description}
                    </p>
                  </div>
                  <div className="flex justify-between h-10 items-center">
                    <div className="text-red-500 font-bold leading-6">
                      Author :{" "}
                      <span className="text-slate-200 font-bold leading-6">
                        {dataArticles[1]?.author}
                      </span>
                    </div>
                    <div className="text-red-500 font-bold leading-6">
                      Source :{" "}
                      <a
                        href={dataArticles[1]?.source.name}
                        className="text-blue-500 font-bold"
                      >
                        {dataArticles[1]?.source.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="!h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh]">
            <div className="p-3 !h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh] text-white bg-[#001529]">
              <div className="!h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] w-[100%] relative">
                <div className="w-full !h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] !overflow-hidden">
                  <img
                    src={dataArticles[2]?.urlToImage}
                    className="max-w-none h-full md:!h-auto md:!w-full"
                  />
                </div>
                <div
                  className="!h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] absolute top-0 left-0 !pb-6 right-0 bg-black bg-opacity-60 py-4 px-6 flex flex-col justify-between"
                  onClick={() =>
                    navigate(`/article-detail/${dataArticles[2]?.title}`)
                  }
                >
                  <div>
                    <h2 className="text-start leading-10 font-extrabold text-4xl">
                      {dataArticles[2]?.title}
                    </h2>
                    <p className="text-start leading-6 mt-6 text-lg">
                      {dataArticles[2]?.description}
                    </p>
                  </div>
                  <div className="flex justify-between h-10 items-center">
                    <div className="text-red-500 font-bold leading-6">
                      Author :{" "}
                      <span className="text-slate-200 font-bold leading-6">
                        {dataArticles[2]?.author}
                      </span>
                    </div>
                    <div className="text-red-500 font-bold leading-6">
                      Source :{" "}
                      <a
                        href={dataArticles[2]?.source.name}
                        className="text-blue-500 font-bold"
                      >
                        {dataArticles[2]?.source.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="!h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh]">
            <div className="p-3 !h-[84vh] md:!h-[60vh] lg:!h-[70vh] xl:!h-[80vh] text-white bg-[#001529]">
              <div className="!h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] w-[100%] relative">
                <div className="w-full !h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] !overflow-hidden">
                  <img
                    src={dataArticles[3]?.urlToImage}
                    className="max-w-none h-full md:!h-auto md:!w-full"
                  />
                </div>
                <div
                  className="!h-[76vh] md:!h-[52vh] lg:!h-[62vh] xl:!h-[72vh] absolute top-0 left-0 !pb-6 right-0 bg-black bg-opacity-60 py-4 px-6 flex flex-col justify-between"
                  onClick={() =>
                    navigate(`/article-detail/${dataArticles[3]?.title}`)
                  }
                >
                  <div>
                    <h2 className="text-start leading-10 font-extrabold text-4xl">
                      {dataArticles[3]?.title}
                    </h2>
                    <p className="text-start leading-6 mt-6 text-lg">
                      {dataArticles[3]?.description}
                    </p>
                  </div>
                  <div className="flex justify-between h-10 items-center">
                    <div className="text-red-500 font-bold leading-6">
                      Author :{" "}
                      <span className="text-slate-200 font-bold leading-6">
                        {dataArticles[3]?.author}
                      </span>
                    </div>
                    <div className="text-red-500 font-bold leading-6">
                      Source :{" "}
                      <a
                        href={dataArticles[3]?.source.name}
                        className="text-blue-500 font-bold"
                      >
                        {dataArticles[3]?.source.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Home;
