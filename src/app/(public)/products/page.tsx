"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import Header from "@/components/header";
import TopBar from "@/components/top-bar";
import { Home } from "lucide-react";
import Navigation from "@/components/nav";
import StepsGuide from "@/components/steps";
import Footer from "@/components/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BrandCardProps {
  brand: "3M" | "Dowells";
  onClick: () => void;
}

function BrandCard({ brand, onClick }: BrandCardProps) {
  return (
    <div className="group relative w-full cursor-pointer" onClick={onClick}>
      <Card className="relative z-10 flex h-full flex-col overflow-hidden bg-white transition-shadow duration-500 hover:shadow-xl">
        <div className="flex-1 p-6">
          {/* Main Logo */}
          <div className="relative mx-auto aspect-video w-full max-w-[240px]">
            <Image
              src={brand === "3M" ? "/3m.jpg" : "/dowell.png"}
              alt={`${brand} Logo`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center gap-3 border-t p-4">
          <div className="h-10 w-10 overflow-hidden rounded bg-[#993300] p-2">
            <Image
              src={brand === "3M" ? "/3m.jpg" : "/dowell.png"}
              alt={`${brand} Icon`}
              width={24}
              height={24}
              className="h-full w-full object-contain brightness-0 invert"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{brand}</h3>
            <p className="text-sm text-gray-500">EXPLORE</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function BrandCards() {
  const router = useRouter();

  const handleRedirect = (destination: string) => {
    // Simulating redirection
    console.log(`Redirecting to ${destination}`);
    // Uncomment the next line to actually redirect:
    router.push(`/${destination.toLowerCase()}`);
  };

  return (
    <div className="">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Navigation />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/terms.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative mx-auto px-4 py-20 max-w-[76rem] mt-[4rem]">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Products
            </h1>
            <nav className="flex items-center text-white text-sm mt-[1rem]">
              <Link
                href="/"
                className="flex items-center justify-center hover:text-gray-300 transition-colors"
              >
                <Home size={24} className="mr-1 font-bold" fontWeight={300} />
                <span className="font-semibold text-[1.1rem]">HOME</span>
              </Link>
              <span className="mx-2 text-gray-400">›</span>
              <span className="text-gray-300 font-medium">PRODUCTS</span>
            </nav>
          </div>
        </div>
      </section>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:flex-row my-[3rem]">
        <BrandCard brand="3M" onClick={() => handleRedirect("3M")} />
        <BrandCard brand="Dowells" onClick={() => handleRedirect("Dowells")} />
      </div>

      <StepsGuide />
      <Footer />
    </div>
  );
}
