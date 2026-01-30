import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-ink text-ivory">

      {/* GLOBAL BACKGROUND (OK to be fixed) */}
      <div
        className="fixed inset-0 -z-10 bg-center bg-cover image-crisp"
        style={{ backgroundImage: "url('/simple-decor2.png')" }}
      />

      {/* OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT (SCROLL ENABLED) */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default UserLayout;
