import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import toast from "react-hot-toast"; 

const brand = "NILANTRA";

function Register() {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", 
    role: "user" 
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Password Validation
    if (formData.password !== formData.confirmPassword) {
      const matchError = "Passwords do not match!";
      setError(matchError);
      toast.error(matchError);
      return;
    }

    const loadToast = toast.loading("Creating your account..."); 
    try {
     
      const { name, email, password, role } = formData;
      const res = await axios.post("http://localhost:3000/api/user/register", { name, email, password, role });
      
      if (res.status === 201) {
        toast.success("Registration Successful!", { id: loadToast }); 
        navigate("/login");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Registration failed!";
      setError(errorMsg);
      toast.error(errorMsg, { id: loadToast });
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-[#0e1a1f] px-4 pt-32 pb-10">
        <div className="relative w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-luxe animate-pageFade">
          <form onSubmit={handleRegister} className="bg-ivory px-10 py-12 flex flex-col justify-center">
            <p className="text-xs tracking-widestPlus text-brand mb-2">CREATE ACCOUNT</p>
            <h1 className="font-heading text-3xl font-extrabold mb-2">{brand}</h1>
            
            {error && <p className="text-red-500 text-xs mb-4 font-bold">{error}</p>}

            <label className="text-sm text-ink mb-1">Full Name</label>
            <input name="name" type="text" required onChange={handleChange} placeholder="Your Name" className="mb-4 px-4 py-2.5 rounded-full border border-ink/10 text-sm focus:outline-none focus:border-brand" />

            <label className="text-sm text-ink mb-1">Email</label>
            <input name="email" type="email" required onChange={handleChange} placeholder="you@example.com" className="mb-4 px-4 py-2.5 rounded-full border border-ink/10 text-sm focus:outline-none focus:border-brand" />

            {/* Password Field */}
            <label className="text-sm text-ink mb-1">Password</label>
            <div className="relative mb-4">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required onChange={handleChange} 
                placeholder="••••••••" 
                className="w-full px-4 py-2.5 rounded-full border border-ink/10 text-sm focus:outline-none focus:border-brand" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-brand">
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            
            <label className="text-sm text-ink mb-1">Confirm Password</label>
            <div className="relative mb-6">
              <input 
                name="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"} 
                required onChange={handleChange} 
                placeholder="••••••••" 
                className="w-full px-4 py-2.5 rounded-full border border-ink/10 text-sm focus:outline-none focus:border-brand" 
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-brand">
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <button type="submit" className="bg-ink text-ivory py-2.5 rounded-full tracking-wide text-sm hover:bg-brand transition-all duration-300">
              CREATE ACCOUNT
            </button>

            <p className="text-xs text-ink/60 mt-5">
              Already have an account? <Link to="/login" className="text-brand ml-1 hover:underline">Log In</Link>
            </p>
          </form>

          <div className="hidden md:block bg-ivory p-3">
            <img src="/violet-sofa.png" alt="Nilantra" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;