const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');

try {
  const content = fs.readFileSync(productsPath, 'utf-8');
  const products = JSON.parse(content);

  console.log(`Checking products catalog. Total products: ${products.length}`);
  
  if (products.length < 100) {
    console.error(`ERROR: Found only ${products.length} products. Required minimum is 100.`);
    process.exit(1);
  }

  const requiredSlugs = [
    'sunset-race-tee',
    'cobalt-court-sneaker',
    'cream-runner-01',
    'afterhours-pullover',
    'gallery-white-tee',
    'paint-splash-tee',
    'espresso-atelier-tee',
    'canvas-mini-tote',
    'nylon-crossbody'
  ];

  const foundSlugs = new Set(products.map(p => p.slug));
  let missingSlugs = [];

  requiredSlugs.forEach(slug => {
    if (!foundSlugs.has(slug)) {
      missingSlugs.push(slug);
    }
  });

  if (missingSlugs.length > 0) {
    console.error(`ERROR: Missing required slugs: ${missingSlugs.join(', ')}`);
    process.exit(1);
  } else {
    console.log(`Success: All required slugs found!`);
  }

  // Validate fields for each product
  products.forEach((p, idx) => {
    const requiredFields = ['id', 'slug', 'name', 'category', 'price', 'images', 'colors', 'sizes', 'materials', 'fit', 'rating', 'reviewCount', 'stock', 'tags'];
    requiredFields.forEach(field => {
      if (p[field] === undefined) {
        console.error(`ERROR: Product at index ${idx} (slug: ${p.slug}) is missing field: ${field}`);
        process.exit(1);
      }
    });

    if (p.price <= 0) {
      console.error(`ERROR: Product ${p.slug} has invalid price: ${p.price}`);
      process.exit(1);
    }

    if (p.oldPrice && p.oldPrice <= p.price) {
      console.error(`ERROR: Product ${p.slug} has invalid discount structure: price ${p.price} >= oldPrice ${p.oldPrice}`);
      process.exit(1);
    }
  });

  console.log(`Success: All products have valid structure, positive prices, and correct discount hierarchies.`);
  process.exit(0);

} catch (error) {
  console.error(`CRITICAL ERROR during validation:`, error);
  process.exit(1);
}
