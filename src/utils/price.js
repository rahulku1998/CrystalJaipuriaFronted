/**
 * Format single price or price ranges:
 * - "300-700" => "₹300 - ₹700"
 * - "₹ 300-700" => "₹300 - ₹700"
 * - "12000 - 36000" => "₹12000 - ₹36000"
 * - "6/GRAM" => "₹6/GRAM"
 * - "1000" => "₹1000"
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return "";
  let str = String(price).trim();
  if (!str) return "";

  // Check for price range like "300-700", "300 - 700", "₹300-700", "300 to 700"
  if (str.includes("-") || / to /i.test(str)) {
    const separator = str.includes("-") ? "-" : / to /i;
    const parts = str.split(separator).map((p) => p.trim());
    if (parts.length === 2 && parts[0] && parts[1]) {
      const p1 = parts[0].replace(/^₹\s*/, "").trim();
      const p2 = parts[1].replace(/^₹\s*/, "").trim();
      return `₹${p1} - ₹${p2}`;
    }
  }

  if (str.startsWith("₹")) {
    return str.replace(/^₹\s+/, "₹");
  }
  return `₹${str}`;
};

export default formatPrice;
