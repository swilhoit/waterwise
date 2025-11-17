import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Droplets, Shield, Users, Award } from 'lucide-react'
import { PageHero, FeatureGrid, CTASection } from '@/components/sections'

export const metadata = {
  title: 'About Water Wise Group | Greywater System Experts',
  description: 'Learn about Water Wise Group, your trusted wholesale distributor of greywater recycling systems. Serving homeowners, contractors, and businesses since 2009.',
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="About Water Wise Group"
        description="Your trusted partner in greywater recycling solutions since 2009"
        variant="gradient"
        size="md"
      >
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Water Wise Group is a wholesale distributor of greywater systems, helping homeowners,
          contractors, and businesses reduce water consumption and environmental impact through
          innovative greywater recycling technology.
        </p>
      </PageHero>

      {/* Mission & Values */}
      <FeatureGrid
        title="Our Mission & Values"
        columns={4}
        centered
        features={[
          {
            icon: Droplets,
            title: "Water Conservation",
            description: "Helping reduce household water consumption by up to 30% through greywater recycling.",
            iconColor: "text-blue-600",
            iconBgColor: "bg-blue-100"
          },
          {
            icon: Shield,
            title: "Quality Products",
            description: "Distributing reliable, certified greywater systems that meet the highest safety standards.",
            iconColor: "text-green-600",
            iconBgColor: "bg-green-100"
          },
          {
            icon: Users,
            title: "Expert Support",
            description: "Providing comprehensive guidance on regulations, installation, and maintenance.",
            iconColor: "text-purple-600",
            iconBgColor: "bg-purple-100"
          },
          {
            icon: Award,
            title: "Industry Leadership",
            description: "Leading the industry in education and advocacy for greywater recycling adoption.",
            iconColor: "text-orange-600",
            iconBgColor: "bg-orange-100"
          }
        ]}
      />

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
      <CTASection
        title="Ready to Start Conserving Water?"
        description="Contact us today to learn how greywater recycling can work for your project."
        variant="blue"
        buttons={[
          { label: "Get a Quote", href: "/contact", variant: "secondary" },
          { label: "View Products", href: "/products", variant: "secondary" }
        ]}
      />

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
