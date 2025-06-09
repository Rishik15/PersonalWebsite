import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Github } from "lucide-react";
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
    techStack: ["Python", "Flask", "Scikit-learn", "Pandas", "TF-IDF", "Cosine Similarity"],
    githubLink: "https://github.com/Rishik15",
    description: [ `Fork It is a group restaurant recommendation app designed to solve a common problem: deciding where to eat with friends. Whether it's conflicting preferences, dietary restrictions, or just indecision, Fork It helps simplify the choice. Focused on the Trenton area, the app takes multiple users' inputs and returns a list of restaurants that best match the group’s combined preferences.`,
                   `For this project, I developed the entire backend recommendation system. I implemented two separate models — a TF-IDF-based model to capture subtle textual preferences and a categorical similarity model to match structured features like cuisine type and pricing. These models were then combined to compute overall scores for each restaurant, tailored to the group's aggregated preferences.`
                  ]
    ,
  },
  {
    id: "quickdraw",
    title: "Quick, Draw!",
    imageUrl: quickdrawImg,
    iconUrl: quickdrawIcon,
    techStack: ["\Python", "Flask", "Numpy", "Tensorflow", "LSTM(RNN)"],
    githubLink: "https://github.com/Rishik15",
    description: [ `While learning more about machine learning, I became particularly curious about how sequence-based models like LSTMs work in practice. That curiosity led me to Google’s Quick, Draw! game and its dataset. So I wanted to try making something similar`,
                   `I took this opportunity to build a full-stack doodle classification system where the backend LSTM model was trained on 20 object classes using real-world stroke data, reaching 97% accuracy. The system transforms raw JSON strokes into sequence data, then feeds them to the LSTM. I designed Flask APIs to handle real-time sketch input and return live predictions, keeping latency low for instant user feedback.`,
                   `This project not only helped me understand RNNs and preprocessing pipelines deeply but also sharpened my skills in backend deployment, model optimization, and serving ML models effectively in real-world apps.`
                  ],
  },
  {
    id: "tunes2notes",
    title: "Tunes2Notes",
    imageUrl: tunes2notesImg,
    iconUrl: tunes2notesIcon,
    techStack: ["Python", "Librosa", "Magenta", "Music21", "Streamlit", "Pydub"],
    githubLink: "https://github.com/Rishik15",
    description:[ `Tunes2Notes was born from my curiosity about how audio could be converted into readable sheet music using machine learning. I started with the idea of simplifying music transcription — especially when dealing with multi-instrument audio.`,
                  `The project uses Spleeter to isolate piano tracks from full audio recordings, and then applies Google’s Onsets and Frames model to transcribe the piano into note sequences. These sequences are converted into sheet music using the music21 library, creating a full pipeline from audio input to printable musical notation.`,
                  `This project helped me explore state-of-the-art tools in audio ML, understand polyphonic music transcription, and build a practical application that merges music and AI seamlessly.`
                  ],
  },
  {
    id: "threadinsight",
    title: "ThreadInsight",
    imageUrl: threadinsightImg,
    iconUrl: threadinsightIcon,
    techStack: ["Python, Streamlit, Pandas, Matplotlib, Seaborn, PRAW"],
    githubLink: "https://github.com/Rishik15",
    description: [ `ThreadInsight was developed to simplify the process of understanding subreddit behavior through clear metrics and visualizations. I wanted to create a tool that could pull real-time data from Reddit and transform it into actionable insights about community engagement, post patterns, and trending topics. Using the PRAW API, I collected post and comment data from any given subreddit over the past three days and presented it using Streamlit’s interactive interface.`,
                   `The app features visualizations like activity timelines, heatmaps, post type distributions, word clouds, and highlights of top contributors and high-engagement posts. These helped users gain a quick overview of any subreddit’s pulse. This project improved my skills in API integration, data processing with pandas, and building clean, responsive dashboards with Streamlit.`
                  ],
  },
  {
    id: "moodsense",
    title: "MoodSense",
    imageUrl: moodsenseImg,
    iconUrl: moodsenseIcon,
    techStack: ["Python, TensorFlow, OpenCV, CNN"],
    githubLink: "https://github.com/Rishik15",
    description: [ `MoodSense started as an exploration into how machines interpret human emotion. I wanted to build a real-time system capable of recognizing facial expressions on the fly using computer vision and deep learning.`,
                   `I used transfer learning with ResNet-18 on the FER-2013 dataset, which contains over 36,000 labeled images of human expressions across 7 emotion classes. The model reached 64% accuracy and was optimized for real-time inference. By integrating OpenCV, I was able to capture live webcam input, detect faces, and classify emotions at around 30 FPS, offering smooth and responsive feedback.`,
                   `This project helped me gain a deeper understanding of convolutional architectures, real-time video processing, and the challenges of emotion recognition in unconstrained environments.`
                  ],
  },
];

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { initialRect } = state || {};
  const project = projects.find((p) => p.id === projectId);
  if (!project) return <div>Project not found.</div>;

  return (
<motion.div className="relative w-full h-screen overflow-x-hidden no-scrollbar py-[24px] px-[12px]"
  layoutId={`card-image-${project.id}`}
  style={{
    backgroundImage: `url(${project.imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    originX: 0.5, originY: 0.5,
  }}
  initial={{
    top: initialRect.top,
    left: initialRect.left,
    width: initialRect.width,
    height: initialRect.height,
  }}
  animate={{
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  }}
  exit={{
    y: "100vh",   
    transition: {
      type: "spring",
      mass: 0.5,
      duration: 1,
      delay: 0.5,
    },
  }}
  transition={{
    type: "tween",
    mass: 0.5,
  }}
>
  <motion.button
    className="absolute top-6 left-6 z-50 p-2 rounded-full bg-black/50 border border-gray-200 "
    onClick={() => navigate("/", { state: { scrollToProjects: true } })}
    initial={{ y: -60, opacity: 0 }}
    exit={{
      y: -60, opacity: 0, duration: 2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 2,
      },
    }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 20,
      bounce: 1,
      mass: 2,
      delay: 0.3,
    }}
  >
    <ArrowLeft className="w-4 h-4 text-black" />
  </motion.button>

  {/* FLEX CONTAINER */}
  <motion.div
    className="relative z-20 pt-[120px] px-[32px] md:px-[48px] flex flex-col md:flex-row md:items-start md:justify-between h-auto w-full gap-8 text-black"
  >
    {/* LEFT COLUMN */}
    <motion.div className="flex-1 flex flex-col space-y-4"
      initial={{ x: -60, opacity: 0 }}
      exit={{
        x: -120, opacity: 0, duration: 2,
          transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 2,
        },
      }}
      animate={{ x: 0, opacity: 1 }}
       transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          bounce: 1,
          mass: 2,
          delay: 0.3,
        }}
    >
      {/* First row: Title + Icon */}
      <div className="flex items-center">
        <motion.h2
          className="md:text-[48px] text-[32px] font-bold font-kanit text-black pointer-events-none"
          layoutId={`card-title-${project.id}`}
        >
          {project.title}
        </motion.h2>
        <img
          src={project.iconUrl}
          alt={`${project.title} icon`}
          className="md:ml-2 ml-1 md:h-[50px] md:w-[50px] h-[35px] w-[35px] pointer-events-none"
        />
      </div>

      {/* Second row: Technologies Used */}
      <div className="md:text-lg text-base font-bold text-black text-[20px] md:text-[28px] font-kanit pointer-events-none">
        Technologies Used:
      </div>

      {/* Third row: Tech stack */}
      <div className="md:text-base text-sm text-[16px] md:text-[24px] text-black pointer-events-none">
        {project.techStack.join(", ")}
      </div>

      {/* Fourth row: GitHub icon */}
      <a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-black"
      >
        <Github className="w-8 h-8" />
      </a>
    </ motion.div>

    {/* RIGHT COLUMN: DESCRIPTION */}
    <motion.div className="flex-1 flex items-start md:items-start justify-start leading-relaxed"
      initial={{ x: 60, opacity: 0 }}
      exit={{
        x: 120, opacity: 0, duration: 2, 
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 2,
        },
      }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          bounce: 1,
          mass: 2,
          delay: 0.3,
        }}
    >
      <div className="space-y-4">
        {project.description.map((para, index) => (
          <p key={index}>
            {para}
          </p>
        ))}
      </div>
    </ motion.div>
  </motion.div>
</motion.div>



  );
};
