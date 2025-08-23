import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, Home as HomeIcon, TreePine, DollarSign, Droplets } from "lucide-react"
import Link from "next/link"

const stories = [
  {
    id: 1,
    name: "Sarah & Michael Johnson",
    location: "Sonoma County, California",
    system: "Aqua2use GWDD Gravity System",
    image: "/images/gwdd-gravity.jpg",
    savings: "60% reduction in water bills",
    quote: "We've cut our water bill by 60% since installing the Aqua2use system. Our garden has never looked better! The installation was straightforward, and the system works flawlessly. Living in drought-prone California, this has been a game-changer for our family.",
    details: [
      "2,400 sq ft home with 4 family members",
      "Installed system in weekend DIY project",
      "Connected to washing machine and master shower",
      "Waters 1,500 sq ft of drought-tolerant landscaping",
      "Saves over $100/month on water bills"
    ],
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    location: "Phoenix, Arizona",
    system: "Aqua2use Pro Commercial System",
    image: "/images/gwdd-ug.jpg",
    savings: "45% reduction in outdoor water usage",
    quote: "Living in the desert, water conservation isn't just about saving money—it's about being a responsible steward of our precious resources. The Aqua2use Pro handles our large property's needs perfectly. The professional installation was quick, and the ongoing support has been excellent.",
    details: [
      "5,000 sq ft home with large landscaping",
      "Professional installation completed in one day",
      "Processes water from multiple bathrooms and laundry",
      "Maintains beautiful desert landscaping year-round",
      "Reduced outdoor water usage by 45%"
    ],
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Austin, Texas",
    system: "Aqua2use GWDD Gravity System", 
    image: "/images/aqua2use-greywater-recycling-sytem.png",
    savings: "Perfect for tiny home living",
    quote: "Perfect for our tiny home! Compact, efficient, and helps us live sustainably off-grid. We love that we can shower and do laundry knowing that water is going directly to our vegetable garden. It's amazing how much water we were wasting before!",
    details: [
      "600 sq ft tiny home on 2-acre property",
      "Off-grid living with sustainable practices",
      "System integrated with rainwater collection",
      "Waters organic vegetable and herb garden",
      "Completely self-sufficient water cycle"
    ],
    rating: 5
  },
  {
    id: 4,
    name: "Robert & Linda Miller",
    location: "Bend, Oregon",
    system: "Aqua2use GWDD Pump System",
    image: "/images/gwdd-gravity.jpg",
    savings: "Healthier landscape, lower bills",
    quote: "We were skeptical at first, but after seeing our neighbor's success, we decided to try it. Best investment we've made for our home! Our plants are healthier, our water bills are lower, and we feel good about reducing our environmental impact.",
    details: [
      "Mountain cabin with challenging terrain",
      "Pump system overcame elevation challenges",
      "Connected to guest bathroom and laundry room",
      "Supports native plant restoration project",
      "Saves $75/month during growing season"
    ],
    rating: 5
  },
  {
    id: 5,
    name: "Maria Santos",
    location: "San Diego, California", 
    system: "Aqua2use GWDD Gravity System",
    image: "/images/gwdd-ug.jpg",
    savings: "Drought-proof landscaping solution",
    quote: "As a landscape designer, I wanted to practice what I preach about water conservation. The Aqua2use system allows me to maintain beautiful client showcase gardens even during drought restrictions. My water usage is down 50% and my plants are thriving.",
    details: [
      "Professional landscape designer's home",
      "Showcase property for drought-tolerant design",
      "System waters demonstration garden",
      "Educates clients on sustainable practices",
      "Featured in local sustainability magazine"
    ],
    rating: 5
  },
  {
    id: 6,
    name: "James Thompson",
    location: "Flagstaff, Arizona",
    system: "Aqua2use GWDD Gravity System",
    image: "/images/aqua2use-greywater-recycling-sytem.png", 
    savings: "Perfect for RV park expansion",
    quote: "We installed Aqua2use systems throughout our RV park expansion. Guests love the eco-friendly amenities, and we've significantly reduced our water infrastructure costs. The systems handle the variable usage patterns perfectly.",
    details: [
      "12-unit RV park with full hookups",
      "Systems installed at each site",
      "Handles variable seasonal usage",
      "Reduced municipal water connection fees",
      "Featured as 'Green RV Park' in tourism guides"
    ],
    rating: 5
  }
]

export default function CustomerStories() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              <span className="text-gradient">Customer Stories</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              Real results from real customers who are saving water and money with Aqua2use systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Across America
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tiny homes to large estates, see how our customers are transforming their water usage
            </p>
          </div>

          <div className="grid gap-12 max-w-6xl mx-auto">
            {stories.map((story, index) => (
              <Card key={story.id} className={`overflow-hidden hover-lift transition-all duration-300 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:flex">
                  <div className="lg:w-1/2">
                    <Image
                      src={story.image}
                      alt={`${story.name}'s ${story.system}`}
                      width={600}
                      height={400}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <div className="flex items-start gap-3 mb-4">
                      <Quote className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                      <p className="text-lg text-gray-700 italic leading-relaxed">
                        "{story.quote}"
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                      <p className="text-gray-600">{story.location}</p>
                      <p className="text-sm text-gray-600 font-semibold">{story.system}</p>
                      <p className="text-sm text-green-600 font-semibold mt-1">{story.savings}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 mb-2">Project Details:</h4>
                      {story.details.slice(0, 3).map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
              The numbers speak for themselves
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Average Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">$500+</div>
                <p className="text-sm text-gray-600">Per year on water bills</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <Droplets className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <CardTitle>Water Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">50%</div>
                <p className="text-sm text-gray-600">Less outdoor water usage</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <HomeIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                <p className="text-sm text-gray-600">Would recommend to others</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Payback Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">2-4</div>
                <p className="text-sm text-gray-600">Years to full payback</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Get a personalized quote and start your water savings journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold hover-lift" asChild>
              <Link href="/contact">Get Your Free Quote</Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
              <Link href="/products">View Our Systems</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}