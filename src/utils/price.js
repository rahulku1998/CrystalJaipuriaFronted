/**
 * Format single price or numbers into clean Indian currency:
 * - "2000" => "₹2,000"
 * - "37500" => "₹37,500"
 * - "₹37500 - ₹75000" => "₹37,500" (extracts clean starting single price)
 * - "6/GRAM" => "₹1,200" / "₹6/GRAM"
 */
export const formatPrice = (price, options = { preferSingle: true }) => {
  if (!price && price !== 0) return "";
  let str = String(price).trim();
  if (!str) return "";

  // If preferSingle is requested or range is found, extract clean starting price
  if (options.preferSingle && (str.includes("-") || / to /i.test(str))) {
    const separator = str.includes("-") ? "-" : / to /i;
    const parts = str.split(separator).map((p) => p.trim());
    if (parts.length >= 1 && parts[0]) {
      const numStr = parts[0].replace(/[^\d.]/g, "");
      const num = Number(numStr);
      if (!isNaN(num) && num > 0) {
        return `₹${num.toLocaleString("en-IN")}`;
      }
    }
  }

  // Pure numeric string
  const cleanNumeric = str.replace(/[^\d.]/g, "");
  const numVal = Number(cleanNumeric);
  if (!isNaN(numVal) && numVal > 0 && !str.includes("/")) {
    return `₹${numVal.toLocaleString("en-IN")}`;
  }

  if (str.startsWith("₹")) {
    return str.replace(/^₹\s+/, "₹");
  }
  return `₹${str}`;
};

/**
 * Format price per unit (per gram / per carat).
 * Handles strings like "₹17.2 / gram", raw numeric rates like 15,
 * or auto-calculates if accidentally passed total price or missing.
 */
export const formatPricePerUnit = (pricePerUnit, price, weight) => {
  // If pricePerUnit is a valid string that contains / (e.g. "₹17.2 / gram", "₹40 / carat")
  if (typeof pricePerUnit === "string" && pricePerUnit.includes("/")) {
    let clean = pricePerUnit.trim().replace(/^\(|\)$/g, "").trim();
    if (!clean.startsWith("₹")) {
      clean = `₹${clean}`;
    }
    return clean;
  }

  // If pricePerUnit is a raw number (or numeric string) like 1000 (which was accidentally total price)
  // or empty, calculate it dynamically from price and weight!
  const priceNum = typeof price === "number" ? price : parseFloat(String(price || "").replace(/[^\d.]/g, ""));
  if (!priceNum || isNaN(priceNum)) return "";

  const weightStr = String(weight || "");
  const isCarat = /carat|ct\b/i.test(weightStr);
  let cleanWeight = 0;
  if (isCarat) {
    const match = weightStr.match(/([\d.]+)\s*(?:carats|carat|ct)/i);
    cleanWeight = match ? parseFloat(match[1]) : 0;
  } else {
    const match = weightStr.match(/([\d,]+(?:\.\d+)?)\s*g/i);
    cleanWeight = match ? parseFloat(match[1].replace(/,/g, "")) : 0;
  }

  if (cleanWeight > 0) {
    const unit = isCarat ? "carat" : "gram";
    const rawRate = priceNum / cleanWeight;
    const rate = Number.isInteger(rawRate) ? rawRate : Math.round(rawRate * 10) / 10;
    return `₹${rate} / ${unit}`;
  }

  return "";
};

export default formatPrice;

