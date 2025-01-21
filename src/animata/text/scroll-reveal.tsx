import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "../../lib/utils.ts";
import * as React from "react";

interface ScrollRevealProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  containerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  className?: string;
}

// This function might need updates to support different cases.
const flatten = (children: React.ReactNode): React.ReactNode[] => {
  const result: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      result.push(child);
    } else {
      const parts = String(child).split(/(\s+)/);
      result.push(
        ...parts.map((part, index) => (
          <React.Fragment key={index}>{part}</React.Fragment>
        ))
      );
    }
  });

  return result.flatMap((child) => (Array.isArray(child) ? child : [child]));
};

function OpacityChild({
  children,
  index,
  progress,
  total,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  //opacity relative to scroll position
  const opacity = useTransform(
    progress,
    [index / 100, (index + 1) / 100],
    [0.1, 1]
  );

  return (
    <motion.span style={{ opacity }} className={cn("h-fit")}>
      {children}
    </motion.span>
  );
}

export default function ScrollReveal({
  //containerRef,
  //scrollYProgress,
  children,
  className,
}: ScrollRevealProps) {
  const flat = flatten(children); //seperated by words
  const count = flat.length; // nb of words (including spaces)
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "center center"],
  });

  return (
    <div
      className={cn(
        // Adjust the height and spacing according to the need
        "relative h-full w-full  bg-foreground text-background dark:text-zinc-900",
        className
      )}
    >
      <div
        ref={ref}
        className="sticky top-0 flex h-full w-full items-center justify-center"
      >
        <div className="flex  w-full min-w-fit flex-wrap whitespace-break-spaces p-8">
          {flat.map((child, index) => {
            return (
              <OpacityChild
                progress={scrollYProgress}
                index={index}
                total={flat.length}
              >
                {child}
              </OpacityChild>
            );
          })}
        </div>
      </div>
    </div>
  );
}
