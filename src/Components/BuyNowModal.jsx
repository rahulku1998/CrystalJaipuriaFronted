import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaCheckCircle,
  FaShieldAlt,
  FaTruck,
  FaWhatsapp,
  FaLock,
  FaClock,
  FaMoneyBillWave,
  FaQrcode,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { getProductImageUrl } from "../utils/imageOptimizer";

const calculateDeliveryDate = (code) => {
  if (!code || !/^\d{6}$/.test(code)) return null;
  const prefix = parseInt(code.slice(0, 2), 10);
  let maxDays = 5;
  let region = "India";
  if (prefix >= 30 && prefix <= 34) {
    maxDays = 2;
    region = "Rajasthan (Local Express)";
  } else if ((prefix >= 11 && prefix <= 13) || (prefix >= 20 && prefix <= 28)) {
    maxDays = 3;
    region = "North India / NCR";
  } else if (prefix >= 36 && prefix <= 44) {
    maxDays = 4;
    region = "Western India";
  } else if ((prefix >= 45 && prefix <= 49) || (prefix >= 80 && prefix <= 85)) {
    maxDays = 4;
    region = "Central / Eastern India";
  } else if (prefix >= 50 && prefix <= 69) {
    maxDays = 5;
    region = "South India";
  } else if (prefix >= 70 && prefix <= 79) {
    maxDays = 6;
    region = "East & North-East India";
  }
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + maxDays);
  const options = { weekday: "short", day: "numeric", month: "short" };
  return {
    formattedDate: deliveryDate.toLocaleDateString("en-IN", options),
    region,
  };
};

const BuyNowModal = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' | 'upi'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem("cj_delivery_pincode");
        if (saved && /^\d{6}$/.test(saved)) {
          setPincode(saved);
          setPincodeInput(saved);
          setDeliveryInfo(calculateDeliveryDate(saved));
        }
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  const handleCheckPincode = (e) => {
    if (e) e.preventDefault();
    const clean = pincodeInput.trim();
    if (!/^\d{6}$/.test(clean)) {
      setPincodeError("Please enter a valid 6-digit PIN code.");
      setDeliveryInfo(null);
      return;
    }
    setPincodeError("");
    setPincode(clean);
    setDeliveryInfo(calculateDeliveryDate(clean));
    try {
      localStorage.setItem("cj_delivery_pincode", clean);
    } catch {}
  };

  // Trigger Google Customer Reviews Opt-In Modal upon Order Placement (Declared before any early returns)
  useEffect(() => {
    if (orderPlaced && orderId && email.trim()) {
      const timer = setTimeout(() => {
        const deliveryDateObj = new Date();
        deliveryDateObj.setDate(deliveryDateObj.getDate() + 7);
        const estimatedDeliveryDate = deliveryDateObj.toISOString().split("T")[0];

        const renderGoogleSurvey = () => {
          if (window.gapi && window.gapi.surveyoptin) {
            try {
              window.gapi.surveyoptin.render({
                merchant_id: 5540789348,
                order_id: orderId,
                email: email.trim(),
                delivery_country: "IN",
                estimated_delivery_date: estimatedDeliveryDate,
                products: product?.gtin || product?.sku ? [{ gtin: String(product.gtin || product.sku) }] : []
              });
            } catch (err) {
              console.warn("Google Customer Reviews survey render error:", err);
            }
          }
        };

        if (window.gapi && window.gapi.load) {
          window.gapi.load("surveyoptin", renderGoogleSurvey);
        } else if (typeof window.renderOptIn === "function") {
          window.renderOptIn();
        }
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [orderPlaced, orderId, email, product]);

  // Calculate Unit Price safely
  let unitPrice = 0;
  if (product) {
    if (typeof product.discountPrice === "number" && product.discountPrice > 0) {
      unitPrice = product.discountPrice;
    } else if (typeof product.price === "number" && product.price > 0) {
      unitPrice = product.price;
    } else {
      const raw = String(product.discountPrice || product.price || "0").replace(/,/g, "");
      const match = raw.match(/\d+(\.\d+)?/);
      if (match) unitPrice = Number(match[0]);
    }
  }

  const totalPrice = unitPrice * quantity;
  const productImage = product ? getProductImageUrl(product, 0, 160) : "";

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      alert("Please fill in your Name, Phone Number, Email Address, and Delivery Address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address (e.g. name@gmail.com).");
      return;
    }

    setIsSubmitting(true);
    const generatedId = `CJ-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Save order to LocalStorage
    const orderData = {
      orderId: generatedId,
      productName: product.name,
      quantity,
      unitPrice,
      totalPrice,
      paymentMethod,
      paymentStatus: "Pending",
      customerName: name,
      customerPhone: phone,
      customerEmail: email.trim(),
      deliveryAddress: `${address}, ${city}, ${state}${pincode ? ` - ${pincode}` : ""}`,
      placedAt: new Date().toISOString()
    };
    try {
      const prev = JSON.parse(localStorage.getItem("cj_store_orders") || "[]");
      localStorage.setItem("cj_store_orders", JSON.stringify([orderData, ...prev]));
    } catch (err) {
      console.warn("Storage error:", err);
    }

    // 2. Dispatch Full Order Details to WhatsApp (+91 8306317032)
    const message = `*🛍️ NEW ORDER PLACED ON CRYSTAL JAIPURIA!* 🛍️\n\n` +
      `*Order ID:* ${generatedId}\n` +
      `*Product:* ${product.name}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total Amount:* ₹${totalPrice.toLocaleString("en-IN")}\n` +
      `*Payment Method:* ${paymentMethod === "cod" ? "Cash on Delivery (COD)" : "UPI / Online Payment (Pending)"}\n` +
      `*Payment Status:* Pending (To be collected)\n\n` +
      `*Customer Delivery Details:*\n` +
      `• Full Name: ${name}\n` +
      `• Phone Number: ${phone}\n` +
      `• Email Address: ${email.trim()}\n` +
      `• Delivery Address: ${address}, ${city}, ${state}${pincode ? ` - ${pincode}` : ""}\n` +
      `• Product Link: ${typeof window !== "undefined" ? window.location.href : ""}\n\n` +
      `Please contact the customer and confirm dispatch from Jaipur!`;

    const whatsappUrl = `https://wa.me/918306317032?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderPlaced(true);
    }, 400);
  };

  const handleWhatsAppContact = () => {
    const message = `*Order Inquiry: ${orderId}* 🛍️\n\n` +
      `*Product:* ${product.name} (Qty: ${quantity})\n` +
      `*Amount:* ₹${totalPrice.toLocaleString("en-IN")}\n` +
      `*Customer:* ${name} (${phone}, ${email})\n` +
      `*Address:* ${address}, ${city}${pincode ? ` - ${pincode}` : ""}\n\n` +
      `Hello Crystal Jaipuria, I have placed this order on your website. Please confirm when it will be dispatched.`;

    const url = `https://wa.me/918306317032?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const resetAndClose = () => {
    setOrderPlaced(false);
    setQuantity(1);
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
    setPincodeInput("");
    setPincodeError("");
    setDeliveryInfo(null);
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-stone-900 via-indigo-950 to-slate-900 text-white border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm">
              <FaShieldAlt />
            </span>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {orderPlaced ? "Order Confirmation" : "Instant Order (Cash / Pay on Delivery)"}
              </h3>
              <p className="text-[11px] text-gray-300">
                100% Genuine Certified Gemstone • Doorstep Delivery
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {orderPlaced ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
                <FaCheckCircle />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  Order Placed Successfully!
                </h4>
                <div className="inline-block mt-2 px-4 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-mono font-bold text-indigo-700">
                  Order ID: {orderId}
                </div>
              </div>

              {/* PAYMENT STATUS: PENDING BANNER */}
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 text-left space-y-1">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
                  <FaClock className="text-amber-600 shrink-0" />
                  <span>Payment Status: Payment Pending (Pay on Delivery)</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed pl-5">
                  {paymentMethod === "cod"
                    ? `Total ₹${totalPrice.toLocaleString("en-IN")} will be collected in cash by the delivery agent when your parcel arrives.`
                    : `Total ₹${totalPrice.toLocaleString("en-IN")} pending. Our team will verify your address and provide the secure UPI payment link on WhatsApp before dispatch.`}
                </p>
              </div>

              {/* POLITE CONTACT NOTICE */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 text-left space-y-1">
                <strong className="block font-bold text-emerald-900">
                  ✓ आपकी ऑर्डर डिटेल्स दर्ज हो चुकी हैं!
                </strong>
                <p className="text-emerald-800 leading-relaxed">
                  धन्यवाद <strong>{name}</strong>, आपका ऑर्डर और पता हमारे पास पहुँच चुका है। हमारी डिस्पैच टीम आपसे जल्द ही WhatsApp/फ़ोन (<strong>{phone}</strong>) पर संपर्क करके ऑर्डर कन्फर्म करेगी।
                </p>
              </div>

              {/* Order Summary Card */}
              <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-gray-500">Item:</span>
                  <span className="font-bold text-gray-800">{product.name} (x{quantity})</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-gray-500">Total Payable:</span>
                  <span className="font-extrabold text-indigo-700 text-sm">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-gray-500">Customer Email:</span>
                  <span className="font-medium text-gray-800">{email}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-gray-500">Payment Mode:</span>
                  <span className="font-semibold text-emerald-700">
                    {paymentMethod === "cod" ? "Cash on Delivery (COD)" : "UPI / Online (Pay on Delivery)"}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-500">Delivery Address:</span>
                  <span className="text-right text-gray-700 max-w-[200px] truncate">{address}{pincode ? `, ${pincode}` : ""}</span>
                </div>
              </div>

              {/* WhatsApp Live Status Action */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleWhatsAppContact}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
                >
                  <FaWhatsapp className="text-base" />
                  <span>Chat with Us on WhatsApp (+91 8306317032)</span>
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full text-xs font-semibold text-gray-500 hover:text-gray-800 py-1.5 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {/* Product Mini Bar */}
              <div className="flex items-center gap-3.5 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <img
                  src={productImage}
                  onError={(e) => {
                    if (optimizedRaw && e.target.src !== optimizedRaw) {
                      e.target.src = optimizedRaw;
                    } else if (!e.target.src.endsWith("/Gemstone.webp")) {
                      e.target.src = "/Gemstone.webp";
                    }
                  }}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-stone-300 shrink-0 bg-white"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="font-black text-sm text-indigo-700">
                      ₹{unitPrice.toLocaleString("en-IN")}
                    </span>
                    {product.pricePerUnit && (
                      <span className="text-[11px] text-stone-500 font-semibold">
                        ({product.pricePerUnit})
                      </span>
                    )}
                    <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Free Shipping
                    </span>
                  </div>
                </div>
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 hover:bg-gray-100 text-gray-700 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2.5 py-1 text-gray-900 border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 hover:bg-gray-100 text-gray-700 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delivery & Service Options (Optional Pincode Estimator) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FaTruck className="text-amber-500 text-xs" />
                    <span>Delivery &amp; Service Options</span>
                  </span>
                  {deliveryInfo && (
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryInfo(null);
                        setPincodeInput("");
                        setPincode("");
                        try {
                          localStorage.removeItem("cj_delivery_pincode");
                        } catch {}
                      }}
                      className="text-[11px] font-semibold text-slate-500 hover:text-amber-700 transition cursor-pointer"
                    >
                      Change
                    </button>
                  )}
                </div>

                {!deliveryInfo ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                        <input
                          type="text"
                          maxLength={6}
                          value={pincodeInput}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setPincodeInput(val);
                            setPincode(val);
                            if (pincodeError) setPincodeError("");
                          }}
                          placeholder="Enter 6-digit Pincode (Optional)"
                          className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleCheckPincode}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                      >
                        Check
                      </button>
                    </div>
                    {pincodeError && <p className="text-[11px] text-red-600 font-medium">{pincodeError}</p>}
                    <p className="text-[10px] text-slate-500">
                      Check expected delivery date &amp; safe dispatch from Jaipur workshop.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-start gap-1.5 text-emerald-700">
                      <FaCheckCircle className="text-emerald-600 text-xs mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-900">
                          Expected Delivery by <span className="text-emerald-700 font-extrabold">{deliveryInfo.formattedDate}</span>
                        </p>
                        <p className="text-[11px] text-slate-600">
                          Delivering to <strong className="text-slate-800">{pincode}</strong> ({deliveryInfo.region})
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-slate-200/60 text-[10px] text-slate-600 font-medium">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Free Delivery on all orders</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Dispatch within 24 Hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Cash on Delivery Available</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>7-Day Replacement Guarantee</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Address Fields */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Delivery Details (डिलीवरी का पता)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name (पूरा नाम) *"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile / WhatsApp Number *"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address (ईमेल पता - For Tracking & Updates) *"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Complete Address (House No, Building, Street, Landmark) *"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City *"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State *"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setPincode(val);
                      setPincodeInput(val);
                      if (val.length === 6) {
                        setDeliveryInfo(calculateDeliveryDate(val));
                      }
                    }}
                    placeholder="Pincode (Optional)"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Payment Method (भुगतान का तरीक़ा)
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "cod"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <FaMoneyBillWave className="text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-xs block">Cash on Delivery</span>
                      <span className="text-[10px] text-gray-500 font-normal">Pay when parcel arrives</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === "upi"
                        ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-bold"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <FaQrcode className="text-indigo-600 shrink-0" />
                    <div>
                      <span className="text-xs block">UPI / Online</span>
                      <span className="text-[10px] text-gray-500 font-normal">Pay via UPI upon dispatch</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-500 bg-stone-50 p-2 rounded-xl border border-stone-200">
                <span className="flex items-center justify-center gap-1">
                  <FaTruck className="text-indigo-600" /> Free Shipping
                </span>
                <span className="flex items-center justify-center gap-1">
                  <FaShieldAlt className="text-emerald-600" /> 7-Day Guarantee
                </span>
                <span className="flex items-center justify-center gap-1">
                  <FaLock className="text-amber-600" /> 100% Secure
                </span>
              </div>

              {/* Order Total & Submit Button */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Total Amount</span>
                  <span className="text-lg font-black text-gray-900">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm py-3 px-5 rounded-xl shadow-md transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Order...</span>
                  ) : (
                    <>
                      <span>Confirm Order Now</span>
                      <span>&rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
