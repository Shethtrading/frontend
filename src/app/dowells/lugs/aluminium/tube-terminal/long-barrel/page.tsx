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

  const productImages = ["/dowells/lugs/alu/long/img1.png"];

  const packOptions = [
    { label: "2.5-3 / ALS-551", value: "ALS-551" },
    { label: "2.5-3.5 / ALS-509", value: "ALS-509" },
    { label: "4-4 / ALS-555", value: "ALS-555" },
    { label: "4-5 / ALS-517", value: "ALS-517" },
    { label: "6-5 / ALS-558", value: "ALS-558" },
    { label: "6-6 / ALS-513", value: "ALS-513" },
    { label: "10-6 / ALS-514", value: "ALS-514" },
    { label: "10-8 / ALS-515", value: "ALS-515" },
    { label: "16-6 / ALS-552", value: "ALS-552" },
    { label: "16-8 / ALS-516", value: "ALS-516" },
    { label: "16-10 / ALS-617", value: "ALS-617" },
    { label: "25-8 / ALS-518", value: "ALS-518" },
    { label: "25-10 / ALS-519", value: "ALS-519" },
    { label: "25-12 / ALS-520", value: "ALS-520" },
    { label: "35-8 / ALS-521", value: "ALS-521" },
    { label: "35-10 / ALS-522", value: "ALS-522" },
    { label: "50-8 / ALS-655", value: "ALS-655" },
    { label: "50-10 / ALS-512", value: "ALS-512" },
    { label: "50-12 / ALS-524", value: "ALS-524" },
    { label: "70-8 / ALS-556", value: "ALS-556" },
    { label: "70-10 / ALS-525", value: "ALS-525" },
    { label: "70-12 / ALS-526", value: "ALS-526" },
    { label: "95-10 / ALS-527", value: "ALS-527" },
    { label: "95-12 / ALS-528", value: "ALS-528" },
    { label: "95-16 / ALS-529", value: "ALS-529" },
    { label: "120-10 / ALS-557", value: "ALS-557" },
    { label: "120-12 / ALS-530", value: "ALS-530" },
    { label: "120-16 / ALS-531", value: "ALS-531" },
    { label: "150-10 / ALS-658", value: "ALS-658" },
    { label: "150-12 / ALS-532", value: "ALS-532" },
    { label: "150-16 / ALS-533", value: "ALS-533" },
    { label: "185-10 / ALS-511", value: "ALS-511" },
    { label: "185-12 / ALS-534", value: "ALS-534" },
    { label: "185-16 / ALS-535", value: "ALS-535" },
    { label: "225-12 / ALS-620", value: "ALS-620" },
    { label: "240-12 / ALS-536", value: "ALS-536" },
    { label: "240-16 / ALS-537", value: "ALS-537" },
    { label: "300-16 / ALS-500", value: "ALS-500" },
    { label: "300-20 / ALS-559", value: "ALS-559" },
    { label: "400-20 / ALS-560", value: "ALS-560" },
    { label: "500-20 / ALS-596", value: "ALS-596" },
    { label: "630-20 / ALS-561", value: "ALS-561" },
    { label: "800 / ALS-618", value: "ALS-618" },
    { label: "1000 / ALS-619", value: "ALS-619" },
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
      const name = `Long Barrel ${formData.pack}`;

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
                      href="/dowells/lugs/alu/long/pdf.pdf"
                      download
                      className="flex items-center justify-center gap-1 p-2 bg-white/90 border rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      <Download className="h-3 w-3" />
                      <span className="text-xs font-medium">Download PDF</span>
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
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Product details and form */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Long Barrel</h1>
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
