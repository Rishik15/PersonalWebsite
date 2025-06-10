import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

const MAX_VISIBILITY = 3;

const Card = ({ front, back, flipped, onFlip }) => {
  const isDarkMode = useDarkMode();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFlip();
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        onClick={onFlip}
        onKeyDown={handleKeyDown}
        role="button"
        aria-expanded={flipped}
        tabIndex={0}
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor: "pointer",
        }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute w-full h-full px-[32px] backface-hidden",
            "bg-[#FFF3D3] rounded-[50px] md:rounded-[70px] flex items-center justify-center text-center",
            "text-[20px] md:text-[28px] font-space-grotesk text-black font-bold",
            "shadow-card-light shadow-card-dark",
            isDarkMode ? "shadow-card-dark" : "shadow-card-light"
          )}
        >
          <span>{front}</span>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute w-full h-full px-[32px] backface-hidden",
            "bg-[#eed9f2] rounded-[50px] md:rounded-[70px] flex items-center justify-center text-center",
            "text-[16px] md:text-[20px] font-space-grotesk text-black font-semibold",
            "shadow-card-light shadow-card-dark",
            isDarkMode ? "shadow-card-dark" : "shadow-card-light"
          )}
          style={{ transform: "rotateY(180deg)" }}
        >
          <span>{back}</span>
        </div>
      </div>
    </div>
  );
};

const Carousel = ({ children }) => {
  const [active, setActive] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const count = React.Children.count(children);

  const handleFlip = (i) => {
    if (i === active) {
      setFlippedIndex((prev) => (prev === i ? null : i));
    }
  };

  const moveLeft = () => {
    setFlippedIndex(null);
    setActive((prev) => prev - 1);
  };

  const moveRight = () => {
    setFlippedIndex(null);
    setActive((prev) => prev + 1);
  };

  return (
    <div
      className="relative md:w-[260px] md:h-[350px] w-[200px] h-[250px]"
      style={{ perspective: "1000px" }}
    >
      {active > 0 && (
        <button
          className="absolute top-1/2 -translate-y-1/2 -translate-x-full z-10"
          onClick={moveLeft}
          aria-label="Previous Skill"
        >
          <ChevronLeft size={48} className="text-[#000000]" />
        </button>
      )}

      {React.Children.map(children, (child, i) => {
        const offset = (active - i) / 3;
        const direction = Math.sign(active - i);
        const absOffset = Math.abs(active - i) / 3;
        const isVisible = Math.abs(active - i) <= MAX_VISIBILITY;

        return (
          <div
            className={`absolute w-full h-full transition-all duration-800 ${
              active !== i ? "blur-sm opacity-50" : ""
            }`}
            style={{
              transform: `
                rotateY(${offset * 50}deg)
                scaleY(${1 + absOffset * -0.4})
                translateZ(${-30 * absOffset}rem)
                translateX(${-5 * direction}rem)
              `,
              zIndex: MAX_VISIBILITY - Math.abs(active - i),
              display: isVisible ? "block" : "none",
              pointerEvents: active === i ? "auto" : "none",
            }}
          >
            {React.cloneElement(child, {
              flipped: flippedIndex === i,
              onFlip: () => handleFlip(i),
            })}
          </div>
        );
      })}

      {active < count - 1 && (
        <button
          className="absolute top-1/2 -translate-y-1/2 translate-x-full right-0 z-10"
          onClick={moveRight}
          aria-label="Next Skill"
        >
          <ChevronRight size={44} className="text-[#000000]" />
        </button>
      )}
    </div>
  );
};

export const Skills = () => {
  const skills = [
    {
      front: "Programming Languages",
      back: "Python, Java, C, SQL, JavaScript",
    },
    {
      front: "Machine Learning & Data Science",
      back: "Pandas, NumPy, Seaborn, Scikit-learn, TensorFlow, Pytorch, Tableau",
    },
    {
      front: "Web Development",
      back: "React.js, HTML, CSS, Streamlit, Flask, REST APIs",
    },
    {
      front: "Tools & Platforms",
      back: "Git, GitHub, MySQL, Firebase, Linux, Docker, Visual Studio, Anaconda, Microsoft Azure, MS Excel",
    },
    {
      front: "Certificates",
      back: "Data Science Fundamentals (NASBA), Microsoft Certified: Azure Data Scientist Associate",
    },
  ];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="w-full flex flex-col items-center space-y-[24px] md:space-y-[48px]"
    >
      <div className="md:px-[56px] px-[28px] w-full">
        <h2
          id="skills-heading"
          className="text-left text-foreground text-[24px] md:text-[32px] font-bold transition-colors duration-200"
        >
          Skills
        </h2>
      </div>

      <div className="md:px-[56px] px-[28px] flex justify-center">
        <Carousel>
          {skills.map((skill, i) => (
            <Card key={i} front={skill.front} back={skill.back} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};
