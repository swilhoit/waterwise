import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Droplets, Home as HomeIcon, Leaf, DollarSign, TreePine, Users, BookOpen, Shield, Wrench, Award, Globe, Mountain, Play, Shirt, ChefHat, Toilet, Bath, ShowerHead, Waves, Zap } from "lucide-react"
import { getProducts } from "@/lib/shopify"
import { Testimonials } from "@/components/testimonials"
import { formatPriceDisplay } from "@/lib/price-utils"


const iconMap: { [key: string]: any } = {
  droplets: Droplets,
  dollar: DollarSign,
  leaf: Leaf,
  tree: TreePine,
  home: HomeIcon,
  users: Users,
}

export default async function Home() {
  const products = await getProducts()

  const defaultBenefits = [
    { title: "Save 50% on Water Usage", description: "Recycle water from showers, washing machines, and sinks to irrigate your garden", icon: "droplets" },
    { title: "Lower Your Water Bills", description: "Reduce monthly water costs by reusing greywater for landscape irrigation", icon: "dollar" },
    { title: "Eco-Friendly Solution", description: "Reduce strain on water treatment facilities and conserve precious freshwater resources", icon: "leaf" },
    { title: "Local Code Compliance", description: "Engineered to meet state and city greywater codes—with support for permits and inspections", icon: "tree" },
    { title: "Incentives & Rebates", description: "Tap into utility rebates and sustainability incentives to lower upfront costs", icon: "home" },
    { title: "Increase Property Value", description: "Sustainable renovations like greywater systems can boost resale value and marketability", icon: "users" }
  ]

  const displayBenefits = defaultBenefits

  return (
    <div>
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Turn Every Drop Into A{" "}
                <span className="text-gradient">Sustainable Solution</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Water Wise Group is on a mission to help you save water, lower your bills, and grow healthier landscapes—without compromising on simplicity or sustainability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                  <Link href="/products">
                    Explore Systems
                  </Link>
                </Button>
                <Button size="lg" className="bg-gray-600 hover:bg-gray-700 text-white" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">DIY Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Save 40% on Water Bills</span>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <Image
                src="/images/Gemini_Generated_Image_hwzac2hwzac2hwza 1.png"
                alt="Aqua2use Greywater System"
                width={600}
                height={400}
                className="rounded-lg relative z-10 hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            <Image
              src="/images/architect.png"
              alt="Architect Magazine"
              width={120}
              height={40}
              className="h-10 w-auto grayscale opacity-60"
            />
            <Image
              src="/images/family-handyman.svg"
              alt="Family Handyman"
              width={120}
              height={40}
              className="h-10 w-auto grayscale opacity-60"
            />
            <Image
              src="/images/The_Washington_Post_Newspaper.svg"
              alt="The Washington Post"
              width={120}
              height={40}
              className="h-10 w-auto grayscale opacity-60"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Install a Greywater System?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of homeowners who are saving water and money while creating healthier landscapes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBenefits.map((benefit: any, index: number) => {
              const IconComponent = iconMap[benefit.icon] || Droplets
              return (
                <Card key={index} className="hover-lift transition-all duration-300 border-gray-100">
                  <CardHeader>
                    <IconComponent className="h-10 w-10 text-gray-600 mb-4" />
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Greywater Systems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade systems designed for easy installation and maximum efficiency
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {products.slice(0, 2).map((product: any) => (
                <Card key={product.id} className="hover-lift transition-all duration-300">
                  <CardHeader>
                    {product.images?.edges?.[0]?.node && (
                      <Image
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText || product.title}
                        width={400}
                        height={300}
                        className="rounded-lg mb-4"
                      />
                    )}
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {product.priceRange?.minVariantPrice && (
                      <div className="text-2xl font-bold text-gray-600 mb-4">
                        {formatPriceDisplay(product.priceRange.minVariantPrice.amount, "From ")}
                      </div>
                    )}
                    <Button className="w-full bg-black hover:bg-gray-800 text-white" asChild>
                      <Link href={`/products/${product.handle}`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="hover-lift transition-all duration-300">
                <CardHeader>
                  <Image
                    src="/images/gwdd-gravity.jpg"
                    alt="Aqua2use GWDD"
                    width={400}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <CardTitle>Aqua2use GWDD</CardTitle>
                  <CardDescription>Gravity & Pump Systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Perfect for homes and cabins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Processes up to 150 gallons per day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Progressive filtration system</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-black hover:bg-gray-800 text-white" asChild>
                    <Link href="/products/aqua2use-gwdd">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift transition-all duration-300">
                <CardHeader>
                  <Image
                    src="/images/gwdd-ug.jpg"
                    alt="Aqua2use Pro"
                    width={400}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <CardTitle>Aqua2use Pro</CardTitle>
                  <CardDescription>Commercial Grade System</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>For larger properties & developments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Processes up to 500 gallons per day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Advanced multi-stage filtration</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-black hover:bg-gray-800 text-white" asChild>
                    <Link href="/products/aqua2use-pro">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How Greywater Recycling Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, efficient, and automatic water recycling for your property
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <a 
              href="https://www.youtube.com/watch?v=XN6yyuSg5Kw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block relative aspect-video bg-gray-200 rounded-lg overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <Image
                src="/images/maxresdefault.jpg"
                alt="How Greywater Works Video"
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-gray-900 fill-gray-900 ml-1" />
                </div>
              </div>
            </a>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Collect</h3>
                <p className="text-gray-600">
                  Water from showers, washing machines, and sinks flows to the system
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Filter</h3>
                <p className="text-gray-600">
                  Progressive filtration removes particles and prepares water for reuse
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Irrigate</h3>
                <p className="text-gray-600">
                  Clean greywater automatically waters your landscape via drip irrigation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Learn About Greywater
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover everything you need to know about greywater recycling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>What is Greywater?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Learn the basics of greywater recycling and how it can benefit your home
                </CardDescription>
                <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                  <Link href="/what-is-greywater">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Wrench className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Understand the process and technology behind greywater systems
                </CardDescription>
                <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                  <Link href="/how-it-works">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Shield className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>State Laws</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Check your state's greywater regulations and permit requirements
                </CardDescription>
                <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                  <Link href="/greywater-laws">Check Laws</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Solutions for Every Living Space
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tiny homes to large properties, our systems adapt to your water recycling needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/tiny-house-systems" className="group block">
              <Card className="overflow-hidden  transition-all duration-300 h-full cursor-pointer">
                <div className="relative h-64">
                  <Image 
                    src="/images/solutions/situation-tiny-rv-ai.jpg" 
                    alt="Tiny homes and RVs" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Tiny Homes & RVs</h3>
                    <p className="text-sm text-gray-200">
                      Compact systems designed for mobile living and small spaces
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/solutions" className="group block">
              <Card className="overflow-hidden  transition-all duration-300 h-full cursor-pointer">
                <div className="relative h-64">
                  <Image 
                    src="/images/solutions/situation-drought-ai.jpg" 
                    alt="Drought areas" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Drought Areas</h3>
                    <p className="text-sm text-gray-200">
                      Maximize water conservation in water-scarce regions
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/solutions" className="group block">
              <Card className="overflow-hidden  transition-all duration-300 h-full cursor-pointer">
                <div className="relative h-64">
                  <Image 
                    src="/images/solutions/situation-septic-ai.jpg" 
                    alt="Septic homes" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Septic Homes</h3>
                    <p className="text-sm text-gray-200">
                      Reduce load on septic systems and extend their lifespan
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/solutions/remote-work-sites" className="group block">
              <Card className="overflow-hidden  transition-all duration-300 h-full cursor-pointer">
                <div className="relative h-64">
                  <Image 
                    src="/images/solutions/situation-remote-ai.jpg" 
                    alt="Remote locations" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Remote Locations</h3>
                    <p className="text-sm text-gray-200">
                      Self-sufficient water solutions for off-grid properties
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Environmental Impact by the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the real difference greywater recycling makes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-gray-600 mb-2">40K</div>
              <div className="text-lg font-semibold mb-2">Gallons/Year</div>
              <div className="text-gray-600">Water saved annually per system</div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-green-600 mb-2">40%</div>
              <div className="text-lg font-semibold mb-2">Lower Bills</div>
              <div className="text-gray-600">Average water bill reduction</div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-purple-600 mb-2">5K+</div>
              <div className="text-lg font-semibold mb-2">Systems Sold</div>
              <div className="text-gray-600">Since 2010</div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-orange-600 mb-2">4</div>
              <div className="text-lg font-semibold mb-2">Stage Filtration</div>
              <div className="text-gray-600">Progressive Matala filter system</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Water Wise Group?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for reliable greywater solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-lift transition-all duration-300 text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <CardTitle>Industry Leading Warranty</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  5-year comprehensive warranty on all systems with full parts and labor coverage
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300 text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <CardTitle>Certified & Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  NSF certified systems that meet all health department standards and regulations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300 text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Dedicated customer service team and nationwide network of certified installers
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Greywater & Irrigation Guidelines */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          
          {/* Category: Greywater Collection */}
          <div className="max-w-5xl mx-auto mb-8 text-center">
            <h3 className="text-4xl font-bold text-gray-800">Greywater Sources</h3>
          </div>
          
          {/* Greywater Sources Table */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300 bg-gray-50">
                    <th className="text-left py-6 px-6 font-bold text-xl">Source</th>
                    <th className="text-center py-6 px-6 font-bold text-xl">Status</th>
                    <th className="text-left py-6 px-6 font-bold text-xl">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-8 px-6">
                      <div className="flex items-center gap-4">
                        <Shirt className="w-8 h-8 text-green-600" />
                        <span className="font-semibold text-lg">Laundry</span>
                      </div>
                    </td>
                    <td className="py-8 px-6 text-center">
                      <Badge className="bg-green-600 text-white border-transparent px-4 py-2 text-sm">Approved</Badge>
                    </td>
                    <td className="py-8 px-6 text-gray-600 text-base leading-relaxed">
                      Laundry water is typically ideal for reuse when using biodegradable, low-sodium detergents.
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-8 px-6">
                      <div className="flex items-center gap-4">
                        <Bath className="w-8 h-8 text-amber-500" />
                        <span className="font-semibold text-lg">Bathroom Sink</span>
                      </div>
                    </td>
                    <td className="py-8 px-6 text-center">
                      <Badge className="bg-amber-500 text-white border-transparent px-4 py-2 text-sm">Approved with Permits</Badge>
                    </td>
                    <td className="py-8 px-6 text-gray-600 text-base leading-relaxed">
                      Often allowed for landscape irrigation with a compliant system. Permits may be required.
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-8 px-6">
                      <div className="flex items-center gap-4">
                        <ShowerHead className="w-8 h-8 text-amber-500" />
                        <span className="font-semibold text-lg">Shower</span>
                      </div>
                    </td>
                    <td className="py-8 px-6 text-center">
                      <Badge className="bg-amber-500 text-white border-transparent px-4 py-2 text-sm">Approved with Permits</Badge>
                    </td>
                    <td className="py-8 px-6 text-gray-600 text-base leading-relaxed">
                      Shower water is generally suitable for reuse with proper filtration and permits.
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-8 px-6">
                      <div className="flex items-center gap-4">
                        <ChefHat className="w-8 h-8 text-red-600" />
                        <span className="font-semibold text-lg">Kitchen Sink</span>
                      </div>
                    </td>
                    <td className="py-8 px-6 text-center">
                      <Badge className="bg-red-600 text-white border-transparent px-4 py-2 text-sm">Not Approved</Badge>
                    </td>
                    <td className="py-8 px-6 text-gray-600 text-base leading-relaxed">
                      Kitchen water contains fats, oils, and food waste. Not suitable for reuse.
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-8 px-6">
                      <div className="flex items-center gap-4">
                        <Toilet className="w-8 h-8 text-red-600" />
                        <span className="font-semibold text-lg">Toilet</span>
                      </div>
                    </td>
                    <td className="py-8 px-6 text-center">
                      <Badge className="bg-red-600 text-white border-transparent px-4 py-2 text-sm">Not Approved</Badge>
                    </td>
                    <td className="py-8 px-6 text-gray-600 text-base leading-relaxed">
                      Toilet water is blackwater. Do not reuse under any circumstances.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Category: Greywater Irrigation */}
          <div className="max-w-5xl mx-auto mt-12 mb-8 text-center">
            <h3 className="text-4xl font-bold text-gray-800">Greywater Irrigation Methods</h3>
          </div>
          
          {/* Greywater Irrigation Table */}
          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300 bg-gray-50">
                    <th className="text-left py-6 px-6 font-bold text-xl">Method</th>
                    <th className="text-center py-6 px-6 font-bold text-xl">Status</th>
                    <th className="text-left py-6 px-6 font-bold text-xl">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-8 px-6">
                      <div className="flex items-center gap-4">
                        <Zap className="w-8 h-8 text-green-600" />
                        <span className="font-semibold text-lg">Underground Irrigation</span>
                      </div>
                    </td>
                    <td className="py-8 px-6 text-center">
                      <Badge className="bg-green-600 text-white border-transparent px-4 py-2 text-sm">Approved</Badge>
                    </td>
                    <td className="py-8 px-6 text-gray-600 text-base leading-relaxed">
                      Subsurface drip or mulch basins deliver water below the surface, minimizing exposure and meeting code in most regions.
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-8 px-6">
                      <div className="flex items-center gap-4">
                        <Waves className="w-8 h-8 text-red-600" />
                        <span className="font-semibold text-lg">Above Ground Irrigation</span>
                      </div>
                    </td>
                    <td className="py-8 px-6 text-center">
                      <Badge className="bg-red-600 text-white border-transparent px-4 py-2 text-sm">Not Approved</Badge>
                    </td>
                    <td className="py-8 px-6 text-gray-600 text-base leading-relaxed">
                      Sprinklers or surface watering can aerosolize water. Most codes prohibit above-ground greywater irrigation.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Always verify local regulations. See <a className="underline" href="/greywater-laws">state greywater laws</a>.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about greywater systems
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Is greywater safe to use?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, when properly filtered and treated, greywater is safe for irrigation and non-potable uses. Our systems use multi-stage filtration to remove contaminants and meet all health department standards.
              </p>
            </div>
            <div className="border-t border-black"></div>

            <div className="py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How much water can I save?</h3>
              <p className="text-gray-600 leading-relaxed">
                Most households save 40-50% on their water usage. A typical family of four can recycle 15,000-20,000 gallons per year, saving hundreds of dollars on water bills.
              </p>
            </div>
            <div className="border-t border-black"></div>

            <div className="py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Do I need a permit?</h3>
              <p className="text-gray-600 leading-relaxed">
                Permit requirements vary by state and local jurisdiction. Many areas allow simple laundry-to-landscape systems without permits, while others require permits for all greywater systems. We help navigate local regulations.
              </p>
            </div>
            <div className="border-t border-black"></div>

            <div className="py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How long does installation take?</h3>
              <p className="text-gray-600 leading-relaxed">
                Most residential installations take 1-2 days. Simple laundry-to-landscape systems can often be installed in a few hours, while whole-house systems may take longer depending on complexity.
              </p>
            </div>
            <div className="border-t border-black"></div>

            <div className="py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What maintenance is required?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our systems are designed for minimal maintenance. Filter replacement every 6-12 months and periodic system checks are typically all that's needed. We offer maintenance programs for hands-off operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 animate-fade-in">
            Ready to Start Saving Water?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Get a personalized quote for your greywater recycling system today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold hover-lift" asChild>
              <Link href="/contact">Get Your Free Quote</Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
              <Link href="/products">View Products</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm opacity-75">No obligation • Expert consultation • Same-day response</p>
        </div>
      </section>
    </div>
  )
}