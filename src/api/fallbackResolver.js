import {
  FALLBACK_PRODUCTS,
  FALLBACK_CATEGORIES,
  FALLBACK_SUBCATEGORIES,
} from "../data/fallbackData.js";
import {
  FALLBACK_BLOGS,
  getFallbackBlogBySlug,
} from "../data/fallbackBlogs.js";

// Bulletproof offline fallback resolver for public read endpoints
export const getFallbackResponse = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  let cleanUrl = rawUrl.split("?")[0].replace(/\/$/, "");
  if (!cleanUrl.startsWith("/")) cleanUrl = "/" + cleanUrl;
  cleanUrl = cleanUrl.replace(/^\/api/, "");
  if (!cleanUrl.startsWith("/")) cleanUrl = "/" + cleanUrl;

  if (cleanUrl === "/home") {
    const categoryProducts = {};
    FALLBACK_CATEGORIES.forEach((cat) => {
      categoryProducts[cat._id] = FALLBACK_PRODUCTS.filter(
        (p) =>
          p.categoryId?._id === cat._id ||
          p.categoryId === cat._id ||
          p.categoryId?.slug === cat.slug ||
          (cat.slug === "crystal-statues" && (
            p.categoryId?.slug === "angel" ||
            p.categoryId?.slug === "diya" ||
            p.name?.toLowerCase().includes("angel") ||
            p.name?.toLowerCase().includes("diya") ||
            p.name?.toLowerCase().includes("shankh") ||
            p.slug?.includes("angel") ||
            p.slug?.includes("diya") ||
            p.slug?.includes("shankh")
          ))
      );
    });
    return {
      data: {
        latestProducts: FALLBACK_PRODUCTS.slice(0, 10),
        categories: FALLBACK_CATEGORIES,
        categoryProducts,
      },
    };
  }

  if (cleanUrl === "/products") {
    return { data: { products: FALLBACK_PRODUCTS } };
  }
  if (cleanUrl === "/categories") {
    return { data: { categories: FALLBACK_CATEGORIES } };
  }
  if (cleanUrl === "/subcategories") {
    return { data: { subCategories: FALLBACK_SUBCATEGORIES } };
  }
  if (cleanUrl.startsWith("/subcategories/category/")) {
    const catId = cleanUrl.replace("/subcategories/category/", "");
    const subs = FALLBACK_SUBCATEGORIES.filter(
      (s) =>
        s.categoryId?._id === catId ||
        s.categoryId === catId ||
        s.categoryId?.slug === catId
    );
    return { data: { subCategories: subs } };
  }
  if (cleanUrl.startsWith("/products/slug/")) {
    const slug = cleanUrl.replace("/products/slug/", "").toLowerCase();
    const prod = FALLBACK_PRODUCTS.find(
      (p) =>
        p.slug?.toLowerCase() === slug ||
        p._id === slug ||
        (p.name &&
          p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") === slug)
    );
    if (prod) {
      return { data: { product: prod } };
    }
  }
  if (cleanUrl.startsWith("/products/category/")) {
    const catId = cleanUrl.replace("/products/category/", "");
    const prods = FALLBACK_PRODUCTS.filter(
      (p) =>
        p.categoryId?._id === catId ||
        p.categoryId === catId ||
        p.categoryId?.slug === catId
    );
    return { data: { products: prods } };
  }
  if (cleanUrl.startsWith("/products/subcategory/")) {
    const subId = cleanUrl.replace("/products/subcategory/", "").toLowerCase();
    const prods = FALLBACK_PRODUCTS.filter((p) => {
      const pId = (p.subCategoryId?._id || p.subCategoryId || "").toLowerCase();
      const pSlug = (p.subCategoryId?.slug || "").toLowerCase();
      const pName = (p.subCategoryName || p.subCategoryId?.name || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      return (
        pId === subId ||
        pSlug === subId ||
        pName === subId ||
        (subId === "sphatik-crystal-yantra" && pSlug === "sphatik-crystal-shree-yantra")
      );
    });
    return { data: { products: prods } };
  }
  if (cleanUrl.startsWith("/products/")) {
    const idOrSlug = cleanUrl.replace("/products/", "").toLowerCase();
    const prod = FALLBACK_PRODUCTS.find(
      (p) =>
        p._id === idOrSlug ||
        p.slug?.toLowerCase() === idOrSlug ||
        (p.name &&
          p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") === idOrSlug)
    );
    if (prod) {
      return { data: { product: prod } };
    }
  }

  if (cleanUrl === "/blogs") {
    return { data: { blogs: FALLBACK_BLOGS } };
  }

  if (cleanUrl.startsWith("/blogs/slug/")) {
    const bSlug = cleanUrl.replace("/blogs/slug/", "");
    const blog = getFallbackBlogBySlug(bSlug);
    if (blog) {
      return { data: { blog } };
    }
  }

  if (cleanUrl.startsWith("/blogs/")) {
    const bSlug = cleanUrl.replace("/blogs/", "");
    const blog = getFallbackBlogBySlug(bSlug);
    if (blog) {
      return { data: { blog } };
    }
  }

  return null;
};
