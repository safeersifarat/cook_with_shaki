import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Splash_screen from "./pages/Splash_screen";
import Home from "./pages/Home";
import Sign_in from "./pages/Sign_in";
import Sign_up from "./pages/sign_up";
import IndianCuisinePage from "./pages/IndianCuisine"; // Adjust the path as necessary
import ChineseCuisinePage from "./pages/ChineseCuisine"; // Adjust the path as necessary
import AsianCuisinePage from "./pages/AsianCuisine"; // Adjust the path as necessary
import AmericanCuisinePage from "./pages/AmericanCuisine"; // Adjust the path as necessary
import MexicanCuisinePage from "./pages/MexicanCuisine"; // Adjust the path as necessary
import ThaiCuisinePage from "./pages/ThaiCuisine";
import Profile from "./pages/profile";
import PopularPage from "./pages/popular";
import NammaKeralaPage from "./pages/NammaKerala";
import DishPage from "./pages/Dish";
import AdminPage from "./pages/Admin/AdminPage";

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
          <Route path="/indian" element={<IndianCuisinePage />} />
          <Route path="/chinese" element={<ChineseCuisinePage />} />
          <Route path="/asian" element={<AsianCuisinePage />} />
          <Route path="/mexican" element={<MexicanCuisinePage />} />
          <Route path="/american" element={<AmericanCuisinePage />} />
          <Route path="/thai" element={<ThaiCuisinePage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/nammakerala" element={<NammaKeralaPage />} />
          <Route path="/dish/:id" element={<DishPage />} />
          <Route path="/admin" element={<AdminPage />} />
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
