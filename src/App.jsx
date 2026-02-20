import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import { Toaster } from 'react-hot-toast';
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
import OfferPage from "./pages/OfferPage";
import AboutSection from "./components/AboutSection";
import AdminDashboard from "./pages/AdminDashboard";
import CreateProduct from './components/admin/CreateProduct';
import EpoxyGallery from "./components/EpoxyGallery";
import ConstructionSection from "./components/ConstructionSection";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

     <Toaster 
  position="top-center"
    reverseOrder={false} 
  containerStyle={{
    top: '50%', 
    left: '50%',
    transform: 'translate(-50%, -50%)', 
  }}
  toastOptions={{
    duration: 3000,
    style: {
      background: 'rgba(1, 31, 75, 0.95)', 
      color: '#fff',
      padding: '16px 24px',
      borderRadius: '20px', 
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      border: '1px solid rgba(210, 154, 35, 0.3)', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
      backdropFilter: 'blur(10px)', 
      minWidth: '250px',
      textAlign: 'center',
    },
    success: {
      iconTheme: {
        primary: '#d29a23', 
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#ff4b4b', 
        secondary: '#fff',
      },
    },
  }}
/>
      <Routes>
        <Route element={<UserLayout />}>

          {/* HOME */}
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutSection />} />
          <Route
            path="/construction"
            element={<ConstructionSection />}
          />

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
          <Route path="/product/:slug" element={<ProductDetailed />} />


          <Route path="/gallery" element={<EpoxyGallery />} />



          {/* OFFER */}

          <Route path="/offers" element ={<OfferPage/>}/>

         

          {/* USER */}
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/vendorDashboard" element={<VendorDashboard />} />
        </Route>



        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/edit-product/:id" element={<CreateProduct />} />
        <Route path="/admin/inventory" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
