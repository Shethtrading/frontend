"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react"

const OurClientsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Sample client data with two pages of clients
  const clientPages = [
    [
      { id: 1, name: "Hindalco", logo: "/clogo/aditya_birla.png" },
      { id: 2, name: "Himadri", logo: "/clogo/himadri.png" },
      { id: 3, name: "EnergyCompany", logo: "/clogo/elec_blue.png" },
      { id: 4, name: "Sterling & Wilson", logo: "/clogo/ster&wil.png" },
      { id: 5, name: "Vikram", logo: "/clogo/vikramSolar.png" },
      { id: 6, name: "Tata", logo: "/clogo/tata_metaliks.png" },
      { id: 7, name: "Exide", logo: "/clogo/exide.png" },
      { id: 8, name: "Utkarsh", logo: "/clogo/utkarsh.png" },
    ],
    [
      { id: 9, name: "Rashmi", logo: "/clogo/rashmi_group.png" },
      { id: 10, name: "LT", logo: "/clogo/L&T.png" },
      { id: 11, name: "Daneli", logo: "/clogo/Danieli.png" },
      { id: 12, name: "WB", logo: "/clogo/wbsedcl.png" },
      { id: 13, name: "MSP", logo: "/clogo/msp_group.png" },
      { id: 14, name: "Swastik", logo: "/clogo/swastika_infra.png" },
      { id: 15, name: "Shyam", logo: "/clogo/shyam_group.png" },
      { id: 16, name: "te", logo: "/clogo/te.png" },
    ],
  ];

  // Auto carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev === 0 ? 1 : 0));
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Decoration */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-amber-800"></div>
            <h2 className="sub-title-2">
              OUR CLIENTS
            </h2>
            <div className="h-0.5 w-12 bg-amber-800"></div>
          </div>
          
          <h1 className="title">
            Think Positive, Think Always
          </h1>
          <h2 className="sub-title">
            Powering Your Business
          </h2>
        </div>
        
        {/* Carousel with Animation */}
        <div className="relative overflow-hidden">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {clientPages[activeSlide].map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center p-8 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-[10rem] w-full">
                  <Image
                    className="object-contain"
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    priority
                  />
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {clientPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  activeSlide === index ? "bg-amber-800" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClientsSection;