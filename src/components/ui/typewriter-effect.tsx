"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
    let startTimeout: ReturnType<typeof setTimeout> | undefined;
    let endTimeout: ReturnType<typeof setTimeout> | undefined;

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

  const totalCharacters = words.reduce((total, word) => total + word.text.length, 0);
  const wordsArray = words.map((word, wordIndex) => ({
    ...word,
    characters: word.text.split(""),
    startIndex: words
      .slice(0, wordIndex)
      .reduce((total, precedingWord) => total + precedingWord.text.length, 0),
  }));

  return (
    <div className={cn("flex min-h-[1em] items-center space-x-1 my-0", className)}>
      <div className="overflow-hidden">
        <div className="flex items-center gap-[0.25em] whitespace-nowrap font-extrabold leading-none tracking-tight">
          {wordsArray.map((word, wordIndex) => (
            <span key={`word-${wordIndex}`} className="inline-block">
              {word.characters.map((character, characterIndex) => (
                <span
                  key={`char-${characterIndex}`}
                  className={cn("typewriter-character text-foreground", word.className)}
                  style={{
                    animationDelay: `${
                      delay +
                      ((word.startIndex + characterIndex) /
                        Math.max(totalCharacters, 1)) *
                        duration
                    }s`,
                  }}
                >
                  {character}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <span
        className={cn(
          "typewriter-cursor block h-[1em] w-[4px] rounded-sm bg-primary",
          cursorClassName,
          !showCursor && "invisible",
        )}
      />
    </div>
  );
};
