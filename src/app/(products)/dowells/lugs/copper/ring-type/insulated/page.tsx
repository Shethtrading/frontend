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

  const productImages = ["/dowells/lugs/copper/ring/insulated/img1.png"];

  const packOptions = [
    { label: "0.75-4 / RSI-7501", value: "RSI-7501" },
    { label: "1-4 / RSI-7502", value: "RSI-7502" },
    { label: "1.5-3 / RSI-7054", value: "RSI-7054" },
    { label: "1.5-3.5 / RSI-7055", value: "RSI-7055" },
    { label: "1.5-3.5 / RSI-7058", value: "RSI-7058" },
    { label: "1.5-4 / RSI-7056", value: "RSI-7056" },
    { label: "1.5-4 / RSI-7059", value: "RSI-7059" },
    { label: "1.5-4 / RSI-7061", value: "RSI-7061" },
    { label: "1.5-4 / RSI-7063", value: "RSI-7063" },
    { label: "1.5-5 / RSI-7062", value: "RSI-7062" },
    { label: "1.5-5 / RSI-7065", value: "RSI-7065" },
    { label: "1.5-5 / RSI-7066", value: "RSI-7066" },
    { label: "1.5-6 / RSI-7067", value: "RSI-7067" },
    { label: "2.5-3 / RSI-7068", value: "RSI-7068" },
    { label: "2.5-3.5 / RSI-7069", value: "RSI-7069" },
    { label: "2.5-3.5 / RSI-7070", value: "RSI-7070" },
    { label: "2.5-4 / RSI-7071", value: "RSI-7071" },
    { label: "2.5-5 / RSI-7072", value: "RSI-7072" },
    { label: "2.5-5 / RSI-7073", value: "RSI-7073" },
    { label: "2.5-5 / RSI-7075", value: "RSI-7075" },
    { label: "2.5-6 / RSI-7074", value: "RSI-7074" },
    { label: "2.5-6 / RSI-7076", value: "RSI-7076" },
    { label: "2.5-8 / RSI-7077", value: "RSI-7077" },
    { label: "2.5-8 / RSI-7079", value: "RSI-7079" },
    { label: "2.5-10 / RSI-7081", value: "RSI-7081" },
    { label: "4.6-4 / RSI-7083", value: "RSI-7083" },
    { label: "4.6-5 / RSI-7084", value: "RSI-7084" },
    { label: "4.6-5 / RSI-7086", value: "RSI-7086" },
    { label: "4.6-6 / RSI-7089", value: "RSI-7089" },
    { label: "4.6-6 / RSI-7092", value: "RSI-7092" },
    { label: "4.6-6 / RSI-7093", value: "RSI-7093" },
    { label: "4.6-8 / RSI-7090", value: "RSI-7090" },
    { label: "4.6-8 / RSI-7094", value: "RSI-7094" },
    { label: "4.6-8 / RSI-7096", value: "RSI-7096" },
    { label: "4.6-10 / RSI-7099", value: "RSI-7099" },
    { label: "4.6-12 / RSI-7100", value: "RSI-7100" },
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
      const name = `Insulated ${formData.pack}`;

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
                  <h1 className="text-3xl font-bold mb-2">Insulated</h1>
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
