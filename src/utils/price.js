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

export default formatPrice;
