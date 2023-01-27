import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContexts";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import usa from "../assets/usa.png";
import indonesia from "../assets/indonesia.png";

const { Header } = Layout;

const dataNav = [
  {
    id: 1,
    navTitle: "General",
    navTo: "general",
  },
  {
    id: 2,
    navTitle: "Business",
    navTo: "business",
  },
  {
    id: 3,
    navTitle: "Sports",
    navTo: "sports",
  },
  {
    id: 4,
    navTitle: "Health",
    navTo: "health",
  },
  {
    id: 5,
    navTitle: "Science",
    navTo: "science",
  },
  {
    id: 6,
    navTitle: "Technology",
    navTo: "technology",
  },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const contexts = useContext(AppContext);

  const handlerNavActive = (id: number) => {
    let filterID = contexts.navActiveStyle.filter((el: number) => el === id);
    if (filterID[0] !== id) {
      contexts.setNavActiveStyle([id]);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() => {
            contexts.setCountry("us");
            contexts.setNavActiveStyle([]);
            navigate("/");
          }}
          className="flex gap-2"
        >
          <div className="w-6">
            <img src={usa} />
          </div>
          <span>US</span>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          onClick={() => {
            contexts.setCountry("id");
            contexts.setNavActiveStyle([]);
            navigate("/");
          }}
          className="flex gap-2"
        >
          <div className="w-6">
            <img src={indonesia} />
          </div>
          <span>ID</span>
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <Header className="flex items-center !px-3 top-0 z-10 sticky w-full">
      <div
        className="bg-white bg-opacity-80 font-black text-[#001529] text-3xl h-[80%] flex justify-center items-center px-5 w-[26%] max-w-[100px] leading-6 mr-3 cursor-pointer"
        onClick={() => {
          navigate("/");
          contexts.setHomeActive(true);
          contexts.setListActive(false);
          contexts.setArticleActive(false);
          contexts.setNavActiveStyle([]);
        }}
      >
        <h1 className="-mt-1">Eigen News</h1>
      </div>
      <Dropdown menu={{ items }} trigger={["click"]} className="text-slate-300">
        <a onClick={(e) => e.preventDefault()}>
          <Space className=" mt-1">
            {contexts.country === "us" ? (
              <div className="w-6 mt-[4px]">
                <img src={usa} />
              </div>
            ) : (
              <div className="w-6 mt-[4px]">
                <img src={indonesia} />
              </div>
            )}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <Menu
        theme="dark"
        className="min-w-[54%] flex items-center"
        mode="horizontal"
        defaultSelectedKeys={["4"]}
        items={dataNav.map((item) => ({
          key: `${item.navTitle}`,
          label: `${item.navTitle}`,
          className: `h-[50px] !flex !items-center ${
            contexts.navActiveStyle.filter(
              (el: number) => el === item.id
            )[0] === item.id && "border-b-[5px] border-white"
          }`,
          onClick: () => {
            handlerNavActive(item.id);

            if (item.navTitle !== "General") {
              contexts.setNavActive(item.navTo);
              navigate("/list-article");
              contexts.setCategoryActive(true);
              contexts.setListActive(false);
              contexts.setHomeActive(false);
              contexts.setArticleActive(false);
            } else {
              contexts.setNavActive(item.navTo);
              navigate("/list-article");
              contexts.setListActive(true);
              contexts.setHomeActive(false);
              contexts.setArticleActive(false);
              contexts.setCategoryActive(false);
            }
          },
        }))}
      />
    </Header>
  );
};

export default Navbar;
