"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Define the enquiry type
type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  lastupdated: number;
  status?: "new" | "opened";
};

export default function EnquiriesPage() {
  // Sample data from the API
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:8282/api/v1/getcontact"
        );

        if (response.data.success) {
          // Map the API response to include status field if not present
          const enquiriesWithStatus = response.data.result.map(
            (item: Enquiry) => ({
              ...item,
              status: item.status || "new",
            })
          );
          setEnquiries(enquiriesWithStatus);
        } else {
          setError("Failed to fetch enquiries");
        }
      } catch (err) {
        console.error("Error fetching enquiries:", err);
        setError("An error occurred while fetching enquiries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const { toast } = useToast();
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Handle status change
  const handleStatusChange = (id: number, value: "new" | "opened") => {
    setEnquiries(
      enquiries.map((enquiry) =>
        enquiry.id === id ? { ...enquiry, status: value } : enquiry
      )
    );
  };

  // Open reply modal
  const openReplyModal = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsReplyModalOpen(true);
  };

  // Handle reply submission
  const handleReplySubmit = () => {
    if (!selectedEnquiry) return;

    // Dummy API call
    console.log("Sending reply to:", selectedEnquiry.email);
    console.log("Reply message:", replyMessage);

    // Show success toast
    toast({
      title: "Reply Sent",
      description: `Your reply to ${selectedEnquiry.name} has been sent successfully.`,
    });

    // Close modal and reset form
    setIsReplyModalOpen(false);
    setReplyMessage("");
    setSelectedEnquiry(null);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Enquiries</h1>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!isLoading && !error && enquiries.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No enquiries found</p>
        </div>
      )}

      {!isLoading && !error && enquiries.length > 0 && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">Message</TableHead>
                <TableHead className="hidden md:table-cell">
                  Last Updated
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="font-medium">{enquiry.name}</TableCell>
                  <TableCell>{enquiry.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {enquiry.phone}
                  </TableCell>
                  <TableCell>{enquiry.subject}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {enquiry.body}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {enquiry?.lastupdated || "0 days ago"}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={enquiry.status}
                      onValueChange={(value: "new" | "opened") =>
                        handleStatusChange(enquiry.id, value)
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="opened">Opened</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReplyModal(enquiry)}
                    >
                      Reply
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Reply Modal */}
      <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reply to Enquiry</DialogTitle>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs">
                    Name
                  </Label>
                  <div id="name" className="text-sm mt-1">
                    {selectedEnquiry.name}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <div id="email" className="text-sm mt-1">
                    {selectedEnquiry.email}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-xs">
                  Subject
                </Label>
                <div id="subject" className="text-sm mt-1">
                  Re: {selectedEnquiry.subject}
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-xs">
                  Body
                </Label>
                <div id="subject" className="text-sm mt-1 bg-slate-200 rounded-md px-2 py-1">
                  {selectedEnquiry.body}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply">Your Reply</Label>
                <Textarea
                  id="reply"
                  placeholder="Type your reply here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReplyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleReplySubmit} disabled={!replyMessage.trim()}>
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
