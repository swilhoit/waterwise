import { getProducts } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Droplets, Home as HomeIcon, Building } from "lucide-react"
import { QuickAddToCart } from './quick-add-to-cart'

export default async function ProductsPage() {
  const products = await getProducts()

  const defaultProducts = [
    {
      id: "1",
      title: "Aqua2use GWDD Gravity System",
      description: "Perfect for homes and cabins with gravity-fed water systems. Processes up to 150 gallons per day with our progressive filtration technology.",
      image: "/images/gwdd-gravity.jpg",
      price: "From $1,999",
      handle: "aqua2use-gwdd",
      features: [
        "Gravity-fed operation - no electricity required",
        "Processes up to 150 gallons per day",
        "Progressive 3-stage filtration system",
        "Perfect for homes, cabins, and off-grid properties"
      ]
    },
    {
      id: "2", 
      title: "Aqua2use GWDD Pump System",
      description: "Ideal when gravity flow isn't possible. Includes a reliable pump system for versatile installation options.",
      image: "/images/gwdd-ug.jpg",
      price: "From $2,299",
      handle: "aqua2use-gwdd-pump",
      features: [
        "Built-in pump for flexible installation",
        "Processes up to 150 gallons per day", 
        "Progressive 3-stage filtration system",
        "Perfect when gravity feed isn't available"
      ]
    },
    {
      id: "3",
      title: "Aqua2use Pro Commercial System", 
      description: "High-capacity system designed for larger properties, multi-family units, and commercial applications.",
      image: "/images/gwdd-ug.jpg",
      price: "From $3,999",
      handle: "aqua2use-pro",
      features: [
        "High-capacity processing up to 500 gallons per day",
        "Advanced multi-stage filtration technology",
        "Commercial-grade components and construction",
        "Perfect for apartments, hotels, and developments"
      ]
    },
    {
      id: "4",
      title: "Replacement Filters",
      description: "Keep your Aqua2use system running at peak performance with genuine replacement filters.",
      image: "/images/gwdd-gravity.jpg", 
      price: "From $89",
      handle: "filters",
      features: [
        "Genuine Aqua2use replacement filters",
        "3-stage filtration: Coarse, Fine, and Carbon",
        "Easy to replace - no tools required",
        "Recommended replacement every 6-12 months"
      ]
    }
  ]

  const displayProducts = products.length > 0 ? products : defaultProducts

  return (
    <div>
      <section className="relative bg-white py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              Our <span className="text-gradient">Greywater Systems</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              Professional-grade greywater recycling systems designed for easy installation and maximum water savings.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-8">
            {displayProducts.map((product: any, index: number) => (
              <Card key={product.id || index} className="hover-lift transition-all duration-300">
                <CardHeader>
                  <Link href={`/products/${product.handle}`} className="block">
                    <div className="relative mb-4 aspect-square h-64">
                      <Image
                        src={product.images?.edges?.[0]?.node?.url || product.image}
                        alt={product.images?.edges?.[0]?.node?.altText || product.title}
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>
                  </Link>
                  <Link href={`/products/${product.handle}`} className="hover:text-blue-600 transition-colors">
                    <CardTitle className="text-2xl">{product.title}</CardTitle>
                  </Link>
                  <CardDescription className="text-lg">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {product.priceRange?.minVariantPrice ? (
                    <div className="text-2xl font-bold text-gray-600 mb-4">
                      From ${Math.round(parseFloat(product.priceRange.minVariantPrice.amount))}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-600 mb-4">
                      {product.price}
                    </div>
                  )}
                  
                  {product.features && (
                    <ul className="space-y-2 mb-6">
                      {product.features.slice(0, 4).map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {!product.variants && (
                    <QuickAddToCart product={product} />
                  )}
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
              Which System is Right for You?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect greywater system based on your property type and water usage needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <HomeIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <CardTitle>Homes & Cabins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Perfect for single-family homes, vacation cabins, and off-grid properties
                </p>
                <p className="text-sm text-gray-600 font-semibold">Recommended: Aqua2use GWDD</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <Droplets className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <CardTitle>High Usage Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Ideal for larger homes, guest houses, or properties with high water usage
                </p>
                <p className="text-sm text-gray-600 font-semibold">Recommended: Aqua2use Pro</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <Building className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <CardTitle>Commercial Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Designed for apartments, hotels, developments, and commercial buildings
                </p>
                <p className="text-sm text-gray-600 font-semibold">Recommended: Aqua2use Pro</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Not sure which system is right for you? Our experts are here to help.
            </p>
            <Button size="lg" asChild className="bg-black hover:bg-gray-800 text-white">
              <Link href="/contact">Get Expert Recommendation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Start Saving Water?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Get a personalized quote for your greywater recycling system today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold hover-lift" asChild>
              <Link href="/contact">Get Your Free Quote</Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}