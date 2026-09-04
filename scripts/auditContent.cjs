const https = require('https');

https.get('https://shop.codewithrahulkumawat.com/api/products', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const json = JSON.parse(data);
    const products = json.data || json.products || json;
    console.log('Total live products in DB:', products.length);

    const issues = [];

    products.forEach((p, idx) => {
      const pIssues = [];

      // 1. Check detail
      if (!p.detail || p.detail.length < 20) {
        pIssues.push('Short detail missing or too short');
      }

      // 2. Check description
      if (!p.description || p.description.length < 50) {
        pIssues.push('Description is missing or too short');
      }

      // Check if description has wrong stone mentioned (e.g. opal shivling mentioning sphatik)
      const descLower = (p.description || '').toLowerCase();
      const nameLower = (p.name || '').toLowerCase();
      const slugLower = (p.slug || '').toLowerCase();

      if (slugLower.includes('opal') && descLower.includes('sphatik') && !nameLower.includes('sphatik')) {
        pIssues.push('MISMATCH: Opal product description mentions "Sphatik"!');
      }

      if (slugLower.includes('ruby') && descLower.includes('lapis') && !nameLower.includes('lapis')) {
        pIssues.push('MISMATCH: Ruby product description mentions "Lapis"!');
      }

      if (slugLower.includes('jade') && descLower.includes('ruby') && !nameLower.includes('ruby')) {
        pIssues.push('MISMATCH: Jade product description mentions "Ruby"!');
      }

      // 3. Check weight and size
      if (!p.weight || p.weight === 'N/A' || p.weight === '0') {
        pIssues.push('Weight is missing or N/A');
      }
      if (!p.size || p.size === 'N/A' || p.size === '0') {
        pIssues.push('Size is missing or N/A');
      }

      // 4. Check additionalInfo
      if (!p.additionalInfo || p.additionalInfo.length < 10) {
        pIssues.push('Additional Information is missing or empty');
      }

      // 5. Check FAQs
      if (!Array.isArray(p.faqs) || p.faqs.length === 0) {
        pIssues.push('FAQs are missing');
      }

      // 6. Check Meta
      if (!p.metaTitle) {
        pIssues.push('Meta title is missing');
      }
      if (!p.metaDescription) {
        pIssues.push('Meta description is missing');
      }

      console.log(`\nProduct #${idx + 1}: ${p.name} [${p.slug}]`);
      console.log(`  Price: ₹${p.price} | Weight: ${p.weight} | Size: ${p.size}`);
      console.log(`  Detail: ${(p.detail || '').slice(0, 80)}...`);
      console.log(`  Desc: ${(p.description || '').replace(/<[^>]*>?/gm, '').slice(0, 100)}...`);
      console.log(`  FAQs: ${Array.isArray(p.faqs) ? p.faqs.length : 0} questions`);
      if (pIssues.length > 0) {
        console.log(`  ⚠️ Issues Detected:`);
        pIssues.forEach(i => console.log(`     - ${i}`));
        issues.push({ product: p.name, slug: p.slug, issues: pIssues });
      } else {
        console.log(`  ✅ All core fields present`);
      }
    });

    console.log('\n===========================================');
    console.log(`Summary: ${issues.length} products have content notes/issues.`);
  });
});
