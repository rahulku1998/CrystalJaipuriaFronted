const BlogSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">

      {/* Image Skeleton */}
      <div className="w-full h-[350px] bg-gray-200"></div>


      <div className="p-8">

        {/* Category + Date */}
        <div className="flex gap-4 mb-5">

          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>

          <div className="h-6 w-28 bg-gray-200 rounded-full"></div>

        </div>


        {/* Title */}
        <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-5"></div>


        {/* Description */}
        <div className="space-y-3 mb-7">

          <div className="h-4 bg-gray-200 rounded w-full"></div>

          <div className="h-4 bg-gray-200 rounded w-5/6"></div>

          <div className="h-4 bg-gray-200 rounded w-4/6"></div>

        </div>


        {/* Button */}
        <div className="h-12 w-36 bg-gray-200 rounded-lg"></div>


      </div>

    </div>
  );
};


export default BlogSkeleton;