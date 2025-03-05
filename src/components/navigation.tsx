"use client";

import { useRouter } from "next/navigation";
import Cart from "./cart";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function Navigation() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex justify-between items-center pr-2">
      <Button variant="ghost" className="mb-4" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="hidden sm:block">Back</span>
      </Button>
      <Cart />
    </div>
  );
}
