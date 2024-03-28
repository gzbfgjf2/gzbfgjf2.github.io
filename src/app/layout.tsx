import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./highlightjs.css";
import { Header } from "@/lib/header";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={"font-sans bg-gray-200 dark:bg-gray-800"}>
        <Header />
        <div className="m-auto  w-screen px-5 sm:w-[620px] md:w-[700px] lg:w-[900px] pt-5">
          {children}
        </div>
      </body>
    </html>
  );
}
