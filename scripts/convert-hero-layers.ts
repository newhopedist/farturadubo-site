import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

async function toWebp(
  input: string,
  output: string,
  opts: { width?: number; height?: number; fit?: 'cover' | 'contain' | 'inside'; quality?: number; alphaQuality?: number }
) {
  const { width, height, fit = 'cover', quality = 82, alphaQuality = 100 } = opts
  await sharp(input)
    .resize(width, height, { fit })
    .webp({ quality, alphaQuality })
    .toFile(output)
}

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const projectRoot = path.resolve(scriptDir, '..')
  const publicDir = path.join(projectRoot, 'public')

  const fundoPng = path.join(publicDir, 'Design sem nome.png')
  const packsPng = path.join(publicDir, 'Packs.png')

  const fundoWebp = path.join(publicDir, 'hero-fundo.webp')
  const packsWebp = path.join(publicDir, 'hero-packs.webp')

  if (!fs.existsSync(fundoPng)) {
    console.error('Fundo não encontrado:', fundoPng)
  } else {
    console.log('Convertendo fundo →', fundoWebp)
    await toWebp(fundoPng, fundoWebp, { width: 1920, height: 800, fit: 'cover', quality: 82 })
    const stats = fs.statSync(fundoWebp)
    console.log('OK:', `${Math.round(stats.size / 1024)}KB`)
  }

  if (!fs.existsSync(packsPng)) {
    console.error('Packs não encontrado:', packsPng)
  } else {
    console.log('Convertendo packs →', packsWebp)
    // Ajuste: preservar proporção sem barras, transparência total
    await toWebp(packsPng, packsWebp, { width: 480, fit: 'inside', quality: 90, alphaQuality: 100 })
    const stats = fs.statSync(packsWebp)
    console.log('OK:', `${Math.round(stats.size / 1024)}KB`)
  }

  console.log('Conversão concluída.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
