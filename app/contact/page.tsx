"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Phone, Mail, Clock, Calculator, Droplets, TrendingUp, Sparkles, 
  CheckCircle2, ArrowRight, ArrowLeft, Home, Building2, Truck, TreePine, 
  HardHat, Briefcase, Users, ShowerHead, WashingMachine, Bath
} from "lucide-react"

interface CalculatorData {
  zip: string
  household: string
  area: string
  savings: string
  gallons: string
}

type CustomerType = 'homeowner' | 'installer' | 'contractor' | 'architect' | 'developer' | 'other'
type PropertyType = 'single-family' | 'multi-family' | 'tiny-home' | 'rv' | 'cabin' | 'commercial' | 'development'
type Timeline = 'immediate' | '1-3-months' | '3-6-months' | 'researching'
type WaterSource = 'laundry' | 'shower' | 'bathroom-sink' | 'all'

interface FormData {
  customerType: CustomerType | ''
  companyName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  propertyType: PropertyType | ''
  propertyLocation: string
  numberOfUnits: string
  waterSources: WaterSource[]
  timeline: Timeline | ''
  budget: string
  existingSystem: string
  additionalInfo: string
  howDidYouHear: string
}

const customerTypes = [
  { value: 'homeowner', label: 'Homeowner', icon: Home, description: 'I own the property' },
  { value: 'installer', label: 'Plumber / Installer', icon: HardHat, description: 'I install systems for clients' },
  { value: 'contractor', label: 'General Contractor', icon: Briefcase, description: 'I manage construction projects' },
  { value: 'architect', label: 'Architect / Designer', icon: Building2, description: 'I design buildings' },
  { value: 'developer', label: 'Property Developer', icon: Users, description: 'I develop properties' },
  { value: 'other', label: 'Other', icon: Users, description: 'Something else' },
]

const propertyTypes = [
  { value: 'single-family', label: 'Single Family Home', icon: Home },
  { value: 'multi-family', label: 'Multi-Family / Duplex', icon: Building2 },
  { value: 'tiny-home', label: 'Tiny Home', icon: Home },
  { value: 'rv', label: 'RV / Mobile Home', icon: Truck },
  { value: 'cabin', label: 'Cabin / Off-Grid', icon: TreePine },
  { value: 'commercial', label: 'Commercial Building', icon: Building2 },
  { value: 'development', label: 'New Development', icon: Users },
]

const waterSources = [
  { value: 'laundry', label: 'Washing Machine', icon: WashingMachine },
  { value: 'shower', label: 'Shower / Tub', icon: ShowerHead },
  { value: 'bathroom-sink', label: 'Bathroom Sinks', icon: Bath },
  { value: 'all', label: 'All Sources', icon: Droplets },
]

const timelines = [
  { value: 'immediate', label: 'Ready to purchase now' },
  { value: '1-3-months', label: 'Within 1-3 months' },
  { value: '3-6-months', label: 'Within 3-6 months' },
  { value: 'researching', label: 'Just researching' },
]

function ContactFormContent() {
  const searchParams = useSearchParams()
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    customerType: '',
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyLocation: '',
    numberOfUnits: '1',
    waterSources: [],
    timeline: '',
    budget: '',
    existingSystem: '',
    additionalInfo: '',
    howDidYouHear: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 5

  useEffect(() => {
    const source = searchParams.get('source')
    if (source === 'calculator') {
      const data: CalculatorData = {
        zip: searchParams.get('zip') || '',
        household: searchParams.get('household') || '',
        area: searchParams.get('area') || '',
        savings: searchParams.get('savings') || '',
        gallons: searchParams.get('gallons') || '',
      }
      setCalculatorData(data)
      setFormData(prev => ({
        ...prev,
        propertyLocation: data.zip,
        additionalInfo: `Based on my calculator results:\n- ${data.household}-person household\n- ${parseInt(data.area).toLocaleString()} sq ft irrigated area\n- Potential savings: $${data.savings}/year\n\nI'd like to learn more about greywater systems for my property.`
      }))
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData, calculatorData)
    setIsSubmitted(true)
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleWaterSource = (source: WaterSource) => {
    setFormData(prev => ({
      ...prev,
      waterSources: prev.waterSources.includes(source)
        ? prev.waterSources.filter(s => s !== source)
        : [...prev.waterSources, source]
    }))
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.customerType !== ''
      case 2: return formData.firstName && formData.email
      case 3: return formData.propertyType !== ''
      case 4: return formData.waterSources.length > 0 && formData.timeline !== ''
      default: return true
    }
  }

  const nextStep = () => {
    if (canProceed() && step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-8">
            We've received your quote request. Our team will review your information and get back to you within 24 hours with personalized recommendations.
          </p>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Get Your Free Quote
            </h1>
            <p className="text-lg text-gray-600">
              Tell us about your project and we'll provide personalized recommendations
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Results Banner */}
      {calculatorData && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Your Savings Estimate:</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full font-semibold">
                  ${parseInt(calculatorData.savings).toLocaleString()}/year
                </span>
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  {parseInt(calculatorData.gallons).toLocaleString()} gal/year
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
              <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              
              {/* Step 1: Customer Type */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Who are you?</h2>
                    <p className="text-gray-600">This helps us tailor our recommendations</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {customerTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateFormData('customerType', type.value as CustomerType)}
                          className={`p-5 rounded-xl border-2 text-left transition-all ${
                            formData.customerType === type.value
                              ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2.5 rounded-lg ${
                              formData.customerType === type.value ? 'bg-emerald-100' : 'bg-gray-100'
                            }`}>
                              <Icon className={`h-5 w-5 ${
                                formData.customerType === type.value ? 'text-emerald-600' : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{type.label}</div>
                              <div className="text-sm text-gray-500">{type.description}</div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {(formData.customerType === 'installer' || formData.customerType === 'contractor' || formData.customerType === 'architect' || formData.customerType === 'developer') && (
                    <div className="pt-4">
                      <Label htmlFor="companyName" className="text-gray-700">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => updateFormData('companyName', e.target.value)}
                        placeholder="Your company name"
                        className="mt-1.5 h-11"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Contact Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
                    <p className="text-gray-600">How can we reach you?</p>
                  </div>
                  
                  <Card className="border-gray-200">
                    <CardContent className="p-6 space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="firstName" className="text-gray-700">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => updateFormData('firstName', e.target.value)}
                            placeholder="John"
                            className="mt-1.5 h-11"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => updateFormData('lastName', e.target.value)}
                            placeholder="Smith"
                            className="mt-1.5 h-11"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="john@example.com"
                          className="mt-1.5 h-11"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="mt-1.5 h-11"
                        />
                        <p className="text-xs text-gray-500 mt-1">Optional - for faster response</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 3: Property Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Details</h2>
                    <p className="text-gray-600">Tell us about the property</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateFormData('propertyType', type.value as PropertyType)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.propertyType === type.value
                              ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className={`h-6 w-6 mx-auto mb-2 ${
                            formData.propertyType === type.value ? 'text-emerald-600' : 'text-gray-500'
                          }`} />
                          <div className={`text-sm font-medium ${
                            formData.propertyType === type.value ? 'text-emerald-700' : 'text-gray-700'
                          }`}>
                            {type.label}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <Card className="border-gray-200 mt-6">
                    <CardContent className="p-6 space-y-5">
                      <div>
                        <Label htmlFor="propertyLocation" className="text-gray-700">Property Location (City, State or ZIP) *</Label>
                        <Input
                          id="propertyLocation"
                          value={formData.propertyLocation}
                          onChange={(e) => updateFormData('propertyLocation', e.target.value)}
                          placeholder="Los Angeles, CA or 90210"
                          className="mt-1.5 h-11"
                        />
                        <p className="text-xs text-gray-500 mt-1">Helps us check local regulations</p>
                      </div>

                      {(formData.propertyType === 'multi-family' || formData.propertyType === 'commercial' || formData.propertyType === 'development') && (
                        <div>
                          <Label htmlFor="numberOfUnits" className="text-gray-700">Number of Units</Label>
                          <Input
                            id="numberOfUnits"
                            type="number"
                            min="1"
                            value={formData.numberOfUnits}
                            onChange={(e) => updateFormData('numberOfUnits', e.target.value)}
                            className="mt-1.5 h-11"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 4: Project Details */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Details</h2>
                    <p className="text-gray-600">Help us understand your needs</p>
                  </div>

                  <div>
                    <Label className="text-base font-semibold text-gray-900 mb-3 block">Which water sources do you want to recycle?</Label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {waterSources.map((source) => {
                        const Icon = source.icon
                        const isSelected = formData.waterSources.includes(source.value as WaterSource)
                        return (
                          <button
                            key={source.value}
                            type="button"
                            onClick={() => toggleWaterSource(source.value as WaterSource)}
                            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                              isSelected
                                ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                              <Icon className={`h-5 w-5 ${isSelected ? 'text-emerald-600' : 'text-gray-500'}`} />
                            </div>
                            <span className={`font-medium ${isSelected ? 'text-emerald-700' : 'text-gray-700'}`}>
                              {source.label}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="h-5 w-5 text-emerald-600 ml-auto" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Label className="text-base font-semibold text-gray-900 mb-3 block">What's your timeline?</Label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {timelines.map((timeline) => (
                        <button
                          key={timeline.value}
                          type="button"
                          onClick={() => updateFormData('timeline', timeline.value as Timeline)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.timeline === timeline.value
                              ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`font-medium ${
                            formData.timeline === timeline.value ? 'text-emerald-700' : 'text-gray-700'
                          }`}>
                            {timeline.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Label htmlFor="budget" className="text-gray-700">Approximate Budget (optional)</Label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => updateFormData('budget', e.target.value)}
                      className="mt-1.5 w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select a range</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="over-10000">Over $10,000</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 5: Additional Info */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost Done!</h2>
                    <p className="text-gray-600">Any additional details you'd like to share?</p>
                  </div>

                  <Card className="border-gray-200">
                    <CardContent className="p-6 space-y-5">
                      <div>
                        <Label htmlFor="existingSystem" className="text-gray-700">Do you have an existing greywater system?</Label>
                        <select
                          id="existingSystem"
                          value={formData.existingSystem}
                          onChange={(e) => updateFormData('existingSystem', e.target.value)}
                          className="mt-1.5 w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Select an option</option>
                          <option value="no">No, this is a new installation</option>
                          <option value="yes-upgrade">Yes, looking to upgrade</option>
                          <option value="yes-replace">Yes, need replacement</option>
                          <option value="yes-repair">Yes, need repairs</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="additionalInfo" className="text-gray-700">Additional Information</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                          placeholder="Tell us about your specific needs, questions, or any other details..."
                          className="mt-1.5 min-h-[120px]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="howDidYouHear" className="text-gray-700">How did you hear about us?</Label>
                        <select
                          id="howDidYouHear"
                          value={formData.howDidYouHear}
                          onChange={(e) => updateFormData('howDidYouHear', e.target.value)}
                          className="mt-1.5 w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Select an option</option>
                          <option value="google">Google Search</option>
                          <option value="social">Social Media</option>
                          <option value="referral">Friend / Referral</option>
                          <option value="contractor">Contractor / Installer</option>
                          <option value="article">Article / Blog</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="gap-2 h-11"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="bg-emerald-600 hover:bg-emerald-700 gap-2 h-11"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 gap-2 h-11"
                  >
                    Submit Quote Request
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2.5 bg-white rounded-lg border border-slate-100">
                  <Phone className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Call us</div>
                  <div className="font-semibold text-gray-900">(678) 809-3008</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2.5 bg-white rounded-lg border border-slate-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Email us</div>
                  <div className="font-semibold text-gray-900 text-sm">sales@waterwisegroup.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2.5 bg-white rounded-lg border border-slate-100">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Response</div>
                  <div className="font-semibold text-gray-900">Within 24 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Contact() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  )
}
