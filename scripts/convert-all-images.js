const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertAllImages() {
  const publicDir = path.join(__dirname, '../public');
  const files = fs.readdirSync(publicDir);
  
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('webp')
  );
  
  console.log(`📸 Encontradas ${imageFiles.length} imagens para converter:`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(publicDir, file);
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(publicDir, outputName);
    
    try {
      // Verifica tamanho original
      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024 / 1024).toFixed(2);
      
      // Converte para WebP
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
      
      // Verifica novo tamanho
      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024).toFixed(2);
      const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);
      
      console.log(`✅ ${file} (${originalSize}MB) → ${outputName} (${newSize}KB) | ${reduction}% redução`);
      
    } catch (error) {
      console.error(`❌ Erro ao converter ${file}:`, error.message);
    }
  }
  
  console.log('\n🎉 Conversão concluída!');
}

convertAllImages();