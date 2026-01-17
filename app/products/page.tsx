import { getProducts } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Droplets, Home as HomeIcon, Building, Zap, Shield, Star, ArrowRight, ChevronRight, Truck, Award, Check, X, Leaf, Timer, Settings, Waves, ArrowUpRight, CloudRain, Filter, Wrench } from "lucide-react"
import { formatPriceDisplay } from '@/lib/price-utils'
import { CTASection } from '@/components/sections'
import { ProductCatalog } from '@/components/shop/ProductCatalog'

export const metadata = {
  title: 'Water Conservation Systems & Equipment | Water Wise Group',
  description: 'Professional greywater recycling and rainwater harvesting systems for homes, cabins, and commercial properties. Save up to 40% on water bills.',
}

// Product categories
const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'greywater', name: 'Greywater Systems' },
  { id: 'rainwater', name: 'Rainwater Harvesting' },
  { id: 'parts', name: 'Parts & Accessories' },
  { id: 'filtration', name: 'Filtration' },
]

// All products with categories
const allProducts = [
  // Greywater Systems
  {
    id: "gw-1",
    title: "Aqua2use GWDD Gravity",
    description: "Entry-level greywater system for single-story homes. Gravity-fed design requires no pump. Features 4-stage Matala filtration with 90% solid removal.",
    image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-gravity.jpg?v=1719242223",
    price: "$599",
    handle: "aqua2use",
    badge: "Best Seller",
    badgeColor: "ocean",
    category: "greywater",
    application: "residential",
  },
  {
    id: "gw-2",
    title: "Aqua2use GWDD with Pump",
    description: "Versatile greywater system with integrated pump for multi-story homes or uphill installations. 17 GPM processing capacity.",
    image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-pump.jpg?v=1719253734",
    price: "$899",
    handle: "aqua2use",
    badge: "Popular",
    badgeColor: "ocean",
    category: "greywater",
    application: "residential",
  },
  {
    id: "gw-3",
    title: "Aqua2use Pro System",
    description: "Commercial-grade greywater treatment for high-capacity applications. 50-gallon tank with 25 GPM flow rate. Ideal for multi-family or commercial.",
    image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-ug.jpg?v=1719241821",
    price: "$2,699",
    handle: "aqua2use",
    badge: "Commercial",
    badgeColor: "terra",
    category: "greywater",
    application: "commercial",
  },
  // Rainwater Harvesting
  {
    id: "rw-1",
    title: "50-Gallon Rain Barrel",
    description: "Compact rain barrel perfect for beginners. Includes spigot, overflow valve, and debris screen. Connects easily to any downspout.",
    image: "https://rtshomeaccents.com/cdn/shop/files/551000300A8081pic1.jpg?v=1732721905",
    price: "$89",
    handle: "rain-barrel-50",
    badge: "Starter",
    badgeColor: "ocean",
    category: "rainwater",
    application: "residential",
  },
  {
    id: "rw-2",
    title: "100-Gallon Rain Barrel System",
    description: "Double-capacity rain collection with linking kit. UV-resistant polyethylene construction. Includes brass spigot and overflow hose.",
    image: "https://cdn11.bigcommerce.com/s-j602wc6a/images/stencil/1280x1280/products/7595/30513/2QokdHh11uSe3TvhtuL0JQxF4z6J9GukP6rdFTinp5glbwI1KDS7fwrQPQs8zTZw__92598.1712267672.jpg?c=2",
    price: "$149",
    handle: "rain-barrel-100",
    badge: "Popular",
    badgeColor: "ocean",
    category: "rainwater",
    application: "residential",
  },
  {
    id: "rw-3",
    title: "First Flush Diverter Kit",
    description: "Automatically diverts the first flush of contaminated roof water away from your tank. Essential for clean rainwater collection.",
    image: "https://cdn11.bigcommerce.com/s-c3j5hz28/images/stencil/600x600/products/5136/4543/20190712_122603__01847.1667844724.jpg?c=2",
    price: "$59",
    handle: "first-flush-diverter",
    badge: "Essential",
    badgeColor: "sand",
    category: "rainwater",
    application: "residential",
  },
  {
    id: "rw-4",
    title: "Downspout Filter & Diverter",
    description: "2-in-1 downspout filter and diverter. Stainless steel mesh removes leaves and debris while directing water to your barrel.",
    image: "https://www.tank-depot.com/media/catalog/product/r/h/rh-ddcr98_180.jpg",
    price: "$45",
    handle: "downspout-filter",
    badge: "Essential",
    badgeColor: "sand",
    category: "rainwater",
    application: "residential",
  },
  {
    id: "rw-5",
    title: "Complete Rain Harvesting Kit",
    description: "Everything needed to start collecting rainwater: 100-gal barrel, first flush diverter, downspout connector, and overflow kit.",
    image: "https://cdn11.bigcommerce.com/s-j602wc6a/images/stencil/1280x1280/products/7595/30514/jgGnQqduoyCcKhym8tIfqjQu1YXXaV388lVAGHT23m3cXJCFCwTEBQa7b3hGqVGM__98629.1712267673.jpg?c=2",
    price: "$299",
    handle: "rain-harvest-kit",
    badge: "Best Value",
    badgeColor: "terra",
    category: "rainwater",
    application: "residential",
  },
  {
    id: "rw-6",
    title: "265-Gallon IBC Tote System",
    description: "High-capacity rainwater storage using repurposed food-grade IBC tote. Includes inlet filter, spigot, and overflow fitting.",
    image: "https://recyclewithintegrity.com/wp-content/uploads/2025/06/IBC-Tote-275-Gal.-Food-Grade-Clean.jpg",
    price: "$349",
    handle: "ibc-tote-system",
    badge: "High Capacity",
    badgeColor: "ocean",
    category: "rainwater",
    application: "residential",
  },
  // Parts & Accessories
  {
    id: "part-1",
    title: "Replacement Filter Set",
    description: "Genuine Aqua2use 4-stage Matala filters. Tool-free replacement, reusable for up to 3 years with proper cleaning.",
    image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/aqua2use-replacement-filters.jpg?v=1719592368",
    price: "$249",
    handle: "replacement-filters",
    badge: "Maintenance",
    badgeColor: "sand",
    category: "parts",
    application: "residential",
  },
  {
    id: "part-2",
    title: "Replacement Pump Kit",
    description: "Direct OEM replacement pump with electronic controller. Features dry run protection and automatic water level sensing.",
    image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Pump_Pack_GWDD.jpg?v=1742748645",
    price: "$399",
    handle: "replacement-greywater-pump",
    badge: "Parts",
    badgeColor: "terra",
    category: "parts",
    application: "residential",
  },
  {
    id: "part-3",
    title: "Drip Irrigation Kit",
    description: "Complete subsurface drip system for greywater or rainwater distribution. 250 ft tubing with pressure regulator.",
    image: "https://waterwisegroup.com/cdn/shop/files/Irrigation_Kit_Hero.png?v=1758930026",
    price: "$199",
    handle: "drip-irrigation-kit",
    badge: "Essential",
    badgeColor: "ocean",
    category: "parts",
    application: "residential",
  },
  {
    id: "part-4",
    title: "Rainwater Pump - 1/2 HP",
    description: "Automatic 1/2 HP pump for pressurizing rainwater systems. 17 GPM flow rate with 34 PSI max. Quiet operation.",
    image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/Pump_Pack_GWDD.jpg?v=1742748645",
    price: "$299",
    handle: "rainwater-pump-half-hp",
    badge: "Popular",
    badgeColor: "ocean",
    category: "parts",
    application: "residential",
  },
  // Filtration
  {
    id: "filt-1",
    title: "Sediment Pre-Filter",
    description: "Inline sediment filter for rainwater systems. Removes particles down to 50 microns. Easy cartridge replacement.",
    image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/aqua2use-replacement-filters.jpg?v=1719592368",
    price: "$39",
    handle: "sediment-pre-filter",
    badge: "Filtration",
    badgeColor: "sand",
    category: "filtration",
    application: "residential",
  },
  {
    id: "filt-2",
    title: "Carbon Block Filter",
    description: "Activated carbon filter for rainwater polishing. Removes odors, chlorine, and organic compounds. 6-month cartridge life.",
    image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/aqua2use-replacement-filters.jpg?v=1719592368",
    price: "$49",
    handle: "carbon-block-filter",
    badge: "Filtration",
    badgeColor: "sand",
    category: "filtration",
    application: "residential",
  },
]

// Featured categories for hero section
const featuredCategories = {
  rainwater: {
    title: "Rainwater Harvesting",
    description: "Capture and store rainwater for irrigation and outdoor use",
    image: "https://cdn11.bigcommerce.com/s-j602wc6a/images/stencil/1280x1280/products/7595/30513/2QokdHh11uSe3TvhtuL0JQxF4z6J9GukP6rdFTinp5glbwI1KDS7fwrQPQs8zTZw__92598.1712267672.jpg?c=2",
    badge: "Popular",
    href: "#products",
    features: ["Rain barrels", "First flush diverters", "IBC totes"]
  },
  greywater: {
    title: "Greywater Systems",
    description: "Recycle water from showers, sinks & laundry for irrigation",
    image: "https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-gravity.jpg?v=1719242223",
    badge: "Best Seller",
    href: "/products/aqua2use",
    features: ["Aqua2use GWDD", "4-stage filtration", "DIY install"]
  }
}

export default async function ProductsPage() {
  const shopifyProducts = await getProducts()

  // Merge Shopify products with our catalog (Shopify takes priority if available)
  const displayProducts = shopifyProducts.length > 0 ? shopifyProducts : allProducts

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
      {/* Products Section with Filters */}
      <section id="products" className="section-padding bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="line-accent mx-auto mb-6" />
            <h1 className="text-display-md font-display text-sand-900 mb-4">
              Shop All Products
            </h1>
            <p className="text-xl text-sand-600">
              Greywater systems, rainwater harvesting equipment, and accessories
            </p>
          </div>

          <ProductCatalog products={allProducts} categories={categories} />
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="relative py-16 lg:py-24 bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-ocean-100 text-ocean-700 px-4 py-2 rounded-full text-sm font-medium border border-ocean-200">
                <Award className="h-4 w-4 text-ocean-600" />
                WaterMark Approved Systems
              </div>

              <h2 className="text-display-lg lg:text-display-xl font-display text-sand-900 leading-none">
                Reclaim Your
                <span className="block text-ocean-600">Water</span>
              </h2>

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
                <Link href="/products/aqua2use" className="btn-primary text-lg px-8 py-4 group">
                  View System
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#comparison" className="btn-secondary px-8 py-4">
                  Compare Options
                </Link>
              </div>
            </div>

            {/* Right: Product Categories - Rainwater & Greywater */}
            <div className="space-y-4">
              {/* Category: Rainwater Harvesting */}
              <Link href={featuredCategories.rainwater.href} className="group block">
                <div className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-ocean-300 transition-all relative">
                  <div className="absolute top-4 right-4 badge-ocean">
                    <CloudRain className="h-3 w-3" />
                    {featuredCategories.rainwater.badge}
                  </div>

                  <div className="flex gap-5 items-center">
                    <div className="w-32 h-32 flex-shrink-0 bg-ocean-50 rounded-xl overflow-hidden relative">
                      <Image
                        src={featuredCategories.rainwater.image}
                        alt={featuredCategories.rainwater.title}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display text-sand-900 mb-1 group-hover:text-ocean-600 transition-colors">{featuredCategories.rainwater.title}</h3>
                      <p className="text-sand-600 text-sm mb-3">{featuredCategories.rainwater.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {featuredCategories.rainwater.features.map((f, i) => (
                          <span key={i} className="text-xs bg-ocean-50 text-ocean-700 px-2 py-1 rounded-full">{f}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="text-ocean-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                          Shop Category <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Category: Greywater Systems */}
              <Link href={featuredCategories.greywater.href} className="group block">
                <div className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-terra-300 transition-all relative">
                  <div className="absolute top-4 right-4 badge-terra">
                    <Droplets className="h-3 w-3" />
                    {featuredCategories.greywater.badge}
                  </div>

                  <div className="flex gap-5 items-center">
                    <div className="w-32 h-32 flex-shrink-0 bg-terra-50 rounded-xl overflow-hidden relative">
                      <Image
                        src={featuredCategories.greywater.image}
                        alt={featuredCategories.greywater.title}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display text-sand-900 mb-1 group-hover:text-terra-600 transition-colors">{featuredCategories.greywater.title}</h3>
                      <p className="text-sand-600 text-sm mb-3">{featuredCategories.greywater.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {featuredCategories.greywater.features.map((f, i) => (
                          <span key={i} className="text-xs bg-terra-50 text-terra-700 px-2 py-1 rounded-full">{f}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="text-terra-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                          Shop Category <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Links Row */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Aqua2use System */}
            <Link href="/products/aqua2use" className="group">
              <div className="bg-white rounded-xl p-4 border border-sand-200 hover:border-ocean-200 transition-all h-full flex items-center gap-4">
                <div className="w-16 h-16 flex-shrink-0 bg-ocean-50 rounded-lg overflow-hidden relative">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0637/5561/6462/files/gwdd-gravity.jpg?v=1719242223"
                    alt="Aqua2use GWDD"
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sand-900 group-hover:text-ocean-600 transition-colors">Aqua2use Systems</h4>
                  <p className="text-sm text-sand-500">From $599</p>
                </div>
              </div>
            </Link>

            {/* Replacement Filters */}
            <Link href="/products/replacement-filters" className="group">
              <div className="bg-white rounded-xl p-4 border border-sand-200 hover:border-sand-300 transition-all h-full flex items-center gap-4">
                <div className="w-16 h-16 flex-shrink-0 bg-sand-100 rounded-lg overflow-hidden relative">
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
                  <p className="text-sm text-sand-500">$249</p>
                </div>
              </div>
            </Link>

            {/* Rain Barrels */}
            <Link href="/products/rain-barrel-100" className="group">
              <div className="bg-white rounded-xl p-4 border border-sand-200 hover:border-ocean-200 transition-all h-full flex items-center gap-4">
                <div className="w-16 h-16 flex-shrink-0 bg-ocean-50 rounded-lg overflow-hidden relative flex items-center justify-center">
                  <CloudRain className="h-8 w-8 text-ocean-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sand-900 group-hover:text-ocean-600 transition-colors">Rain Barrels</h4>
                  <p className="text-sm text-sand-500">From $89</p>
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

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-sand-200">
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
