"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "HOME", href: "/", active: true },
  { name: "ABOUT US", href: "/about" },
  { name: "PRODUCTS", href: "/products" },
  { name: "PRICELIST & BROCHURE", href: "/pricelist" },
  { name: "CONTACT US", href: "/contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className=" bg-black bg-opacity-30 absolute z-50 w-[100%] text-white">
      <div className="container mx-auto px-4 max-w-[76rem]">
        <div className="flex items-center justify-between py-4 lg:hidden">
          <span className="font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} space-y-4 lg:block lg:space-y-0 `}>
          <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`block py-2 text-sm font-semibold transition-colors hover:text-primary
                    ${item.active ? "text-amber-900" : "text-white"}`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

