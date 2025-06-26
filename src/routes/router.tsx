import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";

const Layout = lazy(() => import("../pages/Layout"));
const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const Order = lazy(() => import("../pages/Order"));
const Media = lazy(() => import("../pages/Media"));
const Profile = lazy(() => import("../pages/Profile"));
const ProductList = lazy(() => import("../pages/ProductList"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={
    <Loading/>
  }>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(Layout),
    children: [
      { path: "/", element: withSuspense(Home) },
      { path: "/cart", element: withSuspense(Cart) },
      { path: "/order", element: withSuspense(Order) },
      { path: "/media", element: withSuspense(Media) },
      { path: "/profile", element: withSuspense(Profile) },
      { path: "/product-list/:categoryId", element: withSuspense(ProductList) },
      { path: "/single-product/:productId", element: withSuspense(SingleProduct) },
    ],
  },
]);

export default router;