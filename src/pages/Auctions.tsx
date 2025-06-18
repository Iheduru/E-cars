import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Clock, 
  Eye, 
  Gavel, 
  Heart,
  Filter,
  MapPin,
  Star,
  Shield,
  TrendingUp,
  Calendar,
  Gauge,
  Fuel,
  Users,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockAuctions, mockAuctionSellers, AuctionCar, formatPrice, getTimeRemaining, getAuctionStatus } from '../data/auctions';

const Auctions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('ending-soon');
  const [filteredAuctions, setFilteredAuctions] = useState<AuctionCar[]>(mockAuctions);
  const [showFilters, setShowFilters] = useState(false);

  // Real-time countdown updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFilteredAuctions(prev => [...prev]);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = mockAuctions.filter(auction => {
      const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           auction.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           auction.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                             (selectedCategory === 'luxury' && ['Mercedes-Benz', 'BMW', 'Lexus'].includes(auction.brand)) ||
                             (selectedCategory === 'sports' && auction.bodyType === 'Coupe') ||
                             (selectedCategory === 'suv' && auction.bodyType === 'SUV') ||
                             (selectedCategory === 'sedan' && auction.bodyType === 'Sedan');
      
      return matchesSearch && matchesCategory;
    });

    // Sort auctions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'ending-soon':
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        case 'highest-bid':
          return b.currentBid - a.currentBid;
        case 'most-watched':
          return b.watchers - a.watchers;
        case 'newest':
          return b.year - a.year;
        default:
          return 0;
      }
    });

    setFilteredAuctions(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mt-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-800 dark:via-purple-800 dark:to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex items-center mb-8">
            <button className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go back
            </button>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              INVEST WITH SUCCESS BUY FROM<br />
              <span className="text-yellow-400">E-AUTOS.COM</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Exclusive Car Listing From The Nation's Leading Car Management
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter a Model or Brand"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pr-14 text-lg rounded-2xl border-0 focus:ring-4 focus:ring-white/20 dark:bg-gray-800 dark:text-white"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Live Auction Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Live Auction</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Now</span>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white"
            >
              <option value="ending-soon">Ending Soon</option>
              <option value="highest-bid">Highest Bid</option>
              <option value="most-watched">Most Watched</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'all', label: 'All Categories' },
                { value: 'luxury', label: 'Luxury Cars' },
                { value: 'sports', label: 'Sports Cars' },
                { value: 'suv', label: 'SUVs' },
                { value: 'sedan', label: 'Sedans' }
              ].map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAuctions.map((auction) => {
            const seller = mockAuctionSellers.find(s => s.id === auction.sellerId);
            
            return (
              <div key={auction.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image */}
                <div className="relative">
                <Link to={`/auctions/${auction.id}`}>
                <img
                    src={auction.imageUrl}
                    alt={auction.title}
                    className="w-full h-64 object-cover"
                />
                </Link>
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(auction)}
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors">
                      <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="flex items-center px-2 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full">
                      <Eye className="w-3 h-3 mr-1" />
                      <span className="text-xs">{auction.watchers}</span>
                    </div>
                  </div>
                  
                  {/* Time Left Overlay */}
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

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{auction.title}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{auction.location}</span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-600 dark:text-gray-400">{auction.year}</div>
                    </div>
                    <div className="text-center">
                      <Gauge className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-600 dark:text-gray-400">{formatPrice(auction.mileage)}km</div>
                    </div>
                    <div className="text-center">
                      <Fuel className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-600 dark:text-gray-400">{auction.fuelType}</div>
                    </div>
                  </div>

                  {/* Current Bid */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Bid</div>
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      ₦{formatPrice(auction.currentBid)}
                    </div>
                    {auction.reservePrice && !auction.isReserveMetStatus && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Reserve: ₦{formatPrice(auction.reservePrice)}
                      </div>
                    )}
                  </div>

                  {/* Seller Info */}
                  {seller && (
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{seller.name}</div>
                          <div className="flex items-center">
                            {renderStars(seller.rating)}
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({seller.rating})</span>
                          </div>
                        </div>
                      </div>
                      {seller.verified && (
                        <Shield className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link to={`/auctions/${auction.id}`} className="flex-1">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center">
                        <Gavel className="w-4 h-4 mr-2" />
                        Place Bid
                    </button>
                    </Link>
                    <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {filteredAuctions.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold">
              Load More Auctions
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredAuctions.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Auctions Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Try adjusting your search criteria or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auctions;