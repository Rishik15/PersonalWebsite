import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Navbar } from "../components/Navbar.jsx";
import { HeroSection } from "../components/HeroSection.jsx";
import { WorkExperience } from "../components/WorkExperience.jsx";
import { Skills } from "../components/Skills.jsx";
import { Projects } from "../components/Projects.jsx";
import { ContactMe } from "../components/ContactMe.jsx";

const ScrollFadeIn = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root: document.getElementById("top"), once: true, amount: 0.05 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 16,
        mass: 0.5,
        duration: 0.5,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export const Home = ({ projectsRef }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      id="top"
      className="min-h-screen overflow-x-hidden px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 space-y-[56px] md:space-y-[64px] no-scrollbar"
      initial={false}
    >
      <ScrollFadeIn delay={0.3}>
        <div className="flex flex-col space-y-[40px] md:space-y-[64px] px-[28px] md:px-[56px] items-center">
          <Navbar />
          <HeroSection />
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <WorkExperience />
      </ScrollFadeIn>

      <ScrollFadeIn delay={0.4}>
        <Skills />
      </ScrollFadeIn>

      <ScrollFadeIn delay={0.1}>
          <div className="-mx-4 sm:-mx-6 md:-mx-8 w-screen">
          <Projects ref={projectsRef} />
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <ContactMe />
      </ScrollFadeIn>

      {showScrollTop && (
        <a
          href="#top"
          aria-label="Scroll to Top"
          className={`
            fixed bottom-4 right-3 md:bottom-6 md:right-5 z-50 
            p-2 rounded-full transition-transform duration-300 hover:scale-110
            text-foreground
            ${
              isDarkMode
                ? `
                  bg-gradient-to-br from-[#1f1f1f] to-[#3a3a3a]
                  shadow-[0_6px_20px_rgba(0,0,0,0.6),0_0_6px_rgba(255,255,255,0.05),inset_0_1px_2px_rgba(255,255,255,0.04)]
                  border border-white/10
                `
                : `
                  bg-gradient-to-br from-[#ffffff] to-[#eaeaea]
                  shadow-[0_6px_20px_rgba(0,0,0,0.15),0_0_6px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.6)]
                  border border-black/10
                `
            }
          `}
        >
          <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
        </a>
      )}
    </motion.div>
  );
};
