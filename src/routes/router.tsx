import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Order from "../pages/Order";
import Media from "../pages/Media";
import Profile from "../pages/Profile";
import ProductList from "../pages/ProductList";
import SingleProduct from "../pages/SingleProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <Order /> },
      { path: "/media", element: <Media /> },
      { path: "/profile", element: <Profile /> },
      { path: "/product-list/:categoryId", element: <ProductList /> },
      { path: "/single-product/:productId", element: <SingleProduct /> },
    ],
  },

]);

export default router;