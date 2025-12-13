import { Metadata } from 'next'
import Link from 'next/link'
import { Truck, Clock, Package, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shipping Policy – Water Wise Group',
  description: 'Water Wise Group shipping information. We ship to all 50 US states via FedEx Home Delivery. Orders processed within 2 business days.',
  alternates: {
    canonical: 'https://waterwisegroup.com/shipping'
  }
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Shipping Policy
            </h1>
            <p className="text-xl text-gray-600">
              Fast, reliable shipping on all greywater systems
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Key Info Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">USA Only</h3>
                <p className="text-sm text-gray-600">We ship to all 50 states</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">2 Business Days</h3>
                <p className="text-sm text-gray-600">Order processing time</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">FedEx Home</h3>
                <p className="text-sm text-gray-600">Reliable carrier</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">2-6 Days</h3>
                <p className="text-sm text-gray-600">Typical delivery time</p>
              </div>
            </div>

            {/* Policy Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shipping Information</h2>
              <p className="text-gray-700 mb-6">
                We currently only ship to the USA. All orders are processed within 2 business days and are
                typically shipped FedEx Home Delivery which takes 2-6 days for delivery.
              </p>

              <p className="text-gray-700 mb-6">
                If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                Please allow additional days in transit for delivery. If there will be a significant delay
                in shipment of your order, we will contact you via email or telephone.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shipping From</h2>
              <p className="text-gray-700 mb-6">
                All orders ship from our warehouse in Southern California, ensuring fast delivery to
                West Coast customers and reasonable transit times nationwide.
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8">
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">Order Tracking</h3>
                <p className="text-emerald-800">
                  Once your order ships, you will receive a confirmation email with tracking information.
                  You can track your package directly through FedEx.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Questions?</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about shipping, please don't hesitate to contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Water Wise Group</strong><br />
                  Email: <a href="mailto:sales@waterwisegroup.com" className="text-emerald-600 hover:underline">sales@waterwisegroup.com</a><br />
                  Phone: <a href="tel:+16788093008" className="text-emerald-600 hover:underline">(678) 809-3008</a><br />
                  Location: Atlanta, GA 30068
                </p>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/returns" className="text-emerald-600 hover:underline">
                  Returns & Refunds
                </Link>
                <Link href="/privacy" className="text-emerald-600 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-emerald-600 hover:underline">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
