"use client"

import React from 'react'
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  XCircle,
  Droplets,
  CloudRain,
  Leaf
} from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

export type DataConfidence = 'verified' | 'partial' | 'unknown'

export type LegalStatus = 'Legal' | 'Regulated' | 'Restricted' | 'Prohibited' | 'Unknown'

export type ResourceType = 'greywater' | 'rainwater' | 'conservation'

// ============================================================================
// LEGAL STATUS BADGE
// ============================================================================

interface LegalStatusBadgeProps {
  status?: string | null
  showIcon?: boolean
  size?: 'sm' | 'md'
}

export function LegalStatusBadge({ status, showIcon = true, size = 'sm' }: LegalStatusBadgeProps) {
  if (!status) return null

  const normalized = normalizeStatus(status)
  const config = getLegalStatusConfig(normalized)

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-2.5 py-1 text-sm'

  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'

  return (
    <span className={`inline-flex items-center gap-1 ${sizeClasses} font-medium rounded-full ${config.className}`}>
      {showIcon && <config.icon className={iconSize} />}
      {config.label}
    </span>
  )
}

function normalizeStatus(status: string): LegalStatus {
  const lower = status.toLowerCase().trim()

  if (lower === 'l' || lower.includes('legal')) return 'Legal'
  if (lower === 'r' || lower.includes('regulated') || lower.includes('permitted')) return 'Regulated'
  if (lower.includes('restricted') || lower.includes('limited')) return 'Restricted'
  if (lower.includes('prohibited') || lower.includes('illegal')) return 'Prohibited'

  return 'Unknown'
}

function getLegalStatusConfig(status: LegalStatus) {
  const configs = {
    Legal: {
      icon: CheckCircle2,
      className: 'bg-ocean-100 text-ocean-700',
      label: 'Legal'
    },
    Regulated: {
      icon: AlertCircle,
      className: 'bg-amber-100 text-amber-700',
      label: 'Regulated'
    },
    Restricted: {
      icon: AlertCircle,
      className: 'bg-terra-100 text-terra-700',
      label: 'Restricted'
    },
    Prohibited: {
      icon: XCircle,
      className: 'bg-red-100 text-red-700',
      label: 'Prohibited'
    },
    Unknown: {
      icon: HelpCircle,
      className: 'bg-sand-100 text-sand-600',
      label: 'Varies'
    }
  }

  return configs[status]
}

// ============================================================================
// DATA CONFIDENCE BADGE
// ============================================================================

interface DataConfidenceBadgeProps {
  confidence: DataConfidence
  showTooltip?: boolean
}

export function DataConfidenceBadge({ confidence, showTooltip = true }: DataConfidenceBadgeProps) {
  const config = {
    verified: {
      icon: CheckCircle2,
      className: 'bg-ocean-50 text-ocean-700 border-ocean-200',
      label: 'Verified',
      tooltip: 'Regulation data confirmed with official sources'
    },
    partial: {
      icon: AlertCircle,
      className: 'bg-amber-50 text-amber-700 border-amber-200',
      label: 'Partial Data',
      tooltip: 'Some regulation details may be incomplete - contact your local authority to confirm'
    },
    unknown: {
      icon: HelpCircle,
      className: 'bg-sand-100 text-sand-600 border-sand-200',
      label: 'Not Verified',
      tooltip: 'Regulation data pending verification - contact your local building department for current rules'
    }
  }

  const { icon: Icon, className, label, tooltip } = config[confidence]

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border cursor-help ${className}`}
      title={showTooltip ? tooltip : undefined}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}

// ============================================================================
// RESOURCE TYPE BADGE
// ============================================================================

interface ResourceTypeBadgeProps {
  type: ResourceType
}

export function ResourceTypeBadge({ type }: ResourceTypeBadgeProps) {
  const config = {
    greywater: {
      icon: Droplets,
      label: 'Greywater',
      className: 'bg-ocean-50 text-ocean-700 border-ocean-200'
    },
    rainwater: {
      icon: CloudRain,
      label: 'Rainwater',
      className: 'bg-ocean-50 text-ocean-700 border-ocean-200'
    },
    conservation: {
      icon: Leaf,
      label: 'Conservation',
      className: 'bg-terra-50 text-terra-700 border-terra-200'
    }
  }

  const { icon: Icon, label, className } = config[type]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}

// ============================================================================
// PERMIT REQUIRED BADGE
// ============================================================================

interface PermitBadgeProps {
  required?: boolean | string | null
  compact?: boolean
}

export function PermitBadge({ required, compact = false }: PermitBadgeProps) {
  // Handle various ways permit_required might be stored
  let isRequired = false
  let isNotRequired = false

  if (typeof required === 'boolean') {
    isRequired = required
    isNotRequired = !required
  } else if (typeof required === 'string') {
    const lower = required.toLowerCase()
    isRequired = lower === 'yes' || lower === 'true' || lower === 'required'
    isNotRequired = lower === 'no' || lower === 'false' || lower === 'none'
  }

  if (isRequired) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 rounded border border-amber-200">
        <AlertCircle className="h-3 w-3" />
        {compact ? 'Permit' : 'Permit Required'}
      </span>
    )
  }

  if (isNotRequired) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-ocean-50 text-ocean-700 rounded border border-ocean-200">
        <CheckCircle2 className="h-3 w-3" />
        {compact ? 'No Permit' : 'No Permit Needed'}
      </span>
    )
  }

  return null
}

// ============================================================================
// INCENTIVE BADGE
// ============================================================================

interface IncentiveBadgeProps {
  count: number
  maxAmount?: number
  compact?: boolean
}

export function IncentiveBadge({ count, maxAmount, compact = false }: IncentiveBadgeProps) {
  if (count === 0) return null

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-ocean-50 text-ocean-700 rounded border border-ocean-200">
      {compact ? (
        `${count} rebates`
      ) : (
        <>
          {count} rebate{count !== 1 ? 's' : ''}
          {maxAmount && maxAmount > 0 && (
            <span className="text-ocean-600">• Up to ${maxAmount.toLocaleString()}</span>
          )}
        </>
      )}
    </span>
  )
}

// ============================================================================
// HELPER FUNCTION - Get confidence from data
// ============================================================================

export function getDataConfidence(data: {
  legalStatus?: string | null
  permitRequired?: string | boolean | null
  governingCode?: string | null
} | null | undefined): DataConfidence {
  if (!data) return 'unknown'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasStatus = !!(data as any).legalStatus
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasPermit = (data as any).permitRequired !== undefined && (data as any).permitRequired !== null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasCode = !!(data as any).governingCode

  const score = [hasStatus, hasPermit, hasCode].filter(Boolean).length

  if (score >= 2) return 'verified'
  if (score >= 1) return 'partial'
  return 'unknown'
}
