import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "../../lib/utils.ts";
import * as React from "react";

interface ScrollRevealProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
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
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.5, 1]
  );

  return (
    <motion.span style={{ opacity }} className={cn("h-fit")}>
      {children}
    </motion.span>
  );
}

export default function ScrollReveal({
  children,
  className,
}: ScrollRevealProps) {
  const flat = flatten(children);
  const count = flat.length;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        // Adjust the height and spacing according to the need
        "relative h-full w-full overflow-y-scroll bg-foreground text-background dark:text-zinc-900 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
    >
      <div className="sticky top-0 flex h-full w-full items-center justify-center">
        <div className="flex  w-full min-w-fit flex-wrap whitespace-break-spaces p-8">
          {flat.map((child, index) => {
            return (
              <OpacityChild
                progress={scrollYProgress}
                index={index}
                total={flat.length}
                key={index}
              >
                {child}
              </OpacityChild>
            );
          })}
        </div>
      </div>
      {Array.from({ length: count }).map((_, index) => (
        // Create really large area to make the scroll effect work
        <div key={index} className="h-5" />
      ))}
    </div>
  );
}
