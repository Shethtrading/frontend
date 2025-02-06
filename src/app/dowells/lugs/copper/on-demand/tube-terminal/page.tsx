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

export default function Component() {
  const [formData, setFormData] = useState({
    pack: "",
    quantity: 1,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const productImages = [
    "/placeholder.svg?height=600&width=600&text=Image+1",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ];

  const packOptions = [
    { label: '2.5-5 / CEB-05', value: "CEB-05" },
    { label: '4-6 / CEB-06', value: "CEB-06" },
    { label: '6-6 / CEB-07', value: "CEB-07" },
    { label: '10-6 / CEB-08', value: "CEB-08" },
    { label: '16-6 / CEB-09', value: "CEB-09" },
    { label: '25-6 / CEB-10', value: "CEB-10" },
    { label: '35-6 / CEB-11', value: "CEB-11" },
    { label: '35-8 / CEB-12', value: "CEB-12" },
    { label: '50-6 / CEB-13', value: "CEB-13" },
    { label: '50-8 / CEB-14', value: "CEB-14" },
    { label: '50-10 / CEB-15', value: "CEB-15" },
    { label: '70-8 / CEB-16', value: "CEB-16" },
    { label: '70-10 / CEB-17', value: "CEB-17" },
    { label: '70-12 / CEB-18', value: "CEB-18" },
    { label: '95-10 / CEB-19', value: "CEB-19" },
    { label: '95-12 / CEB-20', value: "CEB-20" },
    { label: '120-10 / CEB-21', value: "CEB-21" },
    { label: '120-12 / CEB-22', value: "CEB-22" },
    { label: '120-16 / CEB-23', value: "CEB-23" },
    { label: '150-10 / CEB-24', value: "CEB-24" },
    { label: '150-12 / CEB-25', value: "CEB-25" },
    { label: '150-16 / CEB-26', value: "CEB-26" },
    { label: '185-12 / CEB-27', value: "CEB-27" },
    { label: '185-16 / CEB-28', value: "CEB-28" },
    { label: '225-16 / CEB-231', value: "CEB-231" },
    { label: '240-16 / CEB-29', value: "CEB-29" },
    { label: '240-20 / CEB-30', value: "CEB-30" },
    { label: '300-16 / CEB-31', value: "CEB-31" },
    { label: '300-20 / CEB-32', value: "CEB-32" },
    { label: '400-20 / CEB-33', value: "CEB-33" },
    { label: '500-20 / CEB-34', value: "CEB-34" },
    { label: '630-20 / CEB-35', value: "CEB-35" },
    { label: '800 / CEB-62', value: "CEB-62" },
    { label: '1000 / CEB-76', value: "CEB-76" },
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
      const name = `Tube Terminal Long Barrel ${formData.pack}`;

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
                    objectFit="cover"
                    className="rounded-lg"
                  />
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
            <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Tube Terminal Long Barrel</h1>
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
