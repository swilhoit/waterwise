import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Droplets, Shield, Users, Award } from 'lucide-react'

export const metadata = {
  title: 'About Water Wise Group | Greywater System Experts',
  description: 'Learn about Water Wise Group, your trusted wholesale distributor of greywater recycling systems. Serving homeowners, contractors, and businesses since 2009.',
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Water Wise Group
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your trusted partner in greywater recycling solutions since 2009
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Water Wise Group is a wholesale distributor of greywater systems, helping homeowners,
              contractors, and businesses reduce water consumption and environmental impact through
              innovative greywater recycling technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Mission & Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Water Conservation</h3>
                <p className="text-gray-600">
                  Helping reduce household water consumption by up to 30% through greywater recycling.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Products</h3>
                <p className="text-gray-600">
                  Distributing reliable, certified greywater systems that meet the highest safety standards.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
                <p className="text-gray-600">
                  Providing comprehensive guidance on regulations, installation, and maintenance.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry Leadership</h3>
                <p className="text-gray-600">
                  Leading the industry in education and advocacy for greywater recycling adoption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Founded in 2009, Water Wise Group emerged from a simple yet powerful vision: to make
                water conservation accessible to everyone. As drought conditions intensified across
                the United States, we recognized the critical need for practical, affordable greywater
                recycling solutions.
              </p>
              <p className="text-gray-700 mb-6">
                Starting with a single product line, we've grown into a leading wholesale distributor
                of greywater systems, serving thousands of customers across the country. Our focus has
                always been on education, quality, and customer service—ensuring that every installation
                contributes to meaningful water conservation.
              </p>
              <p className="text-gray-700 mb-6">
                Today, we partner with homeowners, contractors, architects, and sustainable development
                projects to implement greywater systems that reduce water consumption, lower utility
                bills, and contribute to a more sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What We Do
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wholesale Distribution
                </h3>
                <p className="text-gray-700">
                  We distribute high-quality Aqua2use greywater systems and replacement parts to
                  contractors, installers, and homeowners across the United States.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Education & Resources
                </h3>
                <p className="text-gray-700">
                  We provide comprehensive educational resources, including state-by-state compliance
                  information, installation guides, and best practices for greywater recycling.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Technical Support
                </h3>
                <p className="text-gray-700">
                  Our team offers expert guidance on system selection, compliance requirements,
                  installation planning, and ongoing maintenance support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Conserving Water?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contact us today to learn how greywater recycling can work for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
                <p className="text-gray-900">(678) 809-3008</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Email</p>
                <p className="text-gray-900">sales@waterwisegroup.com</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Location</p>
                <p className="text-gray-900">Marietta, GA 30068</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
