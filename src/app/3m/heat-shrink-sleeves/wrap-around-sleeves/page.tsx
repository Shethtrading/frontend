'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LoadingSpinner from '@/components/loader'
import Navigation from '@/components/navigation'

export default function Component() {
  const [formData, setFormData] = useState({
    size: '',
    quantity: 1
  })

  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(false)

  const productImages = [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ]

  const sizeOptions = ['2mm', '4mm', '8mm', '10mm']

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', formData)
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
            <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Wrap Around Sleeves</h1>
                  <p className="text-gray-600">High-quality cable for various applications</p>
                </div>
                
                <div className="space-y-4">
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
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}