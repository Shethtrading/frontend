import { Users, Lightbulb, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import AnimatedTitle from "./animated-title";

export default function AboutCompany() {
  return (
    <section className="py-16 md:py-24 max-w-[76rem] mx-auto">
      <div className="container mx-auto px-4">
        {/* Header with decorative lines */}
        <div className="mb-16 flex items-center justify-center space-x-4">
          <div className="h-[2px] w-12 bg-[#5C1E1E]" />
          <h2 className="sub-title-2">
            ABOUT COMPANY
          </h2>
          <div className="h-[2px] w-12 bg-[#5C1E1E]" />
        </div>

        {/* Main content grid */}
        <div className=" gap-8 max-w-[56rem] mx-auto">
          {/* Images column 
          <div className="space-y-6">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
              <Image
                src=""
                alt="Primary Company Image"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
              <Image
                src=""
                alt="Secondary Company Image"
                fill
                className="object-cover"
              />
            </div>
          </div>
          */}

          {/* Content column */}
          <div className="space-y-12 shadow-lg p-[1.5rem] rounded-lg bg-white">
            {/* Main description */}
            <p className="text-gray-600 leading-relaxed">
              At Sheth Trading Corporation, we are committed to delivering
              excellence in electrical solutions. As Authorized Distributors for
              renowned brands 3M and Dowell's, our mission is to provide
              high-quality products and exceptional service to meet the diverse
              needs of our customers. Founded in 1968 by Anil Parekh, Sheth
              Trading Corporation has over 45 years of experience in the
              industrial sector.
            </p>

            {/* Our Team section */}
            <div className="flex flex-col items-center justify-center space-x-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#5C1E1E]">
                <Users className="h-4 w-4 text-[#5C1E1E]" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Our Team
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our team of techno-commercial professionals is dedicated to
                  understanding your needs and offering tailored solutions. We
                  focus on providing value-enhancing products and exceptional
                  support to ensure the best possible service.
                </p>
              </div>
            </div>

            {/* Our Vision section */}
            <div className="flex flex-col items-center justify-center space-x-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#5C1E1E]">
                <Lightbulb className="h-4 w-4 text-[#5C1E1E]" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading distributor of high-quality electrical
                  solutions in India, recognized for our commitment to
                  innovation, reliability, and customer satisfaction.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:px-[1.5rem] items-center justify-between gap-2">
              <Button
                variant="default"
                className="bg-[#5C1E1E] hover:bg-[#513818e4] text-[1.1rem]"
              >
                Discover More
              </Button>
              <span className="flex gap-2 items-center justify-center text-amber-900 text-[1.2rem] font-semibold">
                <Phone className="mr-2 h-4 w-4" />
                <span>+91 (033) 2237 9239</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
