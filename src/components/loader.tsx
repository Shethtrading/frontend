'use client'

import { Loader2 } from 'lucide-react'

export default function LoadingSpinner() {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[0.1rem]">
      <div className="rounded-[0.5rem] bg-white p-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  )
}