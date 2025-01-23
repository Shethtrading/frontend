import type React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

interface Order {
  order_id: string
  sku?: string
  cat_no?: string
  quantity: number
  product_price?: number
}

type EnquiryStatus = "New" | "Opened" | "Fulfilled"

interface Enquiry {
  cart_id: number
  cart_status: EnquiryStatus
  user_name: string
  user_email: string
  user_phone: string
  orders: Order[]
}

interface ReplyModalProps {
  enquiry: Enquiry
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>
  onClose: () => void
  isOpen: boolean
}

export default function ReplyModal({ enquiry, setEnquiries, onClose, isOpen }: ReplyModalProps) {
  const [formState, setFormState] = useState({
    details: {
      Payment: "",
      Validity: "",
      Reply: "",
    },
    items: enquiry.orders.map((order) => ({
      cart_id: enquiry.cart_id,
      order_id: order.order_id,
      rate: order.product_price || 0,
      discount: 0,
      delivery: "",
    })),
  })

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      items: enquiry.orders.map((order, index) => ({
        ...prevState.items[index],
        cart_id: enquiry.cart_id,
        order_id: order.order_id,
        rate: order.product_price || 0,
      })),
    }))
  }, [enquiry])

  const handleInputChange = (field: string, value: string | number, index?: number) => {
    if (index !== undefined) {
      setFormState((prevState) => ({
        ...prevState,
        items: prevState.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
      }))
    } else {
      setFormState((prevState) => ({
        ...prevState,
        details: { ...prevState.details, [field]: value },
      }))
    }
  }

  const handleSendReply = async () => {
    console.log("API body:", formState)
    // Here you would typically send the formState to your API
    try {
      const res = await axios.post("http://localhost:8282/api/v1/quotation", formState)
      toast({
        title: "Reply sent Successfully"
      })
      onClose()

    } catch (error) {
      console.error("Error sending reply:", error)
      
    }
    
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[840px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enquiry Details</DialogTitle>
          <DialogDescription>Enquiry from {enquiry.user_name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4 text-sm bg-muted p-4 rounded-md">
            <div>
              <Label className="font-medium">Name</Label>
              <p>{enquiry.user_name}</p>
            </div>
            <div>
              <Label className="font-medium">Email</Label>
              <p>{enquiry.user_email}</p>
            </div>
            <div>
              <Label className="font-medium">Phone</Label>
              <p>{enquiry.user_phone}</p>
            </div>
          </div>
          <div>
            <Label className="font-medium">Items</Label>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enquiry.orders.map((item: Order, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{item.sku || item.cat_no}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={formState.items[index].rate || ""}
                          onChange={(e) => handleInputChange("rate", Number.parseFloat(e.target.value), index)}
                          placeholder="Enter rate"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={formState.items[index].discount || ""}
                          onChange={(e) => handleInputChange("discount", Number.parseFloat(e.target.value), index)}
                          placeholder="Discount"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          value={formState.items[index].delivery || ""}
                          onChange={(e) => handleInputChange("delivery", e.target.value, index)}
                          placeholder="Delivery"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        {formState.items[index].rate
                          ? ((formState.items[index].rate * item.quantity ) * (( 100 - formState.items[index].discount) / 100 ) ).toFixed(2)
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <div className="mt-2 text-right font-medium">
              Total: $
              {formState.items
                .reduce(
                  (sum, item) =>
                    sum +
                    (item.rate - item.discount) * enquiry.orders.find((o) => o.order_id === item.order_id)!.quantity,
                  0,
                )
                .toFixed(2)}
            </div>
          </div>
          <div>
            <Label className="font-medium">Payment</Label>
            <Select value={formState.details.Payment} onValueChange={(value) => handleInputChange("Payment", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="after_performa">100% after Performa Invoice</SelectItem>
                <SelectItem value="within_7_days">Within 7 days</SelectItem>
                <SelectItem value="25_against_performa">25% against Performa</SelectItem>
                <SelectItem value="within_30_days">100% within 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-medium">Validity</Label>
            <Select value={formState.details.Validity} onValueChange={(value) => handleInputChange("Validity", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select validity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7_days">7 Days</SelectItem>
                <SelectItem value="10_days">10 Days</SelectItem>
                <SelectItem value="14_days">14 Days</SelectItem>
                <SelectItem value="15_days">15 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="reply" className="font-medium">
              Reply
            </Label>
            <Textarea
              id="reply"
              className="h-20"
              placeholder="Type your reply here..."
              value={formState.details.Reply}
              onChange={(e) => handleInputChange("Reply", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSendReply}>
            Send Reply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

