/**
 * Centralized state utilities for the directory system
 * All state-related slug conversions and lookups should use these functions
 */

// State name to code mapping
export const STATE_CODES: Record<string, string> = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
}

// Reverse mapping - code to name
export const STATE_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_CODES).map(([name, code]) => [code, name])
)

/**
 * Get state name from state code
 * @example getStateNameFromCode('CA') => 'California'
 */
export function getStateNameFromCode(code: string): string | undefined {
  return STATE_NAMES[code.toUpperCase()]
}

/**
 * Get state code from state name
 * @example getStateCodeFromName('California') => 'CA'
 */
export function getStateCodeFromName(name: string): string | undefined {
  return STATE_CODES[name]
}

/**
 * Convert URL slug to state code
 * Handles both hyphenated names ("new-york") and state codes ("ny")
 * @example getStateCodeFromSlug('california') => 'CA'
 * @example getStateCodeFromSlug('new-york') => 'NY'
 * @example getStateCodeFromSlug('ca') => 'CA'
 */
export function getStateCodeFromSlug(slug: string): string | null {
  // First, try to convert from hyphenated state name (e.g., "new-york" -> "New York")
  const normalized = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  // Check if it's a state name
  if (STATE_CODES[normalized]) {
    return STATE_CODES[normalized]
  }

  // Check if it's already a state code (e.g., "ca" or "CA")
  const upperSlug = slug.toUpperCase()
  if (STATE_NAMES[upperSlug]) {
    return upperSlug
  }

  return null
}

/**
 * Convert state code to URL slug
 * @example stateCodeToSlug('CA') => 'ca'
 */
export function stateCodeToSlug(code: string): string {
  return code.toLowerCase()
}

/**
 * Convert state name to URL slug
 * @example stateNameToSlug('New York') => 'new-york'
 */
export function stateNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

/**
 * Generate static params for all states (both code and name variants)
 * Used in generateStaticParams for state pages
 */
export function generateStateStaticParams(): Array<{ state: string }> {
  const codeParams = Object.values(STATE_CODES).map(code => ({
    state: code.toLowerCase()
  }))

  const nameParams = Object.keys(STATE_CODES).map(name => ({
    state: name.toLowerCase().replace(/\s+/g, '-')
  }))

  return [...codeParams, ...nameParams]
}

/**
 * Check if a string is a valid state code or slug
 */
export function isValidStateSlug(slug: string): boolean {
  return getStateCodeFromSlug(slug) !== null
}