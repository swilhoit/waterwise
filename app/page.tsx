import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Droplets, Home as HomeIcon, Leaf, DollarSign, TreePine, Users, BookOpen, Shield, Wrench, Award, Globe, Mountain, Play, XCircle, AlertTriangle } from "lucide-react"
import { getProducts } from "@/lib/shopify"
import { Testimonials } from "@/components/testimonials"
import { ComparisonTable } from "@/components/compare-table"
import { formatPriceDisplay } from "@/lib/price-utils"
import { BlogCarousel } from "@/components/blog-carousel"
import { getBlogArticles } from "@/lib/shopify"


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
  
  let blogPosts: any[] = []
  try {
    const shopifyArticles = await getBlogArticles()
    if (shopifyArticles && shopifyArticles.length > 0) {
      blogPosts = shopifyArticles.map((article: any) => ({
        id: article.id,
        title: article.title,
        excerpt:
          article.summary_html ||
          (article.body_html ? article.body_html.replace(/<[^>]*>/g, '').substring(0, 150).trim() + '...' : ''),
        image: article.image?.src || "/images/gwdd-gravity.jpg",
        author: article.author || "Water Wise Team",
        date: article.published_at
          ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          : undefined,
        slug: article.handle || `article-${article.id}`,
      }))
    }
  } catch (error) {
    console.error('Failed to load blog posts from Shopify:', error)
  }

  const defaultBenefits = [
    { title: "Save 50% on Water Usage", description: "Recycle water from showers, washing machines, and sinks to irrigate your garden", icon: "droplets" },
    { title: "Lower Your Water Bills", description: "Reduce monthly water costs by reusing greywater for landscape irrigation", icon: "dollar" },
    { title: "Eco-Friendly Solution", description: "Reduce strain on water treatment facilities and conserve precious freshwater resources", icon: "leaf" },
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
                <div className="bg-white rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
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

      {/* Featured Customer Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real families achieving remarkable water savings with our systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Link href="/customer-stories/california-homeowner" className="group">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                <div className="relative h-64">
                  <Image
                    src="/images/customer-stories/california-family.jpg"
                    alt="California family home with greywater system"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <Badge className="bg-green-600 text-white mb-3">45% Water Savings</Badge>
                    <h3 className="text-2xl font-bold mb-2">California Homeowner</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">
                    "The Aqua2use system has been a game-changer for our family. In drought-stricken California, 
                    we've reduced our water bill by 45% while keeping our garden thriving. The installation was 
                    straightforward, and the system has been maintenance-free for over two years."
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>The Johnson Family</strong> • San Diego, CA
                  </p>
                  <div className="mt-4 text-blue-600 font-semibold group-hover:text-blue-700 flex items-center gap-2">
                    Read Full Story 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/customer-stories/arizona-desert-oasis" className="group">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                <div className="relative h-64">
                  <Image
                    src="/images/customer-stories/arizona-oasis.jpg"
                    alt="Arizona desert garden with greywater irrigation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <Badge className="bg-blue-600 text-white mb-3">60% Less Water</Badge>
                    <h3 className="text-2xl font-bold mb-2">Arizona Desert Oasis</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">
                    "Living in Phoenix, water conservation is essential. Our Aqua2use Pro system allows us to 
                    maintain our desert oasis using 60% less water. The native plants and fruit trees are 
                    thriving on recycled water from our showers and washing machine."
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>The Martinez Family</strong> • Phoenix, AZ
                  </p>
                  <div className="mt-4 text-blue-600 font-semibold group-hover:text-blue-700 flex items-center gap-2">
                    Read Full Story 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Button size="lg" variant="outline" asChild>
              <Link href="/customer-stories">View All Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Greywater & Irrigation Guidelines */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Greywater & Irrigation Guidelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Check which household water sources are suitable for greywater reuse
            </p>
          </div>

          {/* Category: Greywater Collection */}
          <div className="max-w-5xl mx-auto mb-4 text-center">
            <h3 className="text-xl font-semibold text-gray-800">Greywater Sources</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Laundry - Approved */}
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>Laundry</CardTitle>
                  <Badge className="bg-green-600 text-white border-transparent">Approved</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Laundry water is typically ideal for reuse when using biodegradable, low-sodium detergents.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Kitchen & Toilet - Not Approved */}
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>Kitchen & Toilet</CardTitle>
                  <Badge className="bg-red-600 text-white border-transparent">Not Approved</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Kitchen water contains fats, oils, and food waste; toilets are blackwater. Do not reuse.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Bathroom Sink & Shower - Approved with Permits */}
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>Bathroom Sink & Shower</CardTitle>
                  <Badge className="bg-amber-500 text-white border-transparent">Approved with Permits</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Often allowed for landscape irrigation with a compliant system. Permits may be required depending on your location.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Category: Greywater Irrigation */}
          <div className="max-w-4xl mx-auto mt-12 mb-4 text-center">
            <h3 className="text-xl font-semibold text-gray-800">Greywater Irrigation</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            {/* Above Ground Irrigation - Not Approved */}
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>Above Ground Irrigation</CardTitle>
                  <Badge className="bg-red-600 text-white border-transparent">Not Approved</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sprinklers or surface watering can aerosolize water. Most codes prohibit above-ground greywater irrigation.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Underground Irrigation - Approved */}
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>Underground Irrigation</CardTitle>
                  <Badge className="bg-green-600 text-white border-transparent">Approved</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Subsurface drip or mulch basins deliver water below the surface, minimizing exposure and meeting code in most regions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Always verify local regulations. See <a className="underline" href="/greywater-laws">state greywater laws</a>.
          </p>
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

      {/* Removed: Why Choose Greywater Recycling section */}

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
            <ComparisonTable
              className="max-w-5xl mx-auto"
              products={products.slice(0, 2).map((p: any) => ({
                title: p.title,
                handle: p.handle,
                priceText: p.priceRange?.minVariantPrice
                  ? formatPriceDisplay(p.priceRange.minVariantPrice.amount, "From ")
                  : undefined,
              }))}
            />
          ) : (
            <ComparisonTable
              className="max-w-5xl mx-auto"
              products={[
                { title: "Aqua2use GWDD", handle: "aqua2use-gwdd" },
                { title: "Aqua2use Pro", handle: "aqua2use-pro" },
              ]}
            />
          )}

          {/* Cards removed; comparison table is the primary UI */}
        </div>
      </section>


      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Directory
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find local resources, regulations, and financial incentives for greywater systems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Shield className="h-10 w-10 text-amber-600 mb-4" />
                <CardTitle>State Laws</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Check your state's greywater regulations, permit requirements, and compliance guidelines
                </CardDescription>
                <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                  <Link href="/greywater-laws">View State Laws</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Local Installers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Find certified greywater system installers and contractors in your area
                </CardDescription>
                <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                  <Link href="/installers">Find Installers</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <DollarSign className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Rebates & Incentives</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Discover financial incentives, tax credits, and rebate programs in your area
                </CardDescription>
                <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                  <Link href="/rebates">View Incentives</Link>
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

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            <Link href="/tiny-house-systems" className="group block">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
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

            <Link href="/solutions/multifamily-homes" className="group block">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
                <div className="relative h-64">
                  <Image 
                    src="/images/solutions/homes-ai.jpg" 
                    alt="Multifamily homes" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Multifamily Homes</h3>
                    <p className="text-sm text-gray-200">
                      Scalable systems for apartments, condos, and townhome communities
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/solutions/commercial" className="group block">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
                <div className="relative h-64">
                  <Image 
                    src="/images/solutions/commercial-ai.jpg" 
                    alt="Commercial properties" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Commercial Properties</h3>
                    <p className="text-sm text-gray-200">
                      Engineered reuse for hotels, gyms, laundries, schools and more
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/solutions" className="group block">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
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
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
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
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about greywater systems
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Is greywater safe to use?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Yes, when properly filtered and treated, greywater is safe for irrigation and non-potable uses. Our systems use multi-stage filtration to remove contaminants and meet all health department standards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How much water can I save?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Most households save 40-50% on their water usage. A typical family of four can recycle 15,000-20,000 gallons per year, saving hundreds of dollars on water bills.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Do I need a permit?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Permit requirements vary by state and local jurisdiction. Many areas allow simple laundry-to-landscape systems without permits, while others require permits for all greywater systems. We help navigate local regulations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How long does installation take?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Most residential installations take 1-2 days. Simple laundry-to-landscape systems can often be installed in a few hours, while whole-house systems may take longer depending on complexity.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What maintenance is required?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our systems are designed for minimal maintenance. Filter replacement every 6-12 months and periodic system checks are typically all that's needed. We offer maintenance programs for hands-off operation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Blog carousel - only show if we have real articles */}
      {blogPosts.length > 0 && (
        <BlogCarousel posts={blogPosts.slice(0, 12)} title="Greywater Resources" />
      )}

      <section className="py-24 bg-gradient-to-r from-slate-500 via-gray-500 to-stone-500 text-white relative overflow-hidden">
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