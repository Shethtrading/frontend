import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b py-4 max-w-[76rem] mx-auto">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
        <div className="flex items-center flex-wrap">
          <Image
            src="/sheth_logo.png"
            alt="Sheth Trading Corporation Logo"
            width={200}
            height={60}
            className="h-auto w-48"
          />
          <Image src="/msme_logo.png" alt="Partner Logo 1" width={40} height={40} />
          <Image src="/gem_logo.png" alt="Partner Logo 2" width={40} height={40} />
          <Image src="/ireps_logo.png" alt="Partner Logo 3" width={40} height={40} />
        </div>



        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:enquiry@shethtrading.com" className="text-sm hover:underline">
              enquiry@shethtrading.com
            </a>
          </div>
          <Button variant="default" className="bg-[#5C1E1E] hover:bg-[#4A1818]">
            <Phone className="mr-2 h-4 w-4" />
            <span>+91 (033) 2237 9239</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

