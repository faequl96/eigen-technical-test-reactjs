import ArticleList from "./pages/List";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";
import { AppContextProvider } from "./contexts/AppContexts";
import Home from "./pages/Home";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <AppContextProvider>
        <Layout>
          <Navbar />
          <Content className="site-layout !px-3">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/list-article" element={<ArticleList />}></Route>
              <Route
                path="/article-detail/:title"
                element={<ArticleDetail />}
              ></Route>
            </Routes>
          </Content>
        </Layout>
      </AppContextProvider>
    </Router>
  );
}

export default App;
