import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const brand = "NILANTRA";

function Login() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-[#0e1a1f] px-4 pt-32">
        {/* CARD */}
        <div
          className="
            relative w-full max-w-3xl
            grid md:grid-cols-2
            rounded-3xl overflow-hidden
            shadow-luxe animate-pageFade
          "
        >
          {/* LEFT – FORM */}
          <div className="bg-ivory px-10 py-12 flex flex-col justify-center">
            <p className="text-xs tracking-widestPlus text-brand mb-2">
              WELCOME TO
            </p>

            <h1 className="font-heading text-3xl font-extrabold mb-2">
              {brand.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block opacity-0 animate-brandReveal"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {char}
                </span>
              ))}
            </h1>

            <p className="text-ink/70 text-sm mb-6">
              Login to continue exploring handcrafted luxury.
            </p>

            <label className="text-sm text-ink mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="
                mb-4 px-4 py-2.5 rounded-full
                border border-ink/10
                focus:outline-none focus:border-brand
                text-sm
              "
            />

            <label className="text-sm text-ink mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                mb-3 px-4 py-2.5 rounded-full
                border border-ink/10
                focus:outline-none focus:border-brand
                text-sm
              "
            />

            <span className="text-xs text-brand cursor-pointer mb-5">
              Forgot password?
            </span>

            <button
              className="
                bg-ink text-ivory py-2.5 rounded-full tracking-wide text-sm
                hover:bg-brand hover:-translate-y-[1px]
                active:translate-y-0
                transition-all duration-300
              "
            >
              LOG IN
            </button>

            <p className="text-xs text-ink/60 mt-5">
              Don’t have an account?
              <Link to="/register" className="text-brand ml-1 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* RIGHT – IMAGE */}
          <div className="hidden md:block bg-ivory p-3">
            <img
              src="/sofa.jpeg"
              alt="Nilantra Interior"
              className="
                w-full h-full object-cover
                rounded-2xl animate-imageSlow
              "
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
