import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import LoginPage, { LoginPageActions } from "./Components/Login/Login";
import MainLayout from "./Pages/MainLayout";
import ProductsLayout from "./Pages/ProductsLayout";
import SingleProductLayout from "./Pages/SingleProductLayout";
import CartPage from "./Components/Cart/CartPage";
import ProductsData from "./Store/ProductContext";
import FormPage from "./Components/Login/Login";
import ProfilePage, { profileLoader } from "./Pages/ProfilePage";

function App() {
  console.log(process.env.BASE_URL);
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<ProductsLayout />} />
          <Route
            path='/login'
            element={<LoginPage />}
            action={LoginPageActions}
          />
          <Route
            path='/profile'
            element={<ProfilePage />}
            loader={profileLoader}
          />
          <Route path='/products/:id' element={<SingleProductLayout />} />
          <Route path='/products/cart' element={<CartPage />} />
        </Route>
      </Route>
    )
  );
  return (
    <div>
      <ProductsData>
        <RouterProvider router={Router} />
      </ProductsData>
    </div>
  );
}

export default App;
