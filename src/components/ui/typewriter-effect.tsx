"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  delay = 0,
  duration = 2,
  hideCursorOnComplete = false,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  delay?: number;
  duration?: number;
  hideCursorOnComplete?: boolean;
}) => {
  const [showCursor, setShowCursor] = useState(delay === 0);

  useEffect(() => {
    let startTimeout: NodeJS.Timeout;
    let endTimeout: NodeJS.Timeout;

    if (delay > 0) {
      startTimeout = setTimeout(() => {
        setShowCursor(true);
      }, delay * 1000);
    }

    if (hideCursorOnComplete) {
      endTimeout = setTimeout(
        () => {
          setShowCursor(false);
        },
        (delay + duration) * 1000,
      );
    }

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(endTimeout);
    };
  }, [delay, duration, hideCursorOnComplete]);

  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      // CHANGED: gap-1.5 -> gap-[0.25em] for better responsiveness
      <div className="flex items-center gap-[0.25em] whitespace-nowrap">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`text-foreground`, word.className)}
                >
                  {char}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={cn("flex items-center space-x-1 my-0 min-h-[1em]", className)}
    >
      <motion.div
        className="overflow-hidden"
        initial={{
          width: "0%",
        }}
        animate={{
          width: "fit-content",
        }}
        transition={{
          duration: duration,
          ease: "linear",
          delay: delay,
        }}
      >
        <div
          className="whitespace-nowrap font-extrabold tracking-tight leading-none"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}
        </div>{" "}
      </motion.div>

      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-[1em] bg-primary",
          cursorClassName,
          !showCursor && "invisible",
        )}
      ></motion.span>
    </div>
  );
};