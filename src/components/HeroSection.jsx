import Typewriter from "typewriter-effect";
import { useDarkMode } from "@/hooks/useDarkMode";

export const HeroSection = () => {
  const isDarkMode = useDarkMode();
  const themeKey = isDarkMode ? "dark" : "light";

  return (
    <section className="w-full">
      <div>
        <h1 className="text-[28px] md:text-[48px] font-extrabold text-hero-heading min-h-typewriter">
          <Typewriter
            key={themeKey}
            options={{
              strings: ["Hi, I'm Rishik Yesgari."],
              autoStart: true,
              loop: true,
              delay: 100,
              cursor: '|'
            }}
          />
        </h1>

        <p className="text-[16px] md:text-[24px] text-hero-subtext">
          I'm a computer science student at NJIT.
        </p>
        <p className="text-[16px] md:text-[24px] text-hero-subtext">
          I'm interested in data science and machine learning and enjoy building projects around them.
        </p>
      </div>

      <div className="mt-[16px] md:mt-[24px] flex flex-wrap gap-[12px]">
        <button
          onClick={() => window.open("/RishikReddyYesgari_Resume.pdf", "_blank", "noopener,noreferrer")}
          className="btn-primary text-[14px] md:text-[16px] cursor-pointer"
        >
          Resume
        </button>

        <button
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
          className="btn-primary md:hidden text-[14px] md:text-[16px]"
        >
          Contact Me
        </button>
      </div>
    </section>
  );
};
