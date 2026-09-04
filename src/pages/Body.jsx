import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { useLogin } from "../hooks/useLogin";
import SiriWave from "../components/ui/SiriWave";

const Body = () => {
  const { loading, getUser, error } = useLogin();
  const location = useLocation();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // wait for getUser to finish before rendering the routes
    getUser().finally(() => {
      setIsInitializing(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      {isInitializing ? (
        <div className="flex justify-center items-center min-h-[70vh]">
           <SiriWave
              variant="fluid-dots"
              size={360}
            />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Body;
