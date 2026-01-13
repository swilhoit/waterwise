import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo-water-wise-group.png"
              alt="Water Wise Group"
              width={150}
              height={40}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-gray-300 mb-4">
              Exclusive U.S. distributor of Aqua2use Greywater Systems since 2010.
            </p>
            <p className="text-sm text-gray-400 mb-4 italic">
              Collect. Filter. Flourish.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/waterwisegroup" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/waterwisegreywater/" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.youtube.com/user/WaterWiseGroup" className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/aqua2use" className="text-gray-300 hover:text-white text-sm">
                  Aqua2use Systems
                </Link>
              </li>
              <li>
                <Link href="/products/replacement-filters" className="text-gray-300 hover:text-white text-sm">
                  Replacement Filters
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white text-sm">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions/residential" className="text-gray-300 hover:text-white text-sm">
                  Residential Homes
                </Link>
              </li>
              <li>
                <Link href="/solutions/tiny-homes" className="text-gray-300 hover:text-white text-sm">
                  Tiny Homes
                </Link>
              </li>
              <li>
                <Link href="/solutions/rvs" className="text-gray-300 hover:text-white text-sm">
                  RVs & Trailers
                </Link>
              </li>
              <li>
                <Link href="/solutions/laundry-to-landscape" className="text-gray-300 hover:text-white text-sm">
                  Laundry-to-Landscape
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/what-is-greywater" className="text-gray-300 hover:text-white text-sm">
                  What is Greywater?
                </Link>
              </li>
              <li>
                <Link href="/blog/greywater-benefits" className="text-gray-300 hover:text-white text-sm">
                  Greywater Benefits
                </Link>
              </li>
              <li>
                <Link href="/customer-stories" className="text-gray-300 hover:text-white text-sm">
                  Customer Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
            </ul>

            {/* Popular Locations */}
            <h3 className="font-semibold text-lg mt-6 mb-3">Water Laws by State</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ca" className="text-gray-300 hover:text-white text-sm">
                  California
                </Link>
              </li>
              <li>
                <Link href="/tx" className="text-gray-300 hover:text-white text-sm">
                  Texas
                </Link>
              </li>
              <li>
                <Link href="/az" className="text-gray-300 hover:text-white text-sm">
                  Arizona
                </Link>
              </li>
              <li>
                <Link href="/co" className="text-gray-300 hover:text-white text-sm">
                  Colorado
                </Link>
              </li>
              <li>
                <Link href="/or" className="text-gray-300 hover:text-white text-sm">
                  Oregon
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-gray-400" />
                <Link href="tel:+16788093008" className="text-sm text-gray-300 hover:text-white">
                  (678) 809-3008
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-gray-400" />
                <Link href="mailto:sales@waterwisegroup.com" className="text-sm text-gray-300 hover:text-white">
                  sales@waterwisegroup.com
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                <span className="text-sm text-gray-300">
                  Atlanta, GA 30068
                </span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <Link href="/about" className="text-gray-300 hover:text-white text-sm block mb-2">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white text-sm block">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()}, Water Wise Group
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shipping" className="text-sm text-gray-400 hover:text-white">
                Shipping Policy
              </Link>
              <Link href="/returns" className="text-sm text-gray-400 hover:text-white">
                Refund Policy
              </Link>
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
