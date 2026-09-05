import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import HeroSlider from './Components/Hero/HeroSlider'
import FeaturesBar from './Components/FeaturesBar'
import About from "./Pages/About";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Contact from './Pages/Contact';
import CategoryPage from './Pages/CategoryPage';
import SubCategoryProducts from './Pages/SubCategoryProducts';
import NotFound from './Pages/NotFound';
import ErrorBoundary from './Components/ErrorBoundary';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import ProtectedRoute from "./Components/ProtectedRoute";
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import DeleteProduct from './admin/DeleteProduct';
import Categories from './admin/Categories';
import AdminBlogs from './admin/Blog';
import AddSubCategory from './admin/SubCategories';

// Vijay AI Super Admin Panel Components
import VijayLogin from './admin-vijay/Login';
import VijayDashboard from './admin-vijay/Dashboard';
import VijayAddProduct from './admin-vijay/AddProduct';
import VijayEditProduct from './admin-vijay/EditProduct';
import VijayDeleteProduct from './admin-vijay/DeleteProduct';
import VijayCategories from './admin-vijay/Categories';
import VijayBlogs from './admin-vijay/Blog';
import VijaySubCategories from './admin-vijay/SubCategories';
import VijayPendingProducts from './admin-vijay/PendingProducts';
import VijayProtectedRoute from './Components/VijayProtectedRoute';

import ScrollTop from "./Components/ScrollTop";
import FloatingWhatsApp from "./Components/FloatingWhatsApp";
import Blog from "./Pages/Blog/Blogs";
import BlogDetails from './Pages/Blog/BlogDetails'
import Shop from "./Pages/Shop";
import ProductDetailsSlug from './Pages/ProductDetailsSlug';
import SpamRemoved from './Pages/SpamRemoved';
import ShippingPolicy from './Pages/Policies/ShippingPolicy';
import RefundPolicy from './Pages/Policies/RefundPolicy';
import PrivacyPolicy from './Pages/Policies/PrivacyPolicy';
import TermsConditions from './Pages/Policies/TermsConditions';

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
      <ErrorBoundary>
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
      </ErrorBoundary>


       <Footer />
    </>
  )
}

export default App
