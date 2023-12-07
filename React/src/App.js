// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './components/Header/CartContext';

// import HomePage from './page/HomePage';
// import ProductCatalogPage from './page/ProductCatalogPage';
// import SubcategoryPage from './page/SubcategoryPage';
// import ProductDescription from './page/ProductDescription';
// import AboutPage from './page/AboutPage';
// import CartPage from './page/CartPage/CartPage';
// import SearchPage from './page/SearchPage/SearchPage';

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <CartProvider>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/home" element={<HomePage />} />
//           <Route path="/catalog" element={<ProductCatalogPage />} />
//           <Route path="/categories/:categoryId" element={<SubcategoryPage />} />
//           <Route path="/products/:productId" element={<ProductDescription />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/cart" element={<CartPage />} />
// <Route path="/search" element={<SearchPage key={window.location.search} />} />
//         </Routes>
//       </CartProvider>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;

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
