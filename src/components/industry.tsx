"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Factory, Power, Stethoscope, FlaskConical, Radio } from "lucide-react";

const industries = [
  { id: "01", icon: Stethoscope, title: "Medical" },
  { id: "02", icon: Power, title: "Power Generation & Distribution" },
  { id: "03", icon: Factory, title: "Industrial Manufacturing" },
  { id: "04", icon: FlaskConical, title: "Oil & Gas" },
  { id: "05", icon: Radio, title: "Telecommunication" },
];

export default function CustomIndustryCarousel() {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition - 1;
        if (-newPosition >= carouselRef.current!.scrollWidth / 2) {
          return 0;
        }
        return newPosition;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current!.offsetLeft);
    setScrollLeft(carouselRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    setPosition(scrollLeft - walk);
  };

  return (
    <section className="w-full py-16 md:py-24 overflow-x-hidden">
      <div className="container px-4 max-w-[76rem] mx-auto">
        <div className="mb-16 text-center">
          <div className="flex justify-center space-x-2">
            <div className="h-0.5 w-12 bg-[#5C1E1E] self-center" />
            <h2 className="sub-title-2">
              Industries and Areas of Application
            </h2>
            <div className="h-0.5 w-12 bg-[#5C1E1E] self-center" />
          </div>
          <h3 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900 max-w-3xl mx-auto">
            Our products are trusted across a wide range of industries and
            applications.
          </h3>
        </div>

        <div
          className="w-full max-w-[76rem] mx-auto overflow-x-hidden"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            className="flex gap-[2rem] my-[4rem] transition-transform duration-100 ease-linear "
            style={{ transform: `translateX(${position}px)` }}
          >
            {[...industries, ...industries, ...industries].map(
              (industry, index) => (
                <div
                  key={`${industry.id}-${index}`}
                  className="group min-w-[200px] flex-[0_0_25%] md:flex-[0_0_20%] bg-white  rounded-lg shadow-lg transition-colors duration-300"
                >
                  <div className="relative h-full p-6 text-center group-hover:bg-[#5C1E1E] group-hover:text-white rounded-lg">
                    {/* ID Circle */}
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full border border-[#5C1E1E] group-hover:border-white group-hover:text-white flex items-center justify-center text-sm text-[#5C1E1E]">
                      {industry.id}
                    </div>
                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                      <industry.icon className="h-12 w-12 text-[#5C1E1E] group-hover:text-white transition-colors duration-300" />
                    </div>
                    {/* Title */}
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">
                      {industry.title}
                    </h4>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
