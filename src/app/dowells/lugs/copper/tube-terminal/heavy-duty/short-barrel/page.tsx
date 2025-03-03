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

  const productImages = ["/dowells/lugs/copper/tube/heavy/short/img1.png"];

  const packOptions = [
    { label: "1.5-5 / CUS-538", value: "CUS-538" },
    { label: "1.5-6 / CUS-539", value: "CUS-539" },
    { label: "2.5-4 / CUS-388", value: "CUS-388" },
    { label: "2.5-5 / CUS-540", value: "CUS-540" },
    { label: "2.5-6 / CUS-541", value: "CUS-541" },
    { label: "4-5 / CUS-389", value: "CUS-389" },
    { label: "4-6 / CUS-543", value: "CUS-543" },
    { label: "6-5 / CUS-390", value: "CUS-390" },
    { label: "6-6 / CUS-544", value: "CUS-544" },
    { label: "6-8 / CUS-545", value: "CUS-545" },
    { label: "10-6 / CUS-353", value: "CUS-353" },
    { label: "10-8 / CUS-547", value: "CUS-547" },
    { label: "16-8 / CUS-549", value: "CUS-549" },
    { label: "16-6 / CUS-354", value: "CUS-354" },
    { label: "20-8 / CUS-550", value: "CUS-550" },
    { label: "25-6 / CUS-355", value: "CUS-355" },
    { label: "25-8 / CUS-551", value: "CUS-551" },
    { label: "25-10 / CUS-552", value: "CUS-552" },
    { label: "35-8 / CUS-356", value: "CUS-356" },
    { label: "35-6 / CUS-542", value: "CUS-542" },
    { label: "35-10 / CUS-554", value: "CUS-554" },
    { label: "50-8 / CUS-357", value: "CUS-357" },
    { label: "50-10 / CUS-556", value: "CUS-556" },
    { label: "70-10 / CUS-358", value: "CUS-358" },
    { label: "70-8 / CUS-557", value: "CUS-557" },
    { label: "70-13 / CUS-559", value: "CUS-559" },
    { label: "95-10 / CUS-359", value: "CUS-359" },
    { label: "95-13 / CUS-561", value: "CUS-561" },
    { label: "120-17 / CUS-546", value: "CUS-546" },
    { label: "120-13 / CUS-241", value: "CUS-241" },
    { label: "150-13 / CUS-242", value: "CUS-242" },
    { label: "150-17 / CUS-564", value: "CUS-564" },
    { label: "185-17 / CUS-243", value: "CUS-243" },
    { label: "240-17 / CUS-244", value: "CUS-244" },
    { label: "240-21 / CUS-567", value: "CUS-567" },
    { label: "300-17 / CUS-245", value: "CUS-245" },
    { label: "300-21 / CUS-569", value: "CUS-569" },
    { label: "400-17 / CUS-246", value: "CUS-246" },
    { label: "400-21 / CUS-571", value: "CUS-571" },
    { label: "500-21 / CUS-247", value: "CUS-247" },
    { label: "550-21 / CUS-573", value: "CUS-573" },
    { label: "630-21 / CUS-248", value: "CUS-248" },
    { label: "800 / CUS-599", value: "CUS-599" },
    { label: "1000 / CUS-590", value: "CUS-590" },
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
                    objectFit="contain"
                    className="rounded-lg"
                  />
                  {/* Add download button - positioned absolutely */}
                  <div className="absolute -bottom-6 right-4 z-10">
                    <a
                      href="/dowells/lugs/copper/tube/heavy/short/pdf.pdf"
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
