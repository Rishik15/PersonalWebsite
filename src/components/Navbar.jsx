import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Sun from "../assets/sun.png";
import Moon from "../assets/moon.png";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Work", target: "work" },
  { name: "Skills", target: "skills" },
  { name: "Certificates", target: "certifications" },
  { name: "Projects", target: "projects" },
  { name: "Contact Me", target: "contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [iconMode, setIconMode] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");

    if (!storedTheme) {
      storedTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }

    if (storedTheme === "dark") {
      setIsDarkMode(true);
      setIconMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      setIconMode(false);
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    setIsMenuOpen(false);
  };

  const triggerRippleToggle = () => {
    const ripple = document.getElementById("ripple");
    const iconWrapper = ripple?.parentElement;
    if (!ripple || !iconWrapper) return;

    const rect = iconWrapper.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    ripple.style.left = `${centerX - 50}px`;
    ripple.style.top = `${centerY - 50}px`;
    ripple.style.backgroundColor = isDarkMode ? "#F5FAFF" : "#151515";

    ripple.classList.remove("scale-0");
    ripple.classList.add("scale-[50]");

    setTimeout(() => {
      toggleTheme();
      ripple.classList.replace("scale-[50]", "scale-0");
    }, 1000);

    setTimeout(() => {
      setIconMode(!isDarkMode);
    }, 2000);
  };

  return (
    <nav
      className="w-full transition-colors duration-300"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex items-center justify-between w-full">
        <div className="hidden md:flex space-x-[32px]">
          {navItems.map((item) => (
            <a
              key={item.target}
              href={currentPath}
              onClick={(e) => scrollTo(e, item.target)}
              className="relative text-foreground text-[18px] md:text-[24px] font-medium
                         after:content-[''] after:absolute after:left-0 after:-bottom-1
                         after:w-0 after:h-[5px] after:bg-current after:transition-all
                         after:duration-300 hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 backdrop-blur-lg bg-background/50 border border-border shadow-lg z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item) => (
              <a
                key={item.target}
                href={currentPath}
                role="menuitem"
                onClick={(e) => scrollTo(e, item.target)}
                className="text-foreground text-[20px] font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="relative w-[24px] h-[24px] z-50">
          <div
            id="ripple"
            className="absolute w-[100px] h-[100px] rounded-full bg-[#151515] pointer-events-none z-50 opacity-100 scale-0 transition-all duration-[2000ms] ease-in-out"
            style={{ transformOrigin: "center center", overflow: "hidden" }}
          />
          <button
            onClick={triggerRippleToggle}
            className="absolute top-0 left-0 w-full h-full z-[70] flex items-center justify-center transition-all duration-[2000ms] ease-in"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait">
              {iconMode ? (
                <motion.img
                  key="sun"
                  id="theme-toggle-icon"
                  src={Sun}
                  alt="Sun Icon"
                  className="w-6 h-6 md:w-8 md:h-8 object-contain cursor-pointer"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    scale: 0.8,
                    rotate: -10,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                />
              ) : (
                <motion.img
                  key="moon"
                  id="theme-toggle-icon"
                  src={Moon}
                  alt="Moon Icon"
                  className="w-6 h-6 md:w-8 md:h-8 object-contain cursor-pointer"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    scale: 0.8,
                    rotate: -10,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                />
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </nav>
  );
};
