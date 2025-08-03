import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { VehicleData } from '../../data/vehicles';

interface VehicleCardProps {
  vehicle: VehicleData;
}

// Lazy load the image component
const LazyImage = lazy(() => import('../../contexts/LazyImage'));

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Link to={`/vehicles/${vehicle.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <Suspense fallback={<div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
          <LazyImage
            src={vehicle.image}
            alt={vehicle.title}
            className="w-full h-48 object-cover"
          />
        </Suspense>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {vehicle.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {vehicle.year} | {vehicle.mileage.toLocaleString()} miles | {vehicle.location}
          </p>
          <p className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            ₦{vehicle.price.toLocaleString()}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full text-gray-800 dark:text-gray-200">
              {vehicle.fuelType}
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full text-gray-800 dark:text-gray-200">
              {vehicle.transmission}
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full text-gray-800 dark:text-gray-200">
              {vehicle.condition}
            </span>
          </div>
          <button className="w-full btn btn-primary">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;