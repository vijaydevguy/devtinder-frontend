import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      body
      <Footer />
    </div>
  );
};

export default Body;
