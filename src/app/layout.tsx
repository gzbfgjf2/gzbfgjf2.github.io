import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="text-center backdrop-blur border justify-center bg-gray-50/50 h-16 flex items-center">
          <Link href="/" className="">
            better
          </Link>
        </div>
        <div className="flex justify-center">
          <div className=" border w-screen sm:w-[640px] md:w-[700px] lg:w-[900px] ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
