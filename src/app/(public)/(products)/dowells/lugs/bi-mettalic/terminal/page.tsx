"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
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
import { updateLocalStorageArray } from "@/utils/localstorage";
import { toast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/loader";
import { Download } from "lucide-react";
import { useVisibility } from "@/app/provider";

export default function Component() {
  const [formData, setFormData] = useState({
    pack: "",
    quantity: 1,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const {setIsVisible} = useVisibility();

  const productImages = ["/new_pics/Lugs/Bi-Metallic Terminal (Friction Welded).png","/dowells/lugs/bi-metallic/terminal/img1.png"];

  const packOptions = [
    { label: "25 / CAF-25-10", value: "CAF-25-10" },
    { label: "35 / CAF-35-10", value: "CAF-35-10" },
    { label: "50 / CAF-50-13", value: "CAF-50-13" },
    { label: "70 / CAF-70-13", value: "CAF-70-13" },
    { label: "95 / CAF-95-13", value: "CAF-95-13" },
    { label: "120 / CAF-120-13", value: "CAF-120-13" },
    { label: "150 / CAF-150-13", value: "CAF-150-13" },
    { label: "185 / CAF-185-13", value: "CAF-185-13" },
    { label: "240 / CAF-240-13", value: "CAF-240-13" },
    { label: "300 / CAF-300-17", value: "CAF-300-17" },
    { label: "400 / CAF-400-17", value: "CAF-400-17" },
    { label: "500 / CAF-500", value: "CAF-500" },
    { label: "630 / CAF-630", value: "CAF-630" },
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddToCart = async () => {
    if (!formData.pack) {
      toast({ description: "Please select a pack type." });
      return;
    }

    setLoading(true);

    try {
      setIsVisible(false);
      const cat_no = formData.pack as string; // Use the selected cat_no as the cat_no
      const quantity = formData.quantity;
      const name = `Dowell's Lugs Bi-Mettalic Terminal ${formData.pack}`;

      const selectedOption = packOptions.find((o) => o.value === formData.pack);
      const size = selectedOption ? selectedOption.label.split("/")[0].trim() : undefined;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
        { cat_no, quantity, name, size }
      );

      console.log(res);

      if (res?.data?.id) {
        const key = "3mItems";
        updateLocalStorageArray(key, res.data.id);
      }

      toast({ description: "Added to Cart Successfully" });
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast({ description: "Failed to add to cart, please try again." });
    } finally {
      setLoading(false);
      setIsVisible(true);
    }
  };

  return (
    <div className="container w-full mx-auto px-4 py-4 mt-[3rem]">
      {loading && <LoadingSpinner />}

      <Card className="overflow-visible">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Images */}
            <div className="w-full lg:w-1/2 p-10 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
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
                      href="/dowells/lugs/bi-metallic/terminal/lug_bi_term.pdf"
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
                    className={`flex-shrink-0 w-20 h-20 relative rounded-md overflow-visible ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Product details and form */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Terminal</h1>
                  <p className="text-gray-600">Product of Aluminium</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pack">Size(mm sq. -E) / CAT. No.</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("pack", value)
                      }
                    >
                      <SelectTrigger id="pack">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {packOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (newValue === "" || !isNaN(parseInt(newValue))) {
                          handleInputChange("quantity", newValue);
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                onClick={handleAddToCart}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
