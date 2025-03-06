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

  const productImages = ["/dowells/lugs/copper/ring/grip/img1.png"];

  const packOptions = [
    { label: "1.5-3 / PSD-7437", value: "PSD-7437" },
    { label: "1.5-3.5 / PSD-7438", value: "PSD-7438" },
    { label: "1.5-4 / PSD-7439", value: "PSD-7439" },
    { label: "1.5-3.5 / PSD-7441", value: "PSD-7441" },
    { label: "1.5-4 / PSD-7442", value: "PSD-7442" },
    { label: "1.5-4 / PSD-7444", value: "PSD-7444" },
    { label: "1.5-5 / PSD-7445", value: "PSD-7445" },
    { label: "1.5-4 / PSD-7446", value: "PSD-7446" },
    { label: "1.5-5 / PSD-7448", value: "PSD-7448" },
    { label: "1.5-6 / PSD-7449", value: "PSD-7449" },
    { label: "1.5-6 / PSD-7450", value: "PSD-7450" },
    { label: "2.5-3 / PSD-7451", value: "PSD-7451" },
    { label: "2.5-3.5 / PSD-7452", value: "PSD-7452" },
    { label: "2.5-3.5 / PSD-7453", value: "PSD-7453" },
    { label: "2.5-4 / PSD-7454", value: "PSD-7454" },
    { label: "2.5-5 / PSD-7455", value: "PSD-7455" },
    { label: "2.5-5 / PSD-7456", value: "PSD-7456" },
    { label: "2.5-6 / PSD-7457", value: "PSD-7457" },
    { label: "2.5-5 / PSD-7458", value: "PSD-7458" },
    { label: "2.5-6 / PSD-7459", value: "PSD-7459" },
    { label: "2.5-8 / PSD-7460", value: "PSD-7460" },
    { label: "2.5-8 / PSD-7462", value: "PSD-7462" },
    { label: "2.5-10 / PSD-7464", value: "PSD-7464" },
    { label: "4.6-4 / PSD-7466", value: "PSD-7466" },
    { label: "4.6-5 / PSD-7467", value: "PSD-7467" },
    { label: "4.6-5 / PSD-7469", value: "PSD-7469" },
    { label: "4.6-6 / PSD-7472", value: "PSD-7472" },
    { label: "4.6-8 / PSD-7473", value: "PSD-7473" },
    { label: "4.6-6 / PSD-7475", value: "PSD-7475" },
    { label: "4.6-6 / PSD-7476", value: "PSD-7476" },
    { label: "4.6-8 / PSD-7477", value: "PSD-7477" },
    { label: "4.6-8 / PSD-7479", value: "PSD-7479" },
    { label: "4.6-8 / PSD-7482", value: "PSD-7482" },
    { label: "4.6-12 / PSD-7483", value: "PSD-7483" },
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
      const name = `Double Grip ${formData.pack}`;

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
                      href="/dowells/lugs/copper/ring/grip/pdf.pdf"
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
                  <h1 className="text-3xl font-bold mb-2">Double Grip</h1>
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
