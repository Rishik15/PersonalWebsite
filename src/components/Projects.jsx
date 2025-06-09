import { useState, useRef, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import forkitImg from "../assets/Forkit.png";
import forkitIcon from "../assets/forkiticon.png";
import quickdrawImg from "../assets/Quickdraw.png";
import quickdrawIcon from "../assets/quickdrawicon.png";
import tunes2notesImg from "../assets/Tunes2Notes.png";
import tunes2notesIcon from "../assets/tunes2notesicon.png";
import moodsenseImg from "../assets/moodSense.png";
import moodsenseIcon from "../assets/moodsenseicon.png";
import threadinsightImg from "../assets/ThreadInsight.png";
import threadinsightIcon from "../assets/threadinsighticon.png";

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
    id: "moodsense",
    title: "MoodSense",
    imageUrl: moodsenseImg,
    iconUrl: moodsenseIcon,
  },
  {
    id: "tunes2notes",
    title: "Tunes2Notes",
    imageUrl: tunes2notesImg,
    iconUrl: tunes2notesIcon,
  },
  {
    id: "threadinsight",
    title: "ThreadInsight",
    imageUrl: threadinsightImg,
    iconUrl: threadinsightIcon,
  },
];

function getFrameHorizontalPadding() {
  return window.innerWidth >= 768 ? 56 * 2 : 28 * 2;
}

export const Projects = forwardRef((props, ref) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [clickedIdx, setClickedIdx] = useState(null);
  const frameRef = useRef(null);
  const railRef = useRef(null);
  const cardRef = useRef(null);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0 });

  useEffect(() => {
    function updateConstraints() {
      if (!frameRef.current || !railRef.current) return;
      const frameWidth = frameRef.current.offsetWidth - getFrameHorizontalPadding();
      const railWidth = railRef.current.scrollWidth;
      const gap = 24; 
      const maxDrag = railWidth > frameWidth ? (railWidth - frameWidth) + gap : 0;
      setDragBounds({ left: -maxDrag, right: 0 });
    }
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <div
      id="projects"
      ref={ref} 
      className="w-full flex flex-col items-center space-y-[20px] md:space-y-[48px]"
    >
      <div className="md:px-[88px] sm:px-[52px] px-[40px] w-full">
        <h2 className="text-left text-foreground text-[24px] md:text-[32px] font-bold transition-colors duration-200">
          PROJECTS
        </h2>
      </div>
     <div
        ref={frameRef}
        className="w-full overflow-x-auto no-scrollbar md:px-[88px] sm:px-[52px] px-[40px]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <motion.div
          ref={railRef}
          className="inline-flex space-x-6 py-2"
          drag="x"
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          dragConstraints={dragBounds}
          dragElastic={1}
          whileTap={{ cursor: "grabbing" }}
          transition={{ type: "spring", bounce: 0.5, mass: 0.1, stiffness: 80, damping: 15 }}
        >
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="flex-shrink-0 md:w-[260px] md:h-[350px] w-[200px] h-[250px]"
              ref={idx === 0 ? cardRef : null}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              onCardClick={() => setClickedIdx(idx)}
            >
              <ProjectCard
                project={proj}
                isHovered={hoveredCard === idx}
                isDragging={isDragging}
                clickedIdx={clickedIdx }
                idx = {idx}
                onCardClick={() => setClickedIdx(idx)}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
});