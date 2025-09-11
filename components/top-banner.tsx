import { Mail } from "lucide-react"

export function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-200 via-teal-200 to-green-200 text-gray-800 py-2 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm font-medium flex items-center justify-center gap-2">
          <Mail className="h-4 w-4" />
          <span>Questions? Email us at <a href="mailto:sales@waterwisegroup.com" className="underline hover:no-underline">sales@waterwisegroup.com</a></span>
        </p>
      </div>
    </div>
  )
}