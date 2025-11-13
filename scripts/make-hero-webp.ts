import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const projectRoot = path.resolve(scriptDir, '..')
  const publicDir = path.join(projectRoot, 'public')

  const candidates = [
    path.join(publicDir, 'hero-source.png'),
    path.join(publicDir, 'hero-source.jpg'),
    path.join(publicDir, 'hero-source.jpeg'),
    path.join(publicDir, 'hero-fart.png'),
  ]

  const input = candidates.find((p) => fs.existsSync(p))
  const output = path.join(publicDir, 'hero.webp')

  if (!input) {
    console.error('No source image found in public/. Please add one of:')
    console.error('- public/hero-source.png')
    console.error('- public/hero-source.jpg | public/hero-source.jpeg')
    console.error('- public/hero-fart.png (legacy)')
    process.exit(1)
  }

  console.log('Converting', input, '→', output)
  await sharp(input)
    .resize(1920, 800, { fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(output)

  const stats = fs.statSync(output)
  console.log('Done:', output, `${Math.round(stats.size / 1024)}KB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})