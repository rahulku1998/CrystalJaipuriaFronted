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
import ProductDetails from './Pages/ProductDetails';
import NotFound from './Pages/NotFound';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import ProtectedRoute from "./Components/ProtectedRoute";
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import DeleteProduct from './admin/DeleteProduct';
import Categories from './admin/Categories';
import AdminBlogs from './admin/Blog';
import AddSubCategory from './admin/SubCategories';
import ScrollTop from "./Components/ScrollTop";
import FloatingWhatsApp from "./Components/FloatingWhatsApp";
import Blog from "./Pages/Blog/Blogs";
import BlogDetails from './Pages/Blog/BlogDetails'
import Shop from "./Pages/Shop";
import ProductDetailsSlug from './Pages/ProductDetailsSlug';

// Redirect helper for old /products/:slug URLs -> /product/:slug
const ProductsRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/product/${slug}`} replace />;
};

function App() {

  return (
    <>
     <ScrollTop />
       <Navbar />
       
        <FloatingWhatsApp />
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

        {/* SUBCATEGORY PRODUCTS */}
        <Route path="/subcategory/:id" element={<SubCategoryProducts />} />

        {/* PRODUCT DETAILS (SINGULAR /product/:slug) */}
        <Route path="/product/:slug" element={<ProductDetailsSlug />} />

        {/* REDIRECT PLURAL /products/:slug -> /product/:slug */}
        <Route path="/products/:slug" element={<ProductsRedirect />} />

        {/* DYNAMIC CATEGORY */}
        <Route path="/:slug" element={<CategoryPage />} />
        <Route path="*" element={<NotFound />} />
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


      </Routes>


       <Footer />
    </>
  )
}

export default App
