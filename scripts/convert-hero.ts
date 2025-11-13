import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const projectRoot = path.resolve(scriptDir, '..')
  const publicDir = path.join(projectRoot, 'public')
  const inputPng = path.join(publicDir, 'hero-fart.png')
  const outputWebp = path.join(publicDir, 'hero-fart.webp')

  if (!fs.existsSync(inputPng)) {
    console.error('Entrada não encontrada:', inputPng)
    process.exit(1)
  }

  console.log('Convertendo para WEBP otimizado 1920x800…')
  await sharp(inputPng)
    .resize(1920, 800, { fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(outputWebp)

  const stats = fs.statSync(outputWebp)
  console.log('Arquivo gerado:', outputWebp, `${Math.round(stats.size / 1024)}KB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
