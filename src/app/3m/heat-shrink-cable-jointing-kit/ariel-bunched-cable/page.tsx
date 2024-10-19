"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [formData, setFormData] = useState({
    termination: '',
    voltage: '',
    core: '',
    size: '',
    material: '',
    quantity: 1
  })

  const [selectedImage, setSelectedImage] = useState(0)

  const productImages = [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ]

  const voltageOptions = ['1.1KV(E)', '3.3KV', '6.6KV', '11KV', '22KV', '33KV']
  const coreOptions = ['1 core', '2 core', '3 core', '4 core']
  const sizeOptions = ['25 sqmm', '35 sqmm', '50 sqmm', '70 sqmm', '95 sqmm', '120 sqmm', '150 sqmm', '185 sqmm', '240 sqmm', '300 sqmm']

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', formData)
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
                      selectedImage === index ? 'ring-2 ring-primary' : ''
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
                <h1 className="text-3xl font-bold mb-2">Ariel Bunched Cable</h1>
                <p className="text-gray-600">High-quality cable jointing kit for various applications</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="termination">Termination</Label>
                  <Select onValueChange={(value) => handleInputChange('termination', value)}>
                    <SelectTrigger id="termination">
                      <SelectValue placeholder="Select termination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
                      <SelectItem value="straight-through">Straight Through</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="voltage">Voltage</Label>
                  <Select onValueChange={(value) => handleInputChange('voltage', value)}>
                    <SelectTrigger id="voltage">
                      <SelectValue placeholder="Select voltage" />
                    </SelectTrigger>
                    <SelectContent>
                      {voltageOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="core">Core</Label>
                  <Select onValueChange={(value) => handleInputChange('core', value)}>
                    <SelectTrigger id="core">
                      <SelectValue placeholder="Select core" />
                    </SelectTrigger>
                    <SelectContent>
                      {coreOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select onValueChange={(value) => handleInputChange('size', value)}>
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Select onValueChange={(value) => handleInputChange('material', value)}>
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aluminum">Aluminum</SelectItem>
                      <SelectItem value="copper">Copper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange('quantity', parseInt(value))}
                    defaultValue="1"
                  >
                    <SelectTrigger id="quantity">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}