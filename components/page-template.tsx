"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, LucideIcon, ArrowRight } from "lucide-react"
import React from "react"

interface PageTemplateProps {
  title: string
  subtitle: string
  heroImage?: string
  heroImageAlt?: string
  plainHero?: boolean
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
  plainHero,
  children,
  showCTA = true,
  ctaTitle = "Ready to Start Saving Water?",
  ctaSubtitle = "Get a personalized quote for your greywater recycling system today",
  ctaButtonText = "Get Your Free Quote",
  ctaButtonLink = "/contact"
}: PageTemplateProps) {
  return (
    <div className="bg-sand-50">
      {/* Hero Section */}
      <section className={`relative ${plainHero ? 'py-12 lg:py-16' : 'py-20 lg:py-28'} bg-gradient-to-br from-sand-50 via-white to-ocean-50/30`}>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-7xl mx-auto ${heroImage ? 'grid lg:grid-cols-2 gap-16 items-center' : 'text-center'}`}>
            <div className="space-y-6">
              <div className="line-accent mx-auto lg:mx-0" />
              <h1 className={`text-display-sm lg:text-display-md font-display text-sand-900 ${plainHero ? 'mb-2' : 'mb-6'} leading-tight`}>
                {title}
              </h1>
              <p className={`text-xl text-sand-600 ${plainHero ? 'mb-4' : 'mb-8'} leading-relaxed max-w-2xl ${!heroImage ? 'mx-auto' : ''}`}>
                {subtitle}
              </p>
            </div>
            {heroImage && (
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-ocean-100 to-terra-100 rounded-3xl opacity-50 blur-xl" />
                <Image
                  src={heroImage}
                  alt={heroImageAlt || title}
                  width={600}
                  height={400}
                  className="rounded-2xl relative z-10 shadow-soft-lg border border-sand-200 hover-lift"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {showCTA && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-900" />
          <div className="absolute inset-0 bg-pattern-waves opacity-20" />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-terra-500/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-display-sm lg:text-display-md font-display text-white mb-6">
              {ctaTitle}
            </h2>
            <p className="text-xl text-ocean-100 mb-10 max-w-2xl mx-auto">
              {ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ctaButtonLink} className="btn-accent text-lg px-8 py-4">
                {ctaButtonText}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/products" className="btn-secondary bg-transparent border-white/30 text-white hover:bg-white/10 px-8 py-4">
                View Products
              </Link>
            </div>
            <p className="mt-8 text-sm text-ocean-200">No obligation • Expert consultation • Same-day response</p>
          </div>
        </section>
      )}
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon?: LucideIcon
  image?: string
  imageAlt?: string
}

export function FeatureCard({ title, description, icon, image, imageAlt }: FeatureCardProps) {
  return (
    <div className="card-premium group">
      <div className="p-6">
        {image && (
          <Image
            src={image}
            alt={imageAlt || title}
            width={400}
            height={250}
            className="rounded-xl mb-4 w-full h-48 object-cover"
          />
        )}
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-ocean-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {React.createElement(icon, { className: "h-6 w-6 text-ocean-600" })}
          </div>
        )}
        <h3 className="text-lg font-display text-sand-900 mb-2">{title}</h3>
        <p className="text-sand-600 text-sm">{description}</p>
      </div>
    </div>
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
          <CheckCircle className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
          <span className="text-sand-700">{benefit}</span>
        </li>
      ))}
    </ul>
  )
}
