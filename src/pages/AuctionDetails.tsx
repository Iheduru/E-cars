import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Gavel, 
  Heart, 
  MapPin, 
  Star, 
  Shield, 
  Calendar, 
  Gauge, 
  Fuel, 
  Car, 
  Award, 
  CheckCircle, 
  AlertCircle,
  Image as ImageIcon,
  List,
  Users,
  FileText,
} from 'lucide-react';
import { mockAuctions, mockAuctionSellers, mockBids, AuctionCar, formatPrice, getTimeRemaining, getAuctionStatus } from '../data/auctions';

const AuctionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<AuctionCar | null>(null);
  const [seller, setSeller] = useState<typeof mockAuctionSellers[0] | null>(null);
  const [bids, setBids] = useState<typeof mockBids>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [bidAmount, setBidAmount] = useState<number>(0);

  // Fetch auction data
  useEffect(() => {
    const foundAuction = mockAuctions.find(a => a.id === id);
    if (foundAuction) {
      setAuction(foundAuction);
      setSelectedImage(foundAuction.imageUrl);
      const foundSeller = mockAuctionSellers.find(s => s.id === foundAuction.sellerId);
      setSeller(foundSeller || null);
      const auctionBids = mockBids.filter(b => b.auctionId === foundAuction.id);
      setBids(auctionBids);
      setBidAmount(foundAuction.currentBid + 100000); // Minimum bid increment
    }
  }, [id]);

  // Real-time countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setAuction(prev => prev ? {...prev} : null);
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Auction Not Found</h2>
          <Link to="/auctions" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
            Return to Auctions
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    const status = getAuctionStatus(auction);
    switch (status) {
      case 'ending-soon':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <Clock className="w-4 h-4 mr-2" />
            Ending Soon
          </span>
        );
      case 'reserve-met':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-4 h-4 mr-2" />
            Reserve Met
          </span>
        );
      case 'no-reserve':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Gavel className="w-4 h-4 mr-2" />
            No Reserve
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Gavel className="w-4 h-4 mr-2" />
            Active
          </span>
        );
    }
  };

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

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement bid submission logic here
    alert(`Bid of ₦${formatPrice(bidAmount)} placed!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/auctions"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Auctions
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Main Details */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-6">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt={auction.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">{getStatusBadge()}</div>
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800">
                    <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <div className="flex items-center px-2 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full">
                    <Eye className="w-4 h-4 mr-1" />
                    <span className="text-sm">{auction.watchers}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-wrap gap-4">
                {auction.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${auction.title} ${index + 1}`}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
                      selectedImage === img ? 'border-indigo-600' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{auction.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Year
                  </div>
                  <div className="font-semibold">{auction.year}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Gauge className="w-4 h-4 mr-2" />
                    Mileage
                  </div>
                  <div className="font-semibold">{formatPrice(auction.mileage)} km</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Fuel className="w-4 h-4 mr-2" />
                    Fuel
                  </div>
                  <div className="font-semibold">{auction.fuelType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Car className="w-4 h-4 mr-2" />
                    Transmission
                  </div>
                  <div className="font-semibold">{auction.transmission}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Car className="w-4 h-4 mr-2" />
                    Body Type
                  </div>
                  <div className="font-semibold">{auction.bodyType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Car className="w-4 h-4 mr-2" />
                    Color
                  </div>
                  <div className="font-semibold">{auction.color}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Car className="w-4 h-4 mr-2" />
                    Condition
                  </div>
                  <div className="font-semibold">{auction.condition}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Car className="w-4 h-4 mr-2" />
                    VIN
                  </div>
                  <div className="font-semibold">{auction.vin || 'N/A'}</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {auction.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <p className="text-gray-600 dark:text-gray-400">{auction.description}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Bidding and Seller Info */}
          <div className="lg:col-span-1">
            {/* Bidding Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-red-400" />
                  <span className="font-semibold text-lg">{getTimeRemaining(auction.endDate)}</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{auction.bidCount} bids</span>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Bid</div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  ₦{formatPrice(auction.currentBid)}
                </div>
                {auction.reservePrice && !auction.isReserveMetStatus && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Reserve: ₦{formatPrice(auction.reservePrice)}
                  </div>
                )}
              </div>

              <form onSubmit={handleBidSubmit} className="mb-4">
                <div className="relative mb-4">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    min={auction.currentBid + 100000}
                    step={100000}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your bid"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
                >
                  <Gavel className="w-5 h-5 mr-2" />
                  Place Bid
                </button>
              </form>

              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center">
                <Eye className="w-5 h-5 mr-2" />
                Watch Auction
              </button>
            </div>

            {/* Seller Info */}
            {seller && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Seller Information</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{seller.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{seller.type.toUpperCase()}</div>
                  </div>
                  {seller.verified && <Shield className="w-5 h-5 text-green-500" />}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {seller.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    {seller.totalSales} total sales
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member since {seller.memberSince}
                  </div>
                  <div className="flex items-center">
                    {renderStars(seller.rating)}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">({seller.rating})</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Auction Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Starting Bid</span>
                  <span className="font-semibold">₦{formatPrice(auction.startingBid)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Bids Placed</span>
                  <span className="font-semibold">{auction.bidCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Watchers</span>
                  <span className="font-semibold">{auction.watchers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Auction Type</span>
                  <span className="font-semibold">{auction.auctionType.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bid History */}
        {bids.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bid History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600 dark:text-gray-400">
                    <th className="pb-3 pr-4">Bidder</th>
                    <th className="pb-3 pr-4">Amount</th>
                    <th className="pb-3 pr-4">Time</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map(bid => (
                    <tr key={bid.id} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3 pr-4">{bid.bidderName}</td>
                      <td className="py-3 pr-4">₦{formatPrice(bid.amount)}</td>
                      <td className="py-3 pr-4">
                        {new Date(bid.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3">
                        {bid.isWinning ? (
                          <span className="text-green-600 dark:text-green-400">Winning</span>
                        ) : (
                          <span className="text-gray-600 dark:text-gray-400">Outbid</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionDetails;