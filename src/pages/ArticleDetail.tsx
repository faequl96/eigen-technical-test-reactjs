import React, { useEffect, useState, useContext } from "react";
import { Breadcrumb, theme, Skeleton } from "antd";
import { API } from "../config/Api";
import { useNavigate, useParams } from "react-router-dom";
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

const ArticleDetail: React.FC = () => {
  const { title } = useParams();
  const [dataArticles, setDataArticles] = useState<DataType[]>([]);
  const contexts = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [titleLength, setTitleLength] = useState(0);
  const [titleSlice, setTitleSlice] = useState("");

  useEffect(() => {
    if (title !== undefined) {
      setTitleLength(title.length);
      setTitleSlice(title);
    }
  }, []);

  useEffect(() => {
    async function getDataTrans() {
      setLoading(true);
      const res = await API.get(
        `/top-headlines?country=${contexts.country}&category=${contexts.navActive}`
      );
      setLoading(false);
      setDataArticles(res.data.articles);
    }
    getDataTrans();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
            contexts.setHomeActive(true);
            contexts.setListActive(false);
            contexts.setArticleActive(false);
            contexts.setCategoryActive(false);
            contexts.setNavActiveStyle([]);
          }}
        >
          Home
        </Breadcrumb.Item>
        {contexts.listActive ? (
          <Breadcrumb.Item className="text-black font-semibold">
            List
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            className="cursor-pointer"
            onClick={() => {
              navigate("/list-article");
              contexts.setNavActive("general");
              contexts.setListActive(true);
              contexts.setHomeActive(false);
              contexts.setArticleActive(false);
              contexts.setCategoryActive(false);
              contexts.setNavActiveStyle([]);
            }}
          >
            List
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => {
            navigate("/list-article");
            contexts.setNavActive(contexts.navActive);
            contexts.setCategoryActive(true);
            contexts.setListActive(false);
            contexts.setHomeActive(false);
            contexts.setArticleActive(false);
          }}
        >
          {contexts.navActive}
        </Breadcrumb.Item>
        {titleLength > 22 ? (
          <Breadcrumb.Item className="text-black font-semibold">
            {titleSlice.slice(0, 21)}...
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item className="text-black font-semibold">
            {title}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
      <Skeleton loading={loading} active avatar>
        <div
          style={{ padding: 0, minHeight: 380, background: colorBgContainer }}
        >
          {dataArticles?.map((item) => (
            <div
              key={item.title}
              className={`px-3 pt-3 ${item.title !== title && "hidden"}`}
            >
              {item.title === title && (
                <>
                  <h2 className="font-bold text-xl mb-4">{item.title}</h2>
                  <img src={item.urlToImage} className="w-[400px] mb-4" />
                  <h5 className="text-red-500 font-bold">
                    Source :{" "}
                    <a className="text-blue-500 font-bold">
                      {item.source.name}
                    </a>
                  </h5>
                  <h5 className="text-red-500 font-bold mb-5">
                    Author :{" "}
                    <span className="text-slate-600 font-bold">
                      {item.author}
                    </span>
                  </h5>
                  <p>
                    {item.content}{" "}
                    <a href={item.url} className="text-red-500 font-bold">
                      Read More...
                    </a>
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </Skeleton>
    </>
  );
};

export default ArticleDetail;
