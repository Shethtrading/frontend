import { MapPin } from "lucide-react"

export default function TopBar() {
  return (
    <div className=" px-4 py-2 text-white bg-[#5C1E1E]">
      <div className="container mx-auto flex items-center text-sm max-w-[76rem]">
        <MapPin className="mr-2 h-4 w-4" />
        <p>22, Rabindra Sarani, Shop No. 322 Ground Floor, Kolkata 7000 073</p>
      </div>
    </div>
  )
}

