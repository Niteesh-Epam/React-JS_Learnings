import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const ProtectedLayout = () => {
  const isAuth = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  if (!isAuth) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedLayout;
