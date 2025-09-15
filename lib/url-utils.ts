/**
 * Convert a name to a URL-friendly slug by replacing spaces with dashes
 * and removing special characters
 */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, '')     // Remove special characters except dashes
    .replace(/-+/g, '-')            // Replace multiple dashes with single dash
    .replace(/^-|-$/g, '');         // Remove leading/trailing dashes
}

/**
 * Convert a URL slug back to a display name by replacing dashes with spaces
 * and applying proper capitalization
 */
export function slugToName(slug: string): string {
  return slug
    .replace(/-/g, ' ')              // Replace dashes with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
}

/**
 * Find a matching item from an array by comparing slugified names
 */
export function findBySlug<T extends { [key: string]: any }>(
  items: T[], 
  slug: string, 
  nameKey: string
): T | undefined {
  const targetName = slugToName(slug);
  
  return items.find(item => {
    const itemName = item[nameKey];
    if (!itemName) return false;
    
    // Try exact match first
    if (itemName.toLowerCase() === targetName.toLowerCase()) {
      return true;
    }
    
    // Try slug match
    if (nameToSlug(itemName) === slug) {
      return true;
    }
    
    return false;
  });
}