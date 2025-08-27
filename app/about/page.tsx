import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Award, Users, Leaf, Home, Heart } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              About <span className="text-gradient">Water Wise Group</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              We're passionate about making water conservation accessible, practical, and profitable for every property owner.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission: Saving Water, One Drop at a Time
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Water Wise Group, we believe that water conservation shouldn't be complicated or expensive. Since our founding, we've been dedicated to providing innovative greywater recycling solutions that help property owners reduce their environmental impact while saving money.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our flagship product, the Aqua2use greywater recycling system, has helped thousands of homeowners, tiny home dwellers, RV owners, and sustainable communities transform their relationship with water usage.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-600 mb-2">10,000+</div>
                  <div className="text-sm text-gray-600">Systems Installed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-600 mb-2">50%</div>
                  <div className="text-sm text-gray-600">Average Water Savings</div>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-2xl opacity-20" />
              <Image
                src="/images/aqua2use-greywater-recycling-sytem.png"
                alt="Water Wise Group Mission"
                width={600}
                height={400}
                className="rounded-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Water Wise Group?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just selling systems – we're building a more sustainable future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Award className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>Industry Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Over a decade of experience in greywater recycling technology and installation.</p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Users className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our team of water conservation experts provides guidance from selection to installation.</p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Leaf className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>Eco-Friendly Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Every system we sell helps reduce strain on water resources and treatment facilities.</p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Home className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>Versatile Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">From tiny homes to large estates, we have systems that fit every property type.</p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our customers typically see 40-60% reduction in outdoor water usage within the first month.</p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Heart className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>Customer First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We're committed to your success with comprehensive support and reliable products.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                The Aqua2use Story
              </h2>
              <p className="text-xl text-gray-600">
                Innovation born from necessity, perfected through experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Born from Innovation</h3>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  The Aqua2use system was developed by water conservation pioneers who recognized the need for simple, effective greywater recycling solutions. What started as a solution for water-scarce regions has become the go-to choice for environmentally conscious property owners worldwide.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, our systems are helping people save millions of gallons of water annually while reducing their utility costs and creating healthier landscapes.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/images/gwdd-gravity.jpg"
                  alt="Aqua2use Innovation"
                  width={500}
                  height={350}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Join the Water Conservation Movement?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Discover how our greywater recycling systems can transform your property's water usage
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/products">View Our Systems</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Get Expert Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}