import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface PageTemplateProps {
  title: string
  subtitle: string
  heroImage?: string
  heroImageAlt?: string
  children: React.ReactNode
  showCTA?: boolean
  ctaTitle?: string
  ctaSubtitle?: string
  ctaButtonText?: string
  ctaButtonLink?: string
}

export function PageTemplate({
  title,
  subtitle,
  heroImage,
  heroImageAlt,
  children,
  showCTA = true,
  ctaTitle = "Ready to Start Saving Water?",
  ctaSubtitle = "Get a personalized quote for your greywater recycling system today",
  ctaButtonText = "Get Your Free Quote",
  ctaButtonLink = "/contact"
}: PageTemplateProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className={`${heroImage ? 'grid lg:grid-cols-2 gap-12 items-center' : 'text-center max-w-4xl mx-auto'}`}>
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {subtitle}
              </p>
            </div>
            {heroImage && (
              <div className="relative animate-slide-in-right">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-2xl opacity-20" />
                <Image
                  src={heroImage}
                  alt={heroImageAlt || title}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl relative z-10 hover-lift"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </section>

      {/* CTA Section */}
      {showCTA && (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {ctaTitle}
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              {ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover-lift" asChild>
                <Link href={ctaButtonLink}>{ctaButtonText}</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
                <Link href="/products">View Products</Link>
              </Button>
            </div>
            <p className="mt-8 text-sm opacity-75">No obligation • Expert consultation • Same-day response</p>
          </div>
        </section>
      )}
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  imageAlt?: string
}

export function FeatureCard({ title, description, icon, image, imageAlt }: FeatureCardProps) {
  return (
    <Card className="hover-lift transition-all duration-300 hover:shadow-lg border-gray-100">
      <CardHeader>
        {image && (
          <Image
            src={image}
            alt={imageAlt || title}
            width={400}
            height={250}
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
        )}
        {icon && <div className="mb-4">{icon}</div>}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

interface BenefitListProps {
  benefits: string[]
}

export function BenefitList({ benefits }: BenefitListProps) {
  return (
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{benefit}</span>
        </li>
      ))}
    </ul>
  )
}