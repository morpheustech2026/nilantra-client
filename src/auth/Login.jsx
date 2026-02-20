import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Login() {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const loadToast = toast.loading("Logging in...");

    try {
      const res = await axios.post("https://nilantra-server.onrender.com/api/user/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        toast.success("Login Successful!", { id: loadToast });

        const userRole = res.data.role;
        if (userRole === "admin") navigate("/admindashboard");
        else if (userRole === "vendor") navigate("/vendordashboard");
        else navigate("/");
      }
    } catch (err) {
      const errorMsg = err.response?.data || "Login failed!";
      setError(errorMsg);
      toast.error(errorMsg, { id: loadToast });
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-[#0e1a1f] px-4 pt-32">
        <div className="relative w-full max-w-3xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-luxe animate-pageFade">
          <form onSubmit={handleLogin} className="bg-ivory px-10 py-12 flex flex-col justify-center">
            <h1 className="font-heading text-3xl font-extrabold mb-4 uppercase tracking-tighter">LOG IN</h1>
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

            <label className="text-sm text-ink mb-1">Email</label>
            <input 
              type="email" required value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@example.com" 
              className="mb-4 px-4 py-2.5 rounded-full border border-ink/10 text-sm focus:outline-none focus:border-brand" 
            />

            <label className="text-sm text-ink mb-1">Password</label>
            <div className="relative mb-5">
              <input 
                type={showPassword ? "text" : "password"}
                required value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full px-4 py-2.5 rounded-full border border-ink/10 text-sm focus:outline-none focus:border-brand" 
              />
              
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-brand transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <button type="submit" className="bg-ink text-ivory py-2.5 rounded-full tracking-wide text-sm hover:bg-brand transition-all duration-300">
              LOG IN
            </button>
            <p className="text-xs text-ink/60 mt-5">Don’t have an account? <Link to="/register" className="text-brand ml-1 hover:underline">Sign up</Link></p>
          </form>
          <div className="hidden md:block bg-ivory p-3">
            <img src="/sofa.jpeg" alt="Nilantra" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;