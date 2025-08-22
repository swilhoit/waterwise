"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageSquare, Calculator, Wrench } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    projectType: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form or show success message
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              Get Your <span className="text-gradient">Free Quote</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
              Ready to start saving water and money? Contact our experts for personalized recommendations and pricing.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Request Your Free Consultation</CardTitle>
                  <CardDescription>
                    Tell us about your property and water conservation goals. Our experts will provide personalized recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="propertyType">Property Type *</Label>
                        <Select onValueChange={(value) => handleInputChange('propertyType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single-family-home">Single Family Home</SelectItem>
                            <SelectItem value="tiny-home">Tiny Home</SelectItem>
                            <SelectItem value="cabin">Cabin</SelectItem>
                            <SelectItem value="rv">RV</SelectItem>
                            <SelectItem value="apartment">Apartment/Condo</SelectItem>
                            <SelectItem value="commercial">Commercial Property</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="projectType">What are you interested in? *</Label>
                      <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-installation">New Greywater System</SelectItem>
                          <SelectItem value="replacement">System Replacement</SelectItem>
                          <SelectItem value="consultation">Consultation Only</SelectItem>
                          <SelectItem value="maintenance">Maintenance/Repair</SelectItem>
                          <SelectItem value="parts">Replacement Parts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Tell us about your project *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Describe your property, current water usage, goals, and any specific requirements..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Get My Free Quote
                    </Button>
                    
                    <p className="text-sm text-gray-600 text-center">
                      We'll respond within 24 hours with personalized recommendations
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900">1-800-XXX-XXXX</p>
                  <p className="text-gray-600">Mon-Fri 8AM-6PM PST</p>
                  <p className="text-gray-600">Sat 9AM-4PM PST</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-gray-900">info@waterwisegroup.com</p>
                  <p className="text-gray-600">We respond within 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Visit Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900">California, USA</p>
                  <p className="text-gray-600">Serving customers nationwide</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900">Same-day response</p>
                  <p className="text-gray-600">Most quotes within 4 hours</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Help You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to ongoing support, we're with you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Free Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our experts assess your property and water usage to recommend the perfect system for your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Custom Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get detailed pricing including system costs, shipping, and potential water savings calculations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift transition-all duration-300">
              <CardHeader>
                <Wrench className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Ongoing Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  From installation guidance to maintenance tips, we provide comprehensive support for your system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of customers who have reduced their water usage by 50% or more
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24hr</div>
              <div className="text-lg opacity-90">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50%</div>
              <div className="text-lg opacity-90">Average Water Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}