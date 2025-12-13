import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Home as HomeIcon, TreePine, DollarSign, Droplets, CheckCircle, Quote } from "lucide-react"

export const metadata: Metadata = {
  title: 'Customer Stories – Water Wise Group',
  description: 'Real results from real customers who are saving water and money with Aqua2use greywater systems. Read success stories from homeowners across the US.',
  alternates: {
    canonical: 'https://waterwisegroup.com/customer-stories'
  }
}

// Real customer testimonials from old site
const testimonials = [
  {
    id: 1,
    name: "Martin",
    location: "Aqua2use GWDD Owner",
    quote: "I have had my Aqua2Use for about 5 years. It has performed flawlessly. I use grey water to water my flower beds.",
    years: "5 years",
    rating: 5
  },
  {
    id: 2,
    name: "J.G.",
    location: "Aqua2use GWDD Owner",
    quote: "GWDD System 5 years STILL working perfectly! Received a GWDD pump unit in 2020 and has been performing top notch ever since.",
    years: "5 years",
    rating: 5
  },
  {
    id: 3,
    name: "Richard A.",
    location: "Arizona Homeowner",
    quote: "I have had the GWDD for 2 years now to help water my yard in Arizona. Works great in the desert climate.",
    years: "2 years",
    rating: 5
  },
  {
    id: 4,
    name: "John E.",
    location: "Verified Buyer",
    quote: "The ordering process is easy and straightforward. The product arrives quickly and in perfect condition.",
    years: "Recent",
    rating: 5
  },
  {
    id: 5,
    name: "Mike E.",
    location: "Tiny Home Owner",
    quote: "While planning the design of our tiny house, I explored various grey water filtering systems. This particular design seamlessly integrated into our wastewater management plan.",
    years: "Tiny Home Build",
    rating: 5
  },
  {
    id: 6,
    name: "Jay L.",
    location: "RV Owner",
    quote: "I permanently live in a travel trailer...The grey water system enabled me to begin watering all my plants and I've been happy with the results. The plants are healthy and around my trailer is dry.",
    years: "Full-time RV",
    rating: 5
  }
]

export default function CustomerStories() {
  return (
    <div>
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Customer Stories
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Real results from real customers who are saving water and money with Aqua2use systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth stories from homeowners who transformed their water usage
            </p>
          </div>

          {/* Featured Stories */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src="/images/tiny-home-customer.jpg"
                    alt="California homeowner story"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3">California Homeowner Saves Trees During Drought</CardTitle>
                <p className="text-gray-600 mb-4">
                  Jay installed an Aqua2use system to protect his 60-year-old redwoods and camellias during California's severe droughts. Now 90% of his household water is reused for irrigation.
                </p>
                <blockquote className="italic text-gray-700 border-l-4 border-emerald-600 pl-4 mb-4">
                  "If you're even a little handy and care about saving water, Aqua2use is an affordable way to make a big impact."
                </blockquote>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link href="/customer-stories/california-homeowner">Read Full Story</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src="/images/rv-customer.jpg"
                    alt="RV owner story"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3">RV Owner Transforms Waste into Garden Paradise</CardTitle>
                <p className="text-gray-600 mb-4">
                  Jay Linden solved his RV's drainage problems with an Aqua2use GWDD, turning muddy puddles and odors into a thriving garden using recycled greywater.
                </p>
                <blockquote className="italic text-gray-700 border-l-4 border-emerald-600 pl-4 mb-4">
                  "I've been happy with the results. The plants are healthy and around my trailer is dry."
                </blockquote>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link href="/customer-stories/rv-owner">Read Full Story</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What Our Customers Are Saying
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real reviews from verified Aqua2use owners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {testimonial.years}
                    </span>
                  </div>

                  <Quote className="h-6 w-6 text-gray-200 mb-3" />
                  <p className="text-gray-700 leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </p>

                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Customers Choose Aqua2use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 5,000 systems sold since 2010
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Droplets className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>Water Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">40,000</div>
                <p className="text-sm text-gray-600">Gallons per year</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>Bill Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">30-40%</div>
                <p className="text-sm text-gray-600">On water bills</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <HomeIcon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>Systems Sold</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">5,000+</div>
                <p className="text-sm text-gray-600">Since 2010</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TreePine className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>Filter Life</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">4-6</div>
                <p className="text-sm text-gray-600">Months between cleaning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-emerald-400 font-medium mb-4">Collect. Filter. Flourish.</p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Water-Saving Journey?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-400">
            Get a personalized quote and join thousands of homeowners saving water
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg" asChild>
              <Link href="/contact">Get Your Free Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-6 text-lg" asChild>
              <Link href="/products">View Our Systems</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
