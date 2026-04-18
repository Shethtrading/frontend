import type React from "react";
import { useState, useEffect } from "react";
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
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface Order {
  order_id: string;
  sku?: string;
  cat_no?: string;
  quantity: number;
  product_price?: number;
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

interface ReplyModalProps {
  enquiry: Enquiry;
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>;
  onClose: () => void;
  isOpen: boolean;
}

export default function ReplyModal({
  enquiry,
  setEnquiries,
  onClose,
  isOpen,
}: ReplyModalProps) {
  const [formState, setFormState] = useState({
    details: {
      Payment: "",
      Validity: "",
      Reply: "",
      Delivery_Charges: 0,
    },
    items: enquiry.orders.map((order) => ({
      cart_id: enquiry.cart_id,
      order_id: order.order_id,
      rate: order.product_price ?? 0,
      discount: 0,
      delivery: 0,
    })),
  });
  const [loading, setLoading] = useState(false);
  const [changedItem, setChangedItem] = useState("");

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      items: enquiry.orders.map((order, index) => ({
        ...prevState.items[index],
        cart_id: enquiry.cart_id,
        order_id: order.order_id,
        rate: order.product_price ?? 0,
      })),
    }));
  }, [enquiry]);

  const [editableRows, setEditableRows] = useState<boolean[]>(
    enquiry.orders.map(() => false)
  );

  const toggleEditable = (index: number) => {
    console.log("1", index);
    setEditableRows((prev) =>
      prev.map((editable, i) => (i === index ? !editable : editable))
    );
  };

  const handleInputChange = (
    field: string,
    value: string | number,
    index?: number
  ) => {
    if (index !== undefined) {
      setFormState((prevState) => ({
        ...prevState,
        items: prevState.items.map((item, i) => {
          if (i === index) {
            if (
              (field === "rate" || field === "discount" || field === "delivery") &&
              (value === "" || isNaN(Number(value)))
            ) {
              return { ...item, [field]: 0 };
            }
            return { ...item, [field]: value };
          }
          return item;
        }),
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        details: { ...prevState.details, [field]: value },
      }));
    }
  };

  const handleItemChange = async () => {
    if (changedItem == "") return;

    const editableIndex = editableRows.findIndex((val) => val === true);

    const result = formState.items[editableIndex];

    //console.log(editableIndex, "here", result);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/discard`,
        {
          order_id: result.order_id,
          cart_id: result.cart_id,
          edit: changedItem,
        }
      );

      console.log("res", res.status);

      if (res.status == 200) {
        console.log("1");
        toast({
          title: "Item updated successfully",
        });

        // Update local state to reflect the changes
        // setFormState((prevState) => ({
        //   ...prevState,
        //   items: prevState.items.map((item, i) =>
        //     i === index ? updatedItem : item
        //   ),
        // }));

        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast({
        title: "Failed to update item",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendReply = async () => {
    console.log("API body:", formState);
    // Here you would typically send the formState to your API
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/quotation`,
        formState
      );
      toast({
        title: "Reply sent Successfully",
      });
      onClose();
    } catch (error: any) {
      console.error("Error sending reply:", error);
      toast({
        title: "Failed to send quotation",
        description:
          error?.response?.data?.message || "Please check rate, discount, and delivery values.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[840px] max-h-[80vh] overflow-y-auto">
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
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
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
                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (editableRows[index]) {
                              handleItemChange();
                            } else {
                              toggleEditable(index);
                              setChangedItem(item.sku ?? item.cat_no ?? "");
                            }
                          }}
                        >
                          {editableRows[index] ? "Save" : "Edit"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {item.sku ?? item.cat_no ?? ""}
                        {editableRows[index] && (
                          <div>
                            <Input
                              type="text"
                              value={changedItem}
                              onChange={(e) => {
                                setChangedItem(e.target.value);
                              }}
                              placeholder="Item name"
                              className="w-32"
                            />
                          </div>
                        )}
                      </TableCell>

                      <TableCell>{item.quantity}</TableCell>

                      <TableCell>
                        <Input
                          type="number"
                          value={formState.items[index].rate ?? 0}
                          onChange={(e) =>
                            handleInputChange(
                              "rate",
                              Number.parseFloat(e.target.value),
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
                          value={formState.items[index].discount || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "discount",
                              Number.parseFloat(e.target.value),
                              index
                            )
                          }
                          placeholder="Discount"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={formState.items[index].delivery ?? 0}
                          onChange={(e) =>
                            handleInputChange(
                              "delivery",
                              Number.parseFloat(e.target.value),
                              index
                            )
                          }
                          placeholder="Delivery"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        {formState.items[index].rate
                          ? (
                              formState.items[index].rate *
                              item.quantity *
                              ((100 - formState.items[index].discount) / 100)
                            ).toFixed(2)
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <div className="w-[40rem] ml-auto my-4 flex items-center justify-end gap-4">
              <Label
                htmlFor="delivery_charge"
                className="font-medium text-sm text-zinc-500 pl-1"
              >
                Delivery Charges
              </Label>
              <Input
                type="number"
                id="delivery_charge"
                className="max-w-[10rem]"
                placeholder="Enter Amount"
                value={formState.details.Delivery_Charges}
                onChange={(e) =>
                  handleInputChange("Delivery_Charges", e.target.value)
                }
              />
            </div>
            <div className="mt-2 text-right font-medium">
              Total: ₹
              {(
                formState.items.reduce((sum, item) => {
                  const order = enquiry.orders.find(
                    (o) => o.order_id === item.order_id
                  );
                  const quantity = order?.quantity ?? 0; // ✅ Fallback to 0 if undefined
                  return sum + (item.rate - item.discount) * quantity;
                }, 0) + Number(formState.details.Delivery_Charges || 0)
              ).toFixed(2)}
            </div>
          </div>
          <div>
            <Label className=" font-medium text-sm text-zinc-500 pl-1">
              Payment
            </Label>
            <Select
              value={formState.details.Payment}
              onValueChange={(value) => handleInputChange("Payment", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Immediate">Immediate</SelectItem>
                <SelectItem value="100% against Proforma Invoice">
                100% against Proforma Invoice
                </SelectItem>
                <SelectItem value="Within 7 days">Within 7 days</SelectItem>
                <SelectItem value="25% Advance balance against Proforma invoice">
                25% Advance balance against Proforma invoice 
                </SelectItem>
                <SelectItem value="100% Within 30 days from the date of invoice">
                100% Within 30 days from the date of invoice
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-medium text-sm text-zinc-500 pl-1">
              Validity
            </Label>
            <Select
              value={formState.details.Validity}
              onValueChange={(value) => handleInputChange("Validity", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select validity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2 Days">2 Days</SelectItem>
                <SelectItem value="7 Days">7 Days</SelectItem>
                <SelectItem value="15 Days">15 Days</SelectItem>
                <SelectItem value="130 Days">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="reply"
              className="font-medium text-sm text-zinc-500 pl-1"
            >
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
          <Button type="submit" onClick={handleSendReply} disabled={loading}>
            {loading ? "Loading..." : "Send Reply"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
