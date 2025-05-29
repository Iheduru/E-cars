import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, ThumbsUp, AlertTriangle, FileText, Car } from 'lucide-react';
import { CarData, CarCard } from '../components/car/CarCard';
import SearchFilters from '../components/car/SearchFilters';

// Mock data
const featuredCars: CarData[] = [
  {
    id: '1',
    title: '2022 Toyota Camry XSE',
    price: 32500,
    year: 2022,
    mileage: 15000,
    fuelType: 'Hybrid',
    location: 'Phoenix, AZ',
    imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFeatured: true,
  },
  {
    id: '2',
    title: '2020 Honda Accord Sport',
    price: 27800,
    year: 2020,
    mileage: 32000,
    fuelType: 'Gasoline',
    location: 'Dallas, TX',
    imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFeatured: true,
  },
  {
    id: '3',
    title: '2021 Tesla Model 3',
    price: 42900,
    year: 2021,
    mileage: 18500,
    fuelType: 'Electric',
    location: 'San Francisco, CA',
    imageUrl: 'https://images.pexels.com/photos/12318482/pexels-photo-12318482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFeatured: true,
  },
  {
    id: '4',
    title: '2019 Ford F-150 Raptor',
    price: 55000,
    year: 2019,
    mileage: 45000,
    fuelType: 'Gasoline',
    location: 'Denver, CO',
    imageUrl: 'https://images.pexels.com/photos/2676447/pexels-photo-2676447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFeatured: true,
  },
  {
    id: '5',
    title: '2018 BMW X5 xDrive',
    price: 38700,
    year: 2018,
    mileage: 52000,
    fuelType: 'Diesel',
    location: 'Miami, FL',
    imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFeatured: true,
  },
  {
    id: '6',
    title: '2023 Audi e-tron GT',
    price: 104000,
    year: 2023,
    mileage: 5000,
    fuelType: 'Electric',
    location: 'Seattle, WA',
    imageUrl: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFeatured: true,
  },
];

const newestListings: CarData[] = [
  {
    id: '7',
    title: '2021 Lexus RX 350',
    price: 48000,
    year: 2021,
    mileage: 28000,
    fuelType: 'Gasoline',
    location: 'Chicago, IL',
    imageUrl: 'https://images.pexels.com/photos/4072248/pexels-photo-4072248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '8',
    title: '2020 Subaru Outback',
    price: 32000,
    year: 2020,
    mileage: 35000,
    fuelType: 'Gasoline',
    location: 'Portland, OR',
    imageUrl: 'https://images.pexels.com/photos/9592962/pexels-photo-9592962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '9',
    title: '2019 Jeep Grand Cherokee',
    price: 39500,
    year: 2019,
    mileage: 42000,
    fuelType: 'Gasoline',
    location: 'Denver, CO',
    imageUrl: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Home = () => {
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = (filters: any) => {
    setSearchParams(filters);
    console.log('Search filters:', filters);
  };

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
            {featuredCars.slice(0, 6).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose eCars?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We make buying and selling cars simple, transparent, and stress-free with industry-leading features and service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verified Listings</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All cars are verified for quality and accurate information.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Home Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get your car delivered to your doorstep with our premium service.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quick Process</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete your purchase within days, not weeks, with our streamlined process.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <ThumbsUp className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Satisfaction Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-400">
                7-day money-back guarantee if you're not completely satisfied.
              </p>
            </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Sell Your Car?</h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8 text-lg">
            Get the best price for your vehicle with our free valuation and listing service.
          </p>
          <Link 
            to="/sell-car" 
            className="inline-block px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 font-medium rounded-lg transition-colors shadow-lg"
          >
            List Your Car Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;