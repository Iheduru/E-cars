import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, ThumbsUp, AlertTriangle, FileText, Car, X, Star, MapPin, Gavel, Search, Package, DollarSign, Calendar, Tag, CheckCircle, TrendingUp } from 'lucide-react';
import { CarData, CarCard } from '../components/car/CarCard';
import { getFeaturedCars } from '../data/cars';
import SearchFilters from '../components/car/SearchFilters';
import { featuredDealers } from '../data/dealers';
import { mockInventory } from '../data/cars';
import carBrands from '../data/brandData';
import { mockAuctions, AuctionCar, formatPrice, getTimeRemaining, getAuctionStatus } from '../data/auctions';
import { CarPart, filterParts, mockCarParts } from '../data/carParts';
import { mockBlogPosts, BlogPost } from '../data/blog';
import { useTheme } from '../contexts/ThemeContext';

// Interface for Dealer
interface Dealer {
  id: string;
  name: string;
  location: string;
  brands: string[];
  rating: number;
  imageUrl: string;
}

// Interface for Service Provider
interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  address: string;
  phone: string;
  email: string;
}

// Interface for Stolen Car
interface StolenCar {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin: string;
  lastSeen: string;
  dateReported: string;
  status: string;
}

// Mock Service Providers data
const mockServiceProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Premium Auto Service',
    rating: 5,
    reviews: 128,
    address: '123 Auto Street, Car City, CC 12345',
    phone: '(555) 123-4567',
    email: 'contact@premiumauto.example.com',
  },
  {
    id: '2',
    name: 'Elite Car Care',
    rating: 4.5,
    reviews: 95,
    address: '456 Motor Avenue, Auto Town, AT 67890',
    phone: '(555) 987-6543',
    email: 'info@elitecarcare.example.com',
  },
  {
    id: '3',
    name: 'Quick Fix Garage',
    rating: 4,
    reviews: 76,
    address: '789 Gear Road, Vehicle City, VC 11223',
    phone: '(555) 456-7890',
    email: 'support@quickfixgarage.example.com',
  },
];

// Mock Stolen Cars data
const mockStolenCars: StolenCar[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    color: 'Black',
    licensePlate: 'ABC-1234',
    vin: '1HGCM82633A123456',
    lastSeen: 'Downtown Area, Lagos',
    dateReported: 'March 15, 2024',
    status: 'Recently Reported',
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Accord',
    year: 2020,
    color: 'Silver',
    licensePlate: 'XYZ-5678',
    vin: '2HGFC2F69LH123456',
    lastSeen: 'Victoria Island, Lagos',
    dateReported: 'February 20, 2024',
    status: 'Under Investigation',
  },
  {
    id: '3',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    color: 'White',
    licensePlate: 'LMN-9012',
    vin: 'WDDGF8AB0MA123456',
    lastSeen: 'Ikeja, Lagos',
    dateReported: 'January 10, 2024',
    status: 'Recovered',
  },
];

const Home = () => {
  const [searchParams, setSearchParams] = useState({});
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const { theme } = useTheme(); // Get the current theme

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

  // For Auctions, get top 3 auctions sorted by ending soon
  const featuredAuctions = mockAuctions
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, 3);

  // For Car Parts, get top 3 parts
  const featuredParts = filterParts(mockCarParts, {}).slice(0, 3);

  // For Service Providers, get top 3 providers
  const featuredProviders = mockServiceProviders.slice(0, 3);

  // For Stolen Cars, get top 3 entries
  const featuredStolenCars = mockStolenCars.slice(0, 3);

  // For Blog Posts, get top 3 posts sorted by date (newest first)
  const featuredBlogPosts = mockBlogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  // Get auction status badge
  const getStatusBadge = (auction: AuctionCar) => {
    const status = getAuctionStatus(auction);
    switch (status) {
      case 'ending-soon':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <Clock className="w-3 h-3 mr-1" />
            Ending Soon
          </span>
        );
      case 'reserve-met':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Reserve Met
          </span>
        );
      case 'no-reserve':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <TrendingUp className="w-3 h-3 mr-1" />
            No Reserve
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Gavel className="w-3 h-3 mr-1" />
            Active
          </span>
        );
    }
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
            {featuredCars.slice(0, 6).map((car: CarData) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

{/* Value Your Asset & Sell Your Car Sections */}
<section className="py-16 bg-gray-50 dark:bg-gray-900">
  <div className="container">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Value Your Asset Section */}
      <div className="relative text-white overflow-hidden rounded-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1592853625597-7d17be820d0c?auto=format&fit=crop&w=1920&q=80"
            alt="Car valuation appraisal"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800/70 to-gray-800/30' : 'from-gray-900/70 to-gray-900/30'}`}></div>
        </div>
        <div className="relative z-10 p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">We know what your car is really worth</h2>
          <p className="text-lg mb-8">
            Join the millions who value their car with Autotrader. It's completely free and within seconds we will give you a live valuation of what your car is worth.
          </p>
          <Link
            to="/value-asset"
            className={`inline-flex items-center px-6 py-3 ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-indigo-600 hover:bg-gray-100'} rounded-lg transition-colors duration-200 font-semibold shadow-lg`}
          >
            Value your car
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Sell Your Car Section */}
      <div className="relative text-white overflow-hidden rounded-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1592853625597-7d17be820d0c?auto=format&fit=crop&w=1920&q=80"
            alt="Car for sale"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-gray-800/70 to-gray-800/30' : 'from-gray-900/70 to-gray-900/30'}`}></div>
        </div>
        <div className="relative z-10 p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Sell Your Car Today</h2>
          <p className="text-lg mb-8">
            List your vehicle quickly and easily on our platform. Reach thousands of potential buyers and get the best price for your car.
          </p>
          <Link
            to="/sell-car"
            className={`inline-flex items-center px-6 py-3 ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-indigo-600 hover:bg-gray-100'} rounded-lg transition-colors duration-200 font-semibold shadow-lg`}
          >
            Start Selling
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
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

      {/* Featured Auctions Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Auctions</h2>
            <Link to="/auctions" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group">
              <span>See More</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAuctions.map((auction) => (
              <Link to={`/auctions/${auction.id}`} key={auction.id}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={auction.imageUrl}
                      alt={auction.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      {getStatusBadge(auction)}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-red-400" />
                            <span className="font-semibold">{getTimeRemaining(auction.endDate)}</span>
                          </div>
                          <div className="text-sm text-gray-300">
                            {auction.bidCount} bids
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{auction.title}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{auction.location}</span>
                    </div>
                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      ₦{formatPrice(auction.currentBid)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Service Providers Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Service Providers</h2>
            <Link to="/service-providers" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group">
              <span>See More</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map((provider) => (
              <Link to={`/service-providers/${provider.id}`} key={provider.id}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {provider.name}
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="flex">{renderStars(provider.rating)}</div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        ({provider.reviews} reviews)
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{provider.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Car Parts Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Car Parts</h2>
            <Link to="/car-parts" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group">
              <span>See More</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredParts.map((part) => (
              <Link to={`/car-parts/${part.id}`} key={part.id}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <img
                    src={part.imageUrl}
                    alt={part.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                        {part.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {part.condition}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {part.title}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        ₦{formatPrice(part.price)}
                      </div>
                      <div className="flex items-center">
                        {renderStars(part.seller.rating)}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-1" />
                      {part.location}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stolen Cars Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Stolen Cars Registry</h2>
            <Link to="/stolen-cars" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group">
              <span>See More</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStolenCars.map((car) => (
              <Link to={`/stolen-cars/${car.id}`} key={car.id}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        car.status === 'Recently Reported' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        car.status === 'Under Investigation' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        car.status === 'Recovered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {car.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Color:</strong> {car.color}</p>
                      <p><strong>Last Seen:</strong> {car.lastSeen}</p>
                      <p><strong>Date Reported:</strong> {car.dateReported}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Automotive Insights</h2>
            <Link to="/blog" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center group">
              <span>See More</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBlogPosts.map((post: BlogPost) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Tag className="w-4 h-4 mr-1" />
                    {post.category}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </Link>
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
              <div className="bg-primary-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-                mb-4">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Home Delivery</h3>
              <p className="text-gray-400 text-sm">
                Get your car delivered right to your door.
              </p>
            </div>
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              <div className="bg-white/10 p-3 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Quick Process</h3>
              <p className="text-sm text-gray-300">
                Streamlined buying and selling to save time.
              </p>
            </div>
            <div className="bg-gray-600 p-4 rounded-lg text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <ThumbsUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Customer Satisfaction</h3>
              <p className="text-gray-300 text-sm">
                We prioritize your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-lg mb-6 max-w-md mx-auto">
            Explore thousands of vehicles and get expert insights to guide your journey.
          </p>
          <Link
            to="/cars"
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Browse Now
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;