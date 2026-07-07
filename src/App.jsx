import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import HeroSlider from './Components/Hero/HeroSlider'
import About from "./Pages/About";
import { Routes, Route } from "react-router-dom";
import Contact from './Pages/Contact';
import CategoryPage from './Pages/CategoryPage';
import SubCategoryProducts from './Pages/SubCategoryProducts';
import ProductDetails from './Pages/ProductDetails';
import NotFound from './Pages/NotFound';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from './admin/AddProduct';
import AddCategory from './admin/Categories';
import AddSubCategory from './admin/SubCategories';
import EditProduct from './admin/EditProduct';
import DeleteProduct from './admin/DeleteProduct';
import Categories from './admin/Categories';
import SubCategories from './admin/SubCategories';
function App() {

  return (
    <>
       <Navbar />
  <Routes>
 <Route
          path="/"
          element={
            <>
              <HeroSlider />
              <Home />
            </>
          }
        />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
   <Route path="/:slug" element={<CategoryPage />} />

        {/* SUBCATEGORY PRODUCTS */}
        <Route path="/subcategory/:id" element={<SubCategoryProducts />} />

        {/* PRODUCT DETAILS */}
        <Route path="/product/:id" element={<ProductDetails />} />
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
