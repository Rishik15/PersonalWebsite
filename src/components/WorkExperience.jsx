import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const experiences = [
  {
    date: "April 2025 – Present",
    title: "Research Assistant",
    supervisor: "Prof. Chengjun Liu, NJIT",
    description: [
      "Conducting research on skin disease detection using machine learning and image analysis techniques",
      "Preprocessing and augmenting dermatology image datasets with Python and OpenCV",
      "Training and analyzing various machine learning models' performance and contributing to research publications",
    ],
  },
  {
    date: "May 2024 – Dec 2024",
    title: "Research Assistant",
    supervisor: "Dr. Alisha Pradhan, Department of Informatics, NJIT",
    description: [
      "Conducted survey-based research on online security behaviors among older adults",
      "Analyzed qualitative and quantitative data to inform AI-driven fraud prevention tools",
      "Contributed to system design recommendations and academic reporting",
    ],
  },
];

const ExperienceItem = ({ experience, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <li className="relative flex gap-2.5 items-baseline group">
      {/* Timeline line and dot */}
      <div className="before:absolute before:left-[5.5px] before:h-full before:w-[4px] before:bg-foreground">
        <motion.div whileHover={{ scale: 1.2 }} className="relative z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="bi bi-circle-fill text-foreground"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
        </motion.div>
      </div>

      {/* Content */}
      <div className="text-sm text-muted-foreground w-full">
        <div
          onClick={toggleExpand}
          className="cursor-pointer group flex items-start justify-between"
        >
          <div>
            <p className="text-base font-bold text-foreground text-[18px] md:text-[28px]">
              {experience.title}
            </p>
            <p className="font-medium text-[16px] md:text-[24px]">
              {experience.supervisor}
            </p>
            <p className="text-s italic mt-1 text-[12px] md:text-[20px]">
              {experience.date}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-foreground mt-1"
          >
          {isExpanded ? <ChevronUp className="size-5 md:size-8" /> : <ChevronDown className="size-5 md:size-8" />}
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-3 pl-2">
               <ul className="list-disc list-outside pl-5 space-y-2 text-[14px] md:text-[18px]">
                  {experience.description.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 + idx * 0.05 }}
                      className="text-foreground"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};

export const WorkExperience = () => {
  return (
    <section className="flex overflow-hidden">
      <div
        id="work"
        className="w-full text-foreground flex flex-col space-y-[24px] md:space-y-[48px] items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:px-[56px] px-[28px] w-full"
        >
          <h2 className="text-left text-foreground text-[24px] md:text-[32px] font-bold transition-colors duration-200">
            WORK EXPERIENCE
          </h2>
        </motion.div>

        <div className="w-full flex justify-center">
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 w-full max-w-[300px] md:max-w-[400px] px-4"
          >
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={index}
                experience={exp}
                isLast={index === experiences.length - 1}
              />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};
