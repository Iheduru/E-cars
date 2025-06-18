import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, Fuel, Gauge, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface CarData {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  location: string;
  imageUrl: string;
  isFeatured?: boolean;
  features?: string[];
  dealerId?: string;
  rating?: number;
}

interface CarCardProps {
  car: CarData;
  showDealerInfo?: boolean;
}

export const CarCard = ({ car, showDealerInfo = false }: CarCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const toggleFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllFeatures(!showAllFeatures);
  };

  const displayedFeatures = car.features 
    ? showAllFeatures 
      ? car.features 
      : car.features.slice(0, 2)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden group"
    >
      <Link to={`/cars/${car.id}`} className="block">
        {/* Image container */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img 
            src={car.imageUrl} 
            alt={car.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Favorite button */}
          <button 
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400'}`} 
            />
          </button>
          
          {/* Featured badge */}
          {car.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="badge-primary">Featured</span>
            </div>
          )}

          {/* Rating badge */}
          {car.rating && (
            <div className="absolute bottom-3 left-3 flex items-center bg-black/70 text-white px-2 py-1 rounded-md text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{car.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{car.title}</h3>
          </div>
          
          <div className="mb-3">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-500">
              ₦{car.price.toLocaleString()}
            </span>
          </div>
          
          {/* Car details */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Gauge className="h-3.5 w-3.5" />
              <span>{car.mileage.toLocaleString()} mi</span>
            </div>
            <div className="flex items-center space-x-1">
              <Fuel className="h-3.5 w-3.5" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center space-x-1 truncate">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{car.location}</span>
            </div>
          </div>

          {/* Features */}
          {car.features && car.features.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-1.5 mb-1">
                {displayedFeatures.map((feature, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              {car.features.length > 2 && (
                <button 
                  onClick={toggleFeatures}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center"
                >
                  {showAllFeatures ? 'Show less' : `+${car.features.length - 2} more`}
                  {!showAllFeatures && <ChevronRight className="h-3 w-3 ml-0.5" />}
                </button>
              )}
            </div>
          )}

          {/* Dealer info (optional) */}
          {showDealerInfo && car.dealerId && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Sold by:</span>
                <Link 
                  to={`/dealers/${car.dealerId}`}
                  className="ml-1 text-primary-600 dark:text-primary-400 hover:underline"
                  onClick={e => e.stopPropagation()}
                >
                  {car.dealerId} {/* In real app, you'd fetch dealer name */}
                </Link>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};