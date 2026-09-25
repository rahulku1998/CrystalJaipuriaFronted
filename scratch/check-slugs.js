import fs from 'fs';
import path from 'path';

// Read fallbackData.js
const content = fs.readFileSync('src/data/fallbackData.js', 'utf8');

// Match slugs
const slugRegex = /"slug":\s*"([^"]+)"/g;
let match;
const allSlugs = [];
while ((match = slugRegex.exec(content)) !== null) {
  allSlugs.push(match[1]);
}

console.log("Total slugs found:", allSlugs.length);

const target53 = [
  "hand-carved-rose-quartz-ganesha-with-sterling-silver-testing",
  "australian-jade-ganesha-carving",
  "hand-carved-ruby-ganesha",
  "natural-ruby-radha-krishna-idol-hand-carved",
  "green-jade-ganesha",
  "rose-quartz-ganesha",
  "crystal-ganesha",
  "blue-sodalite-carved-ganesha-statue",
  "rose-quartz-ganesha-with-gold-painted",
  "blue-sodalite-carved-lord-shiva-statue",
  "natural-blue-sodalite-hanuman-ji-statue",
  "blue-sodalite-carving-shiva-face-idol",
  "labradorite-power-mini-shiva-face",
  "natural-yellow-jade-ganesha-statue",
  "rose-quartz-bhagwan-mahaveer-statue",
  "tiger-eye-carving-shiva-statue",
  "rose-quartz-carved-shree-krishna-ji-idol",
  "natural-amethyst-gemstone-shiva-face-idol",
  "green-jade-mahalakshmi-ji-idol",
  "green-aventurine-parshvanath-ji-statue",
  "green-jade-goddess-maa-saraswati-carving",
  "smokey-quartz-crystal-shiva-face-idol",
  "green-jade-radha-krishna-statue-carving",
  "rose-quartz-shiva-statue-with-gold-painting",
  "natural-lapis-lazuli-lord-krishna-statue",
  "natural-lapis-lazuli-shiva-face-carving-idol",
  "green-jade-shiva-statue-with-gold-panting",
  "blue-sapphire-carving-shiva-statue",
  "green-jade-carved-shree-krishna-statue",
  "green-jade-carving-shiva-face-statue",
  "black-agate-gemstone-carving-of-ganesh",
  "crystal-clear-mahvaveer-ji-statue",
  "green-jade-shivling",
  "crystal-shivling",
  "natural-red-jasper-gemstone-shivling",
  "natural-labradorite-gemstone-shivling",
  "natural-howlite-gemstone-shivling",
  "natural-tiger-eye-gemstone-shivling",
  "natural-opal-stone-shivling",
  "natural-sphatik-shivling",
  "clear-crystal-quartz-shivling-with-shiva-face",
  "pyrite-gemston-shivling",
  "green-jade-panchmukhi-shivling",
  "natural-ruby-shivling",
  "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva",
  "crystal-shree-yantra",
  "green-jade-shree-yantra",
  "gemston-ruby-shree-yantra",
  "crystal-sphtik-shree-yantra-on-kamal-flower",
  "amethyst-gemston-angel",
  "natural-rose-quartz-pair-of-swan",
  "green-jade-elephant-staute",
  "gemston-amethyst-diya"
];

const krishnaSlugs = allSlugs.filter(s => s.includes('krishna'));
console.log("Krishna slugs:", krishnaSlugs);
