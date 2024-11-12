'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, ShoppingCart, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CartItem {
  id: string
  quantity: number
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: ''
  })
  const [savedFormData, setSavedFormData] = useState({
    name: '',
    email: '',
    number: ''
  })

  useEffect(() => {
    const key = "3mItems"
    const storedItems = localStorage.getItem(key)
    const itemsArray = storedItems ? JSON.parse(storedItems) : []
    setCartItems(itemsArray.map((id: string) => ({ id, quantity: 1 })))

    const storedFormData = localStorage.getItem('contactInfo')
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      setSavedFormData(parsedFormData)
      setFormData(parsedFormData)
    } else {
      setIsFormOpen(true)
    }
  }, [])

  const handleBack = () => {
    console.log('Back button clicked')
  }

  const handleGetQuote = () => {
    console.log('Get a Quote clicked', savedFormData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setSavedFormData(formData)
    localStorage.setItem('contactInfo', JSON.stringify(formData))
    setIsFormOpen(false)
  }

  const handleCancel = () => {
    setFormData(savedFormData)
    setIsFormOpen(false)
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    )
  }

  return (
    <div className="flex justify-between items-center pr-2">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-3 px-[0.35rem] py-[0.1rem] text-[0.8rem]"
            >
              {cartItems.length}
            </Badge>
            <span className="sr-only">Open cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-auto">
              <h2 className='py-[1rem] font-semibold text-[1.2rem]'>Cart</h2>
              <div className="mb-4 bg-muted rounded-md">
                <Button
                  variant="ghost"
                  className="w-full justify-between py-[2rem]"
                  onClick={() => setIsFormOpen(!isFormOpen)}
                >
                  {savedFormData.name ? (
                    <div className="text-left">
                      <div>{savedFormData.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {savedFormData.email} • {savedFormData.number}
                      </div>
                    </div>
                  ) : (
                    "Contact Information"
                  )}
                  {isFormOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                {isFormOpen && (
                  <div className="space-y-4 mt-4 px-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Number</Label>
                      <Input
                        id="number"
                        name="number"
                        type="tel"
                        value={formData.number}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pb-[0.5rem]">
                      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      <Button onClick={handleSave}>Save</Button>
                    </div>
                  </div>
                )}
              </div>
              {cartItems.length > 0 ? (
                <ul className="space-y-2">
                  {cartItems.map((item, index) => (
                    <li key={index} className="p-2 rounded-md flex justify-between items-center">
                      <p>{item.id}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center">No items in cart</p>
              )}
            </div>
            {cartItems.length > 0 && (
              <Button onClick={handleGetQuote} className="mt-4 w-full">
                Get a Quote
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}