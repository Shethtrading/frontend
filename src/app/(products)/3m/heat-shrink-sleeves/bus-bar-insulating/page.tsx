"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/loader";
import Navigation from "@/components/navigation";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { updateLocalStorageArray } from "@/utils/localstorage";
import { Download } from "lucide-react";

export default function Component() {
  const [formData, setFormData] = useState({
    size: "",
    quantity: 1,
    voltage: "",
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const productImages = [
    "/3m/HEAT_SHRINK_SLEEVES/BUSBAR_SLEEVES/img1.png",
  "/3m/HEAT_SHRINK_SLEEVES/BUSBAR_SLEEVES/img2.png",
  ];

  const sizeOptions = [
    "35/12 mm",
    "55/20 mm",
    "70/30 mm",
    "100/40 mm",
    "160/50 mm",
    "205/60 mm",
  ];
  const voltageOptions = ["22 kV", "33 kV", "52 kV"];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddToCart = async () => {
    if (!formData.size) {
      toast({ description: "Please select a size type." });
      return;
    }

    setLoading(true);

    try {
      const sku = `3M_HS_BB_${formData.voltage.split(" ")[0]}_${
        formData.size.split(" ")[0]
      }`;
      const quantity = formData.quantity;
      const name = `Bus Bar Insulating ${formData.size} ${formData.voltage}`;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
        { sku, quantity, name }
      );

      if (res?.data?.id) {
        const key = "3mItems";
        updateLocalStorageArray(key, res.data.id);
      }

      toast({ description: "Added to Cart Successfully" });
    } catch (error) {
      console.error(error);
      toast({ description: "Failed to add to cart, please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <LoadingSpinner />}
      {!loading && <Navigation />}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Images */}
            <div className="w-full lg:w-1/2 p-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
              <div className="sticky top-0 bg-background pt-4">
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mb-4">
                <Image
                    src={productImages[selectedImage]}
                    alt={`Product Image ${selectedImage + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                  {/* Add download button - positioned absolutely */}
                  <div className="absolute -bottom-6 right-4 z-10">
                    <a
                      href="/3m/HEAT_SHRINK_SLEEVES/BUSBAR_SLEEVES/busbar_sleeve.pdf"
                      download
                      className="flex items-center justify-center gap-1 p-2 bg-white/90 border rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      <Download className="h-3 w-3" />
                      <span className="text-xs font-medium">Tech Sheet</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pb-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Product details and form */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Bus Bar Insulating
                  </h1>
                  <p className="text-gray-600">
                    High-quality cable for various applications
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("size", value)
                      }
                    >
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="voltage">Voltage</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("voltage", value)
                      }
                    >
                      <SelectTrigger id="voltage">
                        <SelectValue placeholder="Select voltage" />
                      </SelectTrigger>
                      <SelectContent>
                        {voltageOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange(
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
