import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Feed from "./components/Feed";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import { ProtectedRoutes, PublicOnlyRoute } from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* if not user logged in dont let any routes */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* if logged in except login allowed */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <h1 className="">Get started</h1> */}
    </>
  );
}

export default App;
