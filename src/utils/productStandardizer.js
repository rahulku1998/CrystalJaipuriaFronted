/**
 * Product Data Standardizer for Crystal Jaipuria
 * Normalizes price ranges, unit rates (e.g. 6/GRAM), missing weights & dimensions
 * to industry-standard realistic single pricing and precise specs.
 */

export const STANDARDIZED_SPECS = {
  "natural-sphatik-shivling": {
    price: 2000,
    weight: "60 Gram",
    size: "2.5 Inch",
    dimensions: "6.3 x 4.0 x 4.0 cm",
  },
  "clear-crystal-quartz-shivling-with-shiva-face": {
    price: 37500,
    weight: "500 Gram",
    size: "4.5 Inch",
    dimensions: "11.4 x 7.5 x 7.5 cm",
  },
  "green-jade-shiva-statue-with-gold-panting": {
    price: 20000,
    weight: "6.5 Kg",
    size: "9.5 Inch",
    dimensions: "24.1 x 15.2 x 10.1 cm",
  },
  "natural-rose-quartz-pair-of-swan": {
    price: 750,
    weight: "150 Gram",
    size: "5.5 Inch",
    dimensions: "14.0 x 7.5 x 4.0 cm",
  },
  "gemston-ruby-shree-yantra": {
    price: 750,
    weight: "50 Gram",
    size: "1.5 Inch",
    dimensions: "3.8 x 3.8 x 3.8 cm",
  },
  "blue-sapphire-carving-shiva-statue": {
    price: 4800,
    weight: "400 Gram",
    size: "4.0 Inch",
    dimensions: "10.2 x 6.5 x 4.5 cm",
  },
  "green-jade-carved-shree-krishana-statue": {
    price: 28000,
    weight: "3.5 Kg",
    size: "8.0 Inch",
    dimensions: "20.3 x 10.0 x 7.5 cm",
  },
  "pyrite-gemston-shivling": {
    price: 500,
    weight: "100 Gram",
    size: "2.5 Inch",
    dimensions: "6.3 x 4.0 x 4.0 cm",
  },
  "green-jade-panchmukhi-shivling": {
    price: 5000,
    weight: "500 Gram",
    size: "4.5 Inch",
    dimensions: "11.4 x 8.0 x 8.0 cm",
  },
  "natural-ruby-shivling": {
    price: 8500,
    weight: "60 Gram",
    size: "1.5 Inch",
    dimensions: "3.8 x 3.0 x 3.0 cm",
  },
  "green-jade-elephant-staute": {
    price: 1200,
    weight: "200 Gram",
    size: "2.5 Inch",
    dimensions: "6.3 x 7.5 x 4.0 cm",
  },
  "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva": {
    price: 5000,
    weight: "500 Gram",
    size: "4.5 Inch",
    dimensions: "11.4 x 7.5 x 7.5 cm",
  },
  "green-jade-carving-shiva-face-statue": {
    price: 37500,
    weight: "5.0 Kg",
    size: "8.0 Inch",
    dimensions: "20.3 x 12.5 x 9.0 cm",
  },
  "crystal-sphtik-shree-yantra-on-kamal-flower": {
    price: 2000,
    weight: "250 Gram",
    size: "3.5 Inch",
    dimensions: "8.9 x 8.9 x 7.0 cm",
  },
  "black-agate-gemstone-carving-of-ganesh": {
    price: 12000,
    weight: "2.0 Kg",
    size: "8.0 Inch",
    dimensions: "20.3 x 11.5 x 8.0 cm",
  },
  "gemston-amethyst-diya": {
    price: 200,
    weight: "80 Gram",
    size: "2.5 Inch",
    dimensions: "6.3 x 6.3 x 3.0 cm",
  },
  "crystal-clear-mahvaveer-ji-statue": {
    price: 25000,
    weight: "2.5 Kg",
    size: "9.0 Inch",
    dimensions: "22.8 x 14.0 x 8.5 cm",
  },
  "amethyst-gemston-angel": {
    price: 350,
    weight: "110 Gram",
    size: "3.0 Inch",
    dimensions: "7.6 x 4.5 x 2.5 cm",
  },
};

/**
 * Standardize any product object with clean single pricing and specs
 */
export const getStandardizedProduct = (product) => {
  if (!product) return product;

  const slug = (product.slug || "").toLowerCase().trim();
  const spec = STANDARDIZED_SPECS[slug];

  let standardizedPrice = product.price;
  let standardizedWeight = product.weight;
  let standardizedSize = product.size;

  if (spec) {
    if (
      !standardizedPrice ||
      String(standardizedPrice).includes("-") ||
      String(standardizedPrice).includes("/GRAM") ||
      String(standardizedPrice).includes("to") ||
      standardizedPrice === "120"
    ) {
      standardizedPrice = spec.price;
    }

    if (!standardizedWeight || standardizedWeight === "N/A" || standardizedWeight.includes("-") || standardizedWeight.includes("TO")) {
      standardizedWeight = spec.weight;
    }

    if (!standardizedSize || standardizedSize === "N/A" || standardizedSize.includes("-") || standardizedSize.includes("to")) {
      standardizedSize = spec.size;
    }
  }

  return {
    ...product,
    price: standardizedPrice,
    weight: standardizedWeight,
    size: standardizedSize,
    dimensions: spec?.dimensions || product.dimensions || standardizedSize,
  };
};
