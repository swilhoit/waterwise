/**
 * Formats a price string to ensure it shows either whole numbers or two decimal places
 * @param priceString - The price as a string (e.g., "599.99", "2299.00", "1500")
 * @returns Formatted price string (e.g., "599.99", "2299.00", "1500")
 */
export function formatPrice(priceString: string): string {
  const price = parseFloat(priceString)
  
  if (isNaN(price)) {
    return priceString // Return original if not a valid number
  }
  
  // Check if the price is a whole number
  if (price % 1 === 0) {
    return price.toString() // Return as whole number (e.g., "1500")
  } else {
    return price.toFixed(2) // Return with two decimal places (e.g., "599.99")
  }
}

/**
 * Formats a price for display with currency symbol
 * @param priceString - The price as a string
 * @param prefix - Prefix like "From " (optional)
 * @returns Formatted price with $ symbol
 */
export function formatPriceDisplay(priceString: string, prefix: string = ""): string {
  const formattedPrice = formatPrice(priceString)
  return `${prefix}$${formattedPrice}`
}