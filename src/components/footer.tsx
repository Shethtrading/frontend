"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const industriesWeServe = [
  "Power Generation & Distribution",
  "Oil & Gas",
  "Telecommunications",
  "Industrial Manufacturing",
];

const usefulLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Price List", href: "/price-list" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms and Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const subscribeToNewsletter = async (email: string) => {
    // Check if email is empty or invalid
    if (!email || !email.includes("@") || !email.includes(".")) {
      toast({
        variant: "destructive",
        description: "Please enter a valid email address.",
      });
      return null;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mailSub`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          variant: "default",
          description: "Thank you for subscribing.",
        });
        return data.data;
      } else {
        toast({
          variant: "destructive",
          description: data.message || "Failed to subscribe.",
        });
        return null;
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        variant: "destructive",
        description: "Network error. Please try again.",
      });
      return null;
    }
  };

  // Usage in your existing code:
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeToNewsletter(subscribeEmail);
    setSubscribeEmail("");
  };

  return (
    <footer className="bg-[#1A1A1A] text-gray-300 ">
      {/* Top Section */}
      <div className="border-b border-gray-800 mx-auto max-w-[76rem]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Logo Section */}
            <div className="flex items-center flex-wrap space-x-4">
              <Image
                src="/sheth_logo.png"
                alt="Sheth Trading Corporation Logo"
                width={200}
                height={60}
                className="h-auto w-48 invert"
              />
              <Image
                src="/msme_logo.png"
                alt="Partner Logo 1"
                width={40}
                height={40}
              />
              <Image
                src="/gem_logo.png"
                alt="Partner Logo 2"
                width={40}
                height={40}
              />
              <Image
                src="/ireps_logo.png"
                alt="Partner Logo 3"
                width={40}
                height={40}
              />
            </div>

            {/* Subscribe Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md items-center gap-2"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-md bg-[#2A2A2A] px-10 py-2 text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#993300]"
                />
              </div>
              <Button
                type="submit"
                className="bg-[#993300] px-6 hover:bg-[#7A2900]"
              >
                SUBSCRIBE
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto max-w-[76rem] px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Get In Touch */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-white">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 text-[#993300]" />
                <p>
                  22 Rabindra Sarani, Tiretti Market,
                  <br />
                  Shop #322, Kolkata - 700073
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#993300]" />
                <a
                  href="mailto:enquiry@shethtrading.com"
                  className="hover:text-white hover:underline"
                >
                  enquiry@shethtrading.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#993300]" />
                <a
                  href="tel:+913322379239"
                  className="hover:text-white hover:underline"
                >
                  +91 (033) 2237 9239
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-[#993300]" />
                <p>Monday - Friday: 11:00 to 6:00</p>
              </div>
            </div>
          </div>

          {/* Industries We Serve */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-white">
              Industries We Serve
            </h3>
            <ul className="space-y-3">
              {industriesWeServe.map((industry) => (
                <li key={industry}>
                  <Link
                    href="#"
                    className="inline-block hover:text-white hover:underline"
                  >
                    {industry}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-white">
              Useful Links
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block hover:text-white hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 bg-[#151515]">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Sheth Trading Corporation. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
