import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image
              src="/images/logo-water-wise-group.png"
              alt="Water Wise Group"
              width={150}
              height={40}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-gray-300 mb-4">
              Wholesale distributor of greywater systems. Start reusing laundry, shower, and bath water to irrigate your yard every day.
            </p>
            <p className="text-sm text-gray-400 mb-4 italic">
              Collect. Filter. Flourish.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/waterwisegroup" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.youtube.com/user/WaterWiseGroup" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white text-sm">
                  Greywater Pumps
                </Link>
              </li>
              <li>
                <Link href="/solutions/tiny-homes" className="text-gray-300 hover:text-white text-sm">
                  Greywater System for Tiny Homes
                </Link>
              </li>
              <li>
                <Link href="/solutions/rvs" className="text-gray-300 hover:text-white text-sm">
                  Greywater System for RVs
                </Link>
              </li>
              <li>
                <Link href="/solutions/residential" className="text-gray-300 hover:text-white text-sm">
                  Greywater System for Homes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-gray-300 hover:text-white text-sm">
                  Greywater Directory
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white text-sm">
                  Blog & Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-300">(678) 809-3008</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-300">sales@waterwisegroup.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-300">
                  Marietta, GA 30068
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025, Water Wise Group
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                Privacy policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms of service
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                Contact information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}