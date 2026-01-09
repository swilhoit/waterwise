import { getProducts } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Droplets, Home as HomeIcon, Building, Zap, Shield, Star, ArrowRight, ChevronRight, Truck, Award, Check, X, Leaf, Timer, Settings } from "lucide-react"
import { formatPriceDisplay } from '@/lib/price-utils'
import { CTASection } from '@/components/sections'

export const metadata = {
  title: 'Greywater Systems & Filters | Water Wise Group',
  description: 'Professional greywater recycling systems for homes, cabins, and commercial properties. Save up to 40% on water bills with our WaterMark-approved Aqua2use systems.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  const defaultProducts = [
    {
      id: "1",
      title: "Aqua2use Greywater Recycling System",
      description: "The most advanced greywater treatment system available. Choose from GWDD Gravity, GWDD Pump, or Pro configurations to match your needs. All feature patented 4-stage Matala filtration.",
      image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-gravity.jpg?v=1719242223",
      price: "From $599",
      handle: "aqua2use",
      badge: "Best Seller",
      badgeColor: "emerald",
      features: [
        "3 configurations: GWDD Gravity, Pump, or Pro",
        "Up to 90% solid removal efficiency",
        "17-25 GPM processing capacity",
        "Residential to commercial applications"
      ],
      specs: {
        capacity: "21-50 gal",
        flow: "17-25 GPM",
        configs: "3 options"
      }
    },
    {
      id: "3",
      title: "Replacement Filters",
      description: "Genuine Aqua2use progressive 4-stage Matala filters. Maintain peak filtration performance with easy tool-free replacement. Reusable for up to 3 years with proper care.",
      image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/aqua2use-replacement-filters.jpg?v=1719592368",
      price: "From $249",
      handle: "replacement-filters",
      badge: "Maintenance",
      badgeColor: "amber",
      features: [
        "Genuine OEM Matala filters",
        "Tool-free replacement",
        "Cleanable & reusable design",
        "15,850 gallons before cleaning"
      ],
      specs: {
        type: "4-Stage",
        life: "3 years",
        cleaning: "4-6 mo"
      }
    },
    {
      id: "4",
      title: "Replacement Pump Kit",
      description: "Direct OEM replacement pump with electronic controller for Aqua2use GWDD systems. Features dry run protection and automatic water level sensing for reliable operation.",
      image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Pump_Pack_GWDD.jpg?v=1742748645",
      price: "From $399",
      handle: "replacement-greywater-pump",
      badge: "Parts",
      badgeColor: "slate",
      features: [
        "Direct OEM replacement",
        "Electronic controller included",
        "Dry run protection",
        "12-month warranty"
      ],
      specs: {
        type: "Submersible",
        power: "110V",
        warranty: "12 mo"
      }
    }
  ]

  const displayProducts = products.length > 0 ? products : defaultProducts

  // Product comparison data
  const comparisonData = {
    headers: ['Feature', 'GWDD Gravity', 'GWDD Pump', 'Aqua2use Pro'],
    rows: [
      { feature: 'Processing Capacity', gwddGravity: '17 GPM', gwddPump: '17 GPM', pro: '25 GPM' },
      { feature: 'Tank Capacity', gwddGravity: '21 gallons', gwddPump: '21 gallons', pro: '50 gallons' },
      { feature: 'Solid Removal', gwddGravity: '90%', gwddPump: '75%', pro: '90%' },
      { feature: 'Power Required', gwddGravity: false, gwddPump: true, pro: true },
      { feature: 'Pump Included', gwddGravity: false, gwddPump: true, pro: true },
      { feature: 'Best For', gwddGravity: 'Homes with gravity flow', gwddPump: 'Flexible installations', pro: 'Commercial & multi-family' },
      { feature: 'Starting Price', gwddGravity: '$599', gwddPump: '$899', pro: '$2,699' },
    ]
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              WaterMark Approved Systems
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Greywater Systems</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Transform your household water waste into a sustainable resource. Our Aqua2use systems save up to 40% on water bills while nourishing your landscape.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">17K+</div>
                <div className="text-sm text-gray-600">Gallons Saved/Year</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">90%</div>
                <div className="text-sm text-gray-600">Solid Removal</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">40%</div>
                <div className="text-sm text-gray-600">Bill Savings</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12" asChild>
                <Link href="#products">
                  View All Systems
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50 px-8 h-12" asChild>
                <Link href="#comparison">
                  Compare Systems
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium">12-Month Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">WaterMark Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Greywater Systems
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of professional-grade systems designed for any application
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {displayProducts.map((product: any, index: number) => {
              const shortDescription = product.description?.length > 140 
                ? product.description.substring(0, 140).trim() + '...'
                : product.description;
              
              const badgeColors: Record<string, string> = {
                emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                blue: 'bg-blue-100 text-blue-800 border-blue-200',
                amber: 'bg-amber-100 text-amber-800 border-amber-200',
                slate: 'bg-slate-100 text-slate-800 border-slate-200',
              }

              return (
                <Card key={product.id || index} className="group relative flex flex-col overflow-hidden border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className={`${badgeColors[product.badgeColor] || badgeColors.slate} text-xs font-semibold px-2.5 py-1`}>
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <Link href={`/products/${product.handle}`} className="block">
                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-hidden">
                      <Image
                        src={product.images?.edges?.[0]?.node?.url || product.image}
                        alt={product.images?.edges?.[0]?.node?.altText || product.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        unoptimized
                      />
                    </div>
                  </Link>
                  
                  <CardHeader className="pb-2 flex-none">
                    <Link href={`/products/${product.handle}`} className="group/link">
                      <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug group-hover/link:text-blue-600 transition-colors">
                        {product.title}
                      </CardTitle>
                    </Link>
                    
                    {/* Price */}
                    <div className="mt-2">
                      {product.priceRange?.minVariantPrice ? (
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPriceDisplay(product.priceRange.minVariantPrice.amount, "From ")}
                        </span>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900">
                          {product.price}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col pt-0">
                    <CardDescription className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {shortDescription}
                    </CardDescription>
                    
                    {/* Quick Specs */}
                    {product.specs && (
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {Object.entries(product.specs).slice(0, 3).map(([key, value]: [string, any]) => (
                          <span key={key} className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                            {value}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Features List */}
                    {product.features && (
                      <ul className="space-y-1.5 mb-4 flex-1">
                        {product.features.slice(0, 3).map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-600 line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <Button asChild className="w-full bg-gray-900 hover:bg-gray-800 text-white mt-auto group/btn">
                      <Link href={`/products/${product.handle}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Greywater Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }} />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Greywater Makes Sense
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Up to 55% of household water is used for outdoor irrigation. Greywater recycling transforms your "waste" water into a valuable resource.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">17,000+</div>
              <div className="text-blue-100 text-sm">Gallons Saved Per Year</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">40%</div>
              <div className="text-blue-100 text-sm">Reduction in Water Bills</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">90%</div>
              <div className="text-blue-100 text-sm">Solid Removal Efficiency</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Timer className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">24hr</div>
              <div className="text-blue-100 text-sm">Fully Automated Operation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Comparison Table */}
      <section id="comparison" className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Compare Our Systems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect greywater system for your needs
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-5 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-5 px-6">
                      <div className="font-semibold text-gray-900">GWDD Gravity</div>
                      <div className="text-sm text-gray-500 mt-1">Entry Level</div>
                    </th>
                    <th className="text-center py-5 px-6 bg-blue-50 border-x border-blue-100">
                      <div className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
                        Popular
                      </div>
                      <div className="font-semibold text-gray-900">GWDD Pump</div>
                      <div className="text-sm text-gray-500 mt-1">Most Flexible</div>
                    </th>
                    <th className="text-center py-5 px-6">
                      <div className="font-semibold text-gray-900">Aqua2use Pro</div>
                      <div className="text-sm text-gray-500 mt-1">Commercial</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonData.rows.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.gwddGravity === 'boolean' ? (
                          row.gwddGravity ? (
                            <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700">{row.gwddGravity}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center bg-blue-50/50 border-x border-blue-100/50">
                        {typeof row.gwddPump === 'boolean' ? (
                          row.gwddPump ? (
                            <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700 font-medium">{row.gwddPump}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-700">{row.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t border-gray-200">
                    <td className="py-5 px-6"></td>
                    <td className="py-5 px-6 text-center">
                      <Button variant="outline" className="border-gray-300" asChild>
                        <Link href="/products/aqua2use">Learn More</Link>
                      </Button>
                    </td>
                    <td className="py-5 px-6 text-center bg-blue-50 border-x border-blue-100">
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href="/products/aqua2use">View Details</Link>
                      </Button>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <Button variant="outline" className="border-gray-300" asChild>
                        <Link href="/products/aqua2use">Learn More</Link>
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-6">
              {/* GWDD Card */}
              <Card className="border-gray-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <Badge className="w-fit bg-white/20 text-white border-white/30 mb-2">Popular Choice</Badge>
                  <CardTitle className="text-xl">Aqua2use GWDD</CardTitle>
                  <CardDescription className="text-blue-100">Gravity or Pump configurations</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Processing</span>
                      <span className="font-semibold">17 GPM</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Tank Capacity</span>
                      <span className="font-semibold">21 gallons</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Solid Removal</span>
                      <span className="font-semibold">Up to 90%</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Starting Price</span>
                      <span className="font-bold text-lg">$599</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/products/aqua2use">View Details</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Card */}
              <Card className="border-gray-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                  <Badge className="w-fit bg-white/20 text-white border-white/30 mb-2">Commercial</Badge>
                  <CardTitle className="text-xl">Aqua2use Pro</CardTitle>
                  <CardDescription className="text-gray-300">High-capacity commercial system</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Processing</span>
                      <span className="font-semibold">25 GPM</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Tank Capacity</span>
                      <span className="font-semibold">50 gallons</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Solid Removal</span>
                      <span className="font-semibold">90%</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Starting Price</span>
                      <span className="font-bold text-lg">$2,699</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-gray-900 hover:bg-gray-800" asChild>
                    <Link href="/products/aqua2use">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Which System Section */}
      <section className="py-16 lg:py-20 bg-white">
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
            <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600" />
              <CardHeader className="text-center pt-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <HomeIcon className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Homes & Cabins</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <p className="text-gray-600 mb-6">
                  Perfect for single-family homes, vacation cabins, tiny houses, and off-grid properties
                </p>
                <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-emerald-800 font-semibold">Recommended:</p>
                  <p className="text-emerald-900 font-bold">Aqua2use GWDD</p>
                </div>
                <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50" asChild>
                  <Link href="/products/aqua2use">
                    View System
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600" />
              <CardHeader className="text-center pt-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">High Usage Properties</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <p className="text-gray-600 mb-6">
                  Ideal for larger homes, guest houses, or properties with high water usage demands
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800 font-semibold">Recommended:</p>
                  <p className="text-blue-900 font-bold">Aqua2use GWDD Pump</p>
                </div>
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50" asChild>
                  <Link href="/products/aqua2use">
                    View System
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-600" />
              <CardHeader className="text-center pt-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Commercial Properties</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <p className="text-gray-600 mb-6">
                  Designed for apartments, hotels, developments, schools, and commercial buildings
                </p>
                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-purple-800 font-semibold">Recommended:</p>
                  <p className="text-purple-900 font-bold">Aqua2use Pro</p>
                </div>
                <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50" asChild>
                  <Link href="/products/aqua2use">
                    View System
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">Simple & Effective</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  How Greywater Recycling Works
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our Aqua2use systems automatically divert, filter, and distribute greywater from your laundry, shower, and bathroom sinks directly to your irrigation system.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Collect</h3>
                      <p className="text-gray-600">Divert water from laundry, bath, and shower into the treatment system</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Filter</h3>
                      <p className="text-gray-600">4-stage Matala filtration removes up to 90% of suspended solids</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Flourish</h3>
                      <p className="text-gray-600">Clean water flows to your subsurface drip irrigation automatically</p>
                    </div>
                  </div>
                </div>

                <Button className="mt-8 bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/how-it-works">
                    Learn More About the Process
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white border shadow-lg">
                  <Image
                    src="/docs/Aqua2use-How-It-Works.jpg"
                    alt="How Greywater Recycling Works"
                    fill
                    className="object-contain p-6"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Saving Water?"
        description="Get a personalized quote for your greywater recycling system. Our experts will help you choose the right solution for your property."
        variant="blue"
        buttons={[
          { label: "Get Your Free Quote", href: "/contact", variant: "secondary" },
          { label: "Learn How It Works", href: "/how-it-works", variant: "secondary" }
        ]}
      />
    </div>
  )
}
