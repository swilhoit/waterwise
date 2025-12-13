import { Metadata } from 'next'
import Link from 'next/link'
import { RotateCcw, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Returns & Refund Policy – Water Wise Group',
  description: '30-day return policy on all Water Wise Group products. Learn about our hassle-free return process and refund procedures.',
  alternates: {
    canonical: 'https://waterwisegroup.com/returns'
  }
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Returns & Refund Policy
            </h1>
            <p className="text-xl text-gray-600">
              30-day hassle-free returns on all products
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Key Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">30 Days</h3>
                <p className="text-sm text-gray-600">Return window after receipt</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Easy Process</h3>
                <p className="text-sm text-gray-600">Contact us to start</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">10 Business Days</h3>
                <p className="text-sm text-gray-600">Refund processing time</p>
              </div>
            </div>

            {/* Policy Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Return Eligibility</h2>
              <p className="text-gray-700 mb-6">
                We have a 30-day return policy, which means you have 30 days after receiving your item
                to request a return.
              </p>

              <p className="text-gray-700 mb-4">
                To be eligible for a return, your item must be in the same condition that you received it:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Unworn or unused</li>
                <li>With tags attached (if applicable)</li>
                <li>In its original packaging</li>
                <li>With receipt or proof of purchase</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Start a Return</h2>
              <p className="text-gray-700 mb-6">
                To start a return, contact us at{' '}
                <a href="mailto:sales@waterwisegroup.com" className="text-emerald-600 hover:underline">
                  sales@waterwisegroup.com
                </a>.
                Once your return is approved, we'll provide you with shipping instructions.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">Important</h3>
                    <p className="text-amber-800">
                      Items sent back to us without first requesting a return will not be accepted.
                      Please contact us before shipping any items back.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Return Shipping Address</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700">
                  <strong>Water Wise Group</strong><br />
                  1725 Rosecrans Ave<br />
                  Gardena, CA 90249
                </p>
              </div>
              <p className="text-gray-700 mb-6">
                Customers are responsible for all return shipping costs.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Damages and Issues</h2>
              <p className="text-gray-700 mb-6">
                Please inspect your order upon receipt. If you receive a defective, damaged, or incorrect item,
                contact us immediately at{' '}
                <a href="mailto:sales@waterwisegroup.com" className="text-emerald-600 hover:underline">
                  sales@waterwisegroup.com
                </a>{' '}
                so we can evaluate the issue and make it right.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Refunds</h2>
              <p className="text-gray-700 mb-6">
                Once we receive and inspect your return, we will notify you whether your refund has been
                approved or denied. If approved, you'll be automatically refunded on your original payment
                method within 10 business days.
              </p>
              <p className="text-gray-700 mb-6">
                Please remember it can take some time for your bank or credit card company to process
                and post the refund. If more than 15 business days have passed since we approved your return,
                please contact us at{' '}
                <a href="mailto:sales@waterwisegroup.com" className="text-emerald-600 hover:underline">
                  sales@waterwisegroup.com
                </a>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Questions?</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about returns or refunds, please contact us:
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
                <Link href="/shipping" className="text-emerald-600 hover:underline">
                  Shipping Policy
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
