"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Phone Card */}
        <Card className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-md shadow-sm">
          <div className="w-12 h-12 flex items-center justify-center mb-3">
            <Phone className="w-8 h-8 text-[#5C1E1E]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 uppercase ">
            Phone
          </h3>
          <p className="text-[#5C1E1E] font-semibold text-center">+91 (033) 2237 9239</p>
        </Card>

        {/* Email Card */}
        <Card className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-md shadow-sm">
          <div className="w-12 h-12 flex items-center justify-center mb-3">
            <Mail className="w-8 h-8 text-[#5C1E1E]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 uppercase">
            Email
          </h3>
          <p className="text-[#5C1E1E] font-semibold text-center">enquiry@shethtrading.com</p>
        </Card>

        {/* Address Card */}
        <Card className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-md shadow-sm">
          <div className="w-12 h-12 flex items-center justify-center mb-3">
            <MapPin className="w-8 h-8 text-[#5C1E1E]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 uppercase">
            Address
          </h3>
          <p className="text-[#5C1E1E] font-semibold text-center">
            22, Shop Number 322, Rabindra Sarani, Tiretti, Kolkata, West Bengal
            700073
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="lg:col-span-1 rounded-md overflow-hidden h-full">
          <div className="h-[400px] bg-gray-200 rounded-md relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.574975745773!2d88.35208735909036!3d22.574430510297205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277afeb317383%3A0x958583b1cdbfc4f6!2sSheth%20Trading%20Corporation!5e0!3m2!1sen!2sin!4v1740851333959!5m2!1sen!2sin"
              width="800"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#9e3b11] rounded-md p-6 text-white">
          <h2 className="text-2xl font-medium mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white text-gray-800"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="bg-white text-gray-800"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white text-gray-800"
              />
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="bg-white text-gray-800"
              />
            </div>
            <Textarea
              name="message"
              placeholder="Write message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="bg-white text-gray-800"
            />
            <Button
              type="submit"
              className="bg-[#5C1E1E] text-white hover:bg-brown-900 transition-colors"
            >
              SEND A MESSAGE
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
