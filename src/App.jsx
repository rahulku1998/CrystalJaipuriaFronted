import React, { Suspense, lazy } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import HeroSlider from './Components/Hero/HeroSlider'
import FeaturesBar from './Components/FeaturesBar'
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import ErrorBoundary from './Components/ErrorBoundary';
import ProtectedRoute from "./Components/ProtectedRoute";
import VijayProtectedRoute from './Components/VijayProtectedRoute';
import ScrollTop from "./Components/ScrollTop";
import FloatingWhatsApp from "./Components/FloatingWhatsApp";

// Lazy-loaded customer-facing pages (code-split for blazing mobile performance)
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import('./Pages/Contact'));
const CategoryPage = lazy(() => import('./Pages/CategoryPage'));
const SubCategoryProducts = lazy(() => import('./Pages/SubCategoryProducts'));
const NotFound = lazy(() => import('./Pages/NotFound'));
const Blog = lazy(() => import("./Pages/Blog/Blogs"));
const BlogDetails = lazy(() => import('./Pages/Blog/BlogDetails'));
const Shop = lazy(() => import("./Pages/Shop"));
const ProductDetailsSlug = lazy(() => import('./Pages/ProductDetailsSlug'));
const SpamRemoved = lazy(() => import('./Pages/SpamRemoved'));
const ShippingPolicy = lazy(() => import('./Pages/Policies/ShippingPolicy'));
const RefundPolicy = lazy(() => import('./Pages/Policies/RefundPolicy'));
const PrivacyPolicy = lazy(() => import('./Pages/Policies/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./Pages/Policies/TermsConditions'));

// Lazy-loaded Standard Admin (Kishan)
const AdminLogin = lazy(() => import('./admin/Login'));
const AdminDashboard = lazy(() => import('./admin/Dashboard'));
const AddProduct = lazy(() => import('./admin/AddProduct'));
const EditProduct = lazy(() => import('./admin/EditProduct'));
const DeleteProduct = lazy(() => import('./admin/DeleteProduct'));
const Categories = lazy(() => import('./admin/Categories'));
const AdminBlogs = lazy(() => import('./admin/Blog'));
const AddSubCategory = lazy(() => import('./admin/SubCategories'));

// Lazy-loaded Vijay AI Super Admin Panel
const VijayLogin = lazy(() => import('./admin-vijay/Login'));
const VijayDashboard = lazy(() => import('./admin-vijay/Dashboard'));
const VijayAddProduct = lazy(() => import('./admin-vijay/AddProduct'));
const VijayEditProduct = lazy(() => import('./admin-vijay/EditProduct'));
const VijayDeleteProduct = lazy(() => import('./admin-vijay/DeleteProduct'));
const VijayCategories = lazy(() => import('./admin-vijay/Categories'));
const VijayBlogs = lazy(() => import('./admin-vijay/Blog'));
const VijaySubCategories = lazy(() => import('./admin-vijay/SubCategories'));
const VijayPendingProducts = lazy(() => import('./admin-vijay/PendingProducts'));

// Redirect helper for old /products/:slug URLs -> /product/:slug
const ProductsRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/product/${slug}`} replace />;
};

// Redirect helper for old WooCommerce /product-category/:slug -> /:slug
const ProductCategoryRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={slug ? `/${slug}` : "/shop"} replace />;
};

function App() {

  return (
    <>
     <ScrollTop />
       <Navbar />
       
      <FloatingWhatsApp />
      <main id="main-content" className="flex-grow">
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSlider />
                    <FeaturesBar />
                    <Home />
                  </>
                }
              />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />

        {/* CUSTOMER POLICIES (Google Merchant Center Compliance) */}
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/return-policy" element={<Navigate to="/refund-policy" replace />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />

        {/* SUBCATEGORY PRODUCTS */}
        <Route path="/subcategory/:id" element={<SubCategoryProducts />} />

        {/* PRODUCT DETAILS (SINGULAR /product/:slug) */}
        <Route path="/product/:slug" element={<ProductDetailsSlug />} />

        {/* REDIRECT PLURAL /products/:slug -> /product/:slug */}
        <Route path="/products/:slug" element={<ProductsRedirect />} />

        {/* 410 GONE FOR LEGACY JAPANESE HACKED SPAM URLS (/products/detail/*) & MALWARE BACKDOOR URLS (/information/*) */}
        <Route path="/products/detail/:id" element={<SpamRemoved />} />
        <Route path="/products/detail/*" element={<SpamRemoved />} />
        <Route path="/products/detail" element={<SpamRemoved />} />
        <Route path="/product/detail/:id" element={<SpamRemoved />} />
        <Route path="/product/detail/*" element={<SpamRemoved />} />
        <Route path="/product/detail" element={<SpamRemoved />} />
        <Route path="/information/:slug" element={<SpamRemoved />} />
        <Route path="/information/*" element={<SpamRemoved />} />
        <Route path="/information" element={<SpamRemoved />} />

        {/* REDIRECT OLD WOOCOMMERCE /product-category/:slug -> /:slug */}
        <Route path="/product-category/:slug" element={<ProductCategoryRedirect />} />
        <Route path="/product-category" element={<Navigate to="/shop" replace />} />
        <Route path="/product-tag/:slug" element={<Navigate to="/shop" replace />} />
        <Route path="/product-tag" element={<Navigate to="/shop" replace />} />
        <Route path="/cart" element={<Navigate to="/shop" replace />} />
        <Route path="/checkout" element={<Navigate to="/shop" replace />} />
        <Route path="/my-account" element={<Navigate to="/" replace />} />

        {/* DYNAMIC CATEGORY */}
        <Route path="/:slug" element={<CategoryPage />} />
        
        {/* STANDARD CLIENT ADMIN PANEL (Kishan) */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
           <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/add-product" element={
          <ProtectedRoute>
           <AddProduct />
          </ProtectedRoute>
        } />
        <Route path="/admin/edit-product/:id" element={
          <ProtectedRoute>
           <EditProduct />
          </ProtectedRoute>
        } />
        <Route path="/admin/delete-product/:id" element={
          <ProtectedRoute>
           <DeleteProduct />
          </ProtectedRoute>
        } />
        <Route path="/admin/categories" element={
          <ProtectedRoute>
           <Categories />
          </ProtectedRoute>
        } />
        <Route path="/admin/blogs" element={
          <ProtectedRoute>
           <AdminBlogs />
          </ProtectedRoute>
        } />
        <Route path="/admin/subcategories" element={
          <ProtectedRoute>
           <AddSubCategory />
          </ProtectedRoute>
        } />

        {/* VIJAY AI SUPER ADMIN PANEL */}
        <Route path="/admin-vijay" element={<Navigate to="/admin-vijay/dashboard" replace />} />
        <Route path="/admin-vijay/login" element={<VijayLogin />} />
        <Route path="/admin-vijay/dashboard" element={
          <VijayProtectedRoute>
            <VijayDashboard />
          </VijayProtectedRoute>
        } />
        <Route path="/admin-vijay/pending-products" element={
          <VijayProtectedRoute>
            <VijayPendingProducts />
          </VijayProtectedRoute>
        } />
        <Route path="/admin-vijay/add-product" element={
          <VijayProtectedRoute>
            <VijayAddProduct />
          </VijayProtectedRoute>
        } />
        <Route path="/admin-vijay/edit-product/:id" element={
          <VijayProtectedRoute>
            <VijayEditProduct />
          </VijayProtectedRoute>
        } />
        <Route path="/admin-vijay/delete-product/:id" element={
          <VijayProtectedRoute>
            <VijayDeleteProduct />
          </VijayProtectedRoute>
        } />
        <Route path="/admin-vijay/categories" element={
          <VijayProtectedRoute>
            <VijayCategories />
          </VijayProtectedRoute>
        } />
        <Route path="/admin-vijay/blogs" element={
          <VijayProtectedRoute>
            <VijayBlogs />
          </VijayProtectedRoute>
        } />
        <Route path="/admin-vijay/subcategories" element={
          <VijayProtectedRoute>
            <VijaySubCategories />
          </VijayProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

       <Footer />
    </>
  )
}

export default App
