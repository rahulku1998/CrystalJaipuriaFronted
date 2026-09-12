/**
 * Auto-detection helper for Product Categories and Subcategories
 * Analyzes product name / keywords and maps to the appropriate
 * live category and subcategory in Crystal Jaipuria.
 */

export const detectCategoryAndSubCategory = (
  productName = "",
  categories = [],
  allSubCategories = []
) => {
  if (!productName || typeof productName !== "string") {
    return { categoryId: "", subCategoryId: "", categoryName: "", subCategoryName: "" };
  }

  const name = productName.toLowerCase().trim();

  // 1. Shivling: must have shivling, linga, lingam, narmada, etc.
  // Note: "Clear Crystal Quartz Shivling With Shiva Face" -> Shivling!
  const isShivling = /\b(shivling|shivaling|shiva linga|shivalingam|linga|lingam|banalinga|narmadeshwar)\b/i.test(name);

  // 2. Shree Yantra: yantra, meru, sri yantra, shree yantra
  const isShreeYantra = /\b(yantra|shree yantra|sri yantra|shri yantra|meru yantra|maha meru|meru)\b/i.test(name);

  // 3. Angel: angel, guardian angel
  const isAngel = /\b(angel|guardian angel|archangel)\b/i.test(name);

  // 4. Diya: diya, deepak, akhand diya, arti, aarti
  const isDiya = /\b(diya|deepak|deepam|aarti|arti)\b/i.test(name);

  // 5. Animal / Decorative Crystal Statues:
  // swan, elephant, turtle, tortoise, horse, owl, lion, bird, pyramid, geode, cluster, tree, wand, ball, sphere
  const isCrystalDecorative = /\b(swan|elephant|tortoise|turtle|owl|horse|lion|bird|peacock|pyramid|geode|cluster|tree|wand|ball|sphere|pencil|tower)\b/i.test(name);

  // 6. God Statues:
  // Ganesh / Ganpati
  const isGanesh = /\b(ganesh|ganesha|ganpati|vinayak|vinayaka)\b/i.test(name);
  const isShiva = /\b(shiva|lord shiva|shiv|mahadev|bholenath|shankar)\b/i.test(name);

  // Deities: shiva, krishna, radha, hanuman, lakshmi, saraswati, mahaveer, parshvanath, buddha, etc.
  const isGodStatue =
    !isShivling &&
    (isGanesh ||
      isShiva ||
      /\b(krishna|radha|kanha|hanuman|balaji|bajrangbali|lakshmi|laxmi|mahalakshmi|saraswati|mahaveer|mahavir|parshvanath|tirthankar|buddha|ram|sita|durga|kali|sai baba|vishnu|god|deity|idol|murti|bhagwan)\b/i.test(
        name
      ) ||
      (/\bstatue\b/i.test(name) && !isCrystalDecorative));

  let targetCatSlug = "";
  let targetSubSlug = "";

  if (isShivling) {
    targetCatSlug = "shivling";
    targetSubSlug = "shivling";
  } else if (isShreeYantra) {
    targetCatSlug = "shree-yantra";
    targetSubSlug = "shree-yantra";
  } else if (isAngel) {
    targetCatSlug = "angel";
    targetSubSlug = "angel";
  } else if (isDiya) {
    targetCatSlug = "diya";
    targetSubSlug = "diya";
  } else if (isGodStatue) {
    targetCatSlug = "god-statues";
    if (isGanesh) {
      targetSubSlug = "ganesh";
    } else if (isShiva) {
      targetSubSlug = "shiva";
    } else {
      targetSubSlug = "other";
    }
  } else if (isCrystalDecorative) {
    targetCatSlug = "crystal-statues";
    targetSubSlug = "crystal-statues";
  } else {
    // Fallback: match any category name directly if present in name
    const foundCat = categories.find((c) =>
      name.includes((c.name || "").toLowerCase()) ||
      name.includes((c.slug || "").toLowerCase())
    );
    if (foundCat) {
      targetCatSlug = foundCat.slug;
    }
  }

  // Find category in provided categories array
  const matchedCat = categories.find(
    (c) =>
      c.slug === targetCatSlug ||
      c.name?.toLowerCase() === targetCatSlug?.replace(/-/g, " ") ||
      (targetCatSlug && c.slug?.includes(targetCatSlug))
  );

  if (!matchedCat) {
    return { categoryId: "", subCategoryId: "", categoryName: "", subCategoryName: "" };
  }

  // Find matching subcategory from allSubCategories or by categoryId
  const availableSubs = allSubCategories.filter(
    (s) =>
      (s.categoryId?._id && s.categoryId._id === matchedCat._id) ||
      s.categoryId === matchedCat._id
  );

  let matchedSub = null;
  if (targetSubSlug) {
    matchedSub = availableSubs.find(
      (s) =>
        s.slug === targetSubSlug ||
        s.name?.toLowerCase() === targetSubSlug?.replace(/-/g, " ") ||
        name.includes((s.name || "").toLowerCase())
    );
  }

  if (!matchedSub && availableSubs.length > 0) {
    matchedSub = availableSubs[0];
  }

  return {
    categoryId: matchedCat._id,
    categoryName: matchedCat.name,
    categorySlug: matchedCat.slug,
    subCategoryId: matchedSub?._id || "",
    subCategoryName: matchedSub?.name || "",
    subCategorySlug: matchedSub?.slug || ""
  };
};
