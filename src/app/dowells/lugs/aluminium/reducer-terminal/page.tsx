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

  const productImages = ["/dowells/lugs/alu/reducer/img1.png"];

  const packOptions = [
    { label: "2.5 / AWP-01", value: "AWP-01" },
    { label: "2.5 / AWP-07", value: "AWP-07" },
    { label: "4 / AWP-15", value: "AWP-15" },
    { label: "4 / AWP-16", value: "AWP-16" },
    { label: "6 / AWP-17", value: "AWP-17" },
    { label: "6 / AWP-18", value: "AWP-18" },
    { label: "10 / AWP-19", value: "AWP-19" },
    { label: "10 / AWP-20", value: "AWP-20" },
    { label: "10 / AWP-21", value: "AWP-21" },
    { label: "10 / AWP-22", value: "AWP-22" },
    { label: "16 / AWP-23", value: "AWP-23" },
    { label: "16 / AWP-24", value: "AWP-24" },
    { label: "16 / AWP-02", value: "AWP-02" },
    { label: "25 / AWP-25", value: "AWP-25" },
    { label: "25 / AWP-03", value: "AWP-03" },
    { label: "35 / AWP-04", value: "AWP-04" },
    { label: "50 / AWP-26", value: "AWP-26" },
    { label: "50 / AWP-05", value: "AWP-05" },
    { label: "70 / AWP-27", value: "AWP-27" },
    { label: "70 / AWP-06", value: "AWP-06" },
    { label: "70 / AWP-28", value: "AWP-28" },
    { label: "95 / AWP-29", value: "AWP-29" },
    { label: "95 / AWP-08", value: "AWP-08" },
    { label: "95 / AWP-31", value: "AWP-31" },
    { label: "95 / AWP-32", value: "AWP-32" },
    { label: "120 / AWP-33", value: "AWP-33" },
    { label: "120 / AWP-34", value: "AWP-34" },
    { label: "120 / AWP-35", value: "AWP-35" },
    { label: "120 / AWP-36", value: "AWP-36" },
    { label: "150 / AWP-10", value: "AWP-10" },
    { label: "150 / AWP-37", value: "AWP-37" },
    { label: "185 / AWP-30", value: "AWP-30" },
    { label: "185 / AWP-38", value: "AWP-38" },
    { label: "225 / AWP-39", value: "AWP-39" },
    { label: "225 / AWP-46", value: "AWP-46" },
    { label: "225 / AWP-42", value: "AWP-42" },
    { label: "240 / AWP-44", value: "AWP-44" },
    { label: "240 / AWP-43", value: "AWP-43" },
    { label: "300 / AWP-45", value: "AWP-45" },
    { label: "300 / AWP-47", value: "AWP-47" },
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
      const name = `Reducer Terminal ${formData.pack}`;

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
                      href="/dowells/lugs/alu/reducer/pdf.pdf"
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
                  <h1 className="text-3xl font-bold mb-2">Reducer Terminal</h1>
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
