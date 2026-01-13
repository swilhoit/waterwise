"use client"

import React from 'react'
import { LucideIcon, Droplets, CloudRain, DollarSign, FileText } from 'lucide-react'

// ============================================================================
// STATUS CARD GRID - Quick summary cards for key information
// ============================================================================

interface StatusCardProps {
  icon: LucideIcon
  label: string
  value: string
  subValue?: string
  status?: 'success' | 'warning' | 'danger' | 'neutral'
}

export function StatusCard({ icon: Icon, label, value, subValue, status = 'neutral' }: StatusCardProps) {
  const statusStyles = {
    success: {
      bg: 'bg-ocean-50',
      border: 'border-ocean-200',
      icon: 'text-ocean-600',
      value: 'text-ocean-700',
      subValue: 'text-ocean-600'
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'text-amber-600',
      value: 'text-amber-700',
      subValue: 'text-amber-600'
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      value: 'text-red-700',
      subValue: 'text-red-600'
    },
    neutral: {
      bg: 'bg-sand-50',
      border: 'border-sand-200',
      icon: 'text-sand-500',
      value: 'text-sand-700',
      subValue: 'text-sand-600'
    }
  }

  const styles = statusStyles[status]

  return (
    <div className={`rounded-xl p-4 border ${styles.bg} ${styles.border}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`h-4 w-4 ${styles.icon}`} />
        <span className="text-xs font-medium text-sand-500 uppercase tracking-wide">{label}</span>
      </div>
      <p className={`font-bold ${styles.value}`}>{value}</p>
      {subValue && (
        <p className={`text-xs ${styles.subValue}`}>{subValue}</p>
      )}
    </div>
  )
}

// ============================================================================
// STATUS CARD GRID - Pre-configured grid for directory pages
// ============================================================================

interface StatusCardGridProps {
  greywater?: {
    status: string
    isLegal?: boolean
  }
  rainwater?: {
    status: string
    isLegal?: boolean
  }
  rebates?: {
    count: number
    maxAmount?: number
  }
  permit?: {
    required: string
    threshold?: number
  }
}

export function StatusCardGrid({ greywater, rainwater, rebates, permit }: StatusCardGridProps) {
  const getStatusType = (status: string, isLegal?: boolean): 'success' | 'warning' | 'danger' | 'neutral' => {
    if (isLegal === true) return 'success'
    if (isLegal === false) return 'danger'
    const lower = status.toLowerCase()
    if (lower.includes('legal') || lower.includes('allowed')) return 'success'
    if (lower.includes('prohibited') || lower.includes('illegal')) return 'danger'
    if (lower.includes('regulated') || lower.includes('restricted')) return 'warning'
    return 'neutral'
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {greywater && (
        <StatusCard
          icon={Droplets}
          label="Greywater"
          value={greywater.status}
          status={getStatusType(greywater.status, greywater.isLegal)}
        />
      )}
      {rainwater && (
        <StatusCard
          icon={CloudRain}
          label="Rainwater"
          value={rainwater.status}
          status={getStatusType(rainwater.status, rainwater.isLegal)}
        />
      )}
      {rebates && (
        <StatusCard
          icon={DollarSign}
          label="Rebates"
          value={rebates.count > 0 ? `${rebates.count} Available` : 'None Found'}
          subValue={rebates.maxAmount && rebates.maxAmount > 0 ? `Up to $${rebates.maxAmount.toLocaleString()}` : undefined}
          status={rebates.count > 0 ? 'success' : 'neutral'}
        />
      )}
      {permit && (
        <StatusCard
          icon={FileText}
          label="Permit"
          value={permit.threshold ? `Over ${permit.threshold} GPD` : permit.required}
          status="warning"
        />
      )}
    </div>
  )
}

// ============================================================================
// SINGLE STATUS CARD - For spoke pages with focused content
// ============================================================================

interface SingleStatusProps {
  icon: LucideIcon
  label: string
  status: string
  theme?: 'ocean' | 'terra'
  details?: Array<{
    label: string
    value: string
    positive?: boolean
  }>
}

export function SingleStatusCard({ icon: Icon, label, status, theme = 'ocean', details }: SingleStatusProps) {
  const themeStyles = {
    ocean: {
      bg: 'bg-ocean-50',
      border: 'border-ocean-200',
      icon: 'bg-ocean-600 text-white',
      statusBg: 'bg-ocean-100',
      statusText: 'text-ocean-700'
    },
    terra: {
      bg: 'bg-terra-50',
      border: 'border-terra-200',
      icon: 'bg-terra-600 text-white',
      statusBg: 'bg-terra-100',
      statusText: 'text-terra-700'
    }
  }

  const styles = themeStyles[theme]
  const isLegal = status.toLowerCase().includes('legal')

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-xl p-5`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 ${styles.icon} rounded-lg flex items-center justify-center`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-sand-500">{label}</p>
          <p className={`text-lg font-bold ${isLegal ? styles.statusText : 'text-sand-700'}`}>
            {status}
          </p>
        </div>
      </div>
      {details && details.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {details.map((detail, idx) => (
            <div key={idx} className="bg-white/60 rounded-lg p-3">
              <p className="text-xs text-sand-500 mb-1">{detail.label}</p>
              <p className={`text-sm font-semibold ${detail.positive ? styles.statusText : 'text-sand-700'}`}>
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
