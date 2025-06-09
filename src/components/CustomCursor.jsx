import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const NUM_CIRCLES = 40;
const ORBIT_RADIUS = 5;
const IDLE_TIMEOUT = 300;

export const CustomCursor = () => {
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);

  const springX = useSpring(centerX, { stiffness: 200, damping: 40, mass: 5 });
  const springY = useSpring(centerY, { stiffness: 200, damping: 40, mass: 5 });

  const angles = useRef(
    Array.from({ length: NUM_CIRCLES }, () => Math.random() * Math.PI * 2)
  );

  const angleSpeeds = useRef(
    Array.from({ length: NUM_CIRCLES }, () => Math.random() * 0.05 + 0.01)
  );

  const orbitOffsets = useRef(
    Array.from({ length: NUM_CIRCLES }, () => ({
      x: Math.random() * 1.5 + 0.5,
      y: Math.random() * 1.5 + 0.5,
    }))
  );

  const radii = useRef(
    Array.from({ length: NUM_CIRCLES }, () => useMotionValue(ORBIT_RADIUS))
  );

  const [visible, setVisible] = useState(false); 
  const idleTimer = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      centerX.set(e.clientX);
      centerY.set(e.clientY);

      radii.current.forEach((r) => r.set(ORBIT_RADIUS));

      if (idleTimer.current !== null) {
        clearTimeout(idleTimer.current);
      }
      idleTimer.current = window.setTimeout(() => {
        radii.current.forEach((r) => r.set(0));
      }, IDLE_TIMEOUT);

      if (!visible) setVisible(true);
    };

    const handleMouseOut = (e) => {
      if (e.relatedTarget === null) {
        setVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      if (idleTimer.current !== null) {
        clearTimeout(idleTimer.current);
      }
    };
  }, [visible]);


  useEffect(() => {
    const animate = () => {
      angles.current = angles.current.map(
        (angle, i) => angle + angleSpeeds.current[i]
      );
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="fine-pointer:block hidden">
      <motion.div
        style={{
          x: centerX,
          y: centerY,
          backgroundColor: "hsl(var(--cursor))",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[99999999]"
      />
      {Array.from({ length: NUM_CIRCLES }).map((_, index) => {
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const springCircleX = useSpring(x, {
          stiffness: 100,
          damping: 20,
          mass: 5,
          duration: 4,
        });
        const springCircleY = useSpring(y, {
          stiffness: 100,
          damping: 20,
          mass: 5,
          duration: 4,
        });

        useEffect(() => {
          const updatePosition = () => {
            const angle = angles.current[index];
            const radius = radii.current[index].get();
            const offset = orbitOffsets.current[index];

            const targetX =
              springX.get() + Math.cos(angle) * radius * offset.x;
            const targetY =
              springY.get() + Math.sin(angle) * radius * offset.y;

            x.set(targetX - 4);
            y.set(targetY - 4);

            requestAnimationFrame(updatePosition);
          };

          updatePosition();
        }, []);

        return (
          <motion.div
            key={index}
            style={{
              x: springCircleX,
              y: springCircleY,
              backgroundColor: "hsl(var(--cursor))",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.3s ease", 
            }}
            className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999999]"
          />
        );
      })}
    </ div>
  );
};
