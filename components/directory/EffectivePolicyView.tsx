"use client"

import { Badge } from '@/components/ui/badge'
import { FileText, CheckCircle, Scale, ExternalLink } from 'lucide-react'

interface ComplianceData {
  compliance_level?: string;
  permit_required?: boolean;
  permit_type?: string;
  permit_fee?: number;
  regulation_summary?: string;
  documentation_url?: string;
  jurisdiction_id?: string;
  city_name?: string;
  county_name?: string;
  state_name?: string;
}

interface EffectivePolicyViewProps {
  complianceData?: {
    state?: ComplianceData | null;
    county?: ComplianceData | null;
    city?: ComplianceData | null;
    effective?: ComplianceData | null;
  };
  jurisdictionName: string;
}

export default function EffectivePolicyView({ complianceData, jurisdictionName }: EffectivePolicyViewProps) {
  const effectivePolicy = complianceData?.effective;
  const policySource = effectivePolicy?.compliance_level;

  if (!effectivePolicy) {
    return null;
  }

  const getPolicySourceStyles = () => {
    switch (policySource) {
      case 'City':
        return {
          border: 'border-l-teal-500',
          bg: 'bg-teal-50/50',
          badge: 'bg-teal-100 text-teal-700 border-teal-200',
          icon: 'text-teal-600'
        };
      case 'County':
        return {
          border: 'border-l-purple-500',
          bg: 'bg-purple-50/50',
          badge: 'bg-purple-100 text-purple-700 border-purple-200',
          icon: 'text-purple-600'
        };
      case 'State':
        return {
          border: 'border-l-blue-500',
          bg: 'bg-blue-50/50',
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: 'text-blue-600'
        };
      default:
        return {
          border: 'border-l-slate-400',
          bg: 'bg-slate-50/50',
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: 'text-slate-600'
        };
    }
  }

  const styles = getPolicySourceStyles();

  return (
    <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden border-l-4 ${styles.border}`}>
      <div className={`p-5 ${styles.bg}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-white border border-slate-200`}>
              <Scale className={`h-5 w-5 ${styles.icon}`} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Effective Regulations
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Primary rules for {jurisdictionName}
              </p>
            </div>
          </div>
          <Badge className={styles.badge}>
            {policySource} Policy
          </Badge>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Summary */}
        {effectivePolicy.regulation_summary && (
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-2">Summary</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {effectivePolicy.regulation_summary}
            </p>
          </div>
        )}

        {/* Key Details Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Permit Status</h4>
            <p className={`text-base font-semibold ${effectivePolicy.permit_required ? 'text-amber-600' : 'text-emerald-600'}`}>
              {effectivePolicy.permit_required ? 'Required' : 'Not Required'}
            </p>
            {effectivePolicy.permit_required && effectivePolicy.permit_type && (
              <p className="text-xs text-slate-500 mt-1">{effectivePolicy.permit_type}</p>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Permit Fee</h4>
            <p className={`text-base font-semibold ${effectivePolicy.permit_fee ? 'text-slate-800' : 'text-slate-400'}`}>
              {effectivePolicy.permit_fee ? `$${effectivePolicy.permit_fee}` : 'None or Varies'}
            </p>
          </div>

          {effectivePolicy.documentation_url && (
            <div className="bg-white rounded-lg p-4 border border-slate-200 flex items-center">
              <a
                href={effectivePolicy.documentation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm"
              >
                <FileText className="h-4 w-4" />
                View Official Documents
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
