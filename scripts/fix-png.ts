import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

function findPngSignatureIndex(buf: Buffer): number {
  const sig = Buffer.from([0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
  return buf.indexOf(sig)
}

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const projectRoot = path.resolve(scriptDir, '..')
  const publicDir = path.join(projectRoot, 'public')
  const inputPng = path.join(publicDir, 'hero-fart.png')
  const outputFixed = path.join(publicDir, 'hero-fart-fixed.png')

  if (!fs.existsSync(inputPng)) {
    console.error('Arquivo de entrada não encontrado:', inputPng)
    process.exit(1)
  }

  const buf = fs.readFileSync(inputPng)
  // PNG válido inicia com 0x89 seguido de 'PNG' e assinatura completa
  const validHead = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
  if (buf.length >= 8 && buf.slice(0, 8).equals(validHead)) {
    // Nada a corrigir, apenas copia
    fs.writeFileSync(outputFixed, buf)
    console.log('Arquivo já estava válido. Copiado para:', outputFixed)
    return
  }

  const idx = findPngSignatureIndex(buf)
  if (idx < 0) {
    console.error('Assinatura PNG não encontrada. Não foi possível corrigir.')
    process.exit(1)
  }

  const fixed = Buffer.concat([Buffer.from([0x89]), buf.slice(idx)])
  fs.writeFileSync(outputFixed, fixed)
  console.log('PNG corrigido e salvo em:', outputFixed)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})