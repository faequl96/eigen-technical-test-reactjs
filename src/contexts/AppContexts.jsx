import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [navActive, setNavActive] = useState("general");
  const [homeActive, setHomeActive] = useState(true);
  const [listActive, setListActive] = useState(false);
  const [categoryActive, setCategoryActive] = useState(false);
  const [articleActive, setArticleActive] = useState(false);
  const [country, setCountry] = useState("us");
  const [navActiveStyle, setNavActiveStyle] = useState([]);

  const appContextsValue = {
    navActive,
    setNavActive,
    homeActive,
    setHomeActive,
    listActive,
    setListActive,
    categoryActive,
    setCategoryActive,
    articleActive,
    setArticleActive,
    country,
    setCountry,
    navActiveStyle,
    setNavActiveStyle,
  };

  return (
    <AppContext.Provider value={appContextsValue}>
      {children}
    </AppContext.Provider>
  );
};
