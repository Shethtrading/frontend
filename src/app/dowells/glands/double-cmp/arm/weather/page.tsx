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
    { label: "6.0-12.0 / DBW-01SS", value: "DBW-01SS" },
    { label: "12.0-16.5 / DBW-01S", value: "DBW-01S" },
    { label: "16.5-18.5 / DBW-01", value: "DBW-01" },
    { label: "16.5-18.5 / DBW-01A", value: "DBW-01A" },
    { label: "18.5-20.0 / DBW-02", value: "DBW-02" },
    { label: "18.5-20.0 / DBW-02A", value: "DBW-02A" },
    { label: "20.0-23.0 / DBW-03", value: "DBW-03" },
    { label: "23.0-26.0 / DBW-04", value: "DBW-04" },
    { label: "23.0-26.0 / DBW-04A", value: "DBW-04A" },
    { label: "26.0-30.0 / DBW-05", value: "DBW-05" },
    { label: "26.0-30.0 / DBW-05A", value: "DBW-05A" },
    { label: "30.0-33.0 / DBW-06", value: "DBW-06" },
    { label: "30.0-33.0 / DBW-06A", value: "DBW-06A" },
    { label: "33.0-37.0 / DBW-07", value: "DBW-07" },
    { label: "37.0-41.0 / DBW-08", value: "DBW-08" },
    { label: "41.0-46.0 / DBW-09", value: "DBW-09" },
    { label: "46.0-52.0 / DBW-10", value: "DBW-10" },
    { label: "46.0-52.0 / DBW-10A", value: "DBW-10A" },
    { label: "52.0-54.0 / DBW-011A", value: "DBW-011A" },
    { label: "54.0-61.0 / DBW-011", value: "DBW-011" },
    { label: "61.0-66.0 / DBW-012", value: "DBW-012" },
    { label: "66.0-72.0 / DBW-013A", value: "DBW-013A" },
    { label: "72.0-78.0 / DBW-013", value: "DBW-013" },
    { label: "78.0-84.0 / DBW-014", value: "DBW-014" },
    { label: "84.0-94.0 / DBW-015", value: "DBW-015" },
    { label: "94.0-104.0 / DBW-016", value: "DBW-016" },
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
      const name = `Weather Proof ${formData.pack}`;

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
                  <h1 className="text-3xl font-bold mb-2">Weather Proof</h1>
                  <p className="text-gray-600"></p>
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
