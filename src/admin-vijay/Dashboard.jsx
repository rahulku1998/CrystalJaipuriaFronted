import { useEffect, useState } from "react";
import API from "../api/axios";
import { formatPrice } from "../utils/price";
import { useNavigate, Link } from "react-router-dom";
import { FaDownload, FaExternalLinkAlt, FaRobot, FaSyncAlt, FaFileCode, FaCheckCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const productRes = await API.get("/products");
      const catRes = await API.get("/categories");
      const subCatRes = await API.get("/subcategories");
      const blogRes = await API.get("/blogs");

      setProducts(productRes.data.products || []);
      setCategories(catRes.data.categories || []);
      setSubCategories(subCatRes.data.subCategories || []);
      setBlogs(blogRes.data.blogs || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleDownloadSitemap = () => {
    const baseUrl = "https://www.crystaljaipuria.com";
    const staticPages = [
      { url: `${baseUrl}/`, changefreq: "daily", priority: "1.0" },
      { url: `${baseUrl}/shop`, changefreq: "daily", priority: "0.9" },
      { url: `${baseUrl}/blog`, changefreq: "weekly", priority: "0.8" },
      { url: `${baseUrl}/about`, changefreq: "monthly", priority: "0.7" },
      { url: `${baseUrl}/contact`, changefreq: "monthly", priority: "0.7" },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticPages.forEach((p) => {
      xml += `  <url>\n    <loc>${p.url}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    });

    categories.forEach((cat) => {
      if (cat.slug) {
        xml += `  <url>\n    <loc>${baseUrl}/${cat.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
      }
    });

    products.forEach((prod) => {
      const slug = prod.slug || prod._id;
      xml += `  <url>\n    <loc>${baseUrl}/product/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    blogs.forEach((b) => {
      const slug = b.slug || b._id;
      xml += `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
    });

    xml += `</urlset>\n`;

    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 text-white p-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-xl bg-white text-indigo-600 font-semibold border hover:bg-blue-100 border-gray-200 hover:text-indigo-800"
        >
          ← Back To Website
        </Link>
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <span>✨ AI Master Portal</span>
          </div>
          <h1 className="text-xl font-extrabold text-white">Vijay Admin Panel</h1>
        </div>

        <div className="space-y-3">
          <button
            className="adminBtn cursor-pointer text-indigo-600 hover:text-indigo-800"
            onClick={() => navigate("/admin-vijay/dashboard")}
          >
            📊 Dashboard
          </button>
          <button
            className="adminBtn cursor-pointer text-indigo-600 hover:text-indigo-800"
            onClick={() => navigate("/admin-vijay/add-product")}
          >
            <span className="bg-green-500 text-white p-1 rounded-full">➕</span> Add Product (AI)
          </button>
          <button
            className="adminBtn cursor-pointer text-indigo-600 hover:text-indigo-800"
            onClick={() => navigate("/admin-vijay/categories")}
          >
            📂 Categories
          </button>
          <button
            className="adminBtn cursor-pointer text-indigo-600 hover:text-indigo-800"
            onClick={() => navigate("/admin-vijay/subcategories")}
          >
            📁 Sub Categories
          </button>
          <button
            className="adminBtn block w-full text-left cursor-pointer text-indigo-600 hover:text-indigo-800"
            onClick={() => navigate("/admin-vijay/blogs")}
          >
            📝 Blogs
          </button>
          <button
            className="adminBtn block w-full text-left cursor-pointer text-red-600 hover:text-red-800 mt-6"
            onClick={() => {
              localStorage.removeItem("vijay_admin_token");
              localStorage.removeItem("vijay_admin_email");
              navigate("/admin-vijay/login");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Manage your store products, categories, blogs and automated SEO
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadSitemap}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium shadow transition cursor-pointer text-sm"
            >
              <FaDownload /> Download Fresh Sitemap.xml
            </button>
            <a
              href="https://www.crystaljaipuria.com/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2.5 rounded-xl font-medium shadow-sm transition text-sm"
            >
              <FaExternalLinkAlt /> Live Sitemap
            </a>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card title="Total Products" value={products.length} icon="📦" />
          <Card title="Categories" value={categories.length} icon="📂" />
          <Card title="Sub Categories" value={subCategories.length} icon="📁" />
          <Card title="Total Blogs" value={blogs.length} icon="📝" />
        </div>

        {/* AUTOMATED SEO STATUS BANNER */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-6 shadow-lg mb-8 border border-indigo-700/40">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <FaCheckCircle className="text-base" />
                <span>100% Automated SEO & Sitemap Engine Active</span>
              </div>
              <h2 className="text-xl font-bold">
                Har naya product/category automatic SEO & Sitemap me add ho jaata hai!
              </h2>
              <p className="text-indigo-200 text-sm max-w-3xl leading-relaxed">
                Jab bhi aap Admin se naya product add ya edit karte hain, uska <strong>Canonical URL (/product/:slug)</strong>, <strong>Google Schema.org Rich Structured Data</strong>, <strong>Breadcrumb Navigation</strong>, aur <strong>Dynamic Sitemap XML</strong> automatically generate ho jaata hai. Aapko manual file edit karne ki zaroorat nahi hai.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownloadSitemap}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition cursor-pointer shadow"
              >
                <FaFileCode /> Export Sitemap XML ({products.length} Products)
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCT SECTION */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <h2 className="text-xl font-bold text-gray-800">Products ({filteredProducts.length})</h2>
            <input
              className="border rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-indigo-500"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>

<tr className="border-b text-left">

<th className="p-3">
Image
</th>

<th>
Name
</th>

<th>
Price
</th>


<th>
Category
</th>


<th>
Action
</th>


</tr>

</thead>




<tbody>


{
filteredProducts.map((p)=>(

<tr
key={p._id}
className="border-b hover:bg-gray-50"
>


<td className="p-3">

<img

src={p.images?.[0]?.url}

className="w-14 h-14 rounded-lg object-cover"

/>

</td>



<td className="font-medium">
{p.name}
</td>



<td>{formatPrice(p.price)}</td>



<td>
{p.categoryId?.name || "-"}
</td>



<td>


<button

onClick={()=>navigate(`/admin-vijay/edit-product/${p._id}`)}

className="bg-blue-600 text-white px-3 py-1 rounded mr-2"

>
Edit
</button>




<button

onClick={()=>handleDelete(p._id)}

className="bg-red-600 text-white px-3 py-1 rounded"

>
Delete
</button>



</td>


</tr>


))
}



</tbody>


</table>


</div>



</div>


<div className="bg-white rounded-xl shadow p-6 mt-10">

<div className="flex justify-between mb-5">

<h2 className="text-xl font-bold">
Blogs
</h2>


<button

onClick={()=>navigate("/admin-vijay/blogs")}

className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"

>
+ Add Blog
</button>


</div>



<table className="w-full">

<thead>

<tr className="border-b text-left">

<th className="p-3">
Image
</th>

<th>
Title
</th>



<th>
Action
</th>


</tr>

</thead>


<tbody>


{
blogs.map((blog)=>(


<tr
key={blog._id}
className="border-b"
>


<td className="p-3">

<img

src={blog.image}

className="w-14 h-14 rounded object-cover"

/>

</td>


<td>
{blog.title}
</td>


<td>
{blog.author}
</td>


<td>


<button

onClick={()=>navigate(`/admin-vijay/edit-blog/${blog._id}`)}

className="bg-blue-600 text-white px-3 py-1 rounded"

>
Edit
</button>



<button

onClick={async()=>{

await API.delete(`/blogs/${blog._id}`);
fetchData();

}}

className="bg-red-600 text-white px-3 py-1 rounded ml-2"

>
Delete
</button>


</td>



</tr>


))

}


</tbody>


</table>


</div>



</div>


</div>

)

};





const Card = ({title,value,icon})=>(
<div className="bg-white shadow rounded-xl p-6 flex items-center gap-5">

<div className="text-4xl">
{icon}
</div>

<div>

<p className="text-gray-500">
{title}
</p>

<h2 className="text-3xl font-bold">
{value}
</h2>


</div>

</div>
);



export default AdminDashboard;