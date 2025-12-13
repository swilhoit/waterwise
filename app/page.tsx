import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle, Droplets, Leaf, ArrowRight, Play, Star, CloudRain } from "lucide-react"
import { getProducts } from "@/lib/shopify"
import { formatPriceDisplay } from "@/lib/price-utils"
import { OrganizationSchema, WebSiteSchema } from "@/components/schema-markup"
import { WaterSourceSelector } from "@/components/water-source-selector"

export const metadata: Metadata = {
  title: 'Greywater System | Greywater Filtration Systems – Water Wise Group',
  description: 'Reuse water from your home for irrigation. Save water, lower utility costs, and create a thriving landscape with Aqua2use greywater recycling systems. Buy water once, use it twice.',
  keywords: ['greywater system', 'greywater filtration', 'water recycling', 'Aqua2use', 'irrigation system', 'water conservation'],
  openGraph: {
    title: 'Greywater System | Greywater Filtration Systems – Water Wise Group',
    description: 'Reuse water from your home for irrigation. Save water, lower utility costs, and create a thriving landscape with Aqua2use greywater recycling systems.',
    url: 'https://waterwisegroup.com',
    siteName: 'Water Wise Group',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greywater System | Greywater Filtration Systems – Water Wise Group',
    description: 'Reuse water from your home for irrigation. Save water, lower utility costs, and create a thriving landscape.',
  },
  alternates: {
    canonical: 'https://waterwisegroup.com',
  },
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="bg-white">
      <OrganizationSchema />
      <WebSiteSchema />

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
                Reuse Water From Your Home{" "}
                <span className="text-emerald-600">For Irrigation</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Save water, lower utility costs, and create a thriving landscape in any climate. Buy water once, use it twice. That's living Water Wise.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm mb-8">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="text-gray-600"><span className="font-bold text-gray-900">5,000+</span> Systems Sold Since 2010</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg" asChild>
                  <Link href="/products">
                    Explore Systems
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-8 py-6 text-lg" asChild>
                  <Link href="/blog/how-can-i-use-greywater">How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/family-garden.jpg"
                  alt="Lush California garden thriving with greywater irrigation"
                  width={600}
                  height={600}
                  className="rounded-3xl object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-orange-200 rounded-full opacity-30 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - As Seen In */}
      <section className="py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-6">As Seen In</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            <Image
              src="/images/featured-on/bg-logo_web-large.avif"
              alt="Building Green"
              width={120}
              height={40}
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/featured-on/architect.avif"
              alt="Architect Magazine"
              width={120}
              height={40}
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/featured-on/family-handyman.svg"
              alt="Family Handyman"
              width={120}
              height={40}
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/featured-on/The_Washington_Post_Newspaper.svg"
              alt="The Washington Post"
              width={160}
              height={40}
              className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
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

      {/* Products Section - Aqua2use Filtration System */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Aqua2Use Filtration System
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              4-stage filtration for greywater or rainwater — reclaim clean water for reliable irrigation
            </p>
          </div>

          {/* Comparison Table */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* GWDD Gravity */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
              <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="absolute top-4 left-4 bg-gray-700 text-white text-xs font-medium px-3 py-1 rounded-full z-10">
                  No Power Needed
                </div>
                <Image
                  src="/images/gwdd-gravity.jpg"
                  alt="Aqua2use GWDD Gravity"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">GWDD Gravity</h3>
                <p className="text-3xl font-bold text-emerald-600 mb-4">$625</p>
                <ul className="space-y-3 text-sm text-gray-600 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Up to 150 gallons/day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Gravity-fed (no pump)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>4-stage Matala filtration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Ideal for downhill landscapes</span>
                  </li>
                </ul>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link href="/products/aqua2use-gwdd">View Details</Link>
                </Button>
              </div>
            </div>

            {/* GWDD with Pump */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
              <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-medium px-3 py-1 rounded-full z-10">
                  Most Versatile
                </div>
                <Image
                  src="https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-pump.jpg?v=1719253734"
                  alt="Aqua2use GWDD with Pump"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">GWDD with Pump</h3>
                <p className="text-3xl font-bold text-emerald-600 mb-4">$775</p>
                <ul className="space-y-3 text-sm text-gray-600 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Up to 150 gallons/day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Includes submersible pump</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>4-stage Matala filtration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Works on flat or uphill terrain</span>
                  </li>
                </ul>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link href="/products/aqua2use-gwdd-pump">View Details</Link>
                </Button>
              </div>
            </div>

            {/* Aqua2use Pro */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
              <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full z-10">
                  High Volume
                </div>
                <Image
                  src="/images/gwdd-ug.jpg"
                  alt="Aqua2use Pro"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aqua2use Pro</h3>
                <p className="text-3xl font-bold text-emerald-600 mb-4">$2,695</p>
                <ul className="space-y-3 text-sm text-gray-600 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Up to 500 gallons/day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>High-capacity pump included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>4-stage Matala filtration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Commercial & large properties</span>
                  </li>
                </ul>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link href="/products/aqua2use-pro">View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaterSourceSelector />

      {/* Benefits Section - Clean Grid */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                Why homeowners choose water recycling
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Save 40% on Water Bills</h3>
                    <p className="text-gray-600">Recycle greywater from showers and laundry, or harvest rainwater for irrigation</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Healthier Landscapes</h3>
                    <p className="text-gray-600">Plants thrive with greywater nutrients or pure rainwater</p>
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
                    Learn More
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

      {/* Testimonials - Marquee Carousel */}
      <section className="py-24 lg:py-32 bg-emerald-50 overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real reviews from Aqua2use owners
            </p>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex animate-marquee gap-6">
            {[
              { name: "Martin", initials: "M", bgColor: "bg-emerald-100", textColor: "text-emerald-700", review: "I have had my Aqua2Use for about 5 years. It has performed flawlessly. I use grey water to water my flower beds.", product: "Aqua2use GWDD", image: null },
              { name: "J.G.", initials: "JG", bgColor: "bg-teal-100", textColor: "text-teal-700", review: "GWDD System 5 years STILL working perfectly! Received a GWDD pump unit in 2020 and has been performing top notch ever since.", product: "Aqua2use GWDD", image: null },
              { name: "Richard A.", initials: "RA", bgColor: "bg-blue-100", textColor: "text-blue-700", review: "I have had the GWDD for 2 years now to help water my yard in Arizona. Works great in the desert climate.", product: "Arizona Homeowner", image: "/images/customer-stories/arizona-oasis.jpg" },
              { name: "Jay L.", initials: "JL", bgColor: "bg-purple-100", textColor: "text-purple-700", review: "I permanently live in a travel trailer. The grey water system enabled me to begin watering all my plants and I've been happy with the results.", product: "RV Owner", image: null },
              { name: "Mike E.", initials: "ME", bgColor: "bg-cyan-100", textColor: "text-cyan-700", review: "While planning the design of our tiny house, I explored various grey water filtering systems. This particular design seamlessly integrated into our wastewater management plan.", product: "Tiny Home Owner", image: null },
              { name: "California Family", initials: "CF", bgColor: "bg-orange-100", textColor: "text-orange-700", review: "Our 60-year-old redwoods are thriving thanks to greywater irrigation. We've cut our water bill by 40% while keeping our landscape lush during drought restrictions.", product: "California Homeowner", image: "/images/customer-stories/california-family.jpg" },
              { name: "Martin", initials: "M", bgColor: "bg-emerald-100", textColor: "text-emerald-700", review: "I have had my Aqua2Use for about 5 years. It has performed flawlessly. I use grey water to water my flower beds.", product: "Aqua2use GWDD", image: null },
              { name: "J.G.", initials: "JG", bgColor: "bg-teal-100", textColor: "text-teal-700", review: "GWDD System 5 years STILL working perfectly! Received a GWDD pump unit in 2020 and has been performing top notch ever since.", product: "Aqua2use GWDD", image: null },
              { name: "Richard A.", initials: "RA", bgColor: "bg-blue-100", textColor: "text-blue-700", review: "I have had the GWDD for 2 years now to help water my yard in Arizona. Works great in the desert climate.", product: "Arizona Homeowner", image: "/images/customer-stories/arizona-oasis.jpg" },
              { name: "Jay L.", initials: "JL", bgColor: "bg-purple-100", textColor: "text-purple-700", review: "I permanently live in a travel trailer. The grey water system enabled me to begin watering all my plants and I've been happy with the results.", product: "RV Owner", image: null },
              { name: "Mike E.", initials: "ME", bgColor: "bg-cyan-100", textColor: "text-cyan-700", review: "While planning the design of our tiny house, I explored various grey water filtering systems. This particular design seamlessly integrated into our wastewater management plan.", product: "Tiny Home Owner", image: null },
              { name: "California Family", initials: "CF", bgColor: "bg-orange-100", textColor: "text-orange-700", review: "Our 60-year-old redwoods are thriving thanks to greywater irrigation. We've cut our water bill by 40% while keeping our landscape lush during drought restrictions.", product: "California Homeowner", image: "/images/customer-stories/california-family.jpg" },
            ].map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-[350px] bg-white rounded-2xl overflow-hidden">
                {testimonial.image && (
                  <div className="relative h-48">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name}'s garden`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-4">
                    "{testimonial.review}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 ${testimonial.bgColor} rounded-full flex items-center justify-center`}>
                      <span className={`text-xs font-semibold ${testimonial.textColor}`}>{testimonial.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.product}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center mt-12">
            <Link href="/customer-stories" className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center gap-2">
              Read More Customer Stories
              <ArrowRight className="h-4 w-4" />
            </Link>
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
