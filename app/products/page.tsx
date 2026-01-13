import { getProducts } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Droplets, Home as HomeIcon, Building, Zap, Shield, Star, ArrowRight, ChevronRight, Truck, Award, Check, X, Leaf, Timer, Settings, Waves, ArrowUpRight } from "lucide-react"
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
      badgeColor: "ocean",
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
      badgeColor: "sand",
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
      badgeColor: "terra",
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

  // Featured accessories for hero section
  const featuredAccessories = {
    dripKit: {
      title: "Drip Irrigation Kit",
      description: "Complete subsurface drip system for greywater distribution",
      image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Aqua2use-GWDD-components.jpg?v=1719252978",
      price: "$199",
      handle: "drip-irrigation-kit",
      badge: "Essential",
      features: ["250 ft tubing", "Pressure regulated", "Easy install"]
    },
    pump: {
      title: "Replacement Pump",
      description: "OEM pump with controller & dry run protection",
      image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Pump_Pack_GWDD.jpg?v=1742748645",
      price: "$399",
      handle: "replacement-greywater-pump",
      badge: "Parts",
      features: ["12-mo warranty", "110V power", "Auto sensing"]
    }
  }

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
      { feature: 'Best For', gwddGravity: 'Gravity-fed homes', gwddPump: 'Flexible installs', pro: 'Commercial use' },
      { feature: 'Starting Price', gwddGravity: '$599', gwddPump: '$899', pro: '$2,699' },
    ]
  }

  return (
    <div className="bg-sand-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-ocean-100 text-ocean-700 px-4 py-2 rounded-full text-sm font-medium border border-ocean-200">
                <Award className="h-4 w-4 text-ocean-600" />
                WaterMark Approved Systems
              </div>

              <h1 className="text-display-lg lg:text-display-xl font-display text-sand-900 leading-none">
                Reclaim Your
                <span className="block text-ocean-600">Water</span>
              </h1>

              <p className="text-xl text-sand-600 leading-relaxed max-w-lg">
                Transform household greywater into a sustainable resource. Save up to 40% on water bills while nourishing your landscape.
              </p>

              {/* Stats row */}
              <div className="flex gap-10 py-6 border-y border-sand-200">
                <div>
                  <div className="text-3xl font-bold text-sand-900">17K<span className="text-ocean-600">+</span></div>
                  <div className="text-sm text-sand-500">Gallons/Year</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sand-900">90<span className="text-ocean-600">%</span></div>
                  <div className="text-sm text-sand-500">Filtration</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sand-900">40<span className="text-ocean-600">%</span></div>
                  <div className="text-sm text-sand-500">Bill Savings</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link href="#products" className="btn-primary text-lg px-8 py-4 group">
                  View Systems
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#comparison" className="btn-secondary px-8 py-4">
                  Compare Options
                </Link>
              </div>
            </div>

            {/* Right: Featured Greywater System Card */}
            <div className="relative">
              <Link href="/products/aqua2use" className="group block">
                <div className="bg-white rounded-3xl p-8 border border-sand-200">
                  <div className="absolute -top-3 -right-3 badge-terra">
                    <Star className="h-3 w-3 fill-current" />
                    Best Seller
                  </div>

                  <div className="aspect-square relative mb-6 bg-sand-50 rounded-2xl overflow-hidden">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-gravity.jpg?v=1719242223"
                      alt="Aqua2use GWDD System"
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      priority
                      unoptimized
                    />
                  </div>

                  <h3 className="text-2xl font-display text-sand-900 mb-2 group-hover:text-ocean-600 transition-colors">Aqua2use GWDD</h3>
                  <p className="text-sand-600 mb-4">Complete greywater recycling system with 4-stage Matala filtration</p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-sand-100 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-ocean-600">21</div>
                      <div className="text-xs text-sand-600">Gal Tank</div>
                    </div>
                    <div className="bg-sand-100 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-ocean-600">17</div>
                      <div className="text-xs text-sand-600">GPM Flow</div>
                    </div>
                    <div className="bg-sand-100 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-ocean-600">90%</div>
                      <div className="text-xs text-sand-600">Filtration</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-sand-500">Starting at</span>
                      <div className="text-3xl font-bold text-ocean-600">$599</div>
                    </div>
                    <span className="btn-primary">
                      View Details
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Accessories Row */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Drip Kit */}
            <Link href={`/products/${featuredAccessories.dripKit.handle}`} className="group">
              <div className="bg-white rounded-xl p-4 border border-sand-200 hover:border-ocean-200 transition-all h-full flex items-center gap-4">
                <div className="w-20 h-20 flex-shrink-0 bg-sand-100 rounded-lg overflow-hidden relative">
                  <Image
                    src={featuredAccessories.dripKit.image}
                    alt={featuredAccessories.dripKit.title}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sand-900 group-hover:text-ocean-600 transition-colors">{featuredAccessories.dripKit.title}</h4>
                  <p className="text-sm text-sand-500 truncate">{featuredAccessories.dripKit.description}</p>
                  <div className="text-lg font-bold text-ocean-600 mt-1">{featuredAccessories.dripKit.price}</div>
                </div>
              </div>
            </Link>

            {/* Replacement Pump */}
            <Link href={`/products/${featuredAccessories.pump.handle}`} className="group">
              <div className="bg-white rounded-xl p-4 border border-sand-200 hover:border-terra-200 transition-all h-full flex items-center gap-4">
                <div className="w-20 h-20 flex-shrink-0 bg-sand-100 rounded-lg overflow-hidden relative">
                  <Image
                    src={featuredAccessories.pump.image}
                    alt={featuredAccessories.pump.title}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sand-900 group-hover:text-terra-600 transition-colors">{featuredAccessories.pump.title}</h4>
                  <p className="text-sm text-sand-500 truncate">{featuredAccessories.pump.description}</p>
                  <div className="text-lg font-bold text-terra-600 mt-1">{featuredAccessories.pump.price}</div>
                </div>
              </div>
            </Link>

            {/* Replacement Filters */}
            <Link href="/products/replacement-filters" className="group">
              <div className="bg-white rounded-xl p-4 border border-sand-200 hover:border-sand-300 transition-all h-full flex items-center gap-4">
                <div className="w-20 h-20 flex-shrink-0 bg-sand-100 rounded-lg overflow-hidden relative">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0637/5561/6462/files/aqua2use-replacement-filters.jpg?v=1719592368"
                    alt="Replacement Filters"
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sand-900 group-hover:text-sand-700 transition-colors">Replacement Filters</h4>
                  <p className="text-sm text-sand-500 truncate">4-stage Matala filters</p>
                  <div className="text-lg font-bold text-sand-700 mt-1">$249</div>
                </div>
              </div>
            </Link>

            {/* View All */}
            <Link href="#products" className="group">
              <div className="bg-ocean-50 rounded-xl p-4 border border-ocean-200 hover:bg-ocean-100 transition-all h-full flex items-center justify-center gap-3">
                <span className="font-display text-ocean-700">View All Products</span>
                <ArrowRight className="h-5 w-5 text-ocean-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-sand-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            <div className="flex items-center gap-3 text-sand-700">
              <div className="w-10 h-10 rounded-xl bg-ocean-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-ocean-600" />
              </div>
              <span className="font-medium">12-Month Warranty</span>
            </div>
            <div className="flex items-center gap-3 text-sand-700">
              <div className="w-10 h-10 rounded-xl bg-ocean-100 flex items-center justify-center">
                <Truck className="h-5 w-5 text-ocean-600" />
              </div>
              <span className="font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-sand-700">
              <div className="w-10 h-10 rounded-xl bg-terra-100 flex items-center justify-center">
                <Star className="h-5 w-5 text-terra-600 fill-current" />
              </div>
              <span className="font-medium">5-Star Rated</span>
            </div>
            <div className="flex items-center gap-3 text-sand-700">
              <div className="w-10 h-10 rounded-xl bg-ocean-100 flex items-center justify-center">
                <Award className="h-5 w-5 text-ocean-600" />
              </div>
              <span className="font-medium">WaterMark Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Bento Grid Layout */}
      <section id="products" className="section-padding bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="line-accent mx-auto mb-6" />
            <h2 className="text-display-md font-display text-sand-900 mb-4">
              Our Greywater Systems
            </h2>
            <p className="text-xl text-sand-600">
              Professional-grade water recycling solutions for every application
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Featured Product - Large Card */}
            <div className="lg:col-span-2 lg:row-span-2">
              <div className="card-elevated h-full p-8 group">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="badge-ocean">
                      <Droplets className="h-3 w-3" />
                      Featured System
                    </span>
                    <span className="badge-terra">
                      <Star className="h-3 w-3 fill-current" />
                      Best Seller
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 flex-1">
                    <div className="relative aspect-square bg-gradient-to-br from-sand-50 to-sand-100 rounded-2xl overflow-hidden">
                      <Image
                        src={displayProducts[0]?.images?.edges?.[0]?.node?.url || displayProducts[0]?.image || "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-gravity.jpg?v=1719242223"}
                        alt="Aqua2use System"
                        fill
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl font-display text-sand-900 mb-3">
                          {displayProducts[0]?.title || "Aqua2use Greywater System"}
                        </h3>
                        <p className="text-sand-600 mb-6 leading-relaxed">
                          {displayProducts[0]?.description?.substring(0, 180)}...
                        </p>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                          <div className="bg-sand-100 rounded-xl p-3 text-center">
                            <div className="text-lg font-bold text-ocean-600">21-50</div>
                            <div className="text-xs text-sand-600">Gal Capacity</div>
                          </div>
                          <div className="bg-sand-100 rounded-xl p-3 text-center">
                            <div className="text-lg font-bold text-ocean-600">17-25</div>
                            <div className="text-xs text-sand-600">GPM Flow</div>
                          </div>
                          <div className="bg-sand-100 rounded-xl p-3 text-center">
                            <div className="text-lg font-bold text-ocean-600">90%</div>
                            <div className="text-xs text-sand-600">Solid Removal</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-sm text-sand-500">Starting at</span>
                          <div className="text-4xl font-bold text-sand-900">
                            {displayProducts[0]?.priceRange?.minVariantPrice ?
                              formatPriceDisplay(displayProducts[0].priceRange.minVariantPrice.amount) :
                              "$599"}
                          </div>
                        </div>
                        <Link
                          href={`/products/${displayProducts[0]?.handle || 'aqua2use'}`}
                          className="btn-primary text-lg"
                        >
                          View Options
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Products - Compact Cards */}
            {displayProducts.slice(1, 3).map((product: any, index: number) => (
              <div key={product.id || index} className="card-premium group">
                <Link href={`/products/${product.handle}`} className="block p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`badge-${product.badgeColor || 'sand'}`}>
                      {product.badge || 'Product'}
                    </span>
                  </div>

                  <div className="relative aspect-[4/3] bg-gradient-to-br from-sand-50 to-sand-100 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={product.images?.edges?.[0]?.node?.url || product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  <h3 className="text-xl font-display text-sand-900 mb-2 group-hover:text-ocean-600 transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-sm text-sand-600 mb-4 line-clamp-2">
                    {product.description?.substring(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-sand-200">
                    <div>
                      <span className="text-xs text-sand-500">From</span>
                      <div className="text-2xl font-bold text-sand-900">
                        {product.priceRange?.minVariantPrice ?
                          formatPriceDisplay(product.priceRange.minVariantPrice.amount) :
                          product.price}
                      </div>
                    </div>
                    <span className="text-ocean-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Details <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Greywater Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-ocean-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="badge-ocean bg-white/10 border-white/20 text-white mb-6">
              <Leaf className="h-3 w-3" />
              Water Conservation
            </span>
            <h2 className="text-display-md font-display text-white mb-4">
              Why Greywater Makes Sense
            </h2>
            <p className="text-xl text-ocean-200">
              Up to 55% of household water goes to outdoor irrigation. Transform that waste into a resource.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Droplets, stat: "17,000+", label: "Gallons Saved Annually", color: "ocean" },
              { icon: Zap, stat: "40%", label: "Water Bill Reduction", color: "terra" },
              { icon: Leaf, stat: "90%", label: "Solid Removal Rate", color: "ocean" },
              { icon: Timer, stat: "24hr", label: "Automated Operation", color: "terra" },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 hover:bg-white/15 transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`h-7 w-7 text-${item.color}-400`} />
                </div>
                <div className="stat-number text-white mb-2">{item.stat}</div>
                <div className="text-ocean-200 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Comparison - Clean Table with Highlighted Column */}
      <section id="comparison" className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="line-accent mx-auto mb-6" />
            <h2 className="text-display-md font-display text-sand-900 mb-4">
              Compare Systems
            </h2>
            <p className="text-xl text-sand-600">
              Find the perfect greywater system for your needs
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-hidden rounded-3xl border border-sand-200 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="bg-sand-50">
                    <th className="text-left py-6 px-8 font-display text-lg text-sand-900">Feature</th>
                    <th className="text-center py-6 px-6">
                      <div className="font-display text-lg text-sand-900">GWDD Gravity</div>
                      <div className="text-sm text-sand-500 mt-1">Entry Level</div>
                    </th>
                    <th className="text-center py-6 px-6 bg-ocean-50 relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-400 to-terra-400" />
                      <span className="badge-terra mb-2">Most Popular</span>
                      <div className="font-display text-lg text-sand-900">GWDD Pump</div>
                      <div className="text-sm text-sand-500 mt-1">Most Flexible</div>
                    </th>
                    <th className="text-center py-6 px-6">
                      <div className="font-display text-lg text-sand-900">Aqua2use Pro</div>
                      <div className="text-sm text-sand-500 mt-1">Commercial</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100">
                  {comparisonData.rows.map((row, index) => (
                    <tr key={index} className="hover:bg-sand-50/50 transition-colors">
                      <td className="py-5 px-8 font-medium text-sand-900">{row.feature}</td>
                      <td className="py-5 px-6 text-center">
                        {typeof row.gwddGravity === 'boolean' ? (
                          row.gwddGravity ? (
                            <Check className="h-5 w-5 text-ocean-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-sand-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-sand-700">{row.gwddGravity}</span>
                        )}
                      </td>
                      <td className="py-5 px-6 text-center bg-ocean-50/50">
                        {typeof row.gwddPump === 'boolean' ? (
                          row.gwddPump ? (
                            <Check className="h-5 w-5 text-ocean-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-sand-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-sand-900 font-semibold">{row.gwddPump}</span>
                        )}
                      </td>
                      <td className="py-5 px-6 text-center">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <Check className="h-5 w-5 text-ocean-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-sand-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-sand-700">{row.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-sand-50">
                    <td className="py-6 px-8"></td>
                    <td className="py-6 px-6 text-center">
                      <Link href="/products/aqua2use" className="btn-secondary text-sm">
                        Learn More
                      </Link>
                    </td>
                    <td className="py-6 px-6 text-center bg-ocean-50">
                      <Link href="/products/aqua2use" className="btn-primary text-sm">
                        View Details
                      </Link>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <Link href="/products/aqua2use" className="btn-secondary text-sm">
                        Learn More
                      </Link>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-6">
              {/* GWDD Card */}
              <div className="card-elevated overflow-hidden">
                <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 p-6 text-white">
                  <span className="badge-terra mb-3">Most Popular</span>
                  <h3 className="text-2xl font-display">Aqua2use GWDD</h3>
                  <p className="text-ocean-100 text-sm mt-1">Gravity or Pump configurations</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between py-3 border-b border-sand-100">
                    <span className="text-sand-600">Processing</span>
                    <span className="font-semibold text-sand-900">17 GPM</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-sand-100">
                    <span className="text-sand-600">Tank Capacity</span>
                    <span className="font-semibold text-sand-900">21 gallons</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-sand-100">
                    <span className="text-sand-600">Solid Removal</span>
                    <span className="font-semibold text-sand-900">Up to 90%</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-sand-600">Starting Price</span>
                    <span className="font-bold text-2xl text-ocean-600">$599</span>
                  </div>
                  <Link href="/products/aqua2use" className="btn-primary w-full justify-center mt-4">
                    View Details
                  </Link>
                </div>
              </div>

              {/* Pro Card */}
              <div className="card-premium overflow-hidden">
                <div className="bg-gradient-to-r from-sand-800 to-sand-900 p-6 text-white">
                  <span className="badge-sand bg-white/10 border-white/20 text-white mb-3">Commercial</span>
                  <h3 className="text-2xl font-display">Aqua2use Pro</h3>
                  <p className="text-sand-300 text-sm mt-1">High-capacity commercial system</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between py-3 border-b border-sand-100">
                    <span className="text-sand-600">Processing</span>
                    <span className="font-semibold text-sand-900">25 GPM</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-sand-100">
                    <span className="text-sand-600">Tank Capacity</span>
                    <span className="font-semibold text-sand-900">50 gallons</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-sand-100">
                    <span className="text-sand-600">Solid Removal</span>
                    <span className="font-semibold text-sand-900">90%</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-sand-600">Starting Price</span>
                    <span className="font-bold text-2xl text-sand-900">$2,699</span>
                  </div>
                  <Link href="/products/aqua2use" className="btn-secondary w-full justify-center mt-4">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Which System Section - Varied Card Layout */}
      <section className="section-padding bg-sand-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="line-accent mx-auto mb-6" />
            <h2 className="text-display-md font-display text-sand-900 mb-4">
              Which System is Right for You?
            </h2>
            <p className="text-xl text-sand-600">
              Choose based on your property type and water usage needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: HomeIcon,
                title: "Homes & Cabins",
                description: "Perfect for single-family homes, vacation cabins, tiny houses, and off-grid properties",
                recommendation: "Aqua2use GWDD",
                color: "ocean",
                gradient: "from-ocean-500 to-ocean-600"
              },
              {
                icon: Droplets,
                title: "High Usage",
                description: "Ideal for larger homes, guest houses, or properties with high water usage demands",
                recommendation: "GWDD Pump",
                color: "terra",
                gradient: "from-terra-500 to-terra-600"
              },
              {
                icon: Building,
                title: "Commercial",
                description: "Designed for apartments, hotels, schools, and commercial buildings",
                recommendation: "Aqua2use Pro",
                color: "sand",
                gradient: "from-sand-700 to-sand-800"
              }
            ].map((item, index) => (
              <div key={index} className="group card-premium hover:border-ocean-200">
                <div className={`h-2 bg-gradient-to-r ${item.gradient}`} />
                <div className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-${item.color}-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                  </div>

                  <h3 className="text-xl font-display text-sand-900 mb-3">{item.title}</h3>
                  <p className="text-sand-600 mb-6">{item.description}</p>

                  <div className="bg-sand-100 rounded-xl p-4 mb-6">
                    <p className="text-sm text-sand-500 mb-1">Recommended</p>
                    <p className="font-bold text-sand-900">{item.recommendation}</p>
                  </div>

                  <Link
                    href="/products/aqua2use"
                    className="inline-flex items-center gap-2 text-ocean-600 font-medium hover:gap-3 transition-all"
                  >
                    View System <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Visual Process */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="badge-ocean mb-6">
                  <Settings className="h-3 w-3" />
                  Simple & Effective
                </span>
                <h2 className="text-display-md font-display text-sand-900 mb-6">
                  How Greywater<br />Recycling Works
                </h2>
                <p className="text-lg text-sand-600 mb-10 leading-relaxed">
                  Our Aqua2use systems automatically divert, filter, and distribute greywater from your laundry, shower, and bathroom sinks directly to your irrigation system.
                </p>

                <div className="space-y-8">
                  {[
                    { step: "01", title: "Collect", description: "Divert water from laundry, bath, and shower into the treatment system" },
                    { step: "02", title: "Filter", description: "4-stage Matala filtration removes up to 90% of suspended solids" },
                    { step: "03", title: "Flourish", description: "Clean water flows to your subsurface drip irrigation automatically" },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-6 items-start group">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-ocean-600 text-white flex items-center justify-center font-display text-lg group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-display text-sand-900 mb-1">{item.title}</h3>
                        <p className="text-sand-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/how-it-works" className="btn-primary mt-10">
                  Learn More About the Process
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-sand-200">
                  <Image
                    src="/docs/Aqua2use-How-It-Works.jpg"
                    alt="How Greywater Recycling Works"
                    fill
                    className="object-contain p-8"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-ocean-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-md font-display text-white mb-6">
              Ready to Start Saving Water?
            </h2>
            <p className="text-xl text-ocean-100 mb-10">
              Get a personalized quote for your greywater recycling system. Our experts will help you choose the right solution for your property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-accent text-lg px-8 py-4">
                Get Your Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/how-it-works" className="btn-secondary bg-transparent border-white/30 text-white hover:bg-white/10 px-8 py-4">
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
