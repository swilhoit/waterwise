import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Droplets, Filter, Leaf, BookOpen, Wrench, Shield, Play } from "lucide-react"
import { PageHero, ProcessSteps, ContentBlock, CTASection, SectionCardGrid } from "@/components/sections"

export default function HowItWorks() {
  return (
    <div>
      {/* Hero Section */}
      <PageHero
        title={<>How <span className="text-gradient">Greywater Recycling</span> Works</>}
        description="Simple, efficient, and automatic water recycling that saves you money while helping the environment."
        variant="gradient"
        size="lg"
      />

      {/* Process Steps */}
      <ProcessSteps
        title="The Simple 3-Step Process"
        subtitle="From collection to irrigation, our systems automate the entire process"
        variant="large"
        steps={[
          {
            number: 1,
            title: "Collect",
            description: "Water from showers, washing machines, and bathroom sinks flows automatically to the Aqua2use system through existing plumbing.",
            icon: Droplets,
            color: "blue"
          },
          {
            number: 2,
            title: "Filter",
            description: "Our progressive 3-stage filtration system removes particles, hair, and impurities, preparing clean water for reuse.",
            icon: Filter,
            color: "green"
          },
          {
            number: 3,
            title: "Irrigate",
            description: "Clean greywater is automatically distributed to your landscape through drip irrigation or direct application.",
            icon: Leaf,
            color: "purple"
          }
        ]}
      />

      {/* Video Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
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
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <ContentBlock
        title="What Makes Our Systems Different?"
        description="Unlike simple laundry-to-landscape systems, Aqua2use systems provide comprehensive filtration and can handle water from multiple sources safely and effectively."
        features={[
          "Progressive Filtration: 3-stage system removes particles, hair, and impurities",
          "Multiple Source Compatibility: Safely processes water from showers, sinks, and washing machines",
          "Automatic Operation: No manual intervention required - works 24/7",
          "Weather Responsive: Built-in surge tank handles varying water flows"
        ]}
        image={{
          src: "/images/aqua2use-greywater-recycling-sytem.png",
          alt: "Aqua2use Greywater System Components",
          width: 600,
          height: 400
        }}
        imagePosition="right"
        variant="featured"
        bgColor="gray"
      />

      {/* Learn More Cards */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Learn More About Greywater
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deeper into greywater recycling technology and benefits
            </p>
          </div>

          <SectionCardGrid
            columns={3}
            cards={[
              {
                title: "What is Greywater?",
                description: "Learn about greywater sources, safety, and environmental impact",
                icon: Droplets,
                variant: "icon",
                href: "/what-is-greywater"
              },
              {
                title: "Benefits",
                description: "Discover the environmental and financial benefits of greywater recycling",
                icon: Leaf,
                variant: "icon",
                href: "/how-it-works/benefits"
              },
              {
                title: "System Details",
                description: "Technical specifications and installation requirements",
                icon: Wrench,
                variant: "icon",
                href: "/how-it-works/systems"
              }
            ]}
          />
        </div>
      </section>

      {/* CTA with Stats */}
      <CTASection
        title="Ready to Start Your Water Savings Journey?"
        description="Our systems typically pay for themselves within 2-4 years through water bill savings alone."
        variant="blue"
        stats={[
          { value: "50%", label: "Average Water Savings" },
          { value: "$500+", label: "Annual Savings Potential" },
          { value: "10,000+", label: "Systems Installed" }
        ]}
        buttons={[
          { label: "View Our Systems", href: "/products", variant: "secondary" },
          { label: "Get Free Consultation", href: "/contact", variant: "secondary" }
        ]}
      />
    </div>
  )
}
