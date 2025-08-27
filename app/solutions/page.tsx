import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home as HomeIcon, TreePine, Truck, Building, Mountain, Car } from "lucide-react"

export default function Solutions() {
  const solutions = [
    {
      title: "Homes",
      description: "Perfect for single-family homes with standard plumbing systems",
      icon: HomeIcon,
      image: "/images/solutions/homes.jpg",
      benefits: [
        "Reduce water bills by 40-60%",
        "Easy DIY installation",
        "Perfect for existing homes",
        "Handles all household greywater"
      ],
      href: "/solutions/homes"
    },
    {
      title: "Tiny Homes", 
      description: "Compact systems designed for space-efficient living",
      icon: TreePine,
      image: "/images/solutions/tiny-homes.jpg",
      benefits: [
        "Space-efficient design",
        "Off-grid compatible",
        "Complete water independence",
        "Sustainable living solution"
      ],
      href: "/solutions/tiny-homes"
    },
    {
      title: "RVs & Mobile Living",
      description: "Portable greywater solutions for life on the road",
      icon: Truck,
      image: "/images/solutions/rvs.jpg", 
      benefits: [
        "Portable and lightweight",
        "Extends boondocking time",
        "Easy setup and breakdown",
        "Reduce campground costs"
      ],
      href: "/solutions/rvs"
    },
    {
      title: "Cabins & Remote Properties",
      description: "Reliable systems for weekend getaways and remote locations",
      icon: Mountain,
      image: "/images/solutions/cabins.jpg",
      benefits: [
        "Off-grid operation available",
        "Minimal maintenance required",
        "Weather resistant design",
        "Perfect for seasonal use"
      ],
      href: "/solutions/cabins"
    },
    {
      title: "Commercial Properties",
      description: "High-capacity systems for apartments, hotels, and businesses",
      icon: Building,
      image: "/images/solutions/commercial.jpg",
      benefits: [
        "Handle high-volume usage",
        "Professional installation",
        "Significant cost savings", 
        "Environmental compliance"
      ],
      href: "/solutions/commercial"
    },
    {
      title: "Custom Applications",
      description: "Tailored solutions for unique properties and special requirements",
      icon: Car,
      image: "/images/solutions/custom.jpg",
      benefits: [
        "Custom engineering available",
        "Unique property solutions",
        "Scalable system design",
        "Expert consultation included"
      ],
      href: "/contact"
    }
  ]

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              <span className="text-gradient">Solutions</span> for Every Property
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              From tiny homes to commercial developments, we have greywater recycling solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every property is unique. Discover the greywater system that's right for your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon
              return (
                <Card key={index} className="hover-lift transition-all duration-300">
                  <CardHeader>
                    <div className="relative mb-4">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        width={400}
                        height={250}
                        className="rounded-lg w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-gray-600" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{solution.title}</CardTitle>
                    <CardDescription className="text-base">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link href={solution.href}>
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Aqua2use for Your Property?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Over a decade of experience serving diverse property types and needs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-600">50%</span>
                </div>
                <h3 className="font-semibold mb-2">Average Water Savings</h3>
                <p className="text-sm text-gray-600">Typical reduction in outdoor water usage</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">10K+</span>
                </div>
                <h3 className="font-semibold mb-2">Systems Installed</h3>
                <p className="text-sm text-gray-600">Across diverse property types</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2-4</span>
                </div>
                <h3 className="font-semibold mb-2">Year Payback</h3>
                <p className="text-sm text-gray-600">Typical return on investment period</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">24/7</span>
                </div>
                <h3 className="font-semibold mb-2">Automatic Operation</h3>
                <p className="text-sm text-gray-600">Set it and forget it functionality</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Not Sure Which Solution is Right for You?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our water conservation experts have helped thousands of property owners find the perfect greywater recycling solution. We'll assess your specific needs, property type, local regulations, and water usage patterns to recommend the ideal system.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From initial consultation to ongoing support, we're here to help you achieve maximum water savings and environmental impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Get Free Consultation</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/products">View All Systems</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-2xl opacity-20" />
              <Image
                src="/images/aqua2use-greywater-recycling-sytem.png"
                alt="Aqua2use Expert Consultation"
                width={600}
                height={400}
                className="rounded-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Water Usage?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of property owners who are saving water and money with our proven solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold hover-lift" asChild>
              <Link href="/contact">Get Your Quote Today</Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
              <Link href="/customer-stories">Read Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}