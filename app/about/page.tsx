import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Droplets, Shield, Users, Award, Phone, Mail, MapPin } from 'lucide-react'
import { OrganizationSchema, LocalBusinessSchema } from '@/components/schema-markup'

export const metadata: Metadata = {
  title: 'About Us - Water Wise Group',
  description: 'Water Wise Group has been the exclusive U.S. distributor of Aqua2use Greywater Systems since 2010. Headquartered in Atlanta, Georgia, shipping nationwide.',
  alternates: {
    canonical: 'https://waterwisegroup.com/about'
  }
}

export default function About() {
  return (
    <div className="min-h-screen">
      <OrganizationSchema />
      <LocalBusinessSchema />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Water Wise Group – Greywater Systems Distributor
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Water Wise Group has been the exclusive U.S. distributor of Aqua2use Greywater Systems since 2010.
              We're headquartered in Atlanta, Georgia and ship nationwide from our California warehouse.
            </p>
          </div>
        </div>
      </section>

      {/* Meet The Owner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="w-48 h-48 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-5xl font-bold text-emerald-600">SW</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet The Owner</h2>
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Sam Wilhoit</strong>, owner of Water Wise Group, has been passionate about water conservation for over a decade.
                </p>
                <blockquote className="border-l-4 border-emerald-500 pl-6 italic text-gray-700 text-lg">
                  "My mission is simple: help conserve our most precious resource — clean water.
                  We make greywater reuse accessible, affordable, and sustainable for every home.
                  Pay once, use twice. That's living Water Wise."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Water Wise Group */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              About Water Wise Group
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Water Wise Group, Inc. is a wholesale distributor of Greywater Systems, headquartered in Atlanta, Georgia.
                In March 2010, we signed our first distribution agreement with Matala Water Technology Co., Ltd. to represent
                and distribute the Aqua2use Greywater Diversion Device in the United States.
              </p>
              <p className="text-gray-700 mb-6">
                Our mission is to help customers reuse greywater for irrigation and conserve water resources.
                We maintain large inventory and provide fast delivery from our Southern California warehouse,
                ensuring quick shipping to customers across the country.
              </p>
              <p className="text-gray-700 mb-6">
                With over 5,000 systems sold since 2010, we've helped thousands of homeowners, contractors, and businesses
                reduce their water consumption by up to 40,000 gallons per year while keeping their landscapes thriving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Mission & Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Water Conservation</h3>
              <p className="text-gray-600">
                Helping reduce household water consumption by up to 40% through greywater recycling.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">
                Distributing reliable, certified greywater systems that meet the highest safety standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Providing comprehensive guidance on regulations, installation, and maintenance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Leadership</h3>
              <p className="text-gray-600">
                Leading the industry in education and advocacy for greywater recycling adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What We Do
            </h2>
            <div className="space-y-6">
              <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wholesale Distribution
                </h3>
                <p className="text-gray-700">
                  We distribute high-quality Aqua2use greywater systems and replacement parts to
                  contractors, installers, and homeowners across the United States. Our large inventory
                  and California warehouse location ensure fast shipping nationwide.
                </p>
              </div>

              <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Education & Resources
                </h3>
                <p className="text-gray-700">
                  We provide comprehensive educational resources, including state-by-state compliance
                  information, installation guides, and best practices for greywater recycling.
                  Our blog covers everything from safe soaps to system maintenance.
                </p>
              </div>

              <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Technical Support
                </h3>
                <p className="text-gray-700">
                  Our team offers expert guidance on system selection, compliance requirements,
                  installation planning, and ongoing maintenance support. We're here to help
                  you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Conserving Water?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Contact us today to learn how greywater recycling can work for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-700" asChild>
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Information</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
                <a href="tel:+16788093008" className="text-lg text-emerald-600 hover:underline">
                  (678) 809-3008
                </a>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Email</p>
                <a href="mailto:sales@waterwisegroup.com" className="text-lg text-emerald-600 hover:underline">
                  sales@waterwisegroup.com
                </a>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Location</p>
                <p className="text-lg text-gray-900">Atlanta, GA 30068</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 text-center">
              <p className="text-sm font-semibold text-gray-700 mb-4">Follow Us</p>
              <div className="flex justify-center gap-6">
                <a
                  href="https://facebook.com/waterwisegroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com/waterwisegreywater/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://youtube.com/user/WaterWiseGroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
