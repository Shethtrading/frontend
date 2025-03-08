"use client";

import { useState, useMemo, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc, SortDesc } from "lucide-react";
import ReplyModal from "@/components/reply-modal";
import axios from "axios";

type EnquiryStatus = "new" | "opened" | "fulfilled";

interface Order {
  order_id: number;
  sku?: any;
  cat_no?: any;
  quantity: number;
  product_price?: any;
}

interface Enquiry {
  cart_id: number;
  cart_status: EnquiryStatus;
  user_name: string;
  user_email: string;
  user_phone: string;
  orders: Order[];
}

const statusColors: Record<any, string> = {
  new: "bg-blue-100",
  opened: "bg-yellow-100",
  fulfilled: "bg-green-100",
};

export default function EnhancedEnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Enquiry;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<{
    id: number | null;
    isOpen: boolean;
  }>({
    id: null,
    isOpen: false,
  });

  const handleReply = (enquiry: any) => {
    setSelectedEnquiry({ id: enquiry.cart_id, isOpen: true });
    console.log("Replying to:", enquiry.user_name);
  };

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get("http://localhost:8282/api/v1/getEnquiries");

      console.log("Enquiries fetched:", res);
      setEnquiries(res.data.response); // Adjusted to handle the new structure
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = (cartId: any, newStatus: EnquiryStatus) => {
    setEnquiries((prevEnquiries) =>
      prevEnquiries.map((enquiry) =>
        enquiry.cart_id === cartId
          ? { ...enquiry, cart_status: newStatus }
          : enquiry
      )
    );
  };

  const filteredAndSortedEnquiries = useMemo(() => {
    let result = enquiries.filter(
      (enquiry) =>
        enquiry.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.user_email.toLowerCase().includes(searchTerm.toLowerCase())
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

  useEffect(() => {
    console.log(selectedEnquiry);
  }, [selectedEnquiry]);

  return (
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
            <Button variant="outline" className="whitespace-nowrap">
              Sort by Date
            </Button>
            <Button variant="outline" className="whitespace-nowrap">
              Sort by Status
            </Button>
          </div>
          <div className="rounded-md border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.cart_id}>
                    <TableCell>{enquiry.user_name}</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5">
                        {enquiry.orders.map((order, index) => (
                          <li key={index}>
                            {order.cat_no || order.sku} (x{order.quantity})
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{enquiry.user_phone}</TableCell>
                    <TableCell>
                      <Select
                        value={enquiry.cart_status?.toLowerCase()}
                        onValueChange={(value: EnquiryStatus) =>
                          handleStatusChange(enquiry.cart_id, value)
                        }
                      >
                        <SelectTrigger
                          className={`w-[120px] ${
                            statusColors[enquiry.cart_status?.toLowerCase()]
                          }`}
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
                      <Button
                        variant="outline"
                        onClick={() => handleReply(enquiry)}
                      >
                        Reply
                      </Button>
                      {selectedEnquiry.isOpen && (
                        <ReplyModal
                          enquiry={enquiries.find(
                            (e) => e.cart_id === selectedEnquiry.id
                          )}
                          onClose={() =>
                            setSelectedEnquiry({ id: null, isOpen: false })
                          }
                          setEnquiries={setEnquiries}
                          isOpen={selectedEnquiry.isOpen}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
  );
}
