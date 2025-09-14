"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle } from "lucide-react"

export interface ComparisonProduct {
  title: string
  handle: string
  priceText?: string
}

interface ComparisonTableProps {
  products: ComparisonProduct[]
  className?: string
}

/**
 * ComparisonTable renders a responsive, accessible comparison table for two systems.
 * It gracefully degrades to horizontal scrolling on small screens.
 */
export function ComparisonTable({ products, className }: ComparisonTableProps) {
  const [left, right] = products.slice(0, 2)

  // Heuristic defaults based on product title keywords
  const isPro = (title: string) => /pro/i.test(title)

  const capacity = [
    isPro(left?.title || "") ? "Up to 500 GPD" : "Up to 150 GPD",
    isPro(right?.title || "") ? "Up to 500 GPD" : "Up to 150 GPD",
  ]

  const bestFor = [
    isPro(left?.title || "") ? "Large properties, developments" : "Homes, cabins",
    isPro(right?.title || "") ? "Large properties, developments" : "Homes, cabins",
  ]

  const filtration = [
    isPro(left?.title || "") ? "Advanced multi-stage Matala" : "4-stage Matala",
    isPro(right?.title || "") ? "Advanced multi-stage Matala" : "4-stage Matala",
  ]

  const pumpIncluded = [
    isPro(left?.title || "") ? true : false,
    isPro(right?.title || "") ? true : false,
  ]

  const installation = [
    isPro(left?.title || "") ? "Pro recommended" : "DIY friendly",
    isPro(right?.title || "") ? "Pro recommended" : "DIY friendly",
  ]

  const warranty = ["5 years", "5 years"]

  const price = [left?.priceText || "From $—", right?.priceText || "From $—"]

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-left border border-gray-100 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th scope="col" className="px-4 py-3 w-1/3" aria-hidden="true"></th>
            <th scope="col" className="px-4 py-3 text-gray-900 font-semibold"></th>
            <th scope="col" className="px-4 py-3 text-gray-900 font-semibold"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-gray-50/50">
            <th scope="row" className="px-4 py-4 text-gray-600">System</th>
            <td className="px-4 py-4 font-medium text-gray-900">{left?.title || "System A"}</td>
            <td className="px-4 py-4 font-medium text-gray-900">{right?.title || "System B"}</td>
          </tr>
          <tr className="hover:bg-gray-50/50">
            <th scope="row" className="px-4 py-4 text-gray-600">Capacity</th>
            <td className="px-4 py-4">{capacity[0]}</td>
            <td className="px-4 py-4">{capacity[1]}</td>
          </tr>
          <tr className="hover:bg-gray-50/50">
            <th scope="row" className="px-4 py-4 text-gray-600">Best for</th>
            <td className="px-4 py-4">{bestFor[0]}</td>
            <td className="px-4 py-4">{bestFor[1]}</td>
          </tr>
          <tr className="hover:bg-gray-50/50">
            <th scope="row" className="px-4 py-4 text-gray-600">Filtration</th>
            <td className="px-4 py-4">{filtration[0]}</td>
            <td className="px-4 py-4">{filtration[1]}</td>
          </tr>
          <tr className="hover:bg-gray-50/50">
            <th scope="row" className="px-4 py-4 text-gray-600">Pump included</th>
            <td className="px-4 py-4">
              {pumpIncluded[0] ? (
                <span className="inline-flex items-center gap-2 text-green-600"><CheckCircle className="h-5 w-5" /> Yes</span>
              ) : (
                <span className="inline-flex items-center gap-2 text-gray-500"><XCircle className="h-5 w-5" /> Optional</span>
              )}
            </td>
            <td className="px-4 py-4">
              {pumpIncluded[1] ? (
                <span className="inline-flex items-center gap-2 text-green-600"><CheckCircle className="h-5 w-5" /> Yes</span>
              ) : (
                <span className="inline-flex items-center gap-2 text-gray-500"><XCircle className="h-5 w-5" /> Optional</span>
              )}
            </td>
          </tr>
          <tr className="hover:bg-gray-50/50">
            <th scope="row" className="px-4 py-4 text-gray-600">Installation</th>
            <td className="px-4 py-4">{installation[0]}</td>
            <td className="px-4 py-4">{installation[1]}</td>
          </tr>
          <tr className="hover:bg-gray-50/50">
            <th scope="row" className="px-4 py-4 text-gray-600">Warranty</th>
            <td className="px-4 py-4">{warranty[0]}</td>
            <td className="px-4 py-4">{warranty[1]}</td>
          </tr>
          <tr className="hover:bg-gray-50/50">
            <th scope="row" className="px-4 py-4 text-gray-600">Price</th>
            <td className="px-4 py-4 font-semibold text-gray-700">{price[0]}</td>
            <td className="px-4 py-4 font-semibold text-gray-700">{price[1]}</td>
          </tr>
          <tr className="bg-gray-50/60">
            <th scope="row" className="px-4 py-4 text-gray-600">Action</th>
            <td className="px-4 py-4">
              {left?.handle ? (
                <Link href={`/products/${left.handle}`} className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">View system</Link>
              ) : null}
            </td>
            <td className="px-4 py-4">
              {right?.handle ? (
                <Link href={`/products/${right.handle}`} className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">View system</Link>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-3">GPD = gallons per day. Actual capacity varies by plumbing layout and usage.</p>
    </div>
  )
}

export default ComparisonTable


