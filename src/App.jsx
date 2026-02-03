import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/Home";
import CollectionCategory from "./pages/CollectionCategory";
import ProductGroup from "./pages/ProductGroup";
import Vendors from "./components/Vendors";
import VendorDetails from "./pages/VendorDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductDetailed from "./pages/ProductDetailedPage";
import MyProfile from "./pages/ProfilePage";
import Payment from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import VendorDashboard from "./pages/VendorDashboardPage";
import ScrollToTop from "./components/ScrollToTop";
import VendorsList from "./components/VendorsList";
import Collections from "./components/Collections";
import FAQ from "./components/FaqSection";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<UserLayout />}>

          {/* HOME */}
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />

          {/* VENDORS */}
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendorslist" element={<VendorsList />} />
          <Route path="/vendors/:slug" element={<VendorDetails />} />

          {/* COLLECTIONS */}
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:category" element={<CollectionCategory />} />
          <Route path="/collections/:category/:type" element={<ProductGroup />} />

          {/* ✅ PRODUCT DETAILS (FIXED) */}
          <Route
            path="/product-details/:productId"
            element={<ProductDetailed />}
          />

          {/* USER */}
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/vendorDashboard" element={<VendorDashboard />} />
        </Route>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
