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

const copyIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="icon-sm"
  >
    <path
      d="M12 3.5C10.8954 3.5 10 4.39543 10 5.5H14C14 4.39543 13.1046 3.5 12 3.5ZM8.53513 3.5C9.22675 2.3044 10.5194 1.5 12 1.5C13.4806 1.5 14.7733 2.3044 15.4649 3.5H17.25C18.9069 3.5 20.25 4.84315 20.25 6.5V18.5C20.25 20.1569 19.1569 21.5 17.25 21.5H6.75C5.09315 21.5 3.75 20.1569 3.75 18.5V6.5C3.75 4.84315 5.09315 3.5 6.75 3.5H8.53513ZM8 5.5H6.75C6.19772 5.5 5.75 5.94772 5.75 6.5V18.5C5.75 19.0523 6.19772 19.5 6.75 19.5H17.25C18.0523 19.5 18.25 19.0523 18.25 18.5V6.5C18.25 5.94772 17.8023 5.5 17.25 5.5H16C16 6.60457 15.1046 7.5 14 7.5H10C8.89543 7.5 8 6.60457 8 5.5Z"
      fill="currentColor"
    ></path>
  </svg>
);

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
      <div className=" w-screen sm:w-[350px] lg:w-[750px] text-sm bg-green-200 max-w-screen-sm">
        <div className=" p-1 sm-w-full bg-gray flex text-xs justify-between bg-gray-500">
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
              "copied!"
            ) : (
              <Clipboard size={15} alt="copy" weight="bold" />
            )}
          </button>
        </div>
        <code
          ref={ref}
          className={`${className} flex-grow flex-shrink text-sm overflow-auto`}
        >
          {children}
        </code>
      </div>
    );
  }
}
