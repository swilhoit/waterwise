import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home as HomeIcon, TreePine, Truck, Building, Mountain, Car } from "lucide-react"
import { StatsSection, CTASection } from "@/components/sections"

export default function Solutions() {
  const solutions = [
    {
      title: "Homes",
      description: "Perfect for single-family homes with standard plumbing systems",
      icon: HomeIcon,
      image: "/images/solutions/homes-ai.jpg",
      benefits: [
        "Reduce water bills by 40-60%",
        "Easy DIY installation",
        "Perfect for existing homes",
        "Handles all household greywater"
      ],
      href: "/solutions/homes"
    },
    {
      title: "Multifamily Homes",
      description: "Scalable systems for apartments, condos, and townhome communities",
      icon: Building,
      image: "/images/solutions/homes-ai.jpg",
      benefits: [
        "Centralized or distributed designs",
        "Serve multiple units efficiently",
        "Integrates with existing irrigation",
        "Compliance guidance available"
      ],
      href: "/solutions/multifamily-homes"
    },
    {
      title: "Tiny Homes", 
      description: "Compact systems designed for space-efficient living",
      icon: TreePine,
      image: "/images/solutions/tiny-homes-ai.jpg",
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
      image: "/images/solutions/rvs-ai.jpg", 
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
      image: "/images/solutions/cabins-ai.jpg",
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
      description: "Reliable greywater reuse for hotels, laundry, gyms, schools and more",
      icon: Building,
      image: "/images/solutions/commercial-ai.jpg",
      benefits: [
        "Reduce operating water costs",
        "Support sustainability goals",
        "Engineered for uptime",
        "Service plans available"
      ],
      href: "/solutions/commercial"
    },
    {
      title: "Custom Applications",
      description: "Tailored solutions for unique properties and special requirements",
      icon: Car,
      image: "/images/solutions/custom-ai.jpg",
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
      <section className="relative bg-white py-20 lg:py-32 overflow-hidden">
        <div className="px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              <span className="text-gradient">Solutions</span> for Every Property
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              From tiny homes to remote properties, we have greywater recycling solutions tailored to your needs.
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

      <StatsSection
        title="Why Choose Aqua2use for Your Property?"
        subtitle="Over a decade of experience serving diverse property types and needs"
        bgColor="gray"
        stats={[
          {
            value: "50%",
            label: "Average Water Savings",
            sublabel: "Typical reduction in outdoor water usage",
            color: "blue"
          },
          {
            value: "10K+",
            label: "Systems Installed",
            sublabel: "Across diverse property types",
            color: "green"
          },
          {
            value: "2-4",
            label: "Year Payback",
            sublabel: "Typical return on investment period",
            color: "purple"
          },
          {
            value: "24/7",
            label: "Automatic Operation",
            sublabel: "Set it and forget it functionality",
            color: "orange"
          }
        ]}
      />

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

      <CTASection
        title="Ready to Transform Your Water Usage?"
        description="Join thousands of property owners who are saving water and money with our proven solutions"
        variant="blue"
        buttons={[
          { label: "Get Your Quote Today", href: "/contact", variant: "secondary" },
          { label: "Read Success Stories", href: "/customer-stories", variant: "secondary" }
        ]}
      />
    </div>
  )
}