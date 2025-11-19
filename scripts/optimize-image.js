const sharp = require('sharp');
const path = require('path');

async function optimizeImage() {
  try {
    const inputPath = path.join(__dirname, '../public/foto-aerea-de-um-belo-campo-verde-agricola-perto-de-montanhas.jpg');
    const outputPath = path.join(__dirname, '../public/foto-aerea-de-um-belo-campo-verde-agricola-perto-de-montanhas.webp');
    
    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log('✅ Imagem otimizada com sucesso!');
    console.log('📁 Arquivo salvo em:', outputPath);
  } catch (error) {
    console.error('❌ Erro ao otimizar imagem:', error);
  }
}

optimizeImage();