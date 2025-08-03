import React, { useState, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import { VehicleData, vehicleInventory } from '../data/vehicles';
import { CarData, mockInventory } from '../data/cars';

// Assuming dealers.ts exists, but providing a fallback
let featuredDealers: Dealer[] = [];
try {
  const dealersModule = await import('../data/dealers');
  featuredDealers = dealersModule.featuredDealers.map((dealer: any) => ({
    ...dealer,
    reviews: dealer.reviews ?? 0,
  }));
} catch (error) {
  console.warn('dealers.ts not found, using empty dealer data');
}

// Define Dealer type for type safety
interface Dealer {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviews: number;
}

// Unified vehicle type
type UnifiedVehicleData = {
  id: string;
  vehicleType: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  fuelType: string;
  transmission: string;
  condition: string;
  features: string[];
  image: string;
  dealerId: string;
  rating: number;
  bodyType?: string;
  doors?: number;
  engineSize?: string;
  colour?: string;
  sellerType?: string;
  category?: string;
};

// Combine vehicleInventory and mockInventory
const allVehicles: UnifiedVehicleData[] = [
  ...Object.values(vehicleInventory).flat(),
  ...Object.values(mockInventory).flat().map(car => ({
    ...car,
    vehicleType: 'car',
    rating: car.rating || 4.5,
    image: car.imageUrl,
  })),
];

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  const vehicle = React.useMemo(() => 
    allVehicles.find(v => v.id === id),
    [id]
  );

  const dealer = React.useMemo(() => 
    vehicle ? featuredDealers.find(d => d.id === vehicle.dealerId) : undefined,
    [vehicle]
  );

  const handleContactDealer = () => {
    if (dealer) {
      alert(`Contacting ${dealer.name} at ${dealer.phone}`);
    } else {
      alert('Dealer information not available.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle?.title,
        text: `Check out this ${vehicle?.title} on our platform!`,
        url: window.location.href,
      }).catch(err => console.error('Share failed:', err));
    } else {
      alert('Share feature is not supported in this browser.');
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!vehicle) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8">
          <Link to="/vehicles" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicles
          </Link>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Vehicle not found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              The vehicle you are looking for does not exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <Link to="/vehicles" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Vehicles
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={vehicle.image}
              alt={vehicle.title}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
            />

            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{vehicle.title}</h1>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600 dark:text-gray-400">{vehicle.rating.toFixed(1)}</span>
                <span className="ml-2 text-gray-500 dark:text-gray-500">• {vehicle.condition}</span>
              </div>
              <p className="text-2xl font-semibold text-primary-600 dark:text-primary-400 mt-2">
                ${vehicle.price.toLocaleString()}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span>{vehicle.year}</span>
              </div>
              <div className="flex items-center">
                <Gauge className="h-5 w-5 text-gray-500 mr-2" />
                <span>{vehicle.mileage.toLocaleString()} miles</span>
              </div>
              <div className="flex items-center">
                <Fuel className="h-5 w-5 text-gray-500 mr-2" />
                <span>{vehicle.fuelType}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span>{vehicle.location}</span>
              </div>
              {vehicle.transmission && (
                <div className="flex items-center">
                  <span className="h-5 w-5 text-gray-500 mr-2">⚙️</span>
                  <span>{vehicle.transmission}</span>
                </div>
              )}
              {vehicle.bodyType && (
                <div className="flex items-center">
                  <span className="h-5 w-5 text-gray-500 mr-2">🚗</span>
                  <span>{vehicle.bodyType}</span>
                </div>
              )}
              {vehicle.doors && (
                <div className="flex items-center">
                  <span className="h-5 w-5 text-gray-500 mr-2">🚪</span>
                  <span>{vehicle.doors} doors</span>
                </div>
              )}
              {vehicle.engineSize && (
                <div className="flex items-center">
                  <span className="h-5 w-5 text-gray-500 mr-2">⚙️</span>
                  <span>{vehicle.engineSize}L</span>
                </div>
              )}
              {vehicle.colour && (
                <div className="flex items-center">
                  <span className="h-5 w-5 text-gray-500 mr-2">🎨</span>
                  <span>{vehicle.colour}</span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Features</h2>
              <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-400">
                {vehicle.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dealer Information</h2>
                {dealer ? (
                  <>
                    <div className="flex items-center mb-4">
                      <Building2 className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{dealer.name}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{dealer.address}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{dealer.phone}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <Award className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{dealer.rating.toFixed(1)} ({dealer.reviews} reviews)</span>
                    </div>
                    <button
                      onClick={handleContactDealer}
                      className="w-full btn btn-primary mb-4"
                    >
                      Contact Dealer
                    </button>
                  </>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Dealer information not available.</p>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={handleToggleFavorite}
                    className={`flex items-center ${
                      isFavorite
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </button>
                  <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(VehicleDetails);