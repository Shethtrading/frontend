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
import Navigation from "@/components/navigation";
import { Download } from "lucide-react";

export default function Component() {
  const [formData, setFormData] = useState({
    pack: "",
    quantity: 1,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const productImages = ["/dowells/lugs/bi-metallic/inline/img1.png"];

  const packOptions = [
    { label: "CACF-16-16 / 16-16", value: "CACF-16-16" },
    { label: "CACF-25-16 / 25-16", value: "CACF-25-16" },
    { label: "CACF-25-25 / 25-25", value: "CACF-25-25" },
    { label: "CACF-35-16 / 35-16", value: "CACF-35-16" },
    { label: "CACF-35-25 / 35-25", value: "CACF-35-25" },
    { label: "CACF-35-35 / 35-35", value: "CACF-35-35" },
    { label: "CACF-50-25 / 50-25", value: "CACF-50-25" },
    { label: "CACF-50-35 / 50-35", value: "CACF-50-35" },
    { label: "CACF-50-50 / 50-50", value: "CACF-50-50" },
    { label: "CACF-70-35 / 70-35", value: "CACF-70-35" },
    { label: "CACF-70-50 / 70-50", value: "CACF-70-50" },
    { label: "CACF-70-70 / 70-70", value: "CACF-70-70" },
    { label: "CACF-95-50 / 95-50", value: "CACF-95-50" },
    { label: "CACF-95-70 / 95-75", value: "CACF-95-70" },
    { label: "CACF-95-95 / 95-95", value: "CACF-95-95" },
    { label: "CACF-120-70 / 120-70", value: "CACF-120-70" },
    { label: "CACF-120-95 / 120-95", value: "CACF-120-95" },
    { label: "CACF-120-120 / 120-120", value: "CACF-120-120" },
    { label: "CACF-150-95 / 150-95", value: "CACF-150-95" },
    { label: "CACF-150-120 / 150-120", value: "CACF-150-120" },
    { label: "CACF-150-150 / 150-150", value: "CACF-150-150" },
    { label: "CACF-185-120 / 185-120", value: "CACF-185-120" },
    { label: "CACF-185-150 / 185-150", value: "CACF-185-150" },
    { label: "CACF-185-185 / 185-185", value: "CACF-185-185" },
    { label: "CACF-240-150 / 240-150", value: "CACF-240-150" },
    { label: "CACF-240-185 / 240-185", value: "CACF-240-185" },
    { label: "CACF-240-240 / 240-240", value: "CACF-240-240" },
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
      const cat_no = formData.pack as string; // Use the selected cat_no as the cat_no
      const quantity = formData.quantity;
      const name = `Inline Connector ${formData.pack}`;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
        { cat_no, quantity, name }
      );

      console.log(res);

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
    <div className="container mx-auto px-4 py-4">
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
                      href="/dowells/lugs/bi-metallic/inline/pdf.pdf"
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
                  <h1 className="text-3xl font-bold mb-2">Inline Connector</h1>
                  <p className="text-gray-600">Product of Aluminium</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pack">Size / CAT. No.</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("pack", value)
                      }
                    >
                      <SelectTrigger id="pack">
                        <SelectValue placeholder="Select pack" />
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
