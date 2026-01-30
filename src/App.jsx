import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/Home";
import CollectionCategory from "./pages/CollectionCategory";
import ProductGroup from "./pages/ProductGroup";
import ProductDetails from "./pages/ProductDetails";
import Vendors from "./pages/Vendors";
import VendorDetails from "./pages/VendorDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductDetailed from "./pages/ProductDetailedPage";
import MyProfile from "./pages/ProfilePage";
import Payment from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import VendorDashboard from "./pages/VendorDashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= USER LAYOUT ================= */}
        {/* Cart Page ഹെഡറും ഫൂട്ടറും ഉള്ള ലേഔട്ടിനുള്ളിൽ വരാൻ ഇതിനുള്ളിൽ കൊടുക്കണം */}
        <Route element={<UserLayout />}>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* VENDORS */}
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:slug" element={<VendorDetails />} />

          {/* COLLECTIONS */}
          <Route
            path="/collections/:category"
            element={<CollectionCategory />}
          />
          <Route
            path="/collections/:category/:type"
            element={<ProductGroup />}
          />

          {/* PRODUCT PAGES */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* PRODUCT DETAILED PAGE */}
          <Route
            path="/product-detailes/:id"
            element={<ProductDetailed />}
          />

          {/* USER PROFILE PAGE */}
          <Route
            path="/profile"
            element={<MyProfile />}
          />

          {/* ✅ CART PAGE ADDED HERE */}
          <Route
            path="/cart"
            element={<CartPage />}
          />

          {/* PAYMENT / CHECKOUT PAGE */}
          <Route
            path="/checkout"
            element={<Payment />}
          />


          {/* VENDOR DASHBAORD PAGE */}
          <Route
            path="/vendorDashboard"
            element={<VendorDashboard />}
          />
        </Route>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;