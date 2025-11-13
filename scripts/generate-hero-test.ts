import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const projectRoot = path.resolve(scriptDir, '..')
  const publicDir = path.join(projectRoot, 'public')
  const outputWebp = path.join(publicDir, 'hero-test.webp')

  const width = 1920
  const height = 800

  // SVG com texto centralizado
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${width}" height="${height}" fill="#30a46c"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="92" fill="#ffffff" font-weight="bold">FARTURADUBO</text>
  </svg>`

  const svgBuffer = Buffer.from(svg)

  await sharp(svgBuffer)
    .resize(width, height)
    .webp({ quality: 82 })
    .toFile(outputWebp)

  const stats = fs.statSync(outputWebp)
  console.log('Arquivo de teste gerado:', outputWebp, `${Math.round(stats.size / 1024)}KB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})