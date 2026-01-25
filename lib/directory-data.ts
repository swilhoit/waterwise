/**
 * Shared data fetching utilities for directory pages
 *
 * NOTE: This file re-exports from the new centralized modules for backward compatibility.
 * New code should import directly from:
 * - @/lib/directory-types (type definitions)
 * - @/lib/directory-queries (data fetching functions)
 * - @/lib/state-utils (state slug utilities)
 */

// Re-export all types from directory-types
export type {
  GreywaterData,
  RainwaterData,
  PreplumbingData,
  AgencyData,
  IncentiveProgram,
  CityInfo,
  LocalRegulation,
  StateData,
  LegalStatus,
  StatePermitDetails,
  CityPermitDetails,
  WaterUtility,
  IncentiveSummary,
  FAQ,
  LocationHubViewProps,
  GreywaterSpokeViewProps,
  RainwaterSpokeViewProps
} from '@/lib/directory-types'

// Re-export all query functions from directory-queries
export {
  normalizeLegalStatus,
  parseArrayField,
  getStateData,
  getGreywaterData,
  getRainwaterData,
  getStateIncentives,
  getIncentivesByType,
  getCityIncentives,
  getCityInfo,
  getStateCities,
  getLocalRegulations,
  getStatePermitDetails,
  getCityPermitDetails,
  getCityWaterUtilities,
  getAllStates,
  buildJurisdictionId,
  buildJurisdictionIds,
  formatCityName,
  cityToSlug,
  getMaxRebate,
  countIncentivesByType
} from '@/lib/directory-queries'

// Re-export slug utilities from state-utils
export {
  getStateCodeFromSlug,
  stateCodeToSlug,
  stateNameToSlug,
  generateStateStaticParams,
  isValidStateSlug
} from '@/lib/state-utils'

// Legacy alias for backward compatibility
export { getIncentivesByType as getIncentives } from '@/lib/directory-queries'
