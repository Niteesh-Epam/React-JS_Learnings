import React from "react";
import { Outlet, useNavigate } from "react-router";
import ProductsData, { useProductState } from "../Store/ProductContext";
import CartIcon from "../Components/Cart/CartIcon";
import ProfileIcon from "../Components/Login/LoginIcon";
import classes from "../Components/SingleProduct/SingleProduct.module.css";
import { Link, NavLink } from "react-router-dom";
import { getToken } from "../Services/authService";

const MainLayout = () => {
  const isAccess = true;
  const AuthUserId = getToken();
  const { cartitems } = useProductState();
  const navigate = useNavigate();
  console.log(AuthUserId);
  const homePath = AuthUserId === null ? "/login" : "/profile";

  return (
    <div>
      <header>
        <Link to={homePath}>
          <span className={classes.icon} onClick={() => {}}>
            <ProfileIcon />
          </span>
        </Link>
        <NavLink
          to='/'
          style={(isActive) => ({
            color: isActive ? "green" : "blue",
          })}>
          <h1>Products-List-Page</h1>
        </NavLink>
        <span
          className={classes.icon}
          onClick={() => navigate("products/cart")}>
          <CartIcon />
          <span className={classes.badge}>{cartitems.length}</span>
        </span>
      </header>
      <main>{isAccess ? <Outlet /> : <h2>No Access</h2>}</main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
};

export default MainLayout;
