"use client";
// import Copy from "@phosphor-icons/react/dist/icons/Copy";
// import CheckFat from "@phosphor-icons/react/dist/icons/CheckFat";
import { Clipboard, CheckFat, Cube } from "@phosphor-icons/react";

import {
  Children,
  Fragment,
  createElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

function extractLanguageName(className: string) {
  const regex = /language-(\w+)/;
  const match = className.match(regex);
  return match ? match[1] : null;
}

export function CodeBlock({
  children,
  className,
}: JSX.IntrinsicElements["code"]) {
  const [copied, setCopied] = useState(false);
  const [showMermaidPreview, setShowMermaidPreview] = useState(false);
  const [showLatexPreview, setShowLatexPreview] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (copied) {
      const interval = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(interval);
    }
  }, [copied]);

  // Highlight.js adds a `className` so this is a hack to detect if the code block
  // is a language block wrapped in a `pre` tag.
  if (className) {
    return (
      <div className=" text-sm ">
        <div
          className={`flex text-xs justify-between ${className} !text-gray-400/90`}
        >
          <span>{extractLanguageName(className)}</span>
          <button
            className="flex gap-1 items-center justify-center"
            onClick={() => {
              if (ref.current) {
                navigator.clipboard.writeText(ref.current.innerText ?? "");
                setCopied(true);
              }
            }}
          >
            {copied ? (
              <div className="bg-green-300">copied!</div>
            ) : (
              <Clipboard size={15} alt="copy" weight="bold" className="" />
            )}
          </button>
        </div>
        <code
          ref={ref}
          className={`${className} text-sm overflow-auto !pb-[2em]`}
        >
          {children}
        </code>
      </div>
    );
  }
}
