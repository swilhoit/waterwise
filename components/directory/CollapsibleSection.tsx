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
  accentColor?: 'teal' | 'emerald' | 'blue' | 'purple' | 'amber' | 'slate'
  className?: string
}

const accentStyles = {
  teal: {
    border: 'border-l-teal-500',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    hoverBg: 'hover:bg-teal-50/50'
  },
  emerald: {
    border: 'border-l-emerald-500',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    hoverBg: 'hover:bg-emerald-50/50'
  },
  blue: {
    border: 'border-l-blue-500',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-50/50'
  },
  purple: {
    border: 'border-l-purple-500',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    hoverBg: 'hover:bg-purple-50/50'
  },
  amber: {
    border: 'border-l-amber-500',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    hoverBg: 'hover:bg-amber-50/50'
  },
  slate: {
    border: 'border-l-slate-400',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    hoverBg: 'hover:bg-slate-50/50'
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
  accentColor = 'teal',
  className
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const accent = accentStyles[accentColor]

  const baseStyles = {
    default: 'bg-white border border-slate-200 rounded-xl overflow-hidden',
    card: 'bg-white border border-slate-200 rounded-xl overflow-hidden',
    minimal: 'border-b border-slate-200',
    elevated: 'bg-white border border-slate-200 rounded-xl overflow-hidden'
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
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{title}</h3>
              {badge}
            </div>
            {summary && !isOpen && (
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">{summary}</p>
            )}
          </div>
        </div>
        <div className={cn(
          'p-1.5 rounded-full transition-colors ml-2',
          isOpen ? 'bg-slate-100' : 'bg-transparent'
        )}>
          <ChevronDown
            className={cn(
              'h-4 w-4 sm:h-5 sm:w-5 text-slate-400 transition-transform duration-200',
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
          variant === 'minimal' ? 'pb-4' : 'px-4 pb-5 sm:px-5 sm:pb-6 border-t border-slate-100 bg-slate-50/30'
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
        className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 transition-colors font-medium"
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
