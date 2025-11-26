"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface DropdownItem {
  title: string
  href: string
  description?: string
}

interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

interface SimpleNavProps {
  items: NavItem[]
}

export function SimpleNav({ items }: SimpleNavProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
    setTimeoutId(id)
  }

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          {item.href ? (
            <Link
              href={item.href}
              className="inline-flex h-10 items-center justify-center px-4 py-2 text-[14px] font-medium text-gray-700 transition-colors hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            >
              {item.label}
            </Link>
          ) : (
            <button 
              className={`inline-flex h-10 items-center justify-center px-4 py-2 text-[14px] font-medium transition-colors rounded-lg ${
                activeDropdown === item.label 
                  ? 'text-gray-900 bg-gray-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.label}
              <ChevronDown 
                className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === item.label ? 'rotate-180' : ''
                }`} 
              />
            </button>
          )}

          {item.dropdown && activeDropdown === item.label && (
            <>
              <div className="absolute top-full left-0 w-full h-3" />
              <div className="absolute top-full left-0 pt-3 z-50">
                <div 
                  className="w-72 bg-white border border-gray-200 rounded-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
                  style={{ animationDuration: '150ms' }}
                >
                  <div className="p-2">
                    {item.dropdown.map((dropdownItem, index) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="text-[14px] font-medium">{dropdownItem.title}</span>
                        {dropdownItem.description && (
                          <span className="text-[12px] text-gray-500 leading-snug">{dropdownItem.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </nav>
  )
}
