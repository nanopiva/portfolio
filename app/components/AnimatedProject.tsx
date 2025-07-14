import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Project from "./Project";

type AnimatedProjectProps = {
  project: {
    id: number;
    name: string;
    description: string;
    image: string;
    codeUrl: string;
    liveUrl: string;
    techs: string[];
  };
  index: number;
};

export function AnimatedProject({ project, index }: AnimatedProjectProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, { margin: "-15% 0px -25% 0px" });

  const isEven = project.id % 2 === 0;

  const direction = isEven ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0.5, x: direction * 0.5, scale: 0.9 }
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className="w-full"
    >
      <Project {...project} />
    </motion.div>
  );
}
