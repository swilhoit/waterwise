/**
 * Web Scraping Utility for Greywater Regulations
 *
 * This is a HELPER tool for manual data collection, not an automated scraper.
 * It fetches and parses HTML from state agency websites and outputs structured
 * data for human review before entry into the database.
 *
 * Usage:
 *   npx ts-node scripts/scrape-regulations.ts [state-code]
 *
 * Example:
 *   npx ts-node scripts/scrape-regulations.ts CA
 *
 * Before running, install required dependencies:
 *   npm install cheerio @types/cheerio
 */

import * as https from 'https'
import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'

// Simple HTML parser (works without cheerio)
// If cheerio is available, it will be used for better parsing
let cheerio: typeof import('cheerio') | null = null
try {
  cheerio = require('cheerio')
} catch {
  console.log('Note: cheerio not installed. Using basic HTML parsing.')
  console.log('For better results, run: npm install cheerio')
}

// State regulation source URLs
interface RegulationSource {
  state_code: string
  state_name: string
  agency: string
  greywater_url?: string
  rainwater_url?: string
  plumbing_code_url?: string
  notes?: string
}

// Load regulation sources from the JSON file
function loadRegulationSources(): RegulationSource[] {
  const sourcesPath = path.join(__dirname, '..', 'data', 'regulation-sources.json')
  try {
    const data = fs.readFileSync(sourcesPath, 'utf-8')
    const parsed = JSON.parse(data)
    return parsed.sources || []
  } catch (error) {
    console.error('Could not load regulation sources:', error)
    return []
  }
}

// Fetch a URL and return the HTML content
function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WaterWiseBot/1.0; +https://waterwisegroup.com)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      timeout: 30000,
    }, (response) => {
      // Handle redirects
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Following redirect to: ${response.headers.location}`)
        fetchUrl(response.headers.location).then(resolve).catch(reject)
        return
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`))
        return
      }

      let data = ''
      response.on('data', (chunk) => { data += chunk })
      response.on('end', () => resolve(data))
      response.on('error', reject)
    })

    request.on('error', reject)
    request.on('timeout', () => {
      request.destroy()
      reject(new Error('Request timeout'))
    })
  })
}

// Extract text content from HTML (basic parser)
function extractTextBasic(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Extract structured data using patterns
interface ExtractedRegulation {
  title?: string
  permit_info?: string[]
  uses?: string[]
  restrictions?: string[]
  thresholds?: string[]
  code_references?: string[]
  contact_info?: string[]
  raw_sections?: { heading: string; content: string }[]
}

function extractRegulationData(html: string, url: string): ExtractedRegulation {
  const result: ExtractedRegulation = {
    permit_info: [],
    uses: [],
    restrictions: [],
    thresholds: [],
    code_references: [],
    contact_info: [],
    raw_sections: [],
  }

  if (cheerio) {
    // Use cheerio for better parsing
    const $ = cheerio.load(html)

    // Extract title
    result.title = $('h1').first().text().trim() || $('title').text().trim()

    // Remove scripts and styles
    $('script, style, nav, footer, header').remove()

    // Look for main content areas
    const mainContent = $('main, article, .content, #content, .main-content').first()
    const contentArea = mainContent.length ? mainContent : $('body')

    // Extract headings and their content
    contentArea.find('h1, h2, h3, h4').each((_, heading) => {
      const $heading = $(heading)
      const headingText = $heading.text().trim()

      // Get content until next heading
      let content = ''
      let next = $heading.next()
      while (next.length && !next.is('h1, h2, h3, h4')) {
        content += next.text().trim() + ' '
        next = next.next()
      }

      if (headingText && content.trim()) {
        result.raw_sections!.push({
          heading: headingText,
          content: content.trim(),
        })
      }
    })

    // Extract lists that might contain uses or restrictions
    contentArea.find('ul, ol').each((_, list) => {
      const $list = $(list)
      const prevText = $list.prev().text().toLowerCase()

      $list.find('li').each((__, item) => {
        const text = $(item).text().trim()
        if (!text) return

        if (prevText.includes('use') || prevText.includes('allow')) {
          result.uses!.push(text)
        } else if (prevText.includes('restrict') || prevText.includes('prohibit') || prevText.includes('require')) {
          result.restrictions!.push(text)
        }
      })
    })

  } else {
    // Basic parsing without cheerio
    const text = extractTextBasic(html)

    // Extract title from title tag
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    result.title = titleMatch ? titleMatch[1].trim() : undefined
  }

  // Common pattern matching (works with both parsers)
  const text = cheerio ? cheerio.load(html).text() : extractTextBasic(html)

  // Look for permit thresholds
  const thresholdPatterns = [
    /(\d+)\s*gallons?\s*per\s*day/gi,
    /(\d+)\s*gpd/gi,
    /under\s*(\d+)\s*gallons?/gi,
    /less\s*than\s*(\d+)\s*gallons?/gi,
    /exempt.*?(\d+)\s*gallons?/gi,
  ]

  thresholdPatterns.forEach((pattern) => {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      const context = text.substring(
        Math.max(0, match.index! - 50),
        Math.min(text.length, match.index! + match[0].length + 50)
      )
      result.thresholds!.push(`${match[0]} (context: ...${context}...)`)
    }
  })

  // Look for code references
  const codePatterns = [
    /(?:section|sec\.?|title)\s*[\d.]+[a-z]*/gi,
    /(?:california|texas|arizona|florida|oregon)\s+(?:plumbing|building|health)\s+code/gi,
    /(?:cpc|upc|ipc)\s*[\d.]+/gi,
  ]

  codePatterns.forEach((pattern) => {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      result.code_references!.push(match[0])
    }
  })

  // Look for permit-related text
  const permitPatterns = [
    /permit\s+(?:is\s+)?(?:not\s+)?required/gi,
    /no\s+permit\s+(?:is\s+)?needed/gi,
    /permit-exempt/gi,
    /permits?\s+required\s+for/gi,
  ]

  permitPatterns.forEach((pattern) => {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      const context = text.substring(
        Math.max(0, match.index! - 30),
        Math.min(text.length, match.index! + match[0].length + 50)
      )
      result.permit_info!.push(`...${context}...`)
    }
  })

  return result
}

// Format output for console
function formatOutput(stateCode: string, source: RegulationSource, data: ExtractedRegulation): void {
  console.log('\n' + '='.repeat(80))
  console.log(`STATE: ${source.state_name} (${stateCode})`)
  console.log(`AGENCY: ${source.agency}`)
  console.log('='.repeat(80))

  if (data.title) {
    console.log(`\nPAGE TITLE: ${data.title}`)
  }

  if (data.permit_info && data.permit_info.length > 0) {
    console.log('\n--- PERMIT INFORMATION ---')
    data.permit_info.forEach((info, i) => {
      console.log(`  ${i + 1}. ${info}`)
    })
  }

  if (data.thresholds && data.thresholds.length > 0) {
    console.log('\n--- THRESHOLD VALUES ---')
    data.thresholds.forEach((threshold, i) => {
      console.log(`  ${i + 1}. ${threshold}`)
    })
  }

  if (data.uses && data.uses.length > 0) {
    console.log('\n--- ALLOWED USES ---')
    data.uses.forEach((use, i) => {
      console.log(`  ${i + 1}. ${use}`)
    })
  }

  if (data.restrictions && data.restrictions.length > 0) {
    console.log('\n--- RESTRICTIONS ---')
    data.restrictions.forEach((restriction, i) => {
      console.log(`  ${i + 1}. ${restriction}`)
    })
  }

  if (data.code_references && data.code_references.length > 0) {
    console.log('\n--- CODE REFERENCES ---')
    const uniqueRefs = [...new Set(data.code_references)]
    uniqueRefs.forEach((ref, i) => {
      console.log(`  ${i + 1}. ${ref}`)
    })
  }

  if (data.raw_sections && data.raw_sections.length > 0) {
    console.log('\n--- PAGE SECTIONS ---')
    data.raw_sections.forEach((section, i) => {
      console.log(`\n  [${i + 1}] ${section.heading}`)
      // Truncate long content
      const content = section.content.length > 500
        ? section.content.substring(0, 500) + '...'
        : section.content
      console.log(`      ${content}`)
    })
  }

  console.log('\n' + '-'.repeat(80))
  console.log('NOTE: This data requires human review before database entry.')
  console.log('Use the admin interface at /admin/data-entry to input verified data.')
  console.log('-'.repeat(80) + '\n')
}

// Main scraping function
async function scrapeState(stateCode: string): Promise<void> {
  const sources = loadRegulationSources()
  const source = sources.find((s) => s.state_code.toUpperCase() === stateCode.toUpperCase())

  if (!source) {
    console.error(`No source configuration found for state: ${stateCode}`)
    console.log('\nAvailable states:')
    sources.forEach((s) => console.log(`  ${s.state_code} - ${s.state_name}`))
    return
  }

  console.log(`\nFetching regulation data for ${source.state_name}...`)

  const urls: { type: string; url: string }[] = []

  if (source.greywater_url) {
    urls.push({ type: 'Greywater', url: source.greywater_url })
  }
  if (source.rainwater_url) {
    urls.push({ type: 'Rainwater', url: source.rainwater_url })
  }
  if (source.plumbing_code_url) {
    urls.push({ type: 'Plumbing Code', url: source.plumbing_code_url })
  }

  if (urls.length === 0) {
    console.error('No URLs configured for this state.')
    return
  }

  for (const { type, url } of urls) {
    console.log(`\nFetching ${type} regulations from: ${url}`)

    try {
      const html = await fetchUrl(url)
      const data = extractRegulationData(html, url)
      formatOutput(stateCode, source, data)
    } catch (error) {
      console.error(`Failed to fetch ${type} data:`, error instanceof Error ? error.message : error)
    }
  }
}

// List all available states
function listStates(): void {
  const sources = loadRegulationSources()

  console.log('\n=== AVAILABLE STATE REGULATION SOURCES ===\n')

  if (sources.length === 0) {
    console.log('No sources configured. Please add sources to data/regulation-sources.json')
    return
  }

  sources.forEach((source) => {
    console.log(`${source.state_code} - ${source.state_name}`)
    console.log(`   Agency: ${source.agency}`)
    if (source.greywater_url) console.log(`   Greywater: ${source.greywater_url}`)
    if (source.rainwater_url) console.log(`   Rainwater: ${source.rainwater_url}`)
    if (source.notes) console.log(`   Notes: ${source.notes}`)
    console.log('')
  })
}

// CLI entry point
async function main(): Promise<void> {
  const args = process.argv.slice(2)

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Greywater Regulations Scraper
=============================

Usage:
  npx ts-node scripts/scrape-regulations.ts [state-code]
  npx ts-node scripts/scrape-regulations.ts --list

Options:
  [state-code]   Two-letter state code (e.g., CA, TX, AZ)
  --list, -l     List all configured state sources
  --help, -h     Show this help message

Examples:
  npx ts-node scripts/scrape-regulations.ts CA
  npx ts-node scripts/scrape-regulations.ts --list

Note: This tool outputs data for human review. Use /admin/data-entry
to input verified regulation data into the database.
    `)
    return
  }

  if (args[0] === '--list' || args[0] === '-l') {
    listStates()
    return
  }

  const stateCode = args[0].toUpperCase()
  await scrapeState(stateCode)
}

main().catch(console.error)
