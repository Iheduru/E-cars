const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog posts will be mapped here */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our blog is under construction. Check back soon for automotive news, tips, and insights!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;