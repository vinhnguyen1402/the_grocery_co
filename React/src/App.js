import "./App.css";
import HomePage from "./page/HomePage";
// import ProductPage from "./page/ProductPage";
import ProductCatalogPage from "./page/ProductCatalogPage";
import ProductDescription from "./page/ProductDescription";
import AboutPage from "./page/AboutPage";
import Cart from "./page/CartPage";
import { useRoutes } from "react-router-dom";
import SubcategoryPage from "./page/SubcategoryPage";
import SearchPage from "./page/SearchPage/SearchPage";
import FAQ from "./components/FAQ/FAQ";
import Team from "./components/Team/Team";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/catalog",
      element: <ProductCatalogPage />,
    },
    // {
    //   path: "/product/:category",
    //   element: <ProductPage />,
    // },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/product/:productId",
      element: <ProductDescription />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/categories/:categoryId",
      element: <SubcategoryPage />,
    },
    {
      path: "/search",
      element: <SearchPage key={window.location.search} />,
    },
    {
      path: "/faq",
      element: <FAQ />,
    },
    {
      path: "/teams",
      element: <Team />,
    },
  ]);

  return <div className="App">{routes}</div>;
}

export default App;
