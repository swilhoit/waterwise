
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { FileText, CheckCircle, Scale } from 'lucide-react'

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

  const getPolicySourceColor = () => {
    switch (policySource) {
      case 'City':
        return 'border-green-500 bg-green-50';
      case 'County':
        return 'border-purple-500 bg-purple-50';
      case 'State':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  }
  
  return (
    <Card className={`mb-8 p-6 border-2 ${getPolicySourceColor()}`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Scale className="h-6 w-6 text-gray-600" />
            Effective Regulations for {jurisdictionName}
          </h2>
          <p className="text-gray-600 mt-1">
            These are the primary rules you need to follow, based on the most local regulations available.
          </p>
        </div>
        <Badge className="mt-4 md:mt-0 text-lg px-4 py-2">
          Policy Source: {policySource}
        </Badge>
      </div>
      
      <div className="mt-6 space-y-4">
        {/* Summary */}
        {effectivePolicy.regulation_summary && (
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-2">Summary</h3>
            <p className="text-sm text-gray-600">
              {effectivePolicy.regulation_summary}
            </p>
          </div>
        )}
        
        {/* Key Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4">
            <h4 className="text-sm font-medium text-gray-500">Permit Status</h4>
            <p className={`text-lg font-semibold ${effectivePolicy.permit_required ? 'text-orange-600' : 'text-green-600'}`}>
              {effectivePolicy.permit_required ? 'Permit Required' : 'Permit Not Required'}
            </p>
            {effectivePolicy.permit_required && effectivePolicy.permit_type && (
              <p className="text-xs text-gray-500 mt-1">{effectivePolicy.permit_type}</p>
            )}
          </Card>
          
          <Card className="p-4">
            <h4 className="text-sm font-medium text-gray-500">Permit Fee</h4>
            <p className={`text-lg font-semibold ${effectivePolicy.permit_fee ? 'text-gray-800' : 'text-gray-500'}`}>
              {effectivePolicy.permit_fee ? `$${effectivePolicy.permit_fee}` : 'None or Varies'}
            </p>
          </Card>

          {effectivePolicy.documentation_url && (
             <Card className="p-4 flex items-center justify-center">
                <a 
                    href={effectivePolicy.documentation_url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                >
                    <FileText className="h-5 w-5" />
                    View Official Documents
                </a>
            </Card>
          )}
        </div>
      </div>
    </Card>
  )
}
