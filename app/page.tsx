import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Droplets, Leaf, ArrowRight, Play, Star, Quote } from "lucide-react"
import { getProducts } from "@/lib/shopify"
import { formatPriceDisplay } from "@/lib/price-utils"

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                Sustainable Water Solutions
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Turn Every Drop Into A{" "}
                <span className="text-emerald-600">Sustainable Solution</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Save water, lower your bills, and grow healthier landscapes with our simple greywater recycling systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg" asChild>
                  <Link href="/products">
                    Explore Systems
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-8 py-6 text-lg" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/Gemini_Generated_Image_hwzac2hwzac2hwza 1.png"
                  alt="Aqua2use Greywater System"
                  width={600}
                  height={500}
                  className="rounded-3xl"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-teal-200 rounded-full opacity-30 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6 text-gray-400">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">5,000+ Happy Customers</span>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden md:block" />
            <span className="text-gray-500">As seen in Washington Post</span>
            <div className="h-8 w-px bg-gray-200 hidden md:block" />
            <span className="text-gray-500">Family Handyman Approved</span>
          </div>
        </div>
      </section>

      {/* How It Works - Simple */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Simple as 1, 2, 3
            </h2>
            <p className="text-xl text-gray-600">
              Our systems work automatically to recycle your household water
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collect</h3>
              <p className="text-gray-600 leading-relaxed">
                Water from showers and washing machines flows to the system automatically
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Filter</h3>
              <p className="text-gray-600 leading-relaxed">
                Progressive 4-stage filtration cleans and prepares water for safe reuse
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-cyan-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Irrigate</h3>
              <p className="text-gray-600 leading-relaxed">
                Clean greywater automatically waters your garden via drip irrigation
              </p>
            </div>
          </div>

          {/* Video Preview */}
          <div className="max-w-4xl mx-auto mt-20">
            <a 
              href="https://www.youtube.com/watch?v=XN6yyuSg5Kw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block relative aspect-video rounded-2xl overflow-hidden group"
            >
              <Image
                src="/images/maxresdefault.jpg"
                alt="How Greywater Works"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-emerald-600 fill-emerald-600 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-medium">Watch how it works</p>
                <p className="text-sm text-white/80">2 minute overview</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Products Section - Minimal */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Our Systems
            </h2>
            <p className="text-xl text-gray-600">
              Professional-grade greywater recycling for any property
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {(products.length > 0 ? products.slice(0, 2) : [
              { id: '1', title: 'Aqua2use GWDD', handle: 'aqua2use-gwdd', description: 'Perfect for homes and cabins. Processes up to 150 gallons per day.', priceRange: { minVariantPrice: { amount: '625' } }, images: { edges: [{ node: { url: '/images/gwdd-gravity.jpg', altText: 'Aqua2use GWDD' } }] } },
              { id: '2', title: 'Aqua2use Pro', handle: 'aqua2use-pro', description: 'High-capacity system for larger properties. Up to 500 gallons per day.', priceRange: { minVariantPrice: { amount: '2695' } }, images: { edges: [{ node: { url: '/images/gwdd-ug.jpg', altText: 'Aqua2use Pro' } }] } }
            ]).map((product: any) => (
              <Link 
                key={product.id} 
                href={`/products/${product.handle}`}
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                <div className="aspect-[4/3] relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                  <Image
                    src={product.images?.edges?.[0]?.node?.url || '/images/gwdd-gravity.jpg'}
                    alt={product.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description?.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">
                      {formatPriceDisplay(product.priceRange?.minVariantPrice?.amount || '625', 'From ')}
                    </span>
                    <span className="text-emerald-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      View Details <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-gray-300" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section - Clean Grid */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                Why homeowners choose greywater
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Save 40% on Water Bills</h3>
                    <p className="text-gray-600">Recycle up to 40,000 gallons per year from showers and laundry</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Healthier Landscapes</h3>
                    <p className="text-gray-600">Plants thrive with nutrient-rich greywater irrigation</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Easy Installation</h3>
                    <p className="text-gray-600">DIY-friendly systems with full support and documentation</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link href="/what-is-greywater">
                    Learn More About Greywater
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/solutions/situation-drought-ai.jpg"
                alt="Sustainable garden irrigation"
                width={600}
                height={500}
                className="rounded-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 border border-gray-200 max-w-xs">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-emerald-600">40K</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Gallons Saved</p>
                    <p className="text-sm text-gray-500">Per year, per system</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial - Single Featured */}
      <section className="py-24 lg:py-32 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="h-12 w-12 text-emerald-300 mx-auto mb-8" />
            <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
              "We've cut our water bill by 60% since installing the Aqua2use system. 
              Our garden has never looked better, and the installation was straightforward."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 bg-emerald-200 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-emerald-700">SJ</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Sarah Johnson</p>
                <p className="text-gray-600">Homeowner, California</p>
              </div>
            </div>
            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases - Minimal */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Solutions for Every Space
            </h2>
            <p className="text-xl text-gray-600">
              From tiny homes to large properties
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Homes', desc: 'Single-family residences', href: '/solutions/residential', image: '/images/solutions/situation-drought-ai.jpg' },
              { title: 'Tiny Homes', desc: 'Compact living spaces', href: '/solutions/tiny-homes', image: '/images/solutions/situation-tiny-rv-ai.jpg' },
              { title: 'RVs', desc: 'Mobile greywater solutions', href: '/solutions/rvs', image: '/images/solutions/situation-remote-ai.jpg' },
              { title: 'Commercial', desc: 'Multi-unit & developments', href: '/solutions/commercial', image: '/images/solutions/situation-septic-ai.jpg' }
            ].map((item) => (
              <Link 
                key={item.title} 
                href={item.href}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Clean */}
      <section className="py-24 lg:py-32 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to start saving water?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Get a personalized recommendation for your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-6 text-lg" asChild>
                <Link href="/contact">
                  Get Your Free Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-10 py-6 text-lg" asChild>
                <Link href="/products">
                  Browse Products
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              No obligation · Expert consultation · Same-day response
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
