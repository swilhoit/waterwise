"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageTheme, getThemeColors } from './PageLayout'

// ============================================================================
// CTA SECTION - Consistent call-to-action section
// ============================================================================

interface CTASectionProps {
  title: string
  description: string
  primaryButton: {
    label: string
    href: string
  }
  secondaryButton?: {
    label: string
    href: string
  }
  theme?: PageTheme
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  theme = 'sand'
}: CTASectionProps) {
  const bgClass = {
    ocean: 'bg-gradient-to-br from-ocean-700 to-ocean-900',
    terra: 'bg-gradient-to-br from-terra-600 to-terra-700',
    sand: 'bg-gradient-to-br from-ocean-800 to-ocean-900'
  }[theme]

  return (
    <div className={`${bgClass} rounded-2xl p-8 text-center mt-8`}>
      <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-3">
        {title}
      </h3>
      <p className="text-white/80 mb-6 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href={primaryButton.href}
          className="btn-accent"
        >
          {primaryButton.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {secondaryButton && (
          <Link
            href={secondaryButton.href}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors border border-white/20"
          >
            {secondaryButton.label}
          </Link>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// AGENCY SIDEBAR - Consistent agency contact card
// ============================================================================

interface AgencySidebarProps {
  name?: string
  phone?: string
  website?: string
  theme?: PageTheme
}

export function AgencySidebar({ name, phone, website, theme = 'sand' }: AgencySidebarProps) {
  const colors = getThemeColors(theme)

  if (!name && !phone && !website) return null

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-xl p-5`}>
      <h3 className="text-sm font-semibold text-sand-800 mb-3">Regulatory Agency</h3>
      <div className="space-y-3">
        {name && (
          <p className="text-sm font-medium text-sand-900">{name}</p>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className={`text-sm ${colors.text} hover:underline flex items-center gap-2`}
          >
            {phone}
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${colors.text} hover:underline flex items-center gap-1`}
          >
            Official Website
            <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// RELATED LINKS - Consistent related links section
// ============================================================================

interface RelatedLink {
  label: string
  href: string
  external?: boolean
}

interface RelatedLinksProps {
  title?: string
  links: RelatedLink[]
  theme?: PageTheme
}

export function RelatedLinks({ title = 'Related Resources', links, theme = 'sand' }: RelatedLinksProps) {
  const colors = getThemeColors(theme)

  if (!links || links.length === 0) return null

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-xl p-5`}>
      <h3 className="text-sm font-semibold text-sand-800 mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, idx) => (
          <li key={idx}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm ${colors.text} hover:underline flex items-center gap-1`}
              >
                {link.label}
                <ArrowRight className="h-3 w-3" />
              </a>
            ) : (
              <Link
                href={link.href}
                className={`text-sm ${colors.text} hover:underline flex items-center gap-1`}
              >
                {link.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
