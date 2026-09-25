import fs from "fs";
import { FALLBACK_PRODUCTS } from "../src/data/fallbackData.js";

const xml = fs.readFileSync("./public/google-products.xml", "utf-8");

const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

console.log(`Checking ${items.length} items in google-products.xml against fallbackData...`);

let mismatchCount = 0;

items.forEach(item => {
  const idMatch = item.match(/<g:id>(.*?)<\/g:id>/);
  const priceMatch = item.match(/<g:price>(.*?)<\/g:price>/);
  const titleMatch = item.match(/<g:title>(.*?)<\/g:title>/);
  
  if (idMatch && priceMatch) {
    const id = idMatch[1];
    const feedPrice = priceMatch[1];
    
    const prod = FALLBACK_PRODUCTS.find(p => p._id === id);
    if (prod) {
      const prodPrice = Number(prod.price) || Number(prod.discountPrice) || 0;
      const feedPriceNum = parseFloat(feedPrice);
      
      if (prodPrice !== feedPriceNum) {
        console.log(`Mismatch for ID ${id} (${titleMatch ? titleMatch[1] : ''}): DB=${prodPrice} vs Feed=${feedPriceNum}`);
        mismatchCount++;
      }
    }
  }
});

console.log(`Total mismatches found: ${mismatchCount}`);
