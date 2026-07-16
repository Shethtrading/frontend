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
import { useVisibility } from "@/app/provider";

export default function Component() {
  const [formData, setFormData] = useState({
    pack: "",
    quantity: 1,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const {setIsVisible} = useVisibility();

  const productImages = ["/Glands and Crimping Tools/Double Compression Armoured.png"];

  const packOptions = [
    { label: "6.0-12.0 / DBF-01SS", value: "DBF-01SS" },
    { label: "12.0-16.5 / DBF-01S", value: "DBF-01S" },
    { label: "16.5-18.5 / DBF-01", value: "DBF-01" },
    { label: "16.5-18.5 / DBF-01A", value: "DBF-01A" },
    { label: "18.5-20.0 / DBF-02", value: "DBF-02" },
    { label: "18.5-20.0 / DBF-02A", value: "DBF-02A" },
    { label: "20.0-23.0 / DBF-03", value: "DBF-03" },
    { label: "23.0-26.0 / DBF-04", value: "DBF-04" },
    { label: "23.0-26.0 / DBF-04A", value: "DBF-04A" },
    { label: "26.0-30.0 / DBF-05", value: "DBF-05" },
    { label: "26.0-30.0 / DBF-05A", value: "DBF-05A" },
    { label: "30.0-33.0 / DBF-06", value: "DBF-06" },
    { label: "30.0-33.0 / DBF-06A", value: "DBF-06A" },
    { label: "33.0-37.0 / DBF-07", value: "DBF-07" },
    { label: "37.0-41.0 / DBF-08", value: "DBF-08" },
    { label: "41.0-46.0 / DBF-09", value: "DBF-09" },
    { label: "46.0-52.0 / DBF-10", value: "DBF-10" },
    { label: "46.0-52.0 / DBF-010A", value: "DBF-010A" },
    { label: "52.0-54.0 / DBF-011A", value: "DBF-011A" },
    { label: "54.0-61.0 / DBF-011", value: "DBF-011" },
    { label: "61.0-66.0 / DBF-012", value: "DBF-012" },
    { label: "66.0-72.0 / DBF-013A", value: "DBF-013A" },
    { label: "72.0-78.0 / DBF-013", value: "DBF-013" },
    { label: "78.0-84.0 / DBF-014", value: "DBF-014" },
    { label: "84.0-94.0 / DBF-015", value: "DBF-015" },
    { label: "94.0-104.0 / DBF-016", value: "DBF-016" },
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
      const name = `Dowell's Glands Double-Compression For Armoured Flame Proof ${formData.pack}`;

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
                      href="/dowells/gland/dc/arm/dc_arm_flame_weather.pdf"
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
                  <h1 className="text-3xl font-bold mb-2">Dowell's Double Compression Armoured Flame Proof</h1>
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
  <h2 className="text-xl font-semibold">Double Compression Brass Cable Gland (For Armoured Cable)</h2>
  <p>
    Double Compression Brass Cable Glands are manufactured from high-quality brass with a bright 
    nickel-plated finish for enhanced corrosion resistance and durability. Designed for armoured cables, 
    these glands provide secure and reliable cable termination.
  </p>

  <h3 className="font-semibold mt-4">Features:</h3>
  <ul className="list-disc pl-5 space-y-1">
    <li>Made from high-quality brass.</li>
    <li>Bright nickel-plated finish for corrosion resistance.</li>
    <li>Double compression design ensures secure cable termination.</li>
    <li>Ideal for use with armoured cables in industrial and commercial installations.</li>
  </ul>
</div>
      </Card>
      

    </div>
  );
}
