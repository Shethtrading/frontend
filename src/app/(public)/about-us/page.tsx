import Header from "@/components/header";
import TopBar from "@/components/top-bar";
import React from "react";
import Navigation from "@/components/nav";
import Image from "next/image";
import { Trophy, Users, Briefcase, TrendingUp, Home } from "lucide-react";
import { Zap, Flame, Radio, Factory, Building2, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepsGuide from "@/components/steps";
import { Clock, Phone, MapPin } from "lucide-react";
import CertificatesSection from "@/components/cert";
import Footer from "@/components/footer";
import Link from "next/link";

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
              About Us
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
              <span className="text-gray-300 font-medium">ABOUT US</span>
            </nav>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto max-w-[76rem] px-4 md:px-6">
          {/* About Company Header */}
          <div className="mb-8 text-right mx-auto w-auto">
            <h3 className="text-gray-500 uppercase tracking-wider text-sm md:text-base text-center">
              ABOUT COMPANY
            </h3>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="relative w-full h-[350px] md:h-[400px]">
                <Image
                  src=""
                  alt="Electrical installation with red cables"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  Welcome to Sheth Trading Corporation
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
                  3M and Dowell's Dealer in Kolkata
                </h2>
                <p className="text-gray-600 mb-4">
                  3M India Ltd, a subsidiary of the American multinational 3M,
                  is known for its innovation and quality. Based in Maplewood,
                  Minnesota, 3M offers
                </p>
                <p className="text-gray-600">
                  Since 1969, Dowell's has been a pioneer in solderless crimping
                  technology in India. Its high standards have made it a leader
                  in
                </p>
              </div>

              {/* Product Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-amber-50 flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="fill-amber-800"
                      />
                      <path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="text-amber-800 font-medium">
                    Heat Shrink Solution
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-50 flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="fill-amber-800"
                      />
                      <path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="text-amber-800 font-medium">
                    Auxiliary Products
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-50 flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="fill-amber-800"
                      />
                      <path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="text-amber-800 font-medium">
                    Scotch Tapes and Compounds
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-50 flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="fill-amber-800"
                      />
                      <path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="text-amber-800 font-medium">
                    Cable End Terminals
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-50 flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="fill-amber-800"
                      />
                      <path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="text-amber-800 font-medium">
                    Cable Glands
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-50 flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="fill-amber-800"
                      />
                      <path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="text-amber-800 font-medium">
                    Crimping Tools
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="text-amber-800 mb-2">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">
                3500+
              </h3>
              <p className="text-amber-700">Satisfied Clients</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-amber-800 mb-2">
                <Briefcase className="w-12 h-12" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">
                30+
              </h3>
              <p className="text-amber-700">Active Project</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-amber-800 mb-2">
                <Trophy className="w-12 h-12" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">
                2000+
              </h3>
              <p className="text-amber-700">Product Portfolio</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-amber-800 mb-2">
                <TrendingUp className="w-12 h-12" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">
                35% +
              </h3>
              <p className="text-amber-700">Companies YOY growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto max-w-[76rem] px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="sub-title">THE BEST INDUSTRY SERVICES</h3>
            <h2 className="title">
              Provide Awesome Services <br></br> For Industrial Company
            </h2>
          </div>

          {/* Services Grid - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Power Generation Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm transition-colors duration-300 hover:bg-amber-900 hover:text-white group">
              <div className="flex items-start">
                <div className="mr-4 p-3 border border-gray-200 rounded-full group-hover:border-amber-700">
                  <Zap className="w-6 h-6 text-gray-700 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white">
                    Power Generation & Distribution
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-200">
                    Essential for secure power transmission in plants and
                    substations.
                  </p>
                </div>
              </div>
            </div>

            {/* Oil & Gas Card - Default Brown */}
            <div className="bg-white rounded-lg p-6 shadow-sm transition-colors duration-300 hover:bg-amber-900 hover:text-white group">
              <div className="flex items-start">
                <div className="mr-4 p-3 border border-gray-200 rounded-full group-hover:border-amber-700">
                  <Flame className="w-6 h-6 text-gray-700 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white">
                    Oil & Gas
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-200">
                    Reliable electrical connections in hazardous environments.
                  </p>
                </div>
              </div>
            </div>

            {/* Telecommunications Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm transition-colors duration-300 hover:bg-amber-900 hover:text-white group">
              <div className="flex items-start">
                <div className="mr-4 p-3 border border-gray-200 rounded-full group-hover:border-amber-700">
                  <Radio className="w-6 h-6 text-gray-700 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white">
                    Telecommunications
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-200">
                    Maintains performance in communication networks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid - Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Industrial Manufacturing Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm transition-colors duration-300 hover:bg-amber-900 hover:text-white group">
              <div className="flex items-start">
                <div className="mr-4 p-3 border border-gray-200 rounded-full group-hover:border-amber-700">
                  <Factory className="w-6 h-6 text-gray-700 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white">
                    Industrial Manufacturing
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-200">
                    Durable solutions for demanding industrial settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Construction & Infrastructure Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm transition-colors duration-300 hover:bg-amber-900 hover:text-white group">
              <div className="flex items-start">
                <div className="mr-4 p-3 border border-gray-200 rounded-full group-hover:border-amber-700">
                  <Building2 className="w-6 h-6 text-gray-700 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white">
                    Construction & Infrastructure
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-200">
                    Trusted in residential, commercial, and infrastructure
                    projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Transportation Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm transition-colors duration-300 hover:bg-amber-900 hover:text-white group">
              <div className="flex items-start">
                <div className="mr-4 p-3 border border-gray-200 rounded-full group-hover:border-amber-700">
                  <Train className="w-6 h-6 text-gray-700 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white">
                    Transportation
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-200">
                    Ensures safe electrical systems in railways, airports, and
                    seaports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StepsGuide />

      {/* Stats */}
      <div className="p-[1rem]">
        <div className="w-full mb-[4rem] max-w-7xl mx-auto shadow-lg rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Hours Section */}
            <div className="flex items-center justify-center bg-gray-900 text-white p-6 md:p-8 flex-1">
              <div className="mr-4">
                <Clock size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase mb-1">
                  WE ARE OPEN MONDAY-FRIDAY
                </h3>
                <p className="text-base md:text-2xl font-semibold">
                  11:00 to 6:00
                </p>
              </div>
            </div>

            {/* Call Section */}
            <div className="flex items-center justify-center bg-red-900 text-white p-6 md:p-8 flex-1">
              <div className="mr-4">
                <Phone size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase mb-1">
                  CALL US 24/7
                </h3>
                <p className="text-base md:text-2xl font-semibold">
                  +91 (033) 2237 9239
                </p>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex items-center justify-center bg-gray-900 text-white p-6 md:p-8 flex-1">
              <div className="mr-4">
                <MapPin size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase mb-1">
                  OUR OFFICE ADDRESS
                </h3>
                <p className="text-base md:text-2xl font-semibold">
                  22 Rabindra Sarani, Tirreti Market. Shop #322, Kolkata -
                  700073
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certs */}
      <CertificatesSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
