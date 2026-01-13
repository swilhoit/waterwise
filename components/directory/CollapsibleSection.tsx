"use client"

import { useState, ReactNode } from 'react'
import { ChevronDown, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleSectionProps {
  title: string
  icon?: LucideIcon
  iconColor?: string
  badge?: ReactNode
  summary?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  variant?: 'default' | 'card' | 'minimal' | 'elevated'
  accentColor?: 'ocean' | 'terra' | 'sand'
  className?: string
}

const accentStyles = {
  ocean: {
    border: 'border-l-ocean-400',
    iconBg: 'bg-ocean-50',
    iconColor: 'text-ocean-600',
    hoverBg: 'hover:bg-ocean-50/30'
  },
  terra: {
    border: 'border-l-terra-400',
    iconBg: 'bg-terra-50',
    iconColor: 'text-terra-600',
    hoverBg: 'hover:bg-terra-50/30'
  },
  sand: {
    border: 'border-l-sand-300',
    iconBg: 'bg-sand-100',
    iconColor: 'text-sand-600',
    hoverBg: 'hover:bg-sand-50/50'
  }
}

export default function CollapsibleSection({
  title,
  icon: Icon,
  iconColor,
  badge,
  summary,
  children,
  defaultOpen = false,
  variant = 'default',
  accentColor = 'sand',
  className
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const accent = accentStyles[accentColor]

  const baseStyles = {
    default: 'bg-white border border-sand-200 rounded-xl overflow-hidden',
    card: 'bg-white border border-sand-200 rounded-xl overflow-hidden',
    minimal: 'border-b border-sand-200',
    elevated: 'bg-white border border-sand-200 rounded-xl overflow-hidden'
  }

  const headerStyles = {
    default: 'px-4 py-3.5 sm:px-5 sm:py-4',
    card: 'px-4 py-3.5 sm:px-6 sm:py-4',
    minimal: 'py-3',
    elevated: 'px-4 py-3.5 sm:px-5 sm:py-4'
  }

  return (
    <div
      className={cn(
        baseStyles[variant],
        variant !== 'minimal' && `border-l-4 ${accent.border}`,
        className
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between text-left transition-all duration-200',
          headerStyles[variant],
          accent.hoverBg
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {Icon && (
            <div className={cn('p-2 rounded-lg flex-shrink-0', accent.iconBg)}>
              <Icon className={cn('h-4 w-4 sm:h-5 sm:w-5', iconColor || accent.iconColor)} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sand-800 text-sm sm:text-base">{title}</h3>
              {badge}
            </div>
            {summary && !isOpen && (
              <p className="text-xs sm:text-sm text-sand-500 mt-0.5 truncate">{summary}</p>
            )}
          </div>
        </div>
        <div className={cn(
          'p-1.5 rounded-full transition-colors ml-2',
          isOpen ? 'bg-sand-100' : 'bg-transparent'
        )}>
          <ChevronDown
            className={cn(
              'h-4 w-4 sm:h-5 sm:w-5 text-sand-400 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          'transition-all duration-300 ease-in-out overflow-hidden',
          isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className={cn(
          variant === 'minimal' ? 'pb-4' : 'px-4 pb-5 sm:px-5 sm:pb-6 border-t border-sand-100 bg-sand-50/30'
        )}>
          {children}
        </div>
      </div>
    </div>
  )
}

// Smaller inline collapsible for nested content
interface InlineCollapsibleProps {
  label: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

export function InlineCollapsible({
  label,
  children,
  defaultOpen = false,
  className
}: InlineCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm text-ocean-600 hover:text-ocean-700 transition-colors font-medium"
      >
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
        <span>{isOpen ? 'Show less' : `Show ${label}`}</span>
      </button>

      {isOpen && (
        <div className="mt-2 animate-in fade-in-0 slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}
