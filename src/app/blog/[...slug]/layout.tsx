export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        "prose dark:prose-invert max-w-none overflow-clip prose-pre:p-0 prose-pre:rounded-none prose-pre:m-0 prose-code:py-2 group "
      }
    >
      {children}
    </div>
  );
}
