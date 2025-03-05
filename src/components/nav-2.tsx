"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cart from "./cart";
import Image from "next/image";

const navItems = [
  { name: "HOME", href: "/", active: true },
  { name: "ABOUT US", href: "/about-us" },
  { name: "PRODUCTS", href: "/products" },
  { name: "PRICELIST & BROCHURE", href: "/price-list" },
  { name: "CONTACT US", href: "/contact-us" },
];

export default function Navigation({ alwaysVisible = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(alwaysVisible);

  useEffect(() => {
    if (!alwaysVisible) {
      const handleScroll = () => {
        // Show navbar after 100vh (100% of viewport height)
        setIsVisible(window.scrollY > window.innerHeight);
      };

      // Add scroll event listener
      window.addEventListener("scroll", handleScroll);

      // Initial check
      handleScroll();

      // Cleanup
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [alwaysVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white fixed top-0 left-0 z-50 w-full text-black py-[0.25rem] md:py-[1rem] shadow-md"
        >
          <div className="container mx-auto px-4 max-w-[76rem]">
            <div className="flex items-center justify-between py-4 lg:hidden">
              <a href="/" className="font-semibold">
                <Image
                  src="/sheth_logo.png"
                  alt="Sheth Trading Corporation Logo"
                  width={200}
                  height={60}
                  className="h-auto w-32"
                />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            <div
              className={`${
                isOpen ? "block" : "hidden"
              } space-y-4 lg:block lg:space-y-0`}
            >
              <ul className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`block py-2 text-sm font-semibold transition-colors hover:text-amber-500
                        ${item.active ? "text-amber-900" : "text-black"}`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </div>
                {!alwaysVisible ? (
                  <li className="lg:ml-auto">
                    <Cart />
                  </li>
                ) : (
                  <a href="/" className="font-semibold">
                    <Image
                      src="/sheth_logo.png"
                      alt="Sheth Trading Corporation Logo"
                      width={100}
                      height={20}
                      className="h-auto w-28"
                    />
                  </a>
                )}
              </ul>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
