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
import { Download } from "lucide-react";
import { useVisibility } from "@/app/provider";

export default function Component() {
  const [formData, setFormData] = useState({
    pack: "",
    quantity: 1,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const {setIsVisible} = useVisibility();

  const productImages = ["/Glands and Crimping Tools/Single Compression Aluminium Gland A2.png"];

  const packOptions = [
    { label: "07.0-14.0 / DGP10036", value: "DGP10036" },
    { label: "14.1-15.5 / DGP10037", value: "DGP10037" },
    { label: "15.6-17.0 / DGP10038", value: "DGP10038" },
    { label: "17.1-18.5 / DGP10039", value: "DGP10039" },
    { label: "18.6-19.5 / DGP10040", value: "DGP10040" },
    { label: "19.6-22.5 / DGP10041", value: "DGP10041" },
    { label: "22.6-25.5 / DGP10042", value: "DGP10042" },
    { label: "25.6-31.5 / DGP10043", value: "DGP10043" },
    { label: "31.6-34.5 / DGP10044", value: "DGP10044" },
    { label: "34.6-36.5 / DGP10045", value: "DGP10045" },
    { label: "36.6-44.5 / DGP10046", value: "DGP10046" },
    { label: "44.6-49.5 / DGP10047", value: "DGP10047" },
    { label: "49.6-54.5 / DGP10048", value: "DGP10048" },
    { label: "54.6-63.5 / DGP10049", value: "DGP10049" },
    { label: "63.6-69.5 / DGP10050", value: "DGP10050" },
    { label: "69.6-74.5 / DGP10051", value: "DGP10051" },
    { label: "74.6-81.0 / DGP10052", value: "DGP10052" },
    { label: "81.1-86.0 / DGP10053", value: "DGP10053" },
    { label: "86.1-100.0 / DGP10054", value: "DGP10054" },
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
      setIsVisible(false);
      const cat_no = formData.pack as string; // Use the selected cat_no as the cat_no
      const quantity = formData.quantity;
      const name = `Dowell's Glands Double-Compression For Armoured Medium Duty ${formData.pack}`;

      const selectedOption = packOptions.find((o) => o.value === formData.pack);


      const size = selectedOption ? selectedOption.label.split("/")[0].trim() : undefined;


      const res = await axios.post(


        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,


        { cat_no, quantity, name, size }


      );

      console.log(res);

      if (res?.data?.id) {
        const key = "3mItems";
        updateLocalStorageArray(key, res.data.id);
      }

      toast({ description: "Added to Cart Successfully" });
 window.location.reload()
    } catch (error) {
      console.error(error);
      toast({ description: "Failed to add to cart, please try again." });
    } finally {
      setLoading(false);
      setIsVisible(true);
    }
  };

  return (
    <div className="container w-full mx-auto px-4 py-4 mt-[3rem]">
      {loading && <LoadingSpinner />}

      <Card className="overflow-visible">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Images */}
            <div className="w-full lg:w-1/2 p-10 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
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
                      href="/dowells/gland/dc/arm/dc_arm_med.pdf"
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
                    className={`flex-shrink-0 w-20 h-20 relative rounded-md overflow-visible ${
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
                  <h1 className="text-3xl font-bold mb-2">Dowell's Double Compression Armoured Medium Duty</h1>
                  <p className="text-gray-600"></p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pack">Suitable Overall Diameter (mm sq.) / CAT. No.</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("pack", value)
                      }
                    >
                      <SelectTrigger id="pack">
                        <SelectValue placeholder="Select Size" />
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
         <div className="prose p-10 w-full text-gray-700">
  <h2 className="text-xl font-semibold">DC Type Medium Duty Brass Cable Glands (For Armoured Cable)</h2>
  <p>
    DC Type Medium Duty Brass Cable Glands are manufactured from high-quality brass with a bright 
    nickel-plated finish for enhanced corrosion resistance and long-lasting durability. Designed 
    specifically for armoured cables, they provide reliable and secure cable termination in medium-duty applications.
  </p>

  <h3 className="font-semibold mt-4">Features:</h3>
  <ul className="list-disc pl-5 space-y-1">
    <li>Made from high-quality brass.</li>
    <li>Bright nickel-plated finish for superior corrosion resistance.</li>
    <li>Medium-duty design suitable for a variety of armoured cable installations.</li>
    <li>Provides secure and reliable cable termination.</li>
  </ul>
</div>
      </Card>
     

    </div>
  );
}
