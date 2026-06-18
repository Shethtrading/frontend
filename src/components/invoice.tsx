"use client";
import { ChevronDown, FileText } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  order_id: string;
  sku: string | null;
  cat_no: string;
  quantity: number;
  product_price: string;
}

interface CartData {
  cart_id: number;
  cart_status: string;
  cart_last_update: string;
  hs: string | null;
  dow: string | null;
  m3: string | null;
  user_name: string;
  user_email: string;
  user_phone: string;
  orders: Order[];
}

interface InvoiceDropdownProps {
  cartData: CartData;
}

export default function InvoiceDropdown({ cartData }: InvoiceDropdownProps) {
  const { hs, dow, m3 } = cartData;

  // Check if any invoices are available
  const hasInvoices = hs !== null || dow !== null || m3 !== null;

  // Create an array of available invoices
  const availableInvoices = [
    { name: "Heat Shrink", url: hs },
    { name: "Dowells", url: dow },
    { name: "3M", url: m3 },
  ].filter((invoice) => invoice.url !== null);

  return (
    <>
      {hasInvoices ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <span className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Invoices
              </span>
              <ChevronDown className="w-4 h-4 ml-2 opacity-70" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            {hasInvoices ? (
              availableInvoices.map((invoice, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link
                    href={invoice.url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    {invoice.name}
                  </Link>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>-</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <p>-</p>
      )}
    </>
  );
}
