export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        "prose max-w-none overflow-clip prose-pre:p-0 prose-pre:rounded-none prose-pre:m-0 prose-code:py-2 "
      }
    >
      {children}
    </div>
  );
}
