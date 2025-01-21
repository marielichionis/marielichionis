"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import AnimatedGradientText from "../text/animated-gradient-text.tsx";

import { cn } from "../../lib/utils.ts";
export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  hour: Number;

  [key: string]: unknown; // Allow additional custom fields
}

interface TimelineItemProps {
  event: TimelineEvent;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onHover: (index: number | null) => void;
  index: number;
  activeIndex: number | null;
  styles: TimelineStyles;
  customRender?: (event: TimelineEvent) => React.ReactNode;
}

interface TimelineStyles {
  lineColor: string;
  activeLineColor: string;
  dotColor: string;
  activeDotColor: string;
  dotSize: string;
  titleColor: string;
  descriptionColor: string;
  dateColor: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  isActive,
  isLast,
  onHover,
  index,
  activeIndex,
  styles,
  customRender,
}) => {
  const fillDelay = activeIndex !== null ? Math.max(0, (index - 1) * 0.01) : 0;
  const fillDuration =
    activeIndex !== null ? Math.max(0.2, 0.5 - index * 0.1) : 0.5;

  return (
    <motion.div
      className="flex last:mb-0 "
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative mr-4 flex flex-col items-center">
        <div
          className={`absolute ${
            isLast ? "hidden" : "block"
          } bottom-0 top-0 w-1`}
          style={{ backgroundColor: styles.lineColor }}
        >
          <motion.div
            className="w-full origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isActive ? 1 : 0 }}
            transition={{ duration: fillDuration, delay: fillDelay }}
            style={{ height: "100%", backgroundColor: styles.activeLineColor }}
          />
        </div>
        <motion.div
          className="relative z-10 rounded-full border-4"
          style={{
            width: styles.dotSize,
            height: styles.dotSize,
            borderColor: isActive ? styles.activeDotColor : styles.dotColor,
            backgroundColor: isActive ? styles.activeDotColor : "Background",
          }}
          animate={{
            scale: isActive ? 1.2 : 1,
            backgroundColor: isActive ? styles.activeDotColor : "Background",
            borderColor: isActive ? styles.activeDotColor : styles.dotColor,
          }}
          transition={{ duration: fillDuration, delay: fillDelay }}
        />
      </div>
      <div
        className={cn(
          "flex-grow leading-5 tooltip flex-row",
          !isLast && "mb-3"
        )}
      >
        {
          <div className="flex flex-col">
            <AnimatedGradientText
              className="text-4xl font-bold"
              style={{ color: styles.titleColor }}
            >
              {event.title}
            </AnimatedGradientText>
            <p className="font-bold">{event.description}</p>

            <div className="tooltiptext offset-8 absolute  whitespace-nowrap rounded bg-black p-2 text-white opacity-1 transition-all duration-300   dark:bg-slate-100 dark:text-slate-900">
              <div className="text-sm font-semibold z-5">
                You watch these videos mainly around {String(event.hour)}h.
              </div>
            </div>
          </div>
        }
      </div>
    </motion.div>
  );
};

interface AnimatedTimelineProps {
  events: TimelineEvent[];
  className?: string;
  styles?: Partial<TimelineStyles>;
  customEventRender?: (event: TimelineEvent) => React.ReactNode;
  onEventHover?: (event: TimelineEvent | null) => void;
  onEventClick?: (event: TimelineEvent) => void;
  initialActiveIndex?: number;
}

const defaultStyles: TimelineStyles = {
  lineColor: "#d1d5db",
  activeLineColor: "#22c55e",
  dotColor: "#d1d5db",
  activeDotColor: "#22c55e",
  dotSize: "1rem",
  titleColor: "inherit",
  descriptionColor: "inherit",
  dateColor: "inherit",
};

export function AnimatedTimeline({
  events,
  className = "",
  styles: customStyles = {},
  customEventRender,
  onEventHover,
  onEventClick,
  initialActiveIndex,
}: AnimatedTimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    initialActiveIndex ?? null
  );
  const styles = { ...defaultStyles, ...customStyles };

  const handleHover = (index: number | null) => {
    setActiveIndex(index);
    onEventHover?.(index !== null ? events[index] : null);
  };

  return (
    <div className={`relative font-bold py-4 ${className}`}>
      {events.map((event, index) => (
        <div key={event.id} onClick={() => onEventClick?.(event)}>
          <TimelineItem
            event={event}
            isActive={activeIndex !== null && index <= activeIndex}
            isFirst={index === 0}
            isLast={index === events.length - 1}
            onHover={handleHover}
            index={index}
            activeIndex={activeIndex}
            styles={styles}
            customRender={customEventRender}
          />
        </div>
      ))}
    </div>
  );
}

interface AnimatedTimelinePageProps {
  events?: TimelineEvent[];
  title?: string;
  containerClassName?: string;
  timelineStyles?: Partial<TimelineStyles>;
  customEventRender?: (events: TimelineEvent) => React.ReactNode;
  onEventHover?: (events: TimelineEvent | null) => void;
  onEventClick?: (events: TimelineEvent) => void;
  initialActiveIndex?: number;
}

export default function AnimatedTimelinePage({
  events,
  title,
  containerClassName,
  timelineStyles,
  customEventRender,
  onEventHover,
  onEventClick,
  initialActiveIndex,
}: AnimatedTimelinePageProps) {
  return (
    <div className="flex justify-self-center pt-20 pb-10">
      <div
        className={cn(
          "rounded-lg bg-zinc-900 pt-6  px-8 flex flex-col justify-self-center ",
          containerClassName
        )}
      >
        <AnimatedGradientText className="text-3xl font-bold ">
          {title}
        </AnimatedGradientText>
        <AnimatedTimeline
          events={events}
          className="max-w-3xl"
          styles={timelineStyles}
          customEventRender={customEventRender}
          onEventHover={onEventHover}
          onEventClick={onEventClick}
          initialActiveIndex={initialActiveIndex}
        />
      </div>
    </div>
  );
}
