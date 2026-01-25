/**
 * Zod validation schemas for directory API routes
 * Provides runtime validation for query parameters and responses
 */

import { z } from 'zod'

// =============================================================================
// COMMON SCHEMAS
// =============================================================================

export const stateCodeSchema = z
  .string()
  .length(2)
  .toUpperCase()
  .refine(
    (val) => /^[A-Z]{2}$/.test(val),
    { message: 'Invalid state code format. Must be 2 uppercase letters.' }
  )

export const resourceTypeSchema = z.enum(['greywater', 'rainwater', 'all']).default('all')

export const legalStatusSchema = z.enum([
  'Legal',
  'Regulated',
  'Restricted',
  'Prohibited',
  'Unknown'
])

// =============================================================================
// API QUERY PARAMETER SCHEMAS
// =============================================================================

export const stateDataQuerySchema = z.object({
  state: stateCodeSchema
})

export const allStatesQuerySchema = z.object({
  resource_type: resourceTypeSchema.optional()
})

export const complianceQuerySchema = z.object({
  state: stateCodeSchema,
  county: z.string().optional(),
  city: z.string().optional(),
  resource_type: resourceTypeSchema.optional()
})

export const hierarchyQuerySchema = z.object({
  level: z.enum(['states', 'counties', 'cities']).default('states'),
  parentId: z.string().optional(),
  parentType: z.enum(['state', 'county']).optional()
})

export const waterRegulationsQuerySchema = z.object({
  state: stateCodeSchema,
  waterType: z.enum(['GREYWATER', 'RAINWATER', 'ALL']).default('ALL')
})

// =============================================================================
// API RESPONSE SCHEMAS
// =============================================================================

export const agencyDataSchema = z.object({
  name: z.string().optional(),
  contact: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal(''))
}).nullable()

export const greywaterDataSchema = z.object({
  legalStatus: z.string(),
  governingCode: z.string().optional(),
  governingCodeUrl: z.string().optional(),
  permitRequired: z.string().optional(),
  permitThresholdGpd: z.number().nullable().optional(),
  indoorUseAllowed: z.boolean().optional(),
  outdoorUseAllowed: z.boolean().optional(),
  approvedUses: z.array(z.string()).default([]),
  keyRestrictions: z.array(z.string()).default([]),
  recentChanges: z.string().nullable().optional(),
  summary: z.string().optional()
}).nullable()

export const rainwaterDataSchema = z.object({
  legalStatus: z.string(),
  governingCode: z.string().optional(),
  governingCodeUrl: z.string().optional(),
  permitRequired: z.string().optional(),
  collectionLimitGallons: z.number().nullable().optional(),
  potableUseAllowed: z.boolean().optional(),
  taxIncentives: z.string().optional(),
  approvedUses: z.array(z.string()).default([]),
  keyRestrictions: z.array(z.string()).default([]),
  indoorUseAllowed: z.boolean().optional(),
  outdoorUseAllowed: z.boolean().optional(),
  cisternAllowed: z.boolean().optional(),
  rainBarrelAllowed: z.boolean().optional(),
  undergroundAllowed: z.boolean().optional(),
  stubOutRequired: z.boolean().optional(),
  stubOutDetails: z.string().optional()
}).nullable()

export const incentiveProgramSchema = z.object({
  program_name: z.string(),
  incentive_type: z.string().optional(),
  resource_type: z.string().optional(),
  program_subtype: z.string().optional(),
  incentive_amount_min: z.number().optional(),
  incentive_amount_max: z.number().optional(),
  incentive_url: z.string().optional(),
  program_description: z.string().optional(),
  water_utility: z.string().optional(),
  residential_eligible: z.boolean().optional(),
  commercial_eligible: z.boolean().optional(),
  jurisdiction_level: z.enum(['state', 'county', 'city', 'utility', 'other']).optional()
})

export const incentiveSummarySchema = z.object({
  total: z.number(),
  greywater: z.number(),
  rainwater: z.number(),
  conservation: z.number(),
  maxRebate: z.number()
})

export const stateDataResponseSchema = z.object({
  state_code: z.string(),
  state_name: z.string(),
  greywater: greywaterDataSchema,
  rainwater: rainwaterDataSchema,
  conservation: z.object({
    hasRegulations: z.boolean(),
    message: z.string(),
    incentiveCount: z.number()
  }),
  agency: agencyDataSchema,
  incentives: incentiveSummarySchema
})

export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    status: z.enum(['success', 'error']),
    data: dataSchema.optional(),
    message: z.string().optional()
  })

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Validate query parameters and return typed result or error
 */
export function validateQueryParams<T extends z.ZodType>(
  schema: T,
  params: URLSearchParams
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  const obj: Record<string, string> = {}
  params.forEach((value, key) => {
    obj[key] = value
  })

  const result = schema.safeParse(obj)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errorMessages = result.error.issues
    .map((e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`)
    .join(', ')

  return { success: false, error: errorMessages }
}

/**
 * Create a standardized API error response
 */
export function createApiError(message: string, status: number = 400) {
  return {
    body: { status: 'error' as const, message },
    status
  }
}

/**
 * Create a standardized API success response
 */
export function createApiSuccess<T>(data: T) {
  return {
    body: { status: 'success' as const, data },
    status: 200
  }
}

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type StateDataQuery = z.infer<typeof stateDataQuerySchema>
export type AllStatesQuery = z.infer<typeof allStatesQuerySchema>
export type ComplianceQuery = z.infer<typeof complianceQuerySchema>
export type HierarchyQuery = z.infer<typeof hierarchyQuerySchema>
export type WaterRegulationsQuery = z.infer<typeof waterRegulationsQuerySchema>
export type StateDataResponse = z.infer<typeof stateDataResponseSchema>
