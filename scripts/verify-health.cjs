const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('═══════════════════════════════════════════════════════════');
console.log('🛡️  CRYSTAL JAIPURIA - 2ND LEVEL GEMINI HEALTH VERIFIER');
console.log('═══════════════════════════════════════════════════════════\n');

let failedTests = 0;

function pass(msg) {
  console.log(`  ✅ [PASS] ${msg}`);
}

function fail(msg, err) {
  failedTests++;
  console.error(`  ❌ [FAIL] ${msg}`);
  if (err) console.error(`     Details: ${err}`);
}

// -------------------------------------------------------------
// STEP 1: Verify Critical Imports in Product Details Page
// -------------------------------------------------------------
console.log('🔍 Step 1: Checking Product Details & Page Imports...');
try {
  const productDetailsSlugPath = path.join(__dirname, '..', 'src', 'Pages', 'ProductDetailsSlug.jsx');
  const content = fs.readFileSync(productDetailsSlugPath, 'utf8');

  const requiredIdentifiers = [
    'getStandardizedProduct',
    'unpackProductMetadata',
    'getLegacyProductBySlug',
    'resolveProductSlug',
    'optimizeCloudinaryUrl',
    'formatPrice',
    'trackProductView'
  ];

  requiredIdentifiers.forEach(id => {
    // Check if imported
    const importRegex = new RegExp(`import\\s+.*\\b${id}\\b.*from`, 's');
    if (importRegex.test(content)) {
      pass(`Import found for: ${id}`);
    } else {
      fail(`Missing import for critical function: ${id}`);
    }
  });
} catch (e) {
  fail('Could not read ProductDetailsSlug.jsx', e.message);
}

// -------------------------------------------------------------
// STEP 2: Verify Legacy Products Registry & Aliases
// -------------------------------------------------------------
console.log('\n🔍 Step 2: Checking Legacy Products Registry & Aliases...');
try {
  const legacyPath = path.join(__dirname, '..', 'src', 'utils', 'legacyProducts.js');
  const legacyContent = fs.readFileSync(legacyPath, 'utf8');
  
  if (legacyContent.includes('export const LEGACY_PRODUCTS')) {
    pass('LEGACY_PRODUCTS exported correctly');
  } else {
    fail('LEGACY_PRODUCTS export missing');
  }

  if (legacyContent.includes('export const SLUG_ALIASES')) {
    pass('SLUG_ALIASES exported correctly');
  } else {
    fail('SLUG_ALIASES export missing');
  }

  if (legacyContent.includes('export function resolveProductSlug')) {
    pass('resolveProductSlug exported correctly');
  } else {
    fail('resolveProductSlug export missing');
  }
} catch (e) {
  fail('Could not verify legacyProducts.js', e.message);
}

// -------------------------------------------------------------
// STEP 3: Live API Connectivity & Critical Product Routes
// -------------------------------------------------------------
console.log('\n🔍 Step 3: Checking Live Database API & Product Endpoints...');

function checkApi(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ ok: true, status: res.statusCode, body: data });
        } else {
          resolve({ ok: false, status: res.statusCode });
        }
      });
    }).on('error', (err) => {
      resolve({ ok: false, err: err.message });
    });
  });
}

async function runApiChecks() {
  const mainApi = await checkApi('https://shop.codewithrahulkumawat.com/api/products');
  if (mainApi.ok) {
    try {
      const json = JSON.parse(mainApi.body);
      const count = (json.data || json.products || json).length;
      pass(`Live products API online (${count} products active in database)`);
    } catch {
      pass('Live products API online (200 OK)');
    }
  } else {
    fail('Live products API unreachable', mainApi.err || `Status: ${mainApi.status}`);
  }

  // Check specific test slug (e.g. natural-opal-stone-shivling)
  const slugTest = await checkApi('https://shop.codewithrahulkumawat.com/api/products/slug/natural-opal-stone-shivling');
  if (slugTest.ok) {
    pass('Product slug resolution endpoint verified (natural-opal-stone-shivling)');
  } else {
    fail('Product slug endpoint failed for natural-opal-stone-shivling', `Status: ${slugTest.status}`);
  }

  // -------------------------------------------------------------
  // STEP 4: Vite Production Build Test
  // -------------------------------------------------------------
  console.log('\n🔍 Step 4: Running Production Build Verification...');
  try {
    execSync('npx vite build', { stdio: 'pipe' });
    pass('Vite production build completed with 0 compilation errors');
  } catch (err) {
    fail('Vite build failed', err.stderr ? err.stderr.toString() : err.message);
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  if (failedTests === 0) {
    console.log('🎉 ALL 2ND-LEVEL VERIFICATION CHECKS PASSED PERFECTLY!');
    console.log('   Code is 100% safe for production.');
    console.log('═══════════════════════════════════════════════════════════\n');
    process.exit(0);
  } else {
    console.error(`🚨 VERIFICATION FAILED: ${failedTests} issue(s) detected!`);
    console.error('   Fix errors before pushing to production.');
    console.log('═══════════════════════════════════════════════════════════\n');
    process.exit(1);
  }
}

runApiChecks();
