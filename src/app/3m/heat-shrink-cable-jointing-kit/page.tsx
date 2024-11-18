"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
import {
  CableType,
  ConductorType,
  CoreType,
  SizeType,
  TerminationType,
  VoltageType,
} from "./skuTypes";
import { generateSku } from "./skuGenerator";
import Navigation from "@/components/navigation";
import axios from "axios";
import { updateLocalStorageArray } from "@/utils/localstorage";
import LoadingSpinner from "@/components/loader";
import { useToast } from "@/hooks/use-toast";

export default function Component() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    cableType: "",
    termination: "",
    voltage: "",
    core: "",
    size: "",
    material: "",
    quantity: 1,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [availableVoltages, setAvailableVoltages] = useState<string[]>([]);
  const [availableCores, setAvailableCores] = useState<string[]>([]);
  const [availableTerminations, setAvailableTerminations] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const productImages = [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ];

  const allVoltageOptions = [
    "1.1KV(E)",
    "6.6KV(UE)/11KV(E)",
    "11KV(UE)/22KV(E)",
    "22KV(E)",
    "33KV(E)",
    "33KV(UE)",
    "66KV(E)",
  ];
  const allCoreOptions = ["1 core", "2 core", "3 core", "4 core"];
  const sizeOptions = [
    "6mm",
    "10mm",
    "16mm",
    "25mm",
    "35mm",
    "50mm",
    "70mm",
    "95mm",
    "120mm",
    "150mm",
    "185mm",
    "240mm",
    "300mm",
    "400mm",
    "500mm",
    "630mm",
    "800mm",
    "1000mm",
  ];
  const cableTypeOptions = ["XLPE/PVC", "EPR", "Aerial Bunched Cable (ABC)"];

  useEffect(() => {
    updateAvailableOptions();
  }, [formData.cableType, formData.voltage]);

  const updateAvailableOptions = () => {
    let voltages: string[] = [];
    let cores: string[] = [];
    let terminations: string[] = [];

    if (formData.cableType === "XLPE/PVC") {
      voltages = allVoltageOptions.filter(
        (v) => v === "1.1KV(E)" || !v.includes("UE")
      );
      terminations = ["indoor", "outdoor", "straight-through"];
      if (formData.voltage === "1.1KV(E)") {
        cores = allCoreOptions;
      } else {
        cores = ["1 core", "3 core"];
      }
    } else if (formData.cableType === "Aerial Bunched Cable (ABC)") {
      voltages = [
        "6.6KV(UE)/11KV(E)",
        "11KV(UE)/22KV(E)",
        "22KV(E)",
        "33KV(E)",
        "33KV(UE)",
      ];
      cores = ["1 core"];
      terminations = ["outdoor", "straight-through"];
    } else if (formData.cableType === "EPR") {
      voltages = allVoltageOptions;
      cores = allCoreOptions;
      terminations = ["indoor", "outdoor", "straight-through"];
    } else {
      voltages = allVoltageOptions;
      cores = allCoreOptions;
      terminations = ["indoor", "outdoor", "straight-through"];
    }

    setAvailableVoltages(voltages);
    setAvailableCores(cores);
    setAvailableTerminations(terminations);

    // Reset voltage, core, and termination if they're not in the new available options
    if (!voltages.includes(formData.voltage)) {
      setFormData((prev) => ({ ...prev, voltage: "" }));
    }
    if (!cores.includes(formData.core)) {
      setFormData((prev) => ({ ...prev, core: "" }));
    }
    if (!terminations.includes(formData.termination)) {
      setFormData((prev) => ({ ...prev, termination: "" }));
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddToCart = () => {
    setLoading(true);
    // Convert the form data to match the expected types
    const terminationType =
      formData.termination.toLowerCase() === "straight-through"
        ? "Straight through"
        : ((formData.termination.charAt(0).toUpperCase() +
            formData.termination.slice(1)) as TerminationType);

    const coreType = formData.core.toUpperCase() as CoreType;
    const sizeType = formData.size.replace("sqmm", "mm") as SizeType;
    const conductorType = formData.material.toUpperCase() as ConductorType;

    const sku = generateSku(
      "Heat Shrink",
      terminationType,
      formData.voltage as VoltageType,
      coreType,
      sizeType,
      formData.cableType as CableType,
      conductorType
    );

    console.log("Generated SKU:", sku);
    console.log("Form Data:", formData);

    updatingCart(sku, formData.quantity);
  };

  const updatingCart = async (sku: string, quantity: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
        { sku: sku, quantity: quantity }
      );

      if (res?.data?.id) {
        const key = "3mItems";
        updateLocalStorageArray(key, res.data.id);
      }
      
      toast({
        description: "Added to Cart Successfully",
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {loading && <LoadingSpinner />}
      {!loading && <Navigation /> }
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
            <div className="w-full lg:w-1/2 p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Cable Product</h1>
                <p className="text-gray-600">
                  High-quality cable for various applications
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cableType">Cable Type</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("cableType", value)
                    }
                  >
                    <SelectTrigger id="cableType">
                      <SelectValue placeholder="Select cable type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cableTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="termination">Termination</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("termination", value)
                    }
                    disabled={!formData.cableType}
                  >
                    <SelectTrigger id="termination">
                      <SelectValue placeholder="Select termination" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTerminations.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="voltage">Voltage</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("voltage", value)
                    }
                    disabled={!formData.cableType}
                  >
                    <SelectTrigger id="voltage">
                      <SelectValue placeholder="Select voltage" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoltages.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="core">Core</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("core", value)}
                    disabled={!formData.cableType || !formData.voltage}
                  >
                    <SelectTrigger id="core">
                      <SelectValue placeholder="Select core" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCores.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("size", value)}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="material">Material</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("material", value)
                    }
                  >
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALUMINIUM">Aluminium</SelectItem>
                      <SelectItem value="COPPER">Copper</SelectItem>
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
                    onChange={(e) =>
                      handleInputChange(
                        "quantity",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <Button className="w-full" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
