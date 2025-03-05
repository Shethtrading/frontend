import { Search, ShoppingCart, Mail, Calculator } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Search or Browse by Brand",
    description:
      "Use the search bar or navigate through the product categories or Choose 3M or Dowells from products tab and explore product categories.",
    icon: Search,
  },
  {
    number: "2",
    title: "Add to Cart",
    description: "Select your desired products and add them to your cart.",
    icon: ShoppingCart,
  },
  {
    number: "3",
    title: "Submit Inquiry",
    description:
      "Review your cart and submit your inquiry with your/company details.",
    icon: Mail,
  },
  {
    number: "4",
    title: "Receive Quote",
    description:
      "We'll send you a custom quote with pricing and details on the shared email id.",
    icon: Calculator,
  },
];

export default function StepsGuide() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="sub-title">GUIDE TO USING THIS WEBSITE</h3>

          <h2 className="title">Follow 4 Easy Work Steps</h2>
        </div>

        <div className="relative mx-auto max-w-6xl mt-[5rem]">
          {/* Connecting Lines - Hidden on Mobile */}
          <div className="absolute left-0 right-0 top-[45%] hidden ">
            <div className="h-[1px] w-full bg-gray-200" />
          </div>

          {/* Steps Grid */}
          <div className="grid gap-14 md:grid-cols-4 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center"
              >
                {/* Wrapper div with group class */}
                <div className="group w-full">
                  {/* Step Card */}
                  <div
                    className={`relative w-full rounded-lg p-6 text-center transition-all duration-300 ease-in-out bg-white text-gray-900 shadow-sm group-hover:bg-[#5C1E1E] group-hover:text-white ${
                      index % 2 === 0
                        ? "pt-[4rem] md:pt-[1.5rem] md:pb-[4rem]"
                        : "pt-[4rem]"
                    }`}
                  >
                    <h3 className="mb-3 text-sm font-medium uppercase tracking-wider opacity-80">
                      STEP-{step.number}
                    </h3>
                    <h4 className="mb-4 text-xl font-bold lg:text-2xl">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-200">
                      {step.description}
                    </p>
                    {/* Icon Circle */}
                    <div
                      className={`absolute mx-auto  flex h-16 w-16 left-1/2 transform -translate-x-1/2 items-center justify-center rounded-full border-4 transition-colors duration-300 border-[#5C1E1E] group-hover:border-white bg-white group-hover:bg-[#5C1E1E] text-[#5C1E1E] group-hover:text-white shadow-lg ${
                        index % 2 == 0
                          ? "top-0 md:top-auto md:bottom-0 -translate-y-1/2 md:translate-y-1/2"
                          : "top-0 -translate-y-1/2"
                      }`}
                    >
                      <step.icon className="h-9 w-9" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
