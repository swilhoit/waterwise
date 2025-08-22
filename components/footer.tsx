import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
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
              Leading provider of greywater recycling systems for homes, RVs, and sustainable developments.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/aqua2use-gwdd" className="text-gray-300 hover:text-white text-sm">
                  Aqua2use GWDD
                </Link>
              </li>
              <li>
                <Link href="/products/aqua2use-pro" className="text-gray-300 hover:text-white text-sm">
                  Aqua2use Pro
                </Link>
              </li>
              <li>
                <Link href="/products/filters" className="text-gray-300 hover:text-white text-sm">
                  Replacement Filters
                </Link>
              </li>
              <li>
                <Link href="/products/pumps" className="text-gray-300 hover:text-white text-sm">
                  Replacement Pumps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/customer-stories" className="text-gray-300 hover:text-white text-sm">
                  Customer Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-300">1-800-XXX-XXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-300">info@waterwisegroup.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-300">
                  California, USA
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Water Wise Group. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}