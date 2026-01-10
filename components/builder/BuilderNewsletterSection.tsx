'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react'

interface BuilderNewsletterSectionProps {
  title?: string
  subtitle?: string
  buttonText?: string
  successMessage?: string
}

export function BuilderNewsletterSection({
  title = 'Join the Water-Saving Movement',
  subtitle = 'Get exclusive tips, early access to new products, and be part of a community saving millions of gallons.',
  buttonText = 'Get Started',
  successMessage = "You're in! Check your inbox for a welcome gift.",
}: BuilderNewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(successMessage)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 py-20 lg:py-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Water drop shapes */}
        <svg className="absolute top-10 left-[10%] w-8 h-8 text-white/20 animate-bounce" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
        <svg className="absolute top-20 right-[15%] w-6 h-6 text-white/15 animate-bounce" style={{ animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
        <svg className="absolute bottom-20 left-[20%] w-10 h-10 text-white/10 animate-bounce" style={{ animationDelay: '1.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
        <svg className="absolute bottom-32 right-[25%] w-5 h-5 text-white/20 animate-bounce" style={{ animationDelay: '0.8s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      </div>

      {/* Wave decoration at top */}
      <div className="absolute top-0 left-0 right-0">
        <svg className="w-full h-16 text-white" viewBox="0 0 1440 64" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,32 C320,64 420,0 720,32 C1020,64 1120,0 1440,32 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 text-emerald-50" viewBox="0 0 1440 64" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,32 C320,0 420,64 720,32 C1020,0 1120,64 1440,32 L1440,64 L0,64 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-white text-sm font-medium">Join 5,000+ water-savers</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center w-12 h-12 bg-green-400 rounded-full">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-white text-lg font-medium">{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 h-14 text-lg bg-white border-0 rounded-xl shadow-lg focus:ring-4 focus:ring-white/30 placeholder:text-gray-400"
                />
              </div>
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="h-14 px-8 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <span>{buttonText}</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-4 text-red-200 bg-red-500/20 rounded-lg px-4 py-2 inline-block">
              {message}
            </p>
          )}

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-300" />
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
