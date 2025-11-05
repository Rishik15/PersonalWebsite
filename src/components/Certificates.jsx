import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SquareArrowOutUpRight } from "lucide-react";

export const Certifications = () => {
  const certs = [
    {
      title: "AWS Machine Learning Associate",
      issuer: "AWS",
      date: "September 2025",
      link: "https://www.credly.com/badges/3108d177-18c6-4980-b4b0-c566b513fafc/public_url",
    },
    {
      title: "Machine Learning Foundations",
      issuer: "Cornell University",
      date: "July 2025",
      link: "https://drive.google.com/file/d/1NG3U583O74gOFpqXDd0UNqGwZjQWS971/view?usp=sharing",
    },
    {
      title: "Microsoft Certified: Azure Data Scientist Associate",
      issuer: "Microsoft",
      date: "February 2025",
      link: "https://drive.google.com/file/d/1iEWL6_G9mqxT4Hwstg3q_OhonU_qgfqN/view?usp=sharing",
    }
  ];

  return (
    <section
      id="certifications"
      className="w-full space-y-[24px] md:space-y-[48px]"
    >
      <div className="md:px-[56px] px-[28px] w-full">
        <h2
          id="contact-heading"
          className="text-left text-foreground text-[24px] md:text-[32px] font-bold transition-colors duration-200"
        >
          Certificates
        </h2>
      </div>
      <ul
        className="
            space-y-6 md:space-y-0
            md:px-[74px] px-[28px]
            md:flex md:flex-wrap md:gap-x-8 md:gap-y-6
            items-start
        "
      >
        {certs.map((cert, idx) => (
          <motion.li
            key={idx}
            className="flex items-start gap-3 md:gap-4 md:basis-[30%] md:min-w-[260px]"
          >
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-[3px] md:mt-[6px] text-foreground/70" />

            <div className="min-w-0">
              <h3 className="text-[18px] md:text-[24px] font-semibold text-foreground leading-snug">
                {cert.title},{" "}
                <span className="font-normal text-foreground/80">
                  {cert.date}
                </span>
              </h3>

              {cert.link ? (
                <p className="text-[14px] md:text-[16px] text-hero-subtext mt-1 leading-snug">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline md:whitespace-nowrap"
                  >
                    <span>{cert.issuer}</span>
                    <SquareArrowOutUpRight
                      className="w-3.5 h-3.5 shrink-0 align-middle -mt-px"
                      aria-hidden="true"
                    />
                  </a>
                </p>
              ) : (
                <p className="text-[14px] md:text-[16px] text-hero-subtext mt-1">
                  {cert.issuer}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
