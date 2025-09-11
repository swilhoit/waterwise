"use client"

import { useEffect, useRef, useState } from "react"

// Fade in animation hook for components
export function useFadeIn(delay: number = 0) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return { ref, isVisible }
}

// Fade in wrapper component
interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  duration?: string
}

export function FadeIn({ children, delay = 0, className = "", duration = "duration-700" }: FadeInProps) {
  const { ref, isVisible } = useFadeIn(delay)

  return (
    <div
      ref={ref}
      className={`transition-all ${duration} ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Stagger children animations
interface StaggerProps {
  children: React.ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}

export function Stagger({ children, delay = 0, staggerDelay = 150, className = "" }: StaggerProps) {
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <FadeIn key={index} delay={delay + index * staggerDelay}>
          {child}
        </FadeIn>
      ))}
    </div>
  )
}

// Page transition wrapper
interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  )
}