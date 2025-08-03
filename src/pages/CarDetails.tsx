import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Gauge, 
  Fuel, 
  Phone, 
  Building2, 
  Award,
  ArrowLeft,
  Heart,
  Share2,
  MessageCircle
} from 'lucide-react';
import { CarData, mockInventory } from '../data/cars';
import { Dealer, featuredDealers } from '../data/dealers';

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find the car with matching ID across all dealer inventories
  let car: CarData | undefined;
  for (const dealerCars of Object.values(mockInventory)) {
    const foundCar = dealerCars.find(c => c.id === id);
    if (foundCar) {
      car = foundCar;
      break;
    }
  }

  // Find the dealer associated with the car
  const dealer = car ? featuredDealers.find(d => d.id === car.dealerId) : undefined;

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format mileage with commas
  const formatMileage = (mileage: number) => {
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Render star rating
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

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-12 h-12 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Car Not Found</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                Sorry, we couldn't find a car with ID: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{id}</span>
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Search
            </button>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                  <img
                    src={car.imageUrl}
                    alt={car.title}
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Available
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold">{car.rating}</span>
                  </div>
                </div>
                
                {/* Image Gallery Placeholder */}
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-colors">
                        <img
                          src={car.imageUrl}
                          alt={`${car.title} view ${i}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specifications Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Vehicle Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{car.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mr-4">
                      <Gauge className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mileage</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{formatMileage(car.mileage)}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800/50 rounded-full flex items-center justify-center mr-4">
                      <Fuel className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Fuel Type</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{car.fuelType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Features & Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Price and Dealer Info */}
            <div className="lg:col-span-1">
              {/* Price Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sticky top-24">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{car.title}</h1>
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{car.location}</span>
                  </div>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    ₦{formatPrice(car.price)}
                  </div>
                  <div className="flex items-center justify-center">
                    {renderStars(car.rating)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({car.rating}/5)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-8">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Dealer
                  </button>
                  <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Schedule Test Drive
                  </button>
                  <button className="w-full border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 py-4 px-6 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    Get Financing
                  </button>
                  <button 
                    onClick={toggleModal}
                    className="w-full border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 py-4 px-6 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    Reserve Now
                  </button>
                </div>

                {/* Dealer Information */}
                {dealer && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Dealer Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{dealer.name}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{dealer.address}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">{dealer.phone}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">{dealer.brands.join(', ')}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {renderStars(dealer.rating)}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">({dealer.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trust Indicators */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-green-600 dark:text-green-400 font-bold text-lg">✓</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Verified Dealer</div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">🛡️</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Secure Payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reservation Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Reservations last for only <span className="font-semibold">30 days</span> before they expire. 
              To make a reservation, a payment of <span className="font-semibold">30-50%</span> of the vehicle price must be made. 
              <span className="font-semibold">Terms and conditions</span> apply based on the seller.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={toggleModal}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={toggleModal}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;