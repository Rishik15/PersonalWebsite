import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const ProjectCard = ({ project, isHovered , isDragging, clickedIdx, idx, onCardClick }) => {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };
  const [initialRect, setInitialRect] = useState(null);
  const [exited, setExited] = useState(false);
  useEffect(() => {
    if (exited && clickedIdx === idx && initialRect) {
      navigate(`/project/${project.id}`, {
        state: { initialRect },
      });
    }
  }, [exited, clickedIdx, idx, initialRect, navigate, project.id]);

  return (
    <motion.div
      className="relative md:w-[260px] md:h-[350px] w-[210px] h-[250px] cursor-pointer "
      layoutId={`card-container-${project.id}`}
      onClick={() => {
         if (!isDragging && clickedIdx === null) {
          const rect = imageRef.current.getBoundingClientRect();
          setInitialRect(rect);
          onCardClick();
        }
      }}
      style={{
        borderRadius: "2.5rem",
        overflow: clickedIdx === idx ? "visible" : "hidden",
      }}
      animate={isHovered ? { borderRadius: "0rem" } : {borderRadius: "2.5rem" }}
      transition={{ type: "spring", stiffness: 300, damping: 35 , mass: 8}}
    >
      <motion.div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center"
        animate={clickedIdx == idx ? { scale: 1.03, borderRadius: "0rem" }
          :isHovered ? { scale: 1.03, borderRadius: "0rem" } : { scale: 1.03, borderRadius: "2.5rem" }}
        transition={{
          default: transition,
          layout: { duration: 0.6, ease: "easeInOut" }
        }}
        style={{ backgroundImage: `url(${project.imageUrl})` }}
        layoutId={`card-background-${project.id}`}
      />

      <motion.div
        className="relative z-10 flex items-center h-full pl-2 md:pl-2" 
        animate={ clickedIdx === idx ? { y: "100vh", opacity: 0 }
        :isHovered ? { y: -20 } : { y: 0 }}
        onAnimationComplete={() => {
        if (clickedIdx === idx) setExited(true);}}
        transition={
          clickedIdx === idx
            ? { duration: 0.6, ease: "easeIn" }          
            : { type: "spring", stiffness: 300, damping: 25, mass: 0.5 }
        }
      >
        <motion.h2
          className="md:text-[30px] text-[24px] font-bold text-black font-kanit pointer-events-none"
          layoutId={`card-title-${project.id}`}
        >
          {project.title}
        </motion.h2>
        <img
          src={project.iconUrl}
          alt={`${project.title} icon`}
          className="md:ml-2 ml-1 md:h-[44px] md:w-[44px] h-[28px] w-[28px] pointer-events-none"
        />
      </motion.div>
      
    </motion.div>
  );
};
