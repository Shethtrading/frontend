"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Cart from "@/components/cart";

const products = [
  {
    name: "Inline Connector Long Barrel",
    image: "/placeholder.svg?height=200&width=200",
    slug: "inline-connector",
  },
  {
    name: "Tube Terminal Long Barrel",
    image: "/placeholder.svg?height=200&width=200",
    slug: "tube-terminal",
  },
  {
    name: "Fork Type PreInsulated",
    image: "/placeholder.svg?height=200&width=200",
    slug: "fork-type",
  },
];

export default function Component() {
  const router = useRouter();

  const handleCardClick = (slug: string) => {
    router.push(`/dowells/lugs/copper/on-demand/${slug}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            className="flex items-center"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:block">Back</span>
          </Button>
          <h1 className="text-3xl font-bold text-center flex-grow">
            Dowells Lugs Copper Products
          </h1>
          <div className="pr-[1rem]">
            <Cart />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className="flex flex-col md:flex-row overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCardClick(product.slug)}
            >
              {/* <div className="w-full md:w-1/2 h-48 md:h-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div> */}
              <CardContent className="flex-1 flex items-center justify-center p-4">
                <h2 className="text-xl font-semibold text-center md:text-left">
                  {product.name}
                </h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
