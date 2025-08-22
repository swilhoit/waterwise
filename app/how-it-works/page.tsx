import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Droplets, Filter, ArrowRight, Home as HomeIcon, Wrench, Leaf } from "lucide-react"

export default function HowItWorks() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              How <span className="text-gradient">Greywater Recycling</span> Works
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              Simple, efficient, and automatic water recycling that saves you money while helping the environment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              The Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From collection to irrigation, our systems automate the entire process
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center group">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Droplets className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Collect</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Water from showers, washing machines, and bathroom sinks flows automatically to the Aqua2use system through existing plumbing.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <Filter className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Filter</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our progressive 3-stage filtration system removes particles, hair, and impurities, preparing clean water for reuse.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <Leaf className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Irrigate</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Clean greywater is automatically distributed to your landscape through drip irrigation or direct application.
                </p>
              </div>
            </div>

            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/maxresdefault.jpg"
                alt="How Greywater Recycling Works - Complete Process"
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                What Makes Our Systems Different?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Unlike simple laundry-to-landscape systems, Aqua2use systems provide comprehensive filtration and can handle water from multiple sources safely and effectively.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Progressive Filtration</h4>
                    <p className="text-gray-600">3-stage system removes particles, hair, and impurities</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Multiple Source Compatibility</h4>
                    <p className="text-gray-600">Safely processes water from showers, sinks, and washing machines</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Automatic Operation</h4>
                    <p className="text-gray-600">No manual intervention required - works 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Weather Responsive</h4>
                    <p className="text-gray-600">Built-in surge tank handles varying water flows</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-2xl opacity-20" />
              <Image
                src="/images/aqua2use-greywater-recycling-sytem.png"
                alt="Aqua2use Greywater System Components"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Learn More About Greywater
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deeper into greywater recycling technology and benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-lift transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <Droplets className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>What is Greywater?</CardTitle>
                <CardDescription>
                  Learn about greywater sources, safety, and environmental impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/how-it-works/what-is-greywater">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <Leaf className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Benefits</CardTitle>
                <CardDescription>
                  Discover the environmental and financial benefits of greywater recycling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/how-it-works/benefits">
                    Explore Benefits <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <Wrench className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>System Details</CardTitle>
                <CardDescription>
                  Technical specifications and installation requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/how-it-works/systems">
                    View Systems <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Water Savings Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our systems typically pay for themselves within 2-4 years through water bill savings alone.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50%</div>
                <div className="text-lg opacity-90">Average Water Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">$500+</div>
                <div className="text-lg opacity-90">Annual Savings Potential</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-lg opacity-90">Systems Installed</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover-lift" asChild>
                <Link href="/products">View Our Systems</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}