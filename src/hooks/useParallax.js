import { useEffect } from "react";

export default function useParallax() {
  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;

        document.documentElement.style.setProperty(
          "--text-parallax",
          `${y * 0.04}px` // 🔥 slow & premium
        );

        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
