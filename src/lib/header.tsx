"use client";
import Link from "next/link";
import { MoonIcon } from "@heroicons/react/24/outline";
import { MoonIcon as SolidMoonIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

// const checkSystemTheme = () => {
//   if (typeof window === "undefined") return "light";
//   const matchDark = window.matchMedia("(prefers-color-scheme: dark)");
//   return matchDark.matches ? "dark" : "light";
// };

export const Header = () => {
  return (
    <div className=" text-center backdrop-blur justify-center h-20 flex items-center text-lg font-bold gap-10 dark:text-gray-400 border-gray-300">
      <Link
        href="/"
        className="h-full flex items-center justify-center basis-20"
      >
        home
      </Link>
      <ThemeController />
    </div>
  );
};

const checkDark = (
  media: "light" | "dark",
  mode: "light" | "dark" | "unknown",
): "light" | "dark" => {
  if (mode !== "unknown") {
    return mode;
  }
  return media;
};
const ThemeController = () => {
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState<"light" | "dark" | "unknown">("unknown");
  // this state enables rerender when system theme changes
  const [media, setMedia] = useState<"light" | "dark">("light");
  useEffect(() => {
    setLoaded(true);
    const matchDark = window.matchMedia("(prefers-color-scheme: dark)");
    setMedia(matchDark.matches ? "dark" : "light");
    const handleChange = (e: MediaQueryListEvent) =>
      setMedia(e.matches ? "dark" : "light");
    matchDark.addEventListener("change", handleChange);
    return () => matchDark.removeEventListener("change", handleChange);
  }, []);

  if (!loaded) return <div className="basis-20 "></div>;
  return (
    <div className="basis-20 flex items-center justify-center">
      {checkDark(media, mode) === "dark" ? (
        <SolidMoon setMode={setMode} />
      ) : (
        <Moon setMode={setMode} />
      )}
    </div>
  );
};

type Icon = {
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark" | "unknown">>;
};

const Moon: React.FC<Icon> = ({ setMode }) => {
  const handleClick = () => {
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.replace("light", "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setMode(() => "dark");
  };
  return (
    <button
      onClick={handleClick}
      className="h-full flex items-center justify-center"
    >
      <MoonIcon className="w-5 h-5 " />
    </button>
  );
};

const SolidMoon: React.FC<Icon> = ({ setMode }) => {
  const handleClick = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.replace("dark", "light");
    } else {
      document.documentElement.classList.add("light");
    }
    setMode(() => "light");
  };
  return (
    <button
      onClick={handleClick}
      className="h-full flex items-center justify-center"
    >
      <SolidMoonIcon className="w-5 h-5 fill-blue-500" />
    </button>
  );
};
