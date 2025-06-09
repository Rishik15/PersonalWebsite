import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import forkitImg from "../assets/Forkit.png";
import forkitIcon from "../assets/forkiticon.png";
import quickdrawImg from "../assets/Quickdraw.png";
import quickdrawIcon from "../assets/quickdrawicon.png";
import tunes2notesImg from "../assets/Tunes2Notes.jpg";
import tunes2notesIcon from "../assets/tunes2notesicon.png";

const projects = [
  {
    id: "forkit",
    title: "ForkIt",
    imageUrl: forkitImg,
    iconUrl: forkitIcon,
  },
  {
    id: "quickdraw",
    title: "Quick, Draw!",
    imageUrl: quickdrawImg,
    iconUrl: quickdrawIcon,
  },
  {
    id: "tunes2notes",
    title: "Tunes2Notes",
    imageUrl: tunes2notesImg,
    iconUrl: tunes2notesIcon,
  },
];

export const Projects = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const cardRef = useRef(null);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0 });
  const [cardSize, setCardSize] = useState({ width: 200, gap: 24 });

  useEffect(() => {
    function updateSizes() {
      if (carouselRef.current && cardRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        const cardWidth = cardRef.current.offsetWidth;
        const gap = 24;
        setCardSize({ width: cardWidth, gap });
        const totalCardsWidth = (cardWidth + gap) * projects.length - gap;
        const left = Math.min(0, containerWidth - totalCardsWidth);
        setDragBounds({ left, right: 0 });
      }
    }
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const handleMouseMove = (e) => {
    if (!carouselRef.current || !cardRef.current) return;
    const rect = carouselRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const { width, gap } = cardSize;
    const idx = Math.floor(x / (width + gap));
    if (idx >= 0 && idx < projects.length) setHoveredCard(idx);
    else setHoveredCard(null);
  };

  return (
    <div
      id="projects"
      className="w-full flex flex-col items-center space-y-[20px] md:space-y-[48px]"
    >
      <div className="md:px-[56px] px-[28px] w-full">
        <h2 className="text-left text-foreground text-[24px] md:text-[32px] font-bold transition-colors duration-200">
          PROJECTS
        </h2>
      </div>
      <div
        ref={carouselRef}
        className="w-full overflow-hidden md:px-[56px] px-[28px]"
      >
        <motion.div
          className="flex space-x-6"
          drag="x"
          dragConstraints={dragBounds}
          dragElastic={0.18}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => { setIsDragging(false); setHoveredCard(null); }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredCard(null)}
          transition={{ type: "spring", bounce: 0.3, mass: 0.5 }}
        >
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="flex-shrink-0 md:w-[260px] md:h-[350px] w-[200px] h-[250px]"
              ref={idx === 0 ? cardRef : null}
            >
              <ProjectCard
                project={proj}
                isHovered={hoveredCard === idx}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};