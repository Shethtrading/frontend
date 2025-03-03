import Header from "@/components/header";
import TopBar from "@/components/top-bar";
import React from "react";
import Navigation from "@/components/nav";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <main>
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <Navigation />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative mx-auto px-4 py-20 max-w-[76rem] mt-[4rem]">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Pricelist & Brochure
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
              <span className="text-gray-300 font-medium">
                PRICELIST & BROCHURE
              </span>
            </nav>
          </div>
          <Button
            variant="default"
            className="bg-[#5C1E1E] hover:bg-[#4A1818] text-[1.1rem] mt-8 font-medium p-[1rem]"
          >
            <span>Our Products</span>
          </Button>
        </div>
      </section>

      <section className="w-full bg-[#9e3b11] py-12 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-3xl font-bold text-center mb-12">
            <span className="font-extrabold">3M</span> Pricelist and Brochure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pricelist Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="relative w-full h-64 mb-6">
                <Image
                  src="/images/3m-pricelist-cover.jpg"
                  alt="3M Pricelist Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Pricelist PDF
              </h3>
              <Link href="/downloads/3m-pricelist.pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Pricelist
                </button>
              </Link>
            </div>

            {/* Brochure Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="relative w-full h-64 mb-6">
                <Image
                  src="/images/3m-brochure-cover.jpg"
                  alt="3M Brochure Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Brochure PDF
              </h3>
              <Link href="/downloads/3m-brochure.pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Brochure
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#9e3b11] py-12 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-3xl font-bold text-center mb-12">
            <span className="font-extrabold">Dowell's</span> Authorized
            Distributor Certificates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pricelist Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="relative w-full h-64 mb-6">
                <Image
                  src="/images/3m-pricelist-cover.jpg"
                  alt="3M Pricelist Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Pricelist PDF
              </h3>
              <Link href="/downloads/3m-pricelist.pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Pricelist
                </button>
              </Link>
            </div>

            {/* Brochure Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="relative w-full h-64 mb-6">
                <Image
                  src="/images/3m-brochure-cover.jpg"
                  alt="3M Brochure Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Brochure PDF
              </h3>
              <Link href="/downloads/3m-brochure.pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Brochure
                </button>
              </Link>
            </div>

            {/* Brochure Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="relative w-full h-64 mb-6">
                <Image
                  src="/images/3m-brochure-cover.jpg"
                  alt="3M Brochure Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Brochure PDF
              </h3>
              <Link href="/downloads/3m-brochure.pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Brochure
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
