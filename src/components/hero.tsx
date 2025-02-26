import Navigation from "./nav";
import { Button } from "./ui/button";

export default function Hero() {
    return (
      <section className="relative h-[600px] overflow-hidden">
        <Navigation />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
  
        <div className="container relative mx-auto px-4 py-20 max-w-[76rem] mt-[4rem]">
          <div className="max-w-3xl">
            <h2 className="mb-4 text-lg font-medium text-white">WELCOME TO SHETH TRADING CORPORATION</h2>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              YOUR TRUSTED PARTNER FOR 3M AND DOWELL&apos;S
            </h1>
          </div>
          <Button variant="default" className="bg-[#5C1E1E] hover:bg-[#4A1818] text-[1.1rem] mt-8 font-medium p-[1rem]">
            <span>Our Products</span>
          </Button>
        </div>
      </section>
    )
  }
  
  