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
import Navigation from "@/components/navigation"
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

  const productImages = ["/Glands and Crimping Tools/Single Compression Unnarmoured Cable.png"];

  const packOptions = [
    { label: '3/8" / DGP10001', value: "DGP10001" },
    { label: '1/2" / DGP10002', value: "DGP10002" },
    { label: '5/8" / DGP10003', value: "DGP10003" },
    { label: '3/4" / DGP10004', value: "DGP10004" },
    { label: '7/8" / DGP10005', value: "DGP10005" },
    { label: '1" / DGP10006', value: "DGP10006" },
    { label: '1.1/8" / DGP10007', value: "DGP10007" },
    { label: '1.1/4" / DGP10008', value: "DGP10008" },
    { label: '1.3/8" / DGP10009', value: "DGP10009" },
    { label: '1.1/2" / DGP10010', value: "DGP10010" },
    { label: '1.3/4" / DGP10011', value: "DGP10011" },
    { label: '2" / DGP10012', value: "DGP10012" },
    { label: '2.1/4" / DGP10013', value: "DGP10013" },
    { label: '2.1/2" / DGP10014', value: "DGP10014" },
    { label: '2.3/4" / DGP10015', value: "DGP10015" },
    { label: '3" / DGP10016', value: "DGP10016" },
    { label: '3.1/4" / DGP10017', value: "DGP10017" },
    { label: '3.1/2" / DGP10018', value: "DGP10018" },
    { label: '4" / DGP10019', value: "DGP10019" },
    { label: '4.1/2" / DGP10020', value: "DGP10020" },
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
      const name = `Dowell's Glands For Single-Compression Unarmoured Cable ${formData.pack}`;

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
                      href="/dowells/gland/single/unarm/pdf.pdf"
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
                  <h1 className="text-3xl font-bold mb-2">Dowell's Single Compression Unarmoured Cable</h1>
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
  <h2 className="text-xl font-semibold">Single Compression Brass Cable Gland (For Un-Armoured Cable)</h2>
  <p>
    Single Compression Brass Cable Glands for un-armoured cables are manufactured from high-quality 
    brass with a bright nickel-plated finish for excellent corrosion resistance and durability. 
    These glands provide a secure and reliable termination for un-armoured cables in a variety of installations.
  </p>

  <h3 className="font-semibold mt-4">Features:</h3>
  <ul className="list-disc pl-5 space-y-1">
    <li>Made from high-quality brass.</li>
    <li>Bright nickel-plated finish for superior corrosion resistance.</li>
    <li>Single compression design ensures secure cable termination.</li>
    <li>Ideal for un-armoured cable installations in industrial and commercial settings.</li>
  </ul>
</div>
      </Card>
     
    </div>
  );
}
