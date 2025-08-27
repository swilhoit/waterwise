import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import OpenAI from 'openai'

const outDir = path.resolve('public/images/solutions')
const OVERWRITE = process.env.OVERWRITE === '1' || process.env.OVERWRITE === 'true'
const NO_FALLBACK = process.env.NO_FALLBACK === '1' || process.env.NO_FALLBACK === 'true'
const PREFERRED_MODEL = process.env.IMAGE_MODEL || 'gpt-image-1'
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const prompts = [
  { file: 'homes-ai.jpg', prompt: 'Suburban single-family home front yard at golden hour, lush green lawn, water-wise landscaping, modern photography, 3:2 aspect, high detail, inviting, editorial, no people' },
  { file: 'tiny-homes-ai.jpg', prompt: 'Tiny house exterior, wood siding, compact lot, sustainable garden, evening soft light, 3:2, realistic, high detail, editorial style' },
  { file: 'rvs-ai.jpg', prompt: 'RV at scenic campsite, desert scrub and native plants, sunset light, boondocking vibe, 3:2, realistic photo' },
  { file: 'cabins-ai.jpg', prompt: 'Remote mountain cabin among pines, small clearing with native plants, misty morning light, 3:2, realistic photo' },
  { file: 'commercial-ai.jpg', prompt: 'Modern commercial building courtyard with plantings, drought-tolerant landscape, clean architecture, daytime, 3:2, realistic photo' },
  { file: 'custom-ai.jpg', prompt: 'Engineer consulting on site with water-saving garden background, tasteful composition, shallow depth of field, 3:2, realistic photo' },
  { file: 'situation-tiny-rv-ai.jpg', prompt: 'Tiny home and RV side-by-side in compact, tidy site with native plantings, 3:2, realistic' },
  { file: 'situation-drought-ai.jpg', prompt: 'Drought-tolerant front yard with succulents and gravel, bright daylight, 3:2, realistic' },
  { file: 'situation-septic-ai.jpg', prompt: 'Country home with large yard, trees, and subtle utility area, 3:2, realistic, editorial, no visible brand logos' },
  { file: 'situation-remote-ai.jpg', prompt: 'Off-grid cabin with solar panels in a scenic remote location, native plants, 3:2, realistic' }
]

async function generateAll() {
  for (const { file, prompt } of prompts) {
    const filePath = path.join(outDir, file)
    if (!OVERWRITE && fs.existsSync(filePath)) {
      console.log('exists, skipping', file)
      continue
    }
    console.log('generating', file)
    let image
    try {
      image = await client.images.generate({
        model: PREFERRED_MODEL,
        prompt,
        size: '1536x1024'
      })
    } catch (err) {
      if (!NO_FALLBACK && err?.status === 403) {
        console.warn('gpt-image-1 blocked; falling back to dall-e-3')
        image = await client.images.generate({
          model: 'dall-e-3',
          prompt,
          size: '1792x1024',
          quality: 'hd'
        })
      } else {
        throw err
      }
    }
    const item = image.data[0]
    if (item.b64_json) {
      const buf = Buffer.from(item.b64_json, 'base64')
      fs.writeFileSync(filePath, buf)
    } else if (item.url) {
      const res = await fetch(item.url)
      const arrayBuf = await res.arrayBuffer()
      fs.writeFileSync(filePath, Buffer.from(arrayBuf))
    } else {
      throw new Error('No image content returned')
    }
  }
}

generateAll().then(() => console.log('done')).catch((err) => {
  console.error(err)
  process.exit(1)
})


