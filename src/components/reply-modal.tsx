import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Order {
  order_id: number;
  sku?: any;
  cat_no?: any;
  quantity: number;
  product_price?: any;
}

type EnquiryStatus = "New" | "Opened" | "Fulfilled";

interface Enquiry {
  cart_id: number;
  cart_status: EnquiryStatus;
  user_name: string;
  user_email: string;
  user_phone: string;
  orders: Order[];
}

export default function ReplyModal({
  enquiry,
  setEnquiries,
  onClose,
  isOpen,
}: {
  enquiry: Enquiry;
  setEnquiries: any;
  onClose: any;
  isOpen: boolean;
}) {
  const handleSendReply = (enquiry: any, replyMessage: string) => {
    const updatedEnquiries = enquiry.map((e) =>
      e.id === enquiry.id ? { ...e, status: "opened" } : e
    );
    setEnquiries(updatedEnquiries);
    console.log(`Reply sent to ${enquiry.email}: ${replyMessage}`);
    console.log("Updated items:", enquiry.items);
  };

  const handleInputChange = (field: string, value: any, index: number) => {
    setEnquiries((prevEnquiries: any) =>
      prevEnquiries.map((e: any) =>
        e.id === enquiry.id
          ? {
              ...e,
              items: e.items.map((item: any, i: number) =>
                i === index ? { ...item, [field]: value } : item
              ),
            }
          : e
      )
    );
  };

  // useEffect(() => {
  //   console.log(enquiry);
  // }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[840px] max-h-[80vh] overflow-y-auto mx-[1rem]">
        <DialogHeader>
          <DialogTitle>Enquiry Details</DialogTitle>
          <DialogDescription>
            Enquiry from {enquiry.user_name}
          </DialogDescription>
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
            <ScrollArea className=" w-full rounded-md border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enquiry.orders.map((item: Order, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          type="text"
                          value={item?.cat_no || item?.sku}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value, index)
                          }
                          placeholder="Enter item name"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.product_price || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "rate",
                              parseFloat(e.target.value),
                              index
                            )
                          }
                          placeholder="Enter rate"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={""}
                          onChange={(e) =>
                            handleInputChange(
                              "discount",
                              parseFloat(e.target.value),
                              index
                            )
                          }
                          placeholder="Discount"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        {item?.product_price
                          ? (
                              (item?.product_price - 0) * //(item.discount || 0))
                              item.quantity
                            ).toFixed(2)
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <div className="mt-2 text-right font-medium">
              Total: $
              {enquiry.orders
                .reduce(
                  (sum: number, item: any) =>
                    sum +
                    ((item.rate || 0) - (item.discount || 0)) * item.quantity,
                  0
                )
                .toFixed(2)}
            </div>
          </div>
          <div>
            <Label className="font-medium">Delivery</Label>
            <Input
              type="text"
              placeholder="Enter delivery details"
              className="w-full"
            />
          </div>
          <div>
            <Label className="font-medium">Payment</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="after_performa">
                  100% after Performa Invoice
                </SelectItem>
                <SelectItem value="within_7_days">Within 7 days</SelectItem>
                <SelectItem value="25_against_performa">
                  25% against Performa
                </SelectItem>
                <SelectItem value="within_30_days">
                  100% within 30 days
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-medium">Validity</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select validity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7_days">7 Days</SelectItem>
                <SelectItem value="10_days">10 Days</SelectItem>
                <SelectItem value="15_days">15 Days</SelectItem>
                <SelectItem value="2_days">2 Days</SelectItem>
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => handleSendReply(enquiry, "Sample reply message")}
          >
            Send Reply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
