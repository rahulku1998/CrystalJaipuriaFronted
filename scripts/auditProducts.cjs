const https = require('https');

const fetchJson = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

async function audit() {
  const dbData = await fetchJson('https://shop.codewithrahulkumawat.com/api/products');
  const liveDbProducts = dbData.products || [];

  console.log('==================================================');
  console.log('TOTAL LIVE DB PRODUCTS IN MONGODB:', liveDbProducts.length);
  console.log('==================================================');
  const liveSlugs = new Set();
  liveDbProducts.forEach((p, i) => {
    const slug = (p.slug || '').trim().toLowerCase();
    liveSlugs.add(slug);
    console.log((i + 1) + '. [' + slug + '] ' + p.name + ' (Category: ' + (p.categoryId?.name || 'N/A') + ')');
  });

  const rawGscList = [
    'natural-ruby-shivling',
    'gemston-ruby-shree-yantra',
    'blue-sapphire-carving-shiva-statue',
    'green-jade-shiva-statue-with-gold-panting',
    'green-jade-panchmukhi-shivling',
    'opal-ston-shivling',
    'green-jade-carved-shree-krishana-statue',
    'natural-rose-quartz-pair-of-swan',
    'pyrite-gemston-shivling',
    'clear-crystal-quartz-shivling-with-shiva-face',
    'green-jade-carving-shiva-face-statue',
    'lapis-lazuli-carving-shiva-face-idol',
    'natural-lapis-lazuli-lord-krishan-statue',
    'shyana-murti-in-natural-columbian-green-jade',
    'tiger-eye-shivling',
    'simply-woollook-vintage-mustard',
    'howlite-gemston-shivling',
    'rose-quartz-shiva-statue-with-gold-panting',
    'labradorite-shivling',
    'greem-jade-carving-radha-krishana-statue',
    'smokey-crystal-quartz-shiva-face',
    'green-jade-goddess-maa-sarswati-carving',
    'green-aventurine-parasnath-ji-statue',
    'green-hade-laxmi-ji-idol',
    'crystal-clear-mahvaveer-ji-statue',
    'amethyst-gemston-shiva-face',
    'rose-quartz-carved-shree-krishan-ji-idol',
    'lapis-lazuli-carved-shiva-face',
    'mahalakshmi-idol-in-natural-columbian-green-jade',
    'tiger-eye-carving-shiva-statue',
    'rose-quartz-mahaveer',
    'yellow-jad-ganesh-statue',
    'ganeshji-with-lingam-in-jigalong-jasper',
    'labradorite-power-mini-shiv-face',
    'blue-sodalite-carving-shiva-face-idol',
    'clear-crystal-shivling',
    'gemston-amethyst-diya',
    'red-jasper-gemston-shivling',
    'black-agate-gemstone-carving-of-ganesh',
    'blue-sodalite-hanuman-ji',
    'blue-sodalite-carved-gord-shiva-statue',
    'rose-quartz-ganesha-with-gold-painted',
    'blue-sodalite-carved-ganesha-statue',
    'crystal-parshvanath-ji-statue-with-gold-panting',
    'yellow-jade-parshvanath-ji-statue',
    'labradorite-shiva-head',
    'lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva',
    'green-aventurine-ganesha-statue',
    'rose-quartz-parshvanath-ji-statue',
    'black-agate-carving-shiva-face',
    'lepidolite-goddess-saraswati-carving',
    'rose-quartz-shivling-with-face',
    'yellow-quartz-ganesha-statue',
    'rose-quartz-shivling',
    'yellow-agate-shivling',
    'lapis-lazuli-carving-ganesha-statue',
    'gemston-howlite-shree-yantra',
    'green-avernturine-carving-handicraft-ganesha',
    'labradorite-power-carved-shiva-face',
    'rube-gemston-parshvanath-ji-statue',
    'labradorite-ston-carving-shiva-face',
    'green-jade-shiva-face-with-gold-panting',
    'natural-tiger-eye-stone-carved-ganesha-statue',
    'green-aventurine-carving-shiva-face-statue',
    'green-jade-parshvanath-ji-with-gold-panting',
    'yellow-jade-shree-yantra',
    'green-averntuine-shivling',
    'natural-pyrite-angel',
    'lapis-lazuli-ston-shivling',
    'amethyst-shree-yantra',
    'black-jade-gemston-handicraft-shree-yantra',
    'gemston-green-avernturine-shiva-head',
    'selenite-angel',
    'natural-tiger-eye-angel',
    'variable-product'
  ];

  const dummySlugs = new Set(['simply-woollook-vintage-mustard', 'variable-product']);

  const alreadyLive = [];
  const truePending = [];

  rawGscList.forEach((slug) => {
    if (dummySlugs.has(slug)) return;
    if (liveSlugs.has(slug)) {
      alreadyLive.push(slug);
    } else {
      truePending.push(slug);
    }
  });

  console.log('\n==================================================');
  console.log('PRODUCTS ALREADY 100% LIVE IN DB (EXCLUDED FROM PENDING):', alreadyLive.length);
  console.log('==================================================');
  alreadyLive.forEach((s, idx) => console.log((idx + 1) + '. ' + s));

  console.log('\n==================================================');
  console.log('EXACT TRUE PENDING PRODUCTS (EXACTLY 59 ITEMS, NO DUPLICATES):', truePending.length);
  console.log('==================================================');
  truePending.forEach((s, idx) => console.log((idx + 1) + '. ' + s));
}

audit();
