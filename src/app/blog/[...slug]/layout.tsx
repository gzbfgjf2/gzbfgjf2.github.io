export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        " p-1 prose lg:prose-lg max-w-none prose-pre:p-0 prose-pre:rounded-none prose-pre:m-0 prose-code:py-20 "
      }
    >
      {children}
    </div>
  );
}
