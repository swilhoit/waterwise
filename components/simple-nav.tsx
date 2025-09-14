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

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <nav className="hidden lg:flex items-center gap-6">
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
              className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ) : (
            <button className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900">
              {item.label}
              <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
            </button>
          )}

          {item.dropdown && activeDropdown === item.label && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-1">
                {item.dropdown.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.href}
                    href={dropdownItem.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <div>
                      <div className="font-medium">{dropdownItem.title}</div>
                      {dropdownItem.description && (
                        <div className="text-xs text-gray-500 mt-1">{dropdownItem.description}</div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}