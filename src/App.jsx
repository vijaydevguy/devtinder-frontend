import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";

function App() {
  return (
    <>
     
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} />
        </Routes>
      </BrowserRouter>
      {/* <h1 className="">Get started</h1> */}
    </>
  );
}

export default App;
