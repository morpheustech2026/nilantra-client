/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {

      /* ===============================
         CUSTOM FONTS
      =============================== */
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        accent: ["Cormorant Garamond", "serif"],
      },

      /* ===============================
         WARM LUXURY COLORS
      =============================== */
      colors: {
        brand: "#b08968",
        brandSoft: "#e6d3b1",
        ivory: "#f7f3ee",
        sand: "#efe8dd",
        linen: "#e7ddcf",
        ink: "#1f2933",
      },

      /* ===============================
         PREMIUM GRADIENTS
      =============================== */
      backgroundImage: {
        heroWarm:
          "linear-gradient(180deg, rgba(247,243,238,0.9), rgba(239,232,221,0.95))",
        navGlass:
          "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
      },

      /* ===============================
         PREMIUM SHADOWS
      =============================== */
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        luxe: "0 20px 60px rgba(0,0,0,0.12)",
        glow: "0 0 30px rgba(176,137,104,0.35)",
      },

      dropShadow: {
        brand: "0 20px 40px rgba(0,0,0,0.55)",
      },

      /* ===============================
         TYPOGRAPHY FEEL
      =============================== */
      letterSpacing: {
        widestPlus: "0.35em",
        luxe: "0.12em",
        brandXL: "0.18em",
      },

      fontWeight: {
        brand: "800",
      },

      /* ===============================
         MOTION & EASING
      =============================== */
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        luxury: "cubic-bezier(0.25, 0.8, 0.25, 1)",
      },

      transitionDuration: {
        slow: "700ms",
        luxe: "1200ms",
      },

      /* ===============================
         KEYFRAMES
      =============================== */
      keyframes: {

        /* EXISTING */
        brandReveal: {
          "0%": {
            opacity: "0",
            transform: "translateY(28px) scale(0.94)",
            filter: "blur(8px)",
          },
          "60%": {
            opacity: "1",
            transform: "translateY(-4px) scale(1.02)",
            filter: "blur(1px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
            filter: "blur(0)",
          },
        },

        textReveal: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        heroFade: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
            filter: "blur(6px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },

        navSlide: {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        /* LOGIN / PAGE */
        pageFade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        cardRise: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px) scale(0.96)",
            filter: "blur(6px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
            filter: "blur(0)",
          },
        },

        inputFade: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        imageSlow: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },

        /* ===============================
           🔥 NILANTRA LOADER (NEW)
        =============================== */
        nilantraPulse: {
          "0%, 100%": {
            transform: "scale(0.95)",
            opacity: "0.5",
          },
          "50%": {
            transform: "scale(1.06)",
            opacity: "1",
          },
        },
      },

      /* ===============================
         ANIMATIONS
      =============================== */
      animation: {

        /* EXISTING */
        brandReveal: "brandReveal 1.1s cubic-bezier(0.25,0.8,0.25,1) forwards",
        textReveal: "textReveal 1.2s ease-out forwards",
        heroFade: "heroFade 1.5s ease-out forwards",
        navSlide: "navSlide 1s ease-out forwards",

        pageFade: "pageFade 1s ease-out forwards",
        cardRise: "cardRise 1.1s cubic-bezier(0.25,0.8,0.25,1) forwards",
        inputFade: "inputFade 0.8s ease-out forwards",
        imageSlow: "imageSlow 8s ease-out forwards",

        /* 🔥 NILANTRA LOADER */
        nilantraPulse: "nilantraPulse 1.6s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};
