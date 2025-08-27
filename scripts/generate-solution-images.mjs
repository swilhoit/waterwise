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
  { file: 'homes-ai.jpg', prompt: 'Photorealistic suburban single-family home exterior with water-wise landscaping, native plants and mulch, golden hour natural light, soft shadows, realistic textures, editorial-grade photography, color accurate, no text or logos, tasteful and authentic, 3:2 aspect' },
  { file: 'tiny-homes-ai.jpg', prompt: 'Photorealistic tiny house exterior with wood siding, compact sustainable garden and planters, warm evening light, clean composition, documentary/editorial style, realistic materials, no text or logos, 3:2 aspect' },
  { file: 'rvs-ai.jpg', prompt: 'Photorealistic RV at a scenic campsite with desert scrub and native plants, golden hour, subtle lens softness, natural color grading, no people, no text, 3:2 aspect' },
  { file: 'cabins-ai.jpg', prompt: 'Photorealistic remote mountain cabin among pines, small clearing with native plants and path, misty morning light, realistic wood textures, tasteful composition, 3:2 aspect' },
  { file: 'commercial-ai.jpg', prompt: 'Photorealistic modern commercial building courtyard with drought-tolerant landscaping, ornamental grasses, clean architecture, soft daylight, editorial-grade realism, no logos or text, 3:2 aspect' },
  { file: 'custom-ai.jpg', prompt: 'Photorealistic scene of an engineer or consultant on site with a water-wise garden in the background, shallow depth of field, tasteful, subtle, realistic materials, no visible brand text, 3:2 aspect' },
  { file: 'situation-tiny-rv-ai.jpg', prompt: 'Photorealistic tiny home and RV side-by-side at a tidy site with native plantings and gravel, warm evening light, realistic color, no text or logos, 3:2 aspect' },
  { file: 'situation-drought-ai.jpg', prompt: 'Photorealistic drought-tolerant front yard with succulents, gravel and stone, clean curb appeal, bright daylight, natural color grading, no text, 3:2 aspect' },
  { file: 'situation-septic-ai.jpg', prompt: 'Photorealistic country home with large yard and trees, subtle indication of a utility filtration area (tasteful), natural daylight, realistic grass and foliage, no text or logos, 3:2 aspect' },
  { file: 'situation-remote-ai.jpg', prompt: 'Photorealistic off-grid cabin with solar panels in a scenic remote location, native plants, mountain backdrop, soft natural light, no text or logos, 3:2 aspect' },
  // Image-to-image regeneration for filtration diagram (output to public/docs)
  { file: 'Aqua2use-Filtration-System-ai.jpg', prompt: 'Product documentation diagram of a progressive 4-stage filtration system using Matala 3D filter mats, clean linework, tasteful color accents, high legibility, no logos or brand text, white background, consistent with technical brochure style', source: path.resolve('public/docs/Aqua2use-Filtration-System.png'), outDir: 'public/docs' }
]

async function generateAll() {
  for (const item of prompts) {
    const targetDir = path.resolve(item.outDir || outDir)
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true })
    const { file, prompt } = item
    const filePath = path.join(targetDir, file)
    if (!OVERWRITE && fs.existsSync(filePath)) {
      console.log('exists, skipping', file)
      continue
    }
    console.log('generating', file)
    let image
    try {
      if (item.source && fs.existsSync(item.source)) {
        // Image-to-image: use edits endpoint when source is provided
        image = await client.images.edits({
          model: PREFERRED_MODEL,
          prompt,
          image: fs.createReadStream(item.source),
          size: '1536x1024'
        })
      } else {
        image = await client.images.generate({
          model: PREFERRED_MODEL,
          prompt,
          size: '1536x1024'
        })
      }
    } catch (err) {
      if (!NO_FALLBACK && err?.status === 403) {
        console.warn('gpt-image-1 blocked; falling back to dall-e-3')
        const fbReq = {
          model: 'dall-e-3',
          prompt,
          size: '1792x1024',
          quality: 'hd'
        }
        // DALL·E 3 does not support image-to-image in this API; fallback to prompt-only
        image = await client.images.generate(fbReq)
      } else {
        throw err
      }
    }
    const out = image.data[0]
    if (out.b64_json) {
      const buf = Buffer.from(out.b64_json, 'base64')
      fs.writeFileSync(filePath, buf)
    } else if (out.url) {
      const res = await fetch(out.url)
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


