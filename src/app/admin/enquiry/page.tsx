"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc, SortDesc } from "lucide-react";
import DashboardLayout from "../dashboardLayout";

type EnquiryStatus = "new" | "opened" | "fulfilled";

interface EnquiryItem {
  name: string;
  quantity: number;
  rate?: number;
}

interface Enquiry {
  id: string;
  status: EnquiryStatus;
  name: string;
  email: string;
  phone: string;
  datetime: string;
  items: EnquiryItem[];
  message: string;
}

const mockEnquiries: Enquiry[] = [
  {
    id: "1",
    status: "new",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    datetime: "2023-05-15 14:30",
    items: [
      { name: "Wireless Earbuds", quantity: 100 },
      { name: "Power Bank", quantity: 50 },
    ],
    message: "I would like to know the price for a bulk order of these items.",
  },
  {
    id: "2",
    status: "opened",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    datetime: "2023-05-14 10:15",
    items: [
      { name: "Smart Watch", quantity: 10 },
      { name: "Fitness Tracker", quantity: 20 },
    ],
    message: "Are these devices compatible with iOS?",
  },
  {
    id: "3",
    status: "fulfilled",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "456-789-0123",
    datetime: "2023-05-13 09:45",
    items: [
      { name: "Bluetooth Speaker", quantity: 5 },
      { name: "Wireless Headphones", quantity: 3 },
    ],
    message: "What is the battery life of these audio devices?",
  },
];

const statusColors: Record<EnquiryStatus, string> = {
  new: "bg-blue-100",
  opened: "bg-yellow-100",
  fulfilled: "bg-green-100",
};

export default function EnhancedEnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Enquiry;
    direction: "asc" | "desc";
  } | null>(null);

  const handleReply = (enquiry: Enquiry) => {
    // Handle reply logic here
  };

  const handleSendReply = (enquiry: Enquiry, replyMessage: string) => {
    const updatedEnquiries = enquiries.map((e) =>
      e.id === enquiry.id ? { ...e, status: "opened" } : e
    );
    setEnquiries(updatedEnquiries);
    // Here you would typically send the reply to a backend API
    console.log(`Reply sent to ${enquiry.email}: ${replyMessage}`);
    console.log("Updated items:", enquiry.items);
  };

  const handleRateChange = (
    enquiryId: string,
    itemIndex: number,
    rate: number
  ) => {
    setEnquiries((prevEnquiries) =>
      prevEnquiries.map((enquiry) =>
        enquiry.id === enquiryId
          ? {
              ...enquiry,
              items: enquiry.items.map((item, index) =>
                index === itemIndex ? { ...item, rate } : item
              ),
            }
          : enquiry
      )
    );
  };

  const handleStatusChange = (enquiryId: string, newStatus: EnquiryStatus) => {
    setEnquiries((prevEnquiries) =>
      prevEnquiries.map((enquiry) =>
        enquiry.id === enquiryId ? { ...enquiry, status: newStatus } : enquiry
      )
    );
  };

  const handleSort = (key: keyof Enquiry) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig?.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const filteredAndSortedEnquiries = useMemo(() => {
    let result = enquiries.filter(
      (enquiry) =>
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [enquiries, searchTerm, sortConfig]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Enquiries</h1>
        <div className="mb-4 flex items-center space-x-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <Button
            onClick={() => handleSort("datetime")}
            variant="outline"
            className="whitespace-nowrap"
          >
            Sort by Date
            {sortConfig?.key === "datetime" &&
              (sortConfig.direction === "asc" ? (
                <SortAsc className="ml-2" size={16} />
              ) : (
                <SortDesc className="ml-2" size={16} />
              ))}
          </Button>
          <Button
            onClick={() => handleSort("status")}
            variant="outline"
            className="whitespace-nowrap"
          >
            Sort by Status
            {sortConfig?.key === "status" &&
              (sortConfig.direction === "asc" ? (
                <SortAsc className="ml-2" size={16} />
              ) : (
                <SortDesc className="ml-2" size={16} />
              ))}
          </Button>
        </div>
        <div className="rounded-md border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedEnquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>{enquiry.name}</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-5">
                      {enquiry.items.map((item, index) => (
                        <li key={index}>
                          {item.name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{enquiry.datetime}</TableCell>
                  <TableCell>
                    <Select
                      value={enquiry.status}
                      onValueChange={(value: EnquiryStatus) =>
                        handleStatusChange(enquiry.id, value)
                      }
                    >
                      <SelectTrigger
                        className={`w-[120px] ${statusColors[enquiry.status]}`}
                      >
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new" className={statusColors.new}>
                          New
                        </SelectItem>
                        <SelectItem
                          value="opened"
                          className={statusColors.opened}
                        >
                          Opened
                        </SelectItem>
                        <SelectItem
                          value="fulfilled"
                          className={statusColors.fulfilled}
                        >
                          Fulfilled
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => handleReply(enquiry)}
                        >
                          Reply
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Enquiry Details</DialogTitle>
                          <DialogDescription>
                            Enquiry from {enquiry.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-3 gap-4 text-sm bg-muted p-4 rounded-md">
                            <div>
                              <Label className="font-medium">Name</Label>
                              <p>{enquiry.name}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Email</Label>
                              <p>{enquiry.email}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Phone</Label>
                              <p>{enquiry.phone}</p>
                            </div>
                          </div>
                          <div className="bg-muted p-4 rounded-md">
                            <Label htmlFor="message" className="font-medium">
                              Message
                            </Label>
                            <p className="mt-1">{enquiry.message}</p>
                          </div>
                          <div>
                            <Label className="font-medium">Items</Label>
                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
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
                                          value={item.rate || ""}
                                          onChange={(e) =>
                                            handleRateChange(
                                              enquiry.id,
                                              index,
                                              parseFloat(e.target.value)
                                            )
                                          }
                                          placeholder="Enter rate"
                                          className="w-24"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {item.rate
                                          ? (item.rate * item.quantity).toFixed(
                                              2
                                            )
                                          : "-"}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </ScrollArea>
                            <div className="mt-2 text-right font-medium">
                              Total: $
                              {enquiry.items
                                .reduce(
                                  (sum, item) =>
                                    sum + (item.rate || 0) * item.quantity,
                                  0
                                )
                                .toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="reply" className="font-medium">
                              Reply
                            </Label>
                            <Textarea
                              id="reply"
                              className="h-20"
                              placeholder="Type your reply here..."
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={() =>
                              handleSendReply(enquiry, "Sample reply message")
                            }
                          >
                            Send Reply
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
