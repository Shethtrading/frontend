"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const certificates = [
  {
    id: 1,
    title: "Dowell's Authorization Certificate",
    image: "/clogo/dowells_cert.jpg",
  },
  {
    id: 2,
    title: "3M Authorization Certificate",
    image: "/clogo/3M_cert.jpg",
  },
]

const useCarousel = (length: number) => {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((current) => (current === length - 1 ? 0 : current + 1))
  }, [length])

  const prev = useCallback(() => {
    setCurrent((current) => (current === 0 ? length - 1 : current - 1))
  }, [length])

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  return { current, next, prev, goTo }
}

export default function CertificatesSection() {
  const { current, next, prev, goTo } = useCarousel(certificates.length)
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoplayDirection, setAutoplayDirection] = useState('forward')

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [current])

  // Auto carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplayDirection === 'forward') {
        if (current === certificates.length - 1) {
          setAutoplayDirection('backward')
          prev()
        } else {
          next()
        }
      } else {
        if (current === 0) {
          setAutoplayDirection('forward')
          next()
        } else {
          prev()
        }
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [current, next, prev, autoplayDirection])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-[76rem] px-4">
        {/* Header with decorative lines */}
        <div className="mb-8 flex items-center justify-center space-x-4">
          <div className="h-[2px] w-12 bg-[#5C1E1E]" />
          <h2 className="sub-title-2">OUR CERTIFICATES</h2>
          <div className="h-[2px] w-12 bg-[#5C1E1E]" />
        </div>

        {/* Main Title */}
        <div className="mb-16 text-center">
          <h3 className="title">
            Authorized Distributor
            <br />
            Certificates
          </h3>
        </div>

        {/* Carousel Section */}
        <div className="relative mx-auto max-w-[56rem] px-4">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#5C1E1E] text-white transition-opacity hover:bg-[#4A1818] md:-left-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            className="absolute -right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#5C1E1E] text-white transition-opacity hover:bg-[#4A1818] md:-right-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className={cn("flex transition-transform duration-300 ease-in-out", isAnimating && "pointer-events-none")}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {certificates.map((certificate) => (
                <div key={certificate.id} className="w-full flex-shrink-0 px-4">
                  <div className="overflow-hidden rounded-lg bg-white p-6 shadow-lg">
                    <h4 className="title">{certificate.title}</h4>
                    <div className="relative h-[300px] w-full">
                      <Image
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {certificates.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  current === index ? "bg-[#5C1E1E] w-8" : "bg-gray-300",
                )}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}