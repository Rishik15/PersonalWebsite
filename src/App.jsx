import React, { useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";

function AnimatedRoutes() {
  const location = useLocation();
  const projectsRef = useRef(null);

  const handleExitComplete = () => {
    if (location.pathname === "/" && location.state?.scrollToProjects) {
      requestAnimationFrame(() => {
        projectsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      });
      window.history.replaceState({}, document.title);
    }
  };

  return (
    
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home projectsRef={projectsRef} />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
