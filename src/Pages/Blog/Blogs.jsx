import { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "../../Components/Blog/BlogItem";
import BlogSkeleton from "../../Components/Blog/BlogSkeleton";
import blogBanner from "../../assets/handi.jpg";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASEURL}/blogs`
      );

      setBlogs(data.blogs);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBlogs();
  }, []);



 if (loading) {
  return (
    <section className="bg-[#faf7f2] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 space-y-12">

        {[1,2,3].map((item)=>(
          <BlogSkeleton key={item}/>
        ))}

      </div>
    </section>
  );
}



  return (
    <section className="bg-[#faf7f2] min-h-screen">

  {/* Hero */}
  <div
    className="relative h-[400px] bg-cover bg-center"
    style={{
    backgroundImage: `url(${blogBanner})`,
  }}
  >
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/50"></div>

    {/* Text */}
    <div className="relative z-10 flex h-full items-center justify-center px-4">
      <div className="text-center text-white max-w-3xl">
        <h1 className="text-5xl font-bold">
          Our Blogs
        </h1>

        <p className="mt-4 text-lg">
          Read the latest articles about handicrafts, spirituality,
  gifting ideas, and artisan-made products.
        </p>
      </div>
    </div>
  </div>

  {/* Blog Content */}
  <div className="max-w-5xl mx-auto px-4 py-16">

    <div className="space-y-12">
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>

  </div>

</section>
  );
};


export default Blogs;