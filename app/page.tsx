import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Droplets, Home as HomeIcon, Leaf, DollarSign, TreePine, Users, BookOpen, Shield, Wrench, Award, Globe, Mountain } from "lucide-react"
import { getProducts } from "@/lib/shopify"
import { Testimonials } from "@/components/testimonials"


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
    { title: "Healthier Landscapes", description: "Greywater contains nutrients that benefit plants and promote lush growth", icon: "tree" },
    { title: "Perfect for Any Property", description: "Solutions for homes, tiny homes, cabins, RVs, and sustainable developments", icon: "home" },
    { title: "Trusted by Thousands", description: "Join our growing community of water-conscious property owners", icon: "users" }
  ]

  const displayBenefits = defaultBenefits

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
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
                <Button size="lg" asChild>
                  <Link href="/products">
                    Explore Systems
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Easy Installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">50% Water Savings</span>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-2xl opacity-20" />
              <Image
                src="/images/aqua2use-greywater-recycling-sytem.png"
                alt="Aqua2use Greywater System"
                width={600}
                height={400}
                className="rounded-lg relative z-10 hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
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
              Why Choose Greywater Recycling?
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
                    <IconComponent className="h-10 w-10 text-blue-600 mb-4" />
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

      <section className="py-20 bg-gray-50">
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
                      <div className="text-2xl font-bold text-blue-600 mb-4">
                        From ${product.priceRange.minVariantPrice.amount}
                      </div>
                    )}
                    <Button className="w-full" asChild>
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
                  <Button className="w-full mt-6" asChild>
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
                  <Button className="w-full mt-6" asChild>
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
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="/images/maxresdefault.jpg"
                alt="How Greywater Works Video"
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Collect</h3>
                <p className="text-gray-600">
                  Water from showers, washing machines, and sinks flows to the system
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Filter</h3>
                <p className="text-gray-600">
                  Progressive filtration removes particles and prepares water for reuse
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
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

      <section className="py-20 bg-blue-50">
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
                <BookOpen className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>What is Greywater?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Learn the basics of greywater recycling and how it can benefit your home
                </CardDescription>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/what-is-greywater">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Wrench className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Understand the process and technology behind greywater systems
                </CardDescription>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/how-it-works">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>State Laws</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Check your state's greywater regulations and permit requirements
                </CardDescription>
                <Button variant="outline" asChild className="w-full">
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
              Perfect for Every Situation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our greywater systems adapt to your specific needs and living situation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-lift transition-all duration-300 text-center">
              <CardHeader>
                <HomeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Tiny Homes & RVs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Compact systems designed for mobile living and small spaces
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/tiny-house-systems">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300 text-center">
              <CardHeader>
                <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Drought Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Maximize water conservation in water-scarce regions
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/solutions">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300 text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Septic Homes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Reduce load on septic systems and extend their lifespan
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/solutions">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300 text-center">
              <CardHeader>
                <Mountain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Remote Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Self-sufficient water solutions for off-grid properties
                </CardDescription>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/solutions/remote-work-sites">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
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
              <div className="text-4xl lg:text-6xl font-bold text-blue-600 mb-2">50%</div>
              <div className="text-lg font-semibold mb-2">Water Savings</div>
              <div className="text-gray-600">Average household water usage reduction</div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-green-600 mb-2">15K</div>
              <div className="text-lg font-semibold mb-2">Gallons/Year</div>
              <div className="text-gray-600">Water recycled by typical system</div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-purple-600 mb-2">$300</div>
              <div className="text-lg font-semibold mb-2">Annual Savings</div>
              <div className="text-gray-600">Average yearly water bill reduction</div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-orange-600 mb-2">75%</div>
              <div className="text-lg font-semibold mb-2">Less Strain</div>
              <div className="text-gray-600">Reduced load on water treatment plants</div>
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
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
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
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
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
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
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

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Installation & Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional installation and ongoing support when you need it
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Wrench className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Professional Installation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Certified installer network nationwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Complete site assessment included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Permit assistance and compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>System testing and commissioning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Ongoing Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>24/7 technical support hotline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Annual maintenance programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Replacement parts readily available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Performance monitoring and optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
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
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold hover-lift" asChild>
              <Link href="/contact">Get Your Free Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
              <Link href="/products">View Products</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm opacity-75">No obligation • Expert consultation • Same-day response</p>
        </div>
      </section>
    </div>
  )
}