import Typewriter from "typewriter-effect";
import { useDarkMode } from "@/hooks/useDarkMode";

export const HeroSection = () => {
  const isDarkMode = useDarkMode();
  const themeKey = isDarkMode ? "dark" : "light";

  return (
    <section
      className="w-full"
      aria-labelledby="hero-heading"
    >
      <div>
        <h1
          id="hero-heading"
          className="text-[28px] md:text-[48px] font-extrabold text-hero-heading min-h-typewriter"
        >
          <span role="presentation">
            <Typewriter
              key={themeKey}
              options={{
                strings: ["Hi, I'm Rishik Yesgari."],
                autoStart: true,
                loop: true,
                delay: 100,
                cursor: "|",
              }}
            />
          </span>
        </h1>

        <div>
          <p className="text-[16px] md:text-[24px] text-hero-subtext">
            I'm a computer science student at NJIT.
          </p>
          <p className="text-[16px] md:text-[24px] text-hero-subtext">
            I'm interested in data science and machine learning and enjoy building projects around them.
          </p>
        </div>
      </div>

      <div className="mt-[16px] md:mt-[24px] flex flex-wrap gap-[12px]">
        <a
          href="/RishikReddyYesgari_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-[14px] md:text-[16px] cursor-pointer"
          aria-label="View Resume PDF"
        >
          Resume
        </a>

        <button
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
          className="btn-primary md:hidden text-[14px] md:text-[16px]"
          aria-label="Scroll to Contact Section"
        >
          Contact Me
        </button>
      </div>
    </section>
  );
};
