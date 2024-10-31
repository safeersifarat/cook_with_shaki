import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Splash_screen from "./pages/Splash_screen";
import Home from "./pages/home";
import Sign_in from "./pages/sign_in";
import Sign_up from "./pages/sign_up";
import Profile from "./pages/profile"

const App = () => {
  const location = useLocation();

  // Define routes where you don't want the header to appear
  const hideHeaderRoutes = ["/", "/signin", "/signup"];

  return (
    <>
      {/* Conditionally render Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Splash_screen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Sign_in />} />
        <Route path="/signup" element={<Sign_up />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
