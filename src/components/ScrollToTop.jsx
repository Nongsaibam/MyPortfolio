import React, { useState, useEffect } from "react";
import { HiOutlineArrowUp } from "react-icons/hi2";

/**
 * Floating Scroll-to-Top (Arrow Up) button.
 * Automatically appears when scrolling down past the Hero header to the About Me section.
 * Optimized with passive event listeners for ultra-low CPU/RAM usage.
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Passive listener for non-blocking 60fps scrolling
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 animate-fade-up">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className="group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-black/10 bg-white/80 text-slate-800 backdrop-blur-xl shadow-xl shadow-cyan-500/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-white active:scale-95 dark:border-white/15 dark:bg-slate-900/80 dark:text-white dark:hover:border-cyan-400/60 dark:hover:bg-slate-900"
      >
        <HiOutlineArrowUp className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-cyan-400" />
      </button>
    </div>
  );
};

export default ScrollToTop;
