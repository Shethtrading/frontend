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
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ];

  const packOptions = [
    { label: "2.5-3 / ALS-151", value: "ALS-151" },
    { label: "2.5-3.5 / ALS-309", value: "ALS-309" },
    { label: "4-4 / ALS-155", value: "ALS-155" },
    { label: "4-5 / ALS-317", value: "ALS-317" },
    { label: "6-5 / ALS-158", value: "ALS-158" },
    { label: "6-6 / ALS-313", value: "ALS-313" },
    { label: "10-4 / ALS-159", value: "ALS-159" },
    { label: "10-6 / ALS-214", value: "ALS-214" },
    { label: "10-8 / ALS-215", value: "ALS-215" },
    { label: "16-6 / ALS-252", value: "ALS-252" },
    { label: "16-8 / ALS-216", value: "ALS-216" },
    { label: "16-10 / ALS-217", value: "ALS-217" },
    { label: "25-6 / ALS-253", value: "ALS-253" },
    { label: "25-8 / ALS-218", value: "ALS-218" },
    { label: "25-10 / ALS-219", value: "ALS-219" },
    { label: "25-12 / ALS-220", value: "ALS-220" },
    { label: "35-6 / ALS-254", value: "ALS-254" },
    { label: "35-8 / ALS-221", value: "ALS-221" },
    { label: "35-10 / ALS-222", value: "ALS-222" },
    { label: "50-8 / ALS-255", value: "ALS-255" },
    { label: "50-10 / ALS-312", value: "ALS-312" },
    { label: "50-12 / ALS-224", value: "ALS-224" },
    { label: "70-8 / ALS-256", value: "ALS-256" },
    { label: "70-10 / ALS-225", value: "ALS-225" },
    { label: "70-12 / ALS-226", value: "ALS-226" },
    { label: "95-10 / ALS-227", value: "ALS-227" },
    { label: "95-12 / ALS-228", value: "ALS-228" },
    { label: "95-16 / ALS-229", value: "ALS-229" },
    { label: "120-10 / ALS-257", value: "ALS-257" },
    { label: "120-12 / ALS-230", value: "ALS-230" },
    { label: "120-16 / ALS-231", value: "ALS-231" },
    { label: "150-10 / ALS-258", value: "ALS-258" },
    { label: "150-12 / ALS-232", value: "ALS-232" },
    { label: "150-16 / ALS-233", value: "ALS-233" },
    { label: "185-10 / ALS-311", value: "ALS-311" },
    { label: "185-12 / ALS-234", value: "ALS-234" },
    { label: "185-16 / ALS-235", value: "ALS-235" },
    { label: "225-12 / ALS-320", value: "ALS-320" },
    { label: "240-12 / ALS-236", value: "ALS-236" },
    { label: "240-16 / ALS-237", value: "ALS-237" },
    { label: "300-16 / ALS-300", value: "ALS-300" },
    { label: "300-20 / ALS-259", value: "ALS-259" },
    { label: "400-20 / ALS-260", value: "ALS-260" },
    { label: "500-20 / ALS-296", value: "ALS-296" },
    { label: "630-20 / ALS-261", value: "ALS-261" },
    { label: "800 / ALS-318", value: "ALS-318" },
    { label: "1000 / ALS-319", value: "ALS-319" },
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
      const name = `Short Barrel ${formData.pack}`;

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
                  <h1 className="text-3xl font-bold mb-2">Short Barrel</h1>
                  <p className="text-gray-600">
                    Product of Aluminium Tube Terminal
                  </p>
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
