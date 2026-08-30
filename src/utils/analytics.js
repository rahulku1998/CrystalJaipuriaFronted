/**
 * Google Analytics 4 (GA4) & Google Tag Manager (GTM) Event Tracking Engine
 * Measurement ID: G-QRDN0FM5QF
 * GTM Container: GTM-T97ZFVLW
 */

// Helper to push to GTM dataLayer and GA4 gtag safely
export const pushEvent = (eventName, eventParams = {}) => {
  if (typeof window === "undefined") return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  const payload = {
    event: eventName,
    ...eventParams,
    timestamp: new Date().toISOString(),
  };

  // 1. Push to GTM DataLayer
  window.dataLayer.push(payload);

  // 2. Direct gtag tracking if available
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }

  // Development debug log
  if (import.meta.env.DEV) {
    console.log(`[A4S / GTM Event] ${eventName}:`, eventParams);
  }
};

/**
 * Track Page Views (SPA navigation)
 */
export const trackPageView = (pageTTitle, pagePath) => {
  const path = pagePath || (typeof window !== "undefined" ? window.location.pathname : "/");
  const title = pageTTitle || (typeof document !== "undefined" ? document.title : "");

  pushEvent("page_view", {
    page_title: title,
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_path: path,
  });
};
	/**
 * Track Single Product View (view_item standard ecommerce event)
 */
export const trackProductView = (product) => {
  if (!product) return;

  const rawPrice = String(product.discountPrice || product.price || "0").replace(/[^\d.]/g, "");
  const price = parseFloat(rawPrice) || 0;

  pushEvent("view_item", {
    currency: "INR",
    value: price,
    items: [
      {
        item_id: product._id,
        item_name: product.name,
        item_category: product.categoryId?.name || "Gemstone Statues",
        item_category2: product.subCategoryId?.name || "",
        price: price,
        quantity: 1,
      },
    ],
  });
};

/**
 * Track Category / Collection Listing View (view_item_list)
 */
export const trackCategoryView = (categoryName, products = []) => {
  if (!categoryName) return;

  const items = (products || []).slice(0, 10).map((p, index) => {
    const rawPrice = String(p.discountPrice || p.price || "0").replace(/[^\dR.]/g, "");
    return {
      item_id: p._id,
      item_name: p.name,
      item_category: categoryName,
      price: parseFloat(rawPrice) || 0,
      index: index + 1,
    };
  });

  pushEvent("view_item_list", {
    item_list_name: categoryName,
    items: items,
  });
};

/**
 * Track High-Intent WhatsApp Inquiry Click (generate_lead + whatsapp_click)
 */
export const trackWhatsAppClick = (location = "floating_button", product = null) => {
  const eventParams = {
    click_location: location,
    channel: "WhatsApp",
  };

  if (product) {
    const rawPrice = String(product.discountPrice || product.price || "0").replace(/[^\d.]/g, "");
    const price = parseFloat(rawPrice) || 0;

    eventParams.product_id = product._id;
    eventParams.product_name = product.name;
    eventParams.product_category = product.categoryId?.name || "";
    eventParams.currency = "INR";
    eventParams.value = price;
  }

  // Fire GA4 conversion events
  pushEvent("generate_lead", {
    lead_type: "WhatsApp Inquiry",
    ...eventParams,
  });

  pushEvent("whatsapp_click", eventParams);
};

/**
 * Track Inquiry Form Submission (generate_lead)
 */
export const trackInquirySubmit = (formData = {}, product = null) => {
  const eventParams = {
    lead_type: "Product Query Form",
    country: formData.country || "India",
    quantity: formData.quantity || 1,
  };

  if (product) {
    const rawPrice = String(product.discountPrice || product.price || "0").replace(/[^\d.]/g, "");
    eventParams.product_id = product._id;
    eventParams.product_name = product.name;
    eventParams.value = parseFloat(rawPrice) || 0;
    eventParams.currency = "INR";
  }

  pushEvent("generate_lead", eventParams);
};

/**
 * Track Product Search (search + view_search_results)
 */
export const trackSearch = (searchTerm, resultsCount = 0) => {
  if (!searchTerm) return;
  pushEvent("search", {
    search_term: searchTerm,
    results_count: resultsCount,
  });
  pushEvent("view_search_results", {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Track Contact Info Click (Phone / Email / click_to_call)
 */
export const trackContactClick = (type, detail) => {
  pushEvent("contact_click", {
    contact_type: type,
    contact_detail: detail,
  });
  if (type === "phone") {
    pushEvent("click_to_call", {
      phone_number: detail,
    });
  }
};

/**
 * Track Social Media Link Click
 */
export const trackSocialClick = (platform) => {
  pushEvent("social_click", {
    social_network: platform,
  });
};

/**
 * Track Search With Zero Results (Demand discovery tracker)
 */
export const trackSearchNoResults = (searchTerm) => {
  if (!searchTerm) return;
  pushEvent("search_zero_results", {
    search_term: searchTerm,
  });
};

/**
 * Track Product Image Gallery / Thumbnail Click (High intent engagement)
 */
export const trackGalleryClick = (imageIndex, product = null) => {
  pushEvent("product_image_click", {
    image_index: imageIndex,
    product_name: product?.name || "",
    product_id: product?._id || "",
  });
};

/**
 * Track Product Tab Switch (Description vs Specifications)
 */
export const trackTabSwitch = (tabName, product = null) => {
  pushEvent("product_tab_switch", {
    tab_name: tabName,
    product_name: product?.name || "",
    product_id: product?._id || "",
  });
};

/**
 * Track Product Share / Copy Link
 */
export const trackProductShare = (platform = "copy_link", product = null) => {
  pushEvent("share_product", {
    method: platform,
    product_name: product?.name || "",
    product_id: product?._id || "",
  });
};

/**
 * Track Inquiry Modal Open
 */
export const trackQueryModalOpen = (product = null) => {
  pushEvent("query_modal_open", {
    product_name: product?.name || "",
    product_id: product?._id || "",
  });
};

/**
 * Track FAQ Accordion Open
 */
export const trackFaqToggle = (questionTitle) => {
  pushEvent("faq_toggle_click", {
    question: questionTitle,
  });
};

/**
 * Track Hero Slider Banner Click
 */
export const trackHeroBannerClick = (slideIndex, slideTitle) => {
  pushEvent("hero_banner_click", {
    slide_index: slideIndex,
    slide_title: slideTitle,
  });
};

/**
 * Track Subcategory Filter Selection
 */
export const trackSubcategoryFilter = (subcategoryName, categoryName) => {
  pushEvent("subcategory_filter_click", {
    subcategory: subcategoryName,
    category: categoryName,
  });
};

/**
 * Track Google Maps / Location Direction Click
 */
export const trackMapClick = () => {
  pushEvent("location_click", {
    destination: "Jaipur Workshop",
  });
};
