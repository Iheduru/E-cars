const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About eCars</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            eCars is the premier marketplace for buying and selling cars online. Our mission is to make car transactions simple, transparent, and secure for everyone.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400">
            Founded in 2025, we've helped thousands of customers find their perfect vehicle and sellers reach the right buyers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;