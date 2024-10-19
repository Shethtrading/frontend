"use client"
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function Component() {
  const router = useRouter()

  const handleRedirect = (destination: string) => {
    // Simulating redirection
    console.log(`Redirecting to ${destination}`)
    // Uncomment the next line to actually redirect:
    router.push(`/${destination.toLowerCase()}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        <Card 
          className="flex-1 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleRedirect('3M')}
        >
          <CardContent className="flex items-center justify-center p-6">
            <h2 className="text-2xl font-bold">3M</h2>
          </CardContent>
        </Card>
        <Card 
          className="flex-1 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleRedirect('Dowells')}
        >
          <CardContent className="flex items-center justify-center p-6">
            <h2 className="text-2xl font-bold">Dowells</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}