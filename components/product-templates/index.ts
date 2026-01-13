export { RainwaterTemplate } from './RainwaterTemplate'
export { PartsTemplate } from './PartsTemplate'
export { FiltrationTemplate } from './FiltrationTemplate'

// Helper to detect product category from handle
export type ProductCategory = 'greywater' | 'rainwater' | 'parts' | 'filtration'

export function getProductCategory(handle: string): ProductCategory {
  // Greywater systems
  if (handle.startsWith('aqua2use') || handle === 'replacement-greywater-pump') {
    return 'greywater'
  }

  // Rainwater harvesting products
  if (
    handle.startsWith('rain-barrel') ||
    handle.startsWith('rain-harvest') ||
    handle === 'first-flush-diverter' ||
    handle === 'downspout-filter' ||
    handle === 'ibc-tote-system'
  ) {
    return 'rainwater'
  }

  // Filtration products
  if (
    handle === 'sediment-pre-filter' ||
    handle === 'carbon-block-filter' ||
    handle === 'replacement-filters'
  ) {
    return 'filtration'
  }

  // Parts and accessories (default for remaining products)
  return 'parts'
}
