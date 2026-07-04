const fs = require('fs');
const path = require('path');

const generateProductsFilePath = path.join(__dirname, '..', 'src', 'data', 'generate-products.js');

try {
  const content = fs.readFileSync(generateProductsFilePath, 'utf-8');
  
  // Extract all URLs matching https://images.unsplash.com/...
  const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-?&=%_]+/g;
  const matches = content.match(urlRegex) || [];
  const uniqueUrls = [...new Set(matches)];

  console.log(`Found ${uniqueUrls.length} unique Unsplash URLs. Testing validity...\n`);

  let checkedCount = 0;
  let brokenUrls = [];

  const testNext = () => {
    if (checkedCount >= uniqueUrls.length) {
      console.log(`\nTesting completed. Checked ${checkedCount} URLs.`);
      if (brokenUrls.length > 0) {
        console.log(`\nBroken URLs (${brokenUrls.length}):`);
        brokenUrls.forEach(url => console.log(`- ${url}`));
      } else {
        console.log(`All URLs are valid (200 OK)!`);
      }
      return;
    }

    const url = uniqueUrls[checkedCount];
    const checkUrl = url.includes('?') ? `${url}&w=10` : `${url}?w=10`;

    fetch(checkUrl)
      .then(res => {
        if (res.status === 404) {
          brokenUrls.push(url);
          console.log(`[BROKEN] ${url} (404)`);
        } else {
          console.log(`[OK] ${url} (${res.status})`);
        }
        checkedCount++;
        testNext();
      })
      .catch(err => {
        brokenUrls.push(url);
        console.log(`[ERROR] ${url}: ${err.message}`);
        checkedCount++;
        testNext();
      });
  };

  testNext();

} catch (error) {
  console.error(error);
}
