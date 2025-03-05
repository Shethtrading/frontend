import Image from "next/image";

const features = [
  {
    title: "Expertise and Experience",
    width: "95%",
  },
  {
    title: "Comprehensive Range",
    width: "90%",
  },
  {
    title: "Customer-Centric Service",
    width: "85%",
  },
  {
    title: "Nationwide Reach",
    width: "80%",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-[76rem] px-4">
        {/* Header with decorative lines */}
        <div className="mb-8 flex items-center justify-center space-x-4">
          <div className="h-[2px] w-12 bg-[#5C1E1E]" />
          <h2 className="sub-title-2">
            WHY CHOOSE US?
          </h2>
          <div className="h-[2px] w-12 bg-[#5C1E1E]" />
        </div>

        {/* Main Title */}
        <div className="mb-16 text-center">
          <h3 className="title">
            Customer-Centric Service
          </h3>
          <p className="text-gray-600">
            Genuine products from leading brands like 3M and Dowell's.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Image and Experience Circle */}
          <div className="relative">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
              <Image
                src="/why.jpg"
                alt="Industrial Equipment"
                fill
                className="object-cover"
              />
            </div>
            {/* Experience Circle */}
            <div className="absolute mx-auto left-1/2 transform -translate-x-1/2 sm:left-auto sm:translate-x-0  sm:-right-12 bottom-12 flex h-48 w-48 items-center justify-center rounded-full bg-[#993300] text-center border-[8px] border-white text-white">
              <div>
                <div className="text-5xl font-bold">50+</div>
                <div className="text-[0.75rem] font-medium tracking-wider">
                  YEARS EXPERIENCE
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-6 pt-8 md:pt-0">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="mb-2 text-xl font-semibold text-gray-900">
                  {feature.title}
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-[#FFF1F1]">
                  <div
                    className="h-full rounded-full bg-[#993300]/20 transition-all duration-1000"
                    style={{ width: feature.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
