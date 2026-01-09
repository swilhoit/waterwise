'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle, Loader2, Droplets } from 'lucide-react'

interface BuilderNewsletterSectionProps {
  title?: string
  subtitle?: string
  buttonText?: string
  successMessage?: string
  variant?: 'default' | 'gradient' | 'blue' | 'white'
  showIcon?: boolean
}

export function BuilderNewsletterSection({
  title = 'Stay Water Wise',
  subtitle = 'Get greywater tips, conservation news, and exclusive offers delivered to your inbox.',
  buttonText = 'Subscribe',
  successMessage = 'Thanks for subscribing!',
  variant = 'gradient',
  showIcon = true,
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

  const variantStyles = {
    default: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white',
    blue: 'bg-blue-600 text-white',
    white: 'bg-white',
  }

  const inputStyles = {
    default: 'bg-white border-gray-300 text-gray-900',
    gradient: 'bg-white/10 border-white/30 text-white placeholder:text-white/60',
    blue: 'bg-white/10 border-white/30 text-white placeholder:text-white/60',
    white: 'bg-gray-50 border-gray-300 text-gray-900',
  }

  const textStyles = {
    default: 'text-gray-600',
    gradient: 'text-blue-100',
    blue: 'text-blue-100',
    white: 'text-gray-600',
  }

  const titleStyles = {
    default: 'text-gray-900',
    gradient: 'text-white',
    blue: 'text-white',
    white: 'text-gray-900',
  }

  return (
    <section className={`py-16 lg:py-20 ${variantStyles[variant]}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {showIcon && (
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
              variant === 'default' || variant === 'white'
                ? 'bg-blue-100'
                : 'bg-white/20'
            }`}>
              <Droplets className={`h-8 w-8 ${
                variant === 'default' || variant === 'white'
                  ? 'text-blue-600'
                  : 'text-white'
              }`} />
            </div>
          )}

          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${titleStyles[variant]}`}>
            {title}
          </h2>

          <p className={`text-lg mb-8 ${textStyles[variant]}`}>
            {subtitle}
          </p>

          {status === 'success' ? (
            <div className={`flex items-center justify-center gap-2 text-lg ${
              variant === 'default' || variant === 'white'
                ? 'text-green-600'
                : 'text-green-300'
            }`}>
              <CheckCircle className="h-6 w-6" />
              <span>{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  variant === 'default' || variant === 'white'
                    ? 'text-gray-400'
                    : 'text-white/60'
                }`} />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`pl-10 h-12 ${inputStyles[variant]}`}
                />
              </div>
              <Button
                type="submit"
                disabled={status === 'loading'}
                className={`h-12 px-8 ${
                  variant === 'default' || variant === 'white'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-white text-blue-600 hover:bg-gray-100'
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  buttonText
                )}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className={`mt-4 text-sm ${
              variant === 'default' || variant === 'white'
                ? 'text-red-600'
                : 'text-red-300'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
