export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        "flex flex-col justify-center items-center w-full lg:pt-5 "
      }
    >
      <div>{children}</div>
    </div>
  );
}
