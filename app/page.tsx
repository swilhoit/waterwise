import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Droplets, Home as HomeIcon, Leaf, DollarSign, TreePine, Users } from "lucide-react"
import { client, isSanityConfigured } from "@/lib/sanity"
import { getProducts } from "@/lib/shopify"
import { Testimonials } from "@/components/testimonials"

async function getHeroContent() {
  if (!isSanityConfigured()) {
    return null
  }
  try {
    const hero = await client.fetch(`*[_type == "hero"][0]{
      title,
      subtitle,
      ctaText,
      ctaLink,
      image
    }`)
    return hero
  } catch (error) {
    console.error('Failed to fetch hero content:', error)
    return null
  }
}

async function getBenefits() {
  if (!isSanityConfigured()) {
    return []
  }
  try {
    const benefits = await client.fetch(`*[_type == "benefit"] | order(order asc){
      title,
      description,
      icon
    }`)
    return benefits
  } catch (error) {
    console.error('Failed to fetch benefits:', error)
    return []
  }
}

const iconMap: { [key: string]: any } = {
  droplets: Droplets,
  dollar: DollarSign,
  leaf: Leaf,
  tree: TreePine,
  home: HomeIcon,
  users: Users,
}

export default async function Home() {
  const [hero, benefits, products] = await Promise.all([
    getHeroContent(),
    getBenefits(),
    getProducts()
  ])

  const defaultBenefits = [
    { title: "Save 50% on Water Usage", description: "Recycle water from showers, washing machines, and sinks to irrigate your garden", icon: "droplets" },
    { title: "Lower Your Water Bills", description: "Reduce monthly water costs by reusing greywater for landscape irrigation", icon: "dollar" },
    { title: "Eco-Friendly Solution", description: "Reduce strain on water treatment facilities and conserve precious freshwater resources", icon: "leaf" },
    { title: "Healthier Landscapes", description: "Greywater contains nutrients that benefit plants and promote lush growth", icon: "tree" },
    { title: "Perfect for Any Property", description: "Solutions for homes, tiny homes, cabins, RVs, and sustainable developments", icon: "home" },
    { title: "Trusted by Thousands", description: "Join our growing community of water-conscious property owners", icon: "users" }
  ]

  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {hero?.title || (
                  <>
                    Turn Every Drop Into A{" "}
                    <span className="text-gradient">Sustainable Solution</span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {hero?.subtitle || "Water Wise Group is on a mission to help you save water, lower your bills, and grow healthier landscapes—without compromising on simplicity or sustainability."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" asChild>
                  <Link href={hero?.ctaLink || "/products"}>
                    {hero?.ctaText || "Explore Systems"}
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
                className="rounded-lg shadow-2xl relative z-10 hover-lift"
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
                <Card key={index} className="hover-lift transition-all duration-300 hover:shadow-lg border-gray-100">
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
                <Card key={product.id} className="hover-lift transition-all duration-300 hover:shadow-lg">
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
              <Card className="hover-lift transition-all duration-300 hover:shadow-lg">
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

              <Card className="hover-lift transition-all duration-300 hover:shadow-lg">
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
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover-lift" asChild>
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