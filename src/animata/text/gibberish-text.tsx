import { useEffect, useState, useRef } from "react";
import * as React from "react";

import { cn } from "../../lib/utils.ts";
import { motion, useInView } from "framer-motion";

interface GibberishTextProps {
  /**
   * The text to animate.
   */
  text: string;

  /**
   * The class name to apply to each letter.
   */
  className?: string;
}

const Letter = ({
  letter,
  className,
}: {
  letter: string;
  className?: string;
}) => {
  const [code, setCode] = useState(letter.toUpperCase().charCodeAt(0));

  useEffect(() => {
    let count = Math.floor(Math.random() * 10) + 5;
    const interval = setInterval(() => {
      setCode(() => Math.floor(Math.random() * 26) + 50);
      count--;
      if (count === 0) {
        setCode(letter.toUpperCase().charCodeAt(0));
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [letter]);

  return (
    <>
      <span
        className={cn(
          " text-e0ffff whitespace-pre text-foreground overflow-hidden",
          className
        )}
      >
        {String.fromCharCode(code)}
      </span>
    </>
  );
};

/**
 * Animate each letter in the text using gibberish text effect.
 * Renders a random letter first and then animates it to the correct letter.
 */
export default function GibberishText({ text, className }: GibberishTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  if (isInView) {
    return (
      <>
        <div ref={ref} />
        {text.split("").map((letter, index) => {
          return (
            <Letter
              className={className}
              letter={letter}
              key={`${index}-${letter}`}
            />
          );
        })}
      </>
    );
  } else {
    return <div ref={ref} />;
  }
}
