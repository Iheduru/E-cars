import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, ThumbsUp, AlertTriangle, FileText, Car, X } from 'lucide-react';
import { CarData, CarCard } from '../components/car/CarCard';
import { getFeaturedCars } from '../data/cars';
import SearchFilters from '../components/car/SearchFilters';
import { featuredDealers } from '../data/dealers';
import { mockInventory } from '../data/cars';
import carBrands from '../data/brandData';

// Interface for Dealer (unchanged)
interface Dealer {
  id: string;
  name: string;
  location: string;
  brands: string[];
  rating: number;
  imageUrl: string;
}

const Home = () => {
  const [searchParams, setSearchParams] = useState({});
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleSearch = (filters: any) => {
    setSearchParams(filters);
    console.log('Search filters:', filters);
  };

  // Use getFeaturedCars for Featured Cars section
  const featuredCars = getFeaturedCars();

  // For Newest Listings, select recent cars from mockInventory, sorted by year
  const newestListings = Object.values(mockInventory)
    .flat()
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  // For Car Brands section, filter cars by selected brand
  const brandCars = selectedBrand
    ? Object.values(mockInventory)
        .flat()
        .filter((car) => car.make.toLowerCase() === selectedBrand.toLowerCase())
    : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Luxury car on a mountain road"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-lg md:max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white text-4xl md:text-5xl font-bold mb-4"
            >
              Find Your Perfect Car Today
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-200 text-lg mb-8"
            >
              Browse thousands of listings, compare vehicles, and find the perfect match for your lifestyle and budget.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SearchFilters onSearch={handleSearch} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            eCars in Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                1,234
              </div>
              <div className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                <Car className="h-5 w-5" />
                <span>Available Cars</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                56
              </div>
              <div className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Ongoing Auctions</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                789
              </div>
              <div className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Registered Dealers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Support Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Report Scam Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Report a Car Deal Scam
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Have you been the victim of a car deal scam? We're here to help. Report suspicious activities and protect other buyers.
                </p>
                <Link
                  to="/report-scam"
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  File a Report
                </Link>
              </div>
            </div>

            {/* Make Request Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="h-6 w-6 text-primary-500" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Make a Request
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Can't find what you're looking for? Let us know your requirements and we'll help you find the perfect match.
                </p>
                <Link
                  to="/request"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Submit Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Cars</h2>
            <Link to="/cars" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group">
              <span>View all</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.slice(0, 6).map((car: CarData) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Newest Listings</h2>
            <Link to="/cars" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group">
              <span>View all</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newestListings.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dealers Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Dealers</h2>
            <Link to="/dealerships" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group">
              <span>View all dealers</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDealers.map((dealer) => (
              <div key={dealer.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={dealer.imageUrl} 
                    alt={dealer.name}
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">{dealer.name}</h3>
                  <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">{dealer.location}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(dealer.rating) ? 'fill-current' : 'fill-none stroke-current'}`}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                        >
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{dealer.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {dealer.brands.map((brand, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Brands Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Browse by Brand</h2>
            <Link to="/cars" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-accent flex items-center gap-2 group">
              <span>View all</span>
              <ArrowRight className="h-4 w-4 ml-0.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Brand Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {carBrands.map((brand) => (
              <motion.div
                key={brand.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-center ${
                  selectedBrand === brand.id
                    ? 'bg-primary-100 dark:bg-gray-900 border-blue-600 dark:border-blue-500 shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedBrand(brand.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={brand.logoUrl}
                  alt={`${brand.name} logo`}
                  className="h-16 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>

          {/* Selected Brand Cars */}
          {selectedBrand && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {carBrands.find((b) => b.id === selectedBrand)?.name} Cars
                </h3>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 flex items-center gap-1.5 text-sm font-medium"
                >
                  <X className="h-4 w-4" />
                  Clear Selection
                </button>
              </div>
              {brandCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brandCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    No cars available for {carBrands.find((b) => b.id === selectedBrand)?.name}.
                  </p>
                  <Link
                    to="/cars"
                    className="mt-4 inline-block text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-accent font-medium"
                  >
                    Browse All Cars
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-800 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We make buying and selling cars simple, transparent, and stress-free with industry-leading features and service.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="bg-primary-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Verified Listings</h3>
              <p className="text-gray-400 text-sm">
                All cars are thoroughly checked for quality and accuracy.
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="bg-primary-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Home Delivery</h3>
              <p className="text-gray-400 text-sm">
                Get your car delivered right to your door.
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="bg-primary-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Quick Process</h3>
              <p className="text-gray-400 text-sm">
                Fast and efficient purchase process to save you time.
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="bg-primary-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <ThumbsUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Satisfaction Guarantee</h3>
              <p className="text-gray-400 text-sm">
                7-day money-back guarantee for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-600 bg-blue-600">
        <div className="container mx-auto text-center py-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Sell Your Car?</h2>
          <p className="text-white mb-6 max-w-md mx-auto">
            Get the best price for your vehicle with our free valuation and listing service.
          </p>
          <Link
            to="/sell-car"
            className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
          >
            List Your Car Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;