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
import { Download } from "lucide-react";
import { useVisibility } from "@/app/provider";

export default function Component() {
  const { toast } = useToast();
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
  const { setIsVisible } = useVisibility();

  const productImages = [
    "/3m/HEAT_SHRINK_JOINTING_KIT/Indoor_Heat_Shrinking_Kit.png",
    "/3m/HEAT_SHRINK_JOINTING_KIT/Outdoor Heat Shrinking Kit.png",
    "/3m/HEAT_SHRINK_JOINTING_KIT/img2.png",
    "/3m/HEAT_SHRINK_JOINTING_KIT/img3.png",
    "/3m/HEAT_SHRINK_JOINTING_KIT/img4.jpg",
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
  const allCoreOptions = ["1 Core", "2 Core", "3 Core", "3.5 Core", "4 Core"];
  const sizeOptions = [
    "6",
    "10",
    "16",
    "25",
    "35",
    "50",
    "70",
    "95",
    "120",
    "150",
    "185",
    "240",
    "300",
    "400",
    "500",
    "630",
    "800",
    "1000",
  ];
  const cableTypeOptions = ["XLPE", "PVC", "EPR", "Aerial Bunched Cable (ABC)"];

  // useEffect(() => {
  //   updateAvailableOptions();
  // }, [formData.cableType, formData.voltage]);

  // const updateAvailableOptions = () => {
  //   let voltages: string[] = [];
  //   let cores: string[] = [];
  //   let terminations: string[] = [];

  //   if (formData.cableType === "XLPE/PVC") {
  //     voltages = allVoltageOptions.filter(
  //       (v) => v === "1.1KV(E)" || !v.includes("UE")
  //     );
  //     terminations = ["indoor", "outdoor", "straight-through"];
  //     if (formData.voltage === "1.1KV(E)") {
  //       cores = allCoreOptions;
  //     } else {
  //       cores = ["1 core", "3 core"];
  //     }
  //   } else if (formData.cableType === "Aerial Bunched Cable (ABC)") {
  //     voltages = [
  //       "6.6KV(UE)/11KV(E)",
  //       "11KV(UE)/22KV(E)",
  //       "22KV(E)",
  //       "33KV(E)",
  //       "33KV(UE)",
  //     ];
  //     cores = ["1 core"];
  //     terminations = ["outdoor", "straight-through"];
  //   } else if (formData.cableType === "EPR") {
  //     voltages = allVoltageOptions;
  //     cores = allCoreOptions;
  //     terminations = ["indoor", "outdoor", "straight-through"];
  //   } else {
  //     voltages = allVoltageOptions;
  //     cores = allCoreOptions;
  //     terminations = ["indoor", "outdoor", "straight-through"];
  //   }

  //   setAvailableVoltages(voltages);
  //   setAvailableCores(cores);
  //   setAvailableTerminations(terminations);

  //   // Reset voltage, core, and termination if they're not in the new available options
  //   if (!voltages.includes(formData.voltage)) {
  //     setFormData((prev) => ({ ...prev, voltage: "" }));
  //   }
  //   if (!cores.includes(formData.core)) {
  //     setFormData((prev) => ({ ...prev, core: "" }));
  //   }
  //   if (!terminations.includes(formData.termination)) {
  //     setFormData((prev) => ({ ...prev, termination: "" }));
  //   }
  // };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddToCart = () => {
    setLoading(true);
    // Convert the form data to match the expected types
    const terminationType =
      formData.termination.toLowerCase() === "Straight-Through Joint"
        ? "Straight-Through Joint"
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
    const name = `3M HEAT SHRINK ${formData.cableType} ${formData.termination} FOR ${formData.voltage} ${formData.core} ${formData.size} ${formData.material} CABLE`;

    updatingCart(sku, formData.quantity, name, terminationType, formData);
  };

  const updatingCart = async (
    sku: string,
    quantity: any,
    name: string,
    terminationType: string,
    formData: any
  ) => {
    try {
      setIsVisible(false);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
        {
          technology: "HeatShrink",
          type: terminationType,
          voltage: formData.voltage,
          core: formData.core, // Removed .toUpperCase()
          size: formData.size, // Removed .replace()
          cabletype: formData.cableType,
          conductor: formData.material, // Removed .toUpperCase() here as well
          sku: sku,
          quantity: quantity,
          name: name,
        }
      );

      if (res?.data?.id) {
        const key = "3mItems";
        updateLocalStorageArray(key, res.data.id);
      }

      toast({
        description: "Added to Cart Successfully",
      });
      window.location.reload()

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsVisible(true);
    }
  };

  return (
    <div className="container w-full mx-auto mt-[3rem] bg-gray-300">
      {loading && <LoadingSpinner />}

      <Card className="overflow-visible">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Image + Thumbnails + Description */}
            <div className="p-10 space-y-8">
              {/* Main product image */}
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-lg overflow-visible bg-white shadow">
                <Image
                  src={productImages[selectedImage]}
                  alt={`Product Image ${selectedImage + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />

                {/* Tech Sheet button */}
                <div className="absolute bottom-4 right-4">
                  <a
                    href="/3m/HEAT_SHRINK_JOINTING_KIT/STC_HS.pdf"
                    download
                    className="flex items-center gap-2 px-3 py-2 bg-white/90 border rounded-md shadow hover:bg-gray-100 text-sm font-medium transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Tech Sheet
                  </a>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex flex-wrap gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-md overflow-visible border ${selectedImage === index
                      ? "ring-2 ring-primary"
                      : "hover:border-gray-400"
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

            {/* Right side - Configurator */}
            <div className="p-6 space-y-6">
              {/* Title + marketing blurb */}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cableType">Cable Type</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("cableType", value)}
                  >
                    <SelectTrigger id="cableType">
                      <SelectValue placeholder="Select Cable Type" />
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
                  <Label htmlFor="termination">Technology</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("termination", value)}
                  >
                    <SelectTrigger id="termination">
                      <SelectValue placeholder="Select Technology" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Indoor Termination",
                        "Outdoor Termination",
                        "Straight-Through Joint",
                      ].map((option) => (
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
                    onValueChange={(value) => handleInputChange("voltage", value)}
                  >
                    <SelectTrigger id="voltage">
                      <SelectValue placeholder="Select Voltage" />
                    </SelectTrigger>
                    <SelectContent>
                      {allVoltageOptions.map((option) => (
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
                  >
                    <SelectTrigger id="core">
                      <SelectValue placeholder="Select Core" />
                    </SelectTrigger>
                    <SelectContent>
                      {allCoreOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Size (sqmm)</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("size", value)}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select Size" />
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
                    onValueChange={(value) => handleInputChange("material", value)}
                  >
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Select Material" />
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

              <Button className="w-full" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
        <div className="prose p-10 w-full text-gray-700">
          <div>
            <h1 className="text-3xl font-bold mb-2">HEAT SHRINK JOINTING KIT</h1>
            <p className="text-gray-600 text-base leading-relaxed">
              When it comes to 3M Cable Jointing Kits, the name Sheth Trading
              Corporation stands as a benchmark in Eastern India. For over three
              decades, we have been the largest distributor, supplier, and stockist
              of 3M cable jointing kits, trusted by contractors, EPC companies,
              OEMs, and government utilities alike. Our unmatched availability,
              expertise, and service have made us the go-to source for authentic 3M
              kits across projects of all scales. You can trust SHETH TRADING
              CORPORATION for best pricing compared to any other distributor. Our
              range includes Kits for - 1.1KV,11KV(E/UE),22KV(E),33(E,UE)

            </p>

          </div>

          <h2 className="text-xl font-semibold mt-4">Product Description</h2>
          <p>
            3M Heat Shrink Low, Medium and High voltage Terminations and
            Straight Through Joints are available for tape/wire shielded,
            armoured/unarmoured single core and three core HT polymeric cables
            and Three and a half/Four core for LT polymeric cables. 3M Heat
            Shrinkable terminations utilize a unique high dielectric constant
            (High K) stress control tube and mastic for effective grading of
            electrical stresses. The non tracking heat shrinkable insulating
            outer tube is optimally designed for reliable environmental
            protection.
          </p>

          <h3 className="font-semibold mt-4">Features:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Available for 1-core and 3-core polymeric cables.</li>
            <li>Provides excellent environmental protection and moisture sealing.</li>
            <li>Wide conductor size ranges up to 1000 mm²</li>
            <li>Suitable for crimped & shear bolt connectors</li>
            <li>BIL of 350 KVp</li>
            <li>Installation support and training</li>
          </ul>

          <h3 className="font-semibold mt-4">Advantages:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Complete portfolio from 1.1 kV to 66 kV</li>
            <li>
              Application flexibility – wide range of cable sizes & constructions
            </li>
            <li>Covers inline and crossbond splicing applications</li>
            <li>Strong technical support</li>
          </ul>

          <h3 className="font-semibold mt-4">Certifications:</h3>
          <p>Type tested according to IEC 60840</p>
        </div>
      </Card>

    </div>

  );
}
