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
    { label: '2.5 / WPC-01', value: "WPC-01" },
    { label: '2.5 / WPC-07', value: "WPC-07" },
    { label: '4 / WPC-15', value: "WPC-15" },
    { label: '4 / WPC-16', value: "WPC-16" },
    { label: '6 / WPC-17', value: "WPC-17" },
    { label: '6 / WPC-18', value: "WPC-18" },
    { label: '10 / WPC-19', value: "WPC-19" },
    { label: '10 / WPC-20', value: "WPC-20" },
    { label: '10 / WPC-21', value: "WPC-21" },
    { label: '10 / WPC-22', value: "WPC-22" },
    { label: '16 / WPC-23', value: "WPC-23" },
    { label: '16 / WPC-24', value: "WPC-24" },
    { label: '16 / WPC-02', value: "WPC-02" },
    { label: '25 / WPC-25', value: "WPC-25" },
    { label: '25 / WPC-03', value: "WPC-03" },
    { label: '35 / WPC-04', value: "WPC-04" },
    { label: '50 / WPC-26', value: "WPC-26" },
    { label: '50 / WPC-05', value: "WPC-05" },
    { label: '70 / WPC-27', value: "WPC-27" },
    { label: '70 / WPC-6', value: "WPC-6" },
    { label: '70 / WPC-28', value: "WPC-28" },
    { label: '95 / WPC-29', value: "WPC-29" },
    { label: '95 / WPC-08', value: "WPC-08" },
    { label: '95 / WPC-31', value: "WPC-31" },
    { label: '95 / WPC-32', value: "WPC-32" },
    { label: '120 / WPC-33', value: "WPC-33" },
    { label: '120 / WPC-34', value: "WPC-34" },
    { label: '120 / WPC-35', value: "WPC-35" },
    { label: '120 / WPC-36', value: "WPC-36" },
    { label: '150 / WPC-10', value: "WPC-10" },
    { label: '150 / WPC-37', value: "WPC-37" },
    { label: '185 / WPC-30', value: "WPC-30" },
    { label: '185 / WPC-38', value: "WPC-38" },
    { label: '225 / WPC-39', value: "WPC-39" },
    { label: '225 / WPC-46', value: "WPC-46" },
    { label: '225 / WPC-42', value: "WPC-42" },
    { label: '240 / WPC-44', value: "WPC-44" },
    { label: '240 / WPC-43', value: "WPC-43" },
    { label: '300 / WPC-45', value: "WPC-45" },
    { label: '300 / WPC-47', value: "WPC-47" },
    { label: '400 / WPC-101', value: "WPC-101" },
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
      const name = `Reducer Type ${formData.pack}`;

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
                  <h1 className="text-3xl font-bold mb-2">Reducer Type</h1>
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
