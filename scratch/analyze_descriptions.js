import https from "https";

const API_URL = "https://shop.codewithrahulkumawat.com/api/products";

https.get(API_URL, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    try {
      const json = JSON.parse(data);
      const products = json.products || [];

      const stats = products.map((p, idx) => {
        const desc = (p.description || "").replace(/<[^>]*>?/gm, "").trim();
        const detail = (p.detail || "").trim();
        return {
          index: idx + 1,
          name: p.name,
          slug: p.slug,
          descLength: desc.length,
          detailLength: detail.length,
          hasAdditionalInfo: Boolean(p.additionalInfo && p.additionalInfo.length > 20),
          hasFaqs: Boolean(p.faqs && p.faqs.length > 10)
        };
      });

      stats.sort((a, b) => a.descLength - b.descLength);

      console.log("Top 10 products with lowest description length:");
      stats.slice(0, 10).forEach(s => {
        console.log(`- ${s.name} (/product/${s.slug}): desc=${s.descLength} chars, detail=${s.detailLength} chars, addlInfo=${s.hasAdditionalInfo}, faqs=${s.hasFaqs}`);
      });

      console.log("\nTop 5 products with highest description length:");
      stats.slice(-5).reverse().forEach(s => {
        console.log(`- ${s.name} (/product/${s.slug}): desc=${s.descLength} chars`);
      });

    } catch (err) {
      console.error(err);
    }
  });
});
