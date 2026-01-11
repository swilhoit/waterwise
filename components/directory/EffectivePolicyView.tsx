"use client"

import { Badge } from '@/components/ui/badge'
import { FileText, Scale, ExternalLink } from 'lucide-react'

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

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden border-l-4 border-l-teal-400">
      <div className="p-5 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white border border-gray-200">
              <Scale className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Effective Regulations
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Primary rules for {jurisdictionName}
              </p>
            </div>
          </div>
          <Badge className="bg-teal-50 text-teal-700 border-teal-200">
            {policySource} Policy
          </Badge>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Summary */}
        {effectivePolicy.regulation_summary && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">Summary</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {effectivePolicy.regulation_summary}
            </p>
          </div>
        )}

        {/* Key Details Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Permit Status</h4>
            <p className={`text-base font-semibold ${effectivePolicy.permit_required ? 'text-gray-700' : 'text-gray-600'}`}>
              {effectivePolicy.permit_required ? 'Required' : 'Not Required'}
            </p>
            {effectivePolicy.permit_required && effectivePolicy.permit_type && (
              <p className="text-xs text-gray-500 mt-1">{effectivePolicy.permit_type}</p>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Permit Fee</h4>
            <p className={`text-base font-semibold ${effectivePolicy.permit_fee ? 'text-gray-800' : 'text-gray-400'}`}>
              {effectivePolicy.permit_fee ? `$${effectivePolicy.permit_fee}` : 'None or Varies'}
            </p>
          </div>

          {effectivePolicy.documentation_url && (
            <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center">
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
