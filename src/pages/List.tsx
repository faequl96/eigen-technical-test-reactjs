import React, { useEffect, useState, useContext } from "react";
import { Avatar, Breadcrumb, List, theme, Skeleton } from "antd";
import { API } from "../config/Api";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContexts";

interface DataType {
  title: string;
  urlToImage: string;
  url: string;
  description: string;
  content: string;
}

const ArticleList: React.FC = () => {
  const [dataArticles, setDataArticles] = useState<DataType[]>([]);
  const navigate = useNavigate();
  const contexts = useContext(AppContext);
  const [loading, setLoading] = useState(false);

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
  }, [contexts.navActive, contexts.country]);

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
              contexts.setNavActiveStyle([1]);
            }}
          >
            List
          </Breadcrumb.Item>
        )}
        {contexts.categoryActive && (
          <Breadcrumb.Item className="text-black font-semibold">
            {contexts.navActive}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
      <div style={{ background: colorBgContainer }} className="pb-10">
        <List
          itemLayout="horizontal"
          size="small"
          pagination={{
            className:
              "fixed inset-x-0 bottom-0 h-16 flex items-center justify-center bg-[#e9e9e9]",
            pageSize: 5,
          }}
          className="mt-2 mb-2"
          dataSource={dataArticles}
          renderItem={(item) => (
            <List.Item key={item.title}>
              <Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  className="!block md:!flex gap-4 py-2"
                  avatar={
                    <Avatar
                      src={item.urlToImage}
                      className="w-full h-full max-w-[280px] max-h-[160px] rounded-none"
                    />
                  }
                  title={
                    <span
                      onClick={() => {
                        navigate(`/article-detail/${item.title}`);
                        contexts.setArticleActive(true);
                        contexts.setHomeActive(false);
                        contexts.setListActive(false);
                      }}
                      className="mt-0 block cursor-pointer font-semibold text-lg"
                    >
                      {item.title}
                    </span>
                  }
                  description={<p>{item.description}</p>}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default ArticleList;
