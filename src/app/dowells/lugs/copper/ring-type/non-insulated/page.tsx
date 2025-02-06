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
    { label: "0.75-4 / RS-7317", value: "RS-7317" },
    { label: "1-3.5 / RS-7318", value: "RS-7318" },
    { label: "1.5-3 / RS-7001", value: "RS-7001" },
    { label: "1.5-3.5 / RS-7002", value: "RS-7002" },
    { label: "1.5-3.5 / RS-7048", value: "RS-7048" },
    { label: "1.5-4 / RS-7003", value: "RS-7003" },
    { label: "1.5-4 / RS-7049", value: "RS-7049" },
    { label: "1.5-4 / RS-7004", value: "RS-7004" },
    { label: "1.5-4 / RS-7154", value: "RS-7154" },
    { label: "1.5-5 / RS-7005", value: "RS-7005" },
    { label: "1.5-5 / RS-7006", value: "RS-7006" },
    { label: "1.5-6 / RS-7007", value: "RS-7007" },
    { label: "1.5-6 / RS-7106", value: "RS-7106" },
    { label: "2.5-3 / RS-7107", value: "RS-7107" },
    { label: "2.5-3.5 / RS-7008", value: "RS-7008" },
    { label: "2.5-3.5 / RS-7108", value: "RS-7108" },
    { label: "2.5-4 / RS-7009", value: "RS-7009" },
    { label: "2.5-5 / RS-7010", value: "RS-7010" },
    { label: "2.5-5 / RS-7109", value: "RS-7109" },
    { label: "2.5-5 / RS-7110", value: "RS-7110" },
    { label: "2.5-6 / RS-7011", value: "RS-7011" },
    { label: "2.5-6 / RS-7012", value: "RS-7012" },
    { label: "2.5-8 / RS-7013", value: "RS-7013" },
    { label: "2.5-8 / RS-7014", value: "RS-7014" },
    { label: "2.5-10 / RS-7015", value: "RS-7015" },
    { label: "2.5-10 / RS-7151", value: "RS-7151" },
    { label: "4.6-4 / RS-7155", value: "RS-7155" },
    { label: "4.6-5 / RS-7050", value: "RS-7050" },
    { label: "4.6-5 / RS-7016", value: "RS-7016" },
    { label: "4.6-6 / RS-7017", value: "RS-7017" },
    { label: "4.6-6 / RS-7019", value: "RS-7019" },
    { label: "4.6-6 / RS-7115", value: "RS-7115" },
    { label: "4.6-8 / RS-7018", value: "RS-7018" },
    { label: "4.6-8 / RS-7020", value: "RS-7020" },
    { label: "4.6-8 / RS-7116", value: "RS-7116" },
    { label: "4.6-10 / RS-7022", value: "RS-7022" },
    { label: "4.6-10 / RS-7023", value: "RS-7023" },
    { label: "4.6-12 / RS-7024", value: "RS-7024" },
    { label: "10-5 / RS-7025", value: "RS-7025" },
    { label: "10-5 / RS-7026", value: "RS-7026" },
    { label: "10-6 / RS-7120", value: "RS-7120" },
    { label: "10-8 / RS-7121", value: "RS-7121" },
    { label: "10-10 / RS-7027", value: "RS-7027" },
    { label: "10-10 / RS-7123", value: "RS-7123" },
    { label: "10-12 / RS-7028", value: "RS-7028" },
    { label: "16-5 / RS-7124", value: "RS-7124" },
    { label: "16-6 / RS-7029", value: "RS-7029" },
    { label: "16-6 / RS-7031", value: "RS-7031" },
    { label: "16-8 / RS-7030", value: "RS-7030" },
    { label: "16-10 / RS-7032", value: "RS-7032" },
    { label: "16-10 / RS-7128", value: "RS-7128" },
    { label: "16-12 / RS-7033", value: "RS-7033" },
    { label: "25-6 / RS-7156", value: "RS-7156" },
    { label: "25-8 / RS-7034", value: "RS-7034" },
    { label: "25-8 / RS-7036", value: "RS-7036" },
    { label: "25-10 / RS-7035", value: "RS-7035" },
    { label: "25-10 / RS-7132", value: "RS-7132" },
    { label: "25-12 / RS-7037", value: "RS-7037" },
    { label: "35-6 / RS-7133", value: "RS-7133" },
    { label: "35-8 / RS-7038", value: "RS-7038" },
    { label: "35-10 / RS-7135", value: "RS-7135" },
    { label: "35-12 / RS-7040", value: "RS-7040" },
    { label: "50-8 / RS-7136", value: "RS-7136" },
    { label: "50-10 / RS-7137", value: "RS-7137" },
    { label: "50-12 / RS-7042", value: "RS-7042" },
    { label: "50-16 / RS-7139", value: "RS-7139" },
    { label: "70-10 / RS-7140", value: "RS-7140" },
    { label: "70-12 / RS-7141", value: "RS-7141" },
    { label: "70-16 / RS-7142", value: "RS-7142" },
    { label: "95-10 / RS-7144", value: "RS-7144" },
    { label: "95-12 / RS-7044", value: "RS-7044" },
    { label: "95-16 / RS-7145", value: "RS-7145" },
    { label: "120-12 / RS-7146", value: "RS-7146" },
    { label: "120-16 / RS-7147", value: "RS-7147" },
    { label: "120-20 / RS-7148", value: "RS-7148" },
    { label: "150-12 / RS-7149", value: "RS-7149" },
    { label: "150-16 / RS-7045", value: "RS-7045" },
    { label: "150-20 / RS-7046", value: "RS-7046" },
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
      const name = `Non-Insulated ${formData.pack}`;

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
                  <h1 className="text-3xl font-bold mb-2">Non-Insulated</h1>
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
