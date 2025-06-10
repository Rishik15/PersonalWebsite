import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { motion } from "framer-motion";

const contacts = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rishikreddyyesgari",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: "mailto:rishikreddy.yesgari@gmail.com",
    icon: MailIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/rishik15",
    icon: GithubIcon,
  },
];

export const ContactMe = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full flex flex-col items-center space-y-[24px] md:space-y-[48px]"
    >
      <div className="md:px-[56px] px-[28px] w-full">
        <h2
          id="contact-heading"
          className="text-left text-foreground text-[24px] md:text-[32px] font-bold transition-colors duration-200"
        >
        </h2>
      </div>
      <div className="flex gap-6">
        {contacts.map(({ href, icon: Icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.1 }}
            className={`
              group w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
              transition-all duration-300 border border-muted-foreground 
              bg-transparent text-foreground
              hover:bg-foreground hover:text-background
              dark:hover:bg-foreground dark:hover:text-background
            `}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};
