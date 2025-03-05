import { Toaster } from "@/components/ui/toaster";
import ScrollToTopButton from "@/components/go-up";
import Navigation from "@/components/nav-2";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-[5rem] sm:pt-[4rem]">
      <Navigation alwaysVisible={true} />
      <div className="max-w-[76rem] mx-auto">{children}</div>
    </div>
  );
}
