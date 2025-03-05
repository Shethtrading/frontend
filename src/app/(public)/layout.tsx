import Navigation from "@/components/nav-2";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navigation />
      {children}
    </div>
  );
}
