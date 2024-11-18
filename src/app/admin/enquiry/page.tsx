'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type EnquiryStatus = 'new' | 'ongoing' | 'closed'

interface EnquiryItem {
  name: string
  quantity: number
  rate?: number
}

interface ChatMessage {
  sender: 'admin' | 'customer'
  message: string
  timestamp: string
}

interface Enquiry {
  id: string
  status: EnquiryStatus
  name: string
  email: string
  phone: string
  datetime: string
  items: EnquiryItem[]
  message: string
  chatHistory: ChatMessage[]
}

const mockEnquiries: Enquiry[] = [
  {
    id: '1',
    status: 'new',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    datetime: '2023-05-15 14:30',
    items: [
      { name: 'Wireless Earbuds', quantity: 100 },
      { name: 'Power Bank', quantity: 50 },
    ],
    message: 'I would like to know the price for a bulk order of these items.',
    chatHistory: []
  },
  {
    id: '2',
    status: 'ongoing',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    datetime: '2023-05-14 10:15',
    items: [
      { name: 'Smart Watch', quantity: 10 },
      { name: 'Fitness Tracker', quantity: 20 },
    ],
    message: 'Are these devices compatible with iOS?',
    chatHistory: [
      { sender: 'customer', message: 'Are these devices compatible with iOS?', timestamp: '2023-05-14 10:15' },
      { sender: 'admin', message: 'Yes, all our devices are compatible with iOS. Here's a quote for your order.', timestamp: '2023-05-14 11:30' },
      { sender: 'customer', message: 'Thanks for the quote. Can you offer any discount for bulk purchase?', timestamp: '2023-05-14 13:45' },
    ]
  },
  {
    id: '3',
    status: 'closed',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '456-789-0123',
    datetime: '2023-05-13 09:45',
    items: [
      { name: 'Bluetooth Speaker', quantity: 5 },
      { name: 'Wireless Headphones', quantity: 3 },
    ],
    message: 'What is the battery life of these audio devices?',
    chatHistory: [
      { sender: 'customer', message: 'What is the battery life of these audio devices?', timestamp: '2023-05-13 09:45' },
      { sender: 'admin', message: 'The Bluetooth Speaker has a battery life of 20 hours, and the Wireless Headphones last for 30 hours on a single charge.', timestamp: '2023-05-13 10:30' },
      { sender: 'customer', message: 'Great, thank you for the information. I'd like to proceed with the purchase.', timestamp: '2023-05-13 11:15' },
      { sender: 'admin', message: 'Excellent! I've processed your order. Here's your invoice and tracking information.', timestamp: '2023-05-13 12:00' },
    ]
  },
]

export default function AdvancedEnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries)
  const [activeTab, setActiveTab] = useState<EnquiryStatus>('new')
  const [replyTo, setReplyTo] = useState<Enquiry | null>(null)

  const filteredEnquiries = enquiries.filter(enquiry => enquiry.status === activeTab)

  const handleReply = (enquiry: Enquiry) => {
    setReplyTo(enquiry)
  }

  const handleSendReply = (enquiry: Enquiry, replyMessage: string) => {
    const updatedEnquiries = enquiries.map(e => 
      e.id === enquiry.id 
        ? { 
            ...e, 
            status: e.status === 'new' ? 'ongoing' : e.status,
            chatHistory: [
              ...e.chatHistory,
              { sender: 'admin', message: replyMessage, timestamp: new Date().toLocaleString() }
            ]
          } 
        : e
    )
    setEnquiries(updatedEnquiries)
    setReplyTo(null)
    // Here you would typically send the reply to a backend API
    console.log(`Reply sent to ${enquiry.email}: ${replyMessage}`)
    console.log('Updated items:', enquiry.items)
  }

  const handleRateChange = (enquiryId: string, itemIndex: number, rate: number) => {
    setEnquiries(prevEnquiries => 
      prevEnquiries.map(enquiry => 
        enquiry.id === enquiryId
          ? {
              ...enquiry,
              items: enquiry.items.map((item, index) => 
                index === itemIndex ? { ...item, rate } : item
              )
            }
          : enquiry
      )
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enquiries</h1>
      <Tabs defaultValue="new" className="w-full" onValueChange={(value) => setActiveTab(value as EnquiryStatus)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        {['new', 'ongoing', 'closed'].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell>{enquiry.name}</TableCell>
                      <TableCell>
                        <ul className="list-disc pl-5">
                          {enquiry.items.map((item, index) => (
                            <li key={index}>{item.name} (x{item.quantity})</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>{enquiry.datetime}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => handleReply(enquiry)}>
                              {enquiry.status === 'new' ? 'Reply' : 'View'}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>{enquiry.status === 'new' ? 'Reply to Enquiry' : 'Enquiry Details'}</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-full pr-4">
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <Label htmlFor="name" className="font-medium">Name</Label>
                                    <Input id="name" value={enquiry.name} readOnly />
                                  </div>
                                  <div>
                                    <Label htmlFor="email" className="font-medium">Email</Label>
                                    <Input id="email" value={enquiry.email} readOnly />
                                  </div>
                                  <div>
                                    <Label htmlFor="phone" className="font-medium">Phone</Label>
                                    <Input id="phone" value={enquiry.phone} readOnly />
                                  </div>
                                </div>
                                <div>
                                  <Label className="font-medium">Items</Label>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Rate</TableHead>
                                        <TableHead>Total</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {enquiry.items.map((item, index) => (
                                        <TableRow key={index}>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>{item.quantity}</TableCell>
                                          <TableCell>
                                            <Input
                                              type="number"
                                              value={item.rate || ''}
                                              onChange={(e) => handleRateChange(enquiry.id, index, parseFloat(e.target.value))}
                                              placeholder="Enter rate"
                                              className="w-24"
                                            />
                                          </TableCell>
                                          <TableCell>
                                            {item.rate ? (item.rate * item.quantity).toFixed(2) : '-'}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                  <div className="mt-2 text-right font-medium">
                                    Total: $
                                    {enquiry.items.reduce((sum, item) => sum + (item.rate || 0) * item.quantity, 0).toFixed(2)}
                                  </div>
                                </div>
                                <div>
                                  <Label className="font-medium">Chat History</Label>
                                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                    {enquiry.chatHistory.map((chat, index) => (
                                      <div key={index} className={`flex items-start mb-4 ${chat.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex ${chat.sender === 'admin' ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
                                          <Avatar className="w-8 h-8">
                                            <AvatarImage src={chat.sender === 'admin' ? "/admin-avatar.png" : "/customer-avatar.png"} />
                                            <AvatarFallback>{chat.sender === 'admin' ? 'A' : 'C'}</AvatarFallback>
                                          </Avatar>
                                          <div className={`mx-2 p-2 rounded-lg ${chat.sender === 'admin' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                            <p className="text-sm">{chat.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{chat.timestamp}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </ScrollArea>
                                </div>
                                <div>
                                  <Label htmlFor="reply" className="font-medium">Reply</Label>
                                  <Textarea id="reply" className="h-20" placeholder="Type your reply here..." />
                                </div>
                                <Button 
                                  type="submit" 
                                  onClick={() => handleSendReply(enquiry, (document.getElementById('reply') as HTMLTextAreaElement).value)}
                                >
                                  Send Reply
                                </Button>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}