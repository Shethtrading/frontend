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

  const productImages = ["/dowells/lugs/copper/tube/medium/img1.png"];

  const packOptions = [
    { label: "2.5-5 / CUS-05", value: "CUS-05" },
    { label: "4-6 / CUS-06", value: "CUS-06" },
    { label: "6-6 / CUS-07", value: "CUS-07" },
    { label: "10-6 / CUS-08", value: "CUS-08" },
    { label: "16-6 / CUS-09", value: "CUS-09" },
    { label: "25-6 / CUS-10", value: "CUS-10" },
    { label: "35-6 / CUS-11", value: "CUS-11" },
    { label: "35-8 / CUS-12", value: "CUS-12" },
    { label: "50-6 / CUS-13", value: "CUS-13" },
    { label: "50-8 / CUS-14", value: "CUS-14" },
    { label: "50-10 / CUS-15", value: "CUS-15" },
    { label: "70-8 / CUS-16", value: "CUS-16" },
    { label: "70-10 / CUS-17", value: "CUS-17" },
    { label: "70-12 / CUS-18", value: "CUS-18" },
    { label: "95-10 / CUS-19", value: "CUS-19" },
    { label: "95-12 / CUS-20", value: "CUS-20" },
    { label: "120-10 / CUS-21", value: "CUS-21" },
    { label: "120-12 / CUS-22", value: "CUS-22" },
    { label: "120-16 / CUS-23", value: "CUS-23" },
    { label: "150-10 / CUS-24", value: "CUS-24" },
    { label: "150-12 / CUS-25", value: "CUS-25" },
    { label: "150-16 / CUS-26", value: "CUS-26" },
    { label: "185-12 / CUS-27", value: "CUS-27" },
    { label: "185-16 / CUS-28", value: "CUS-28" },
    { label: "225-16 / CUS-231", value: "CUS-231" },
    { label: "240-16 / CUS-29", value: "CUS-29" },
    { label: "240-20 / CUS-30", value: "CUS-30" },
    { label: "300-16 / CUS-31", value: "CUS-31" },
    { label: "300-20 / CUS-32", value: "CUS-32" },
    { label: "400-20 / CUS-33", value: "CUS-33" },
    { label: "500-20 / CUS-34", value: "CUS-34" },
    { label: "630-20 / CUS-35", value: "CUS-35" },
    { label: "800 / CUS-062", value: "CUS-062" },
    { label: "1000 / CUS-076", value: "CUS-076" },
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
      const name = `Medium Duty ${formData.pack}`;

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
                      href="/dowells/lugs/copper/tube/medium/pdf.pdf"
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
                  <h1 className="text-3xl font-bold mb-2">Medium Duty</h1>
                  <p className="text-gray-600">Product of Copper</p>
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
