"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface LeadFormModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSources: string[]
}

export function LeadFormModal({ isOpen, onClose, selectedSources }: LeadFormModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Build URL with pre-selected sources
  const formUrl = `https://waterwise-leadform.vercel.app?sources=${selectedSources.join(",")}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Get Your Free Consultation
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Iframe Container */}
        <div className="h-[70vh] overflow-hidden">
          <iframe
            src={formUrl}
            className="w-full h-full border-0"
            title="Water Wise Lead Form"
            allow="clipboard-write"
          />
        </div>
      </div>
    </div>
  )
}
