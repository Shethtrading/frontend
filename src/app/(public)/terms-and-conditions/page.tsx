import Header from "@/components/header";
import TopBar from "@/components/top-bar";
import React from "react";
import Navigation from "@/components/nav";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <main>
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Navigation />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/terms.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative mx-auto px-4 py-20 max-w-[76rem] mt-[4rem]">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Terms and Conditions
            </h1>
            <nav className="flex items-center text-white text-sm mt-[1rem]">
              <Link
                href="/"
                className="flex items-center justify-center hover:text-gray-300 transition-colors"
              >
                <Home size={24} className="mr-1 font-bold" fontWeight={300} />
                <span className="font-semibold text-[1.1rem]">HOME</span>
              </Link>
              <span className="mx-2 text-gray-400">›</span>
              <span className="text-gray-300 font-medium">TERMS AND CONDITION</span>
            </nav>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-8 border-b border-gray-200 bg-gray-50">
              <h1 className="text-3xl font-bold text-center text-gray-900">
                Company Policy
              </h1>
            </div>

            <div className="px-6 py-8">
              <p className="font-medium text-gray-700 mb-8">
                Welcome to Sheth Trading Corporation, your trusted partner and
                authorized dealer for 3M and Dowell's products. To ensure a
                seamless and transparent experience, we have outlined our key
                policies below:
              </p>

              <div className="space-y-8">
                {[
                  {
                    title: "1. Payment and Shipping Policy",
                    content:
                      "At Sheth Trading Corporation, our policy is straightforward: Payment First, Shipment Next. Once your payment is confirmed, we promptly process and ship your order. This policy ensures smooth transactions and timely delivery of your purchases.",
                  },
                  {
                    title: "2. Offer Validity",
                    content:
                      "All offers extended by Sheth Trading Corporation are valid for 7 days from the date of issuance. To secure the pricing and terms mentioned in our offer, please place your order within this timeframe. After 7 days, the offer may be subject to revision or cancellation.",
                  },
                  {
                    title: "3. Shipping Policy",
                    content:
                      "We proudly offer Pan India Shipping. Shipping charges are calculated based on the delivery location, size, and weight of the order. These charges are added to your final invoice at checkout. We partner with reputable logistics providers to ensure that your order reaches you safely and promptly. Please note that shipping to certain remote areas may require additional time and cost.",
                  },
                  {
                    title: "4. Delivery Policy",
                    content:
                      "The Estimated Lead Time for delivery is provided based on the timelines communicated to us by the respective manufacturers. While we strive to meet these timelines, please be aware that delays can occur due to factors beyond our control, such as production delays or logistical challenges from the manufacturer's end. Sheth Trading Corporation will not be held responsible for any delays caused by these external factors.",
                  },
                  {
                    title: "5. Goods and Services Tax (GST)",
                    content:
                      "All applicable Goods and Services Tax (GST) charges are extra and will be clearly mentioned in your offer. GST rates are in accordance with government regulations and are non-negotiable.",
                  },
                  {
                    title: "6. Invoice and Billing Details",
                    content:
                      "To facilitate smooth processing of your order, we request you to clearly mention the details on which the invoice will be generated during the checkout process. This ensures that your invoice is accurate and meets all your requirements.",
                  },
                  {
                    title: "7. Order Confirmation",
                    content:
                      "Once an order is placed, an Order Confirmation will be sent to your registered email address. This confirmation will include details of the products ordered, payment received, and an estimated shipping date. Please review this information carefully and notify us immediately if there are any discrepancies.",
                  },
                  {
                    title: "8. Cancellation and Refund Policy",
                    content:
                      "Order Cancellations can be requested before the shipment is processed. If an order is canceled after it has been shipped, shipping charges will not be refunded. Refunds, if applicable, will be processed within 7-10 business days from the date of approval. Please note that customized orders or special orders may not be eligible for cancellation or refund.",
                  },
                  {
                    title: "9. Product Warranty and Returns",
                    content:
                      "All products sold by Sheth Trading Corporation are covered under the manufacturer's warranty. If you receive a defective product, please contact us within 7 days of delivery to initiate a return or exchange. Returned products must be in their original packaging, unused, and in the same condition as received. The return shipping cost may be borne by the customer unless the return is due to a defect.",
                  },
                  {
                    title: "10. Privacy Policy",
                    content:
                      "Sheth Trading Corporation is committed to protecting your privacy. We only collect essential information required to process your order and ensure a smooth transaction. We do not share your personal information with third parties without your consent, except as required by law or to fulfill your order.",
                  },
                  {
                    title: "11. Compliance with Laws",
                    content:
                      "All transactions with Sheth Trading Corporation are subject to applicable laws and regulations. By placing an order, you agree to comply with all relevant laws, including those related to import/export, taxation, and product usage. We reserve the right to cancel orders that do not comply with these regulations.",
                  },
                ].map((item, index) => (
                  <section
                    key={index}
                    className="pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-600">{item.content}</p>
                  </section>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Last updated: 2025 | Sheth Trading Corporation
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
