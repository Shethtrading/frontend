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
    { label: '1.5 / EH-453', value: "EH-453" },
    { label: '1.5 / CB-41', value: "CB-41" },
    { label: '2.5 / EH-454', value: "EH-454" },
    { label: '4 / CB-3', value: "CB-3" },
    { label: '4.6 / EH-455', value: "EH-455" },
    { label: '6 / CB-4', value: "CB-4" },
    { label: '10 / EH-460', value: "EH-460" },
    { label: '16 / CB-6', value: "CB-6" },
    { label: '20 / CB-47', value: "CB-47" },
    { label: '25 / CB-24', value: "CB-24" },
    { label: '35 / CB-25', value: "CB-25" },
    { label: '50 / CB-26', value: "CB-26" },
    { label: '70 / CB-27', value: "CB-27" },
    { label: '70 / CB-51', value: "CB-51" },
    { label: '95 / CB-28', value: "CB-28" },
    { label: '95 / CB-52', value: "CB-52" },
    { label: '120 / CB-29', value: "CB-29" },
    { label: '120 / CB-53', value: "CB-53" },
    { label: '150 / CB-30', value: "CB-30" },
    { label: '150 / CB-54', value: "CB-54" },
    { label: '185 / CB-55', value: "CB-55" },
    { label: '185 / CB-31', value: "CB-31" },
    { label: '240 / CB-32', value: "CB-32" },
    { label: '240 / CB-56', value: "CB-56" },
    { label: '300 / CB-33', value: "CB-33" },
    { label: '300 / CB-57', value: "CB-57" },
    { label: '400 / CB-34', value: "CB-34" },
    { label: '400 / CB-58', value: "CB-58" },
    { label: '500 / CB-35', value: "CB-35" },
    { label: '500 / CB-59', value: "CB-59" },
    { label: '550 / CB-60', value: "CB-60" },
    { label: '630 / CB-36', value: "CB-36" },
    { label: '630 / CB-61', value: "CB-61" },
    { label: '800 / CB-42', value: "CB-42" },
    { label: '1000 / CB-43', value: "CB-43" },
    { label: '1.5 / EH-463', value: "EH-463" },
    { label: '2.5 / EH-464', value: "EH-464" },
    { label: '4-6 / EH-465', value: "EH-465" },
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
                  <h1 className="text-3xl font-bold mb-2">Inline Connector</h1>
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
