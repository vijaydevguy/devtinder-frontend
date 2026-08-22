import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { useLogin } from "../hooks/useLogin";

const Body = () => {
  const { loading, getUser, error } = useLogin();
  const location = useLocation();

  useEffect(() => {
    // user data we are getting from redux
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <div>
        {loading && "loading..."}
      </div>

      <Footer />
    </>
  );
};

export default Body;
