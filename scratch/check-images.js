const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');

try {
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  console.log(`Analyzing ${products.length} products...\n`);

  products.forEach((p) => {
    if (!p.images || p.images.length === 0) {
      console.log(`Product "${p.name}" (${p.id}) has NO images!`);
      return;
    }

    if (p.images.length === 1) {
      console.log(`Product "${p.name}" (${p.id}) has only 1 image.`);
    }

    // Check if images are different
    const img1 = p.images[0];
    const img2 = p.images[1];
    
    // We want to see if the images contain keyword clues
    console.log(`- Product: ${p.name} (${p.category})`);
    console.log(`  Img1: ${img1}`);
    console.log(`  Img2: ${img2 || 'NONE'}`);
  });

} catch (e) {
  console.error(e);
}
