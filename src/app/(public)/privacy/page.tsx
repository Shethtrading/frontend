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
              Privacy Policy
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
              <span className="text-gray-300 font-medium">PRIVACY POLICY</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="container mx-auto px-4 py-12 max-w-[76rem]">
        <div className="prose lg:prose-xl">
          <h2>Last updated: September 02, 2024</h2>
          <p>
            This Privacy Policy describes our policies and procedures regarding the collection, use, and disclosure of your information when you use our Service. It also explains your privacy rights and how the law protects you.
          </p>
          <p>
            We use your personal data to provide and improve our Service. By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            Words with initial capitalization have specific meanings as defined below. These definitions apply whether the terms appear in singular or plural.
          </p>
          <h3>Definitions</h3>
          <ul>
            <li><strong>Account</strong> - A unique account created for you to access our Service or parts of our Service.</li>
            <li><strong>Company</strong> - Refers to Sheth Trading Corporation Pvt. Ltd., located at 22, Shop Number 322, Rabindra Sarani, Tiretti, Kolkata, West Bengal 700073.</li>
            <li><strong>Cookies</strong> - Small files stored on your device to enhance your browsing experience.</li>
            <li><strong>Service</strong> - Refers to the website.</li>
            <li><strong>Personal Data</strong> - Any information that relates to an identified or identifiable individual.</li>
          </ul>
          <h2>Collecting and Using Your Personal Data</h2>
          <h3>Types of Data Collected</h3>
          <h4>Personal Data</h4>
          <p>
            While using our Service, we may ask you to provide personally identifiable information, including but not limited to:
          </p>
          <ul>
            <li>Email address</li>
            <li>First and last name</li>
            <li>Phone number</li>
            <li>Address (State, Province, ZIP/Postal code, City)</li>
          </ul>
          <h4>Usage Data</h4>
          <p>
            Usage Data is collected automatically when using the Service. This may include:
          </p>
          <ul>
            <li>Your device’s IP address</li>
            <li>Browser type and version</li>
            <li>Pages visited on our website</li>
            <li>Time and date of your visit</li>
            <li>Time spent on each page</li>
          </ul>
          <h2>Security of Your Personal Data</h2>
          <p>
            We take data security seriously, but no method of transmission over the internet is 100% secure. While we strive to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, you can contact us at:
          </p>
          <p><strong>Email:</strong> enquiry@shethtrading.com</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
