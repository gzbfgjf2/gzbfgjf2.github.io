"use client";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import {
  MoonIcon as SolidMoon,
  SunIcon as SolidSun,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const systemPrefersLight = () => {};
const matchDark = window.matchMedia("(prefers-color-scheme: dark)");

const checkSystemTheme = () => (matchDark.matches ? "dark" : "light");

const checkManual = () =>
  document.documentElement.classList.contains("dark") ||
  document.documentElement.classList.contains("light");

export const Header = () => {
  const click = () => {
    document.documentElement.classList.add("dark");
  };
  return (
    <div className=" text-center backdrop-blur justify-center h-16 flex items-center text-lg font-bold gap-10 dark:text-gray-400">
      <Link href="/" className="h-full flex items-center justify-center">
        home
      </Link>
      <ThemeController />
    </div>
  );
};

const ThemeController = () => {
  const [systemThemeState, setSystemThemeState] = useState(checkSystemTheme);
  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) =>
      setSystemThemeState(e.matches ? "dark" : "light");
    matchDark.addEventListener("change", handleChange);
    return () => matchDark.removeEventListener("change", handleChange);
  }, []);
  return systemThemeState === "light" ? <Moon /> : <Sun />;
};

const Moon = () => {
  const handleClick = () => {
    if (checkManual()) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };
  return (
    <button
      onClick={handleClick}
      className="h-full flex items-center justify-center"
    >
      <MoonIcon className="w-5 h-5 bg-blue-400" />
    </button>
  );
};
const Sun = () => {
  const handleClick = () => {
    if (checkManual()) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  };
  return (
    <button
      onClick={handleClick}
      className="h-full flex items-center justify-center"
    >
      <SunIcon className="w-5 h-5 bg-blue-400" />
    </button>
  );
};
