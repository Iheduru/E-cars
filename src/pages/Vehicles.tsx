import React, { useState, useEffect, useCallback, memo, Suspense } from 'react';
import { ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { VehicleData, vehicleInventory } from '../data/vehicles';
import { CarData, mockInventory } from '../data/cars';

// Lazy load components
const VehicleCard = React.lazy(() => import('../components/vehicle/VehicleCard'));

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

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'mileage_low', label: 'Mileage: Low to High' },
];

const vehicleTypeOptions = [
  { value: 'car', label: 'Cars' },
  { value: 'motorbike', label: 'Motorbikes' },
  { value: 'truck', label: 'Trucks' },
  { value: 'van', label: 'Vans' },
  { value: 'trailer', label: 'Trailers' },
  { value: 'bus', label: 'Buses' },
  { value: 'rv', label: 'RVs' },
  { value: 'boat', label: 'Boats' },
  { value: 'atv', label: 'ATVs' },
  { value: 'snowmobile', label: 'Snowmobiles' },
  { value: 'jet_ski', label: 'Jet Skis' },
];

// Import the SearchFilters component and its type
import SearchFilters, { SearchFilters as SearchFiltersType } from '../components/car/SearchFilters';

const Vehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<UnifiedVehicleData[]>(allVehicles);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [currentFilters, setCurrentFilters] = useState<SearchFiltersType>({
    make: '',
    model: '',
    priceRange: '',
    year: '',
    bodyType: '',
    keywords: '',
    location: '',
    distance: '',
    vehicleType: '',
    category: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    sellerType: '',
    doors: '',
    engineSize: '',
    colour: '',
    conditionType: '', // Added missing property
  });

  const handleSearch = useCallback((filters: SearchFiltersType): void => {
    setCurrentFilters(filters);
    let results: UnifiedVehicleData[] = [...allVehicles];

    if (filters.vehicleType) {
      results = results.filter(vehicle =>
        vehicle.vehicleType.toLowerCase() === filters.vehicleType.toLowerCase()
      );
    }

    if (filters.make) {
      results = results.filter(vehicle =>
        vehicle.make.toLowerCase() === filters.make.toLowerCase()
      );
    }

    if (filters.model) {
      results = results.filter(vehicle =>
        vehicle.model.toLowerCase() === filters.model.toLowerCase()
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      results = results.filter(vehicle =>
        (!min || vehicle.price >= min) && (!max || vehicle.price <= max)
      );
    }

    if (filters.year) {
      const [minYear, maxYear] = filters.year.split('-').map(Number);
      results = results.filter(vehicle =>
        (!minYear || vehicle.year >= minYear) && (!maxYear || vehicle.year <= maxYear)
      );
    }

    if (filters.bodyType) {
      results = results.filter(vehicle =>
        vehicle.bodyType?.toLowerCase() === filters.bodyType.toLowerCase()
      );
    }

    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      results = results.filter(vehicle =>
        vehicle.title.toLowerCase().includes(keywords) ||
        vehicle.location.toLowerCase().includes(keywords) ||
        vehicle.fuelType.toLowerCase().includes(keywords) ||
        vehicle.features.some(feature => feature.toLowerCase().includes(keywords))
      );
    }

    if (filters.location) {
      results = results.filter(vehicle =>
        vehicle.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.distance) {
      // Note: Distance-based filtering requires geolocation data
    }
    if (filters.vehicleType) {
      results = results.filter(vehicle =>
        vehicle.vehicleType.toLowerCase() === filters.vehicleType.toLowerCase()
      );
    }

    if (filters.category) {
      results = results.filter(vehicle =>
        vehicle.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.mileage) {
      const [minMileage, maxMileage] = filters.mileage.split('-').map(Number);
      results = results.filter(vehicle =>
        (!minMileage || vehicle.mileage >= minMileage) && (!maxMileage || vehicle.mileage <= maxMileage)
      );
    }

    if (filters.fuelType) {
      results = results.filter(vehicle =>
        vehicle.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    if (filters.transmission) {
      results = results.filter(vehicle =>
        vehicle.transmission.toLowerCase() === filters.transmission.toLowerCase()
      );
    }

    if (filters.sellerType) {
      results = results.filter(vehicle =>
        vehicle.sellerType?.toLowerCase() === filters.sellerType.toLowerCase()
      );
    }

    if (filters.doors) {
      results = results.filter(vehicle =>
        vehicle.doors === Number(filters.doors)
      );
    }

    if (filters.engineSize) {
      const [minEngine, maxEngine] = filters.engineSize.split('-').map(Number);
      results = results.filter(vehicle =>
        vehicle.engineSize &&
        (!minEngine || parseFloat(vehicle.engineSize) >= minEngine) &&
        (!maxEngine || parseFloat(vehicle.engineSize) <= maxEngine)
      );
    }

    if (filters.colour) {
      results = results.filter(vehicle =>
        vehicle.colour?.toLowerCase() === filters.colour.toLowerCase()
      );
    }

    setVehicles(results);
  }, []);

  useEffect(() => {
    const sortedVehicles = [...vehicles];
    switch (sortBy) {
      case 'newest':
        sortedVehicles.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        sortedVehicles.sort((a, b) => a.year - b.year);
        break;
      case 'price_low':
        sortedVehicles.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sortedVehicles.sort((a, b) => b.price - a.price);
        break;
      case 'mileage_low':
        sortedVehicles.sort((a, b) => a.mileage - b.mileage);
        break;
    }
    setVehicles(sortedVehicles);
  }, [sortBy]);

  const handleVehicleTypeFilter = useCallback((vehicleType: string) => {
    const newVehicleType = selectedVehicleType === vehicleType ? '' : vehicleType;
    setSelectedVehicleType(newVehicleType);
    handleSearch({ ...currentFilters, vehicleType: newVehicleType });
  }, [selectedVehicleType, currentFilters, handleSearch]);
  const resetFilters = useCallback(() => {
    setCurrentFilters({
      make: '',
      model: '',
      priceRange: '',
      year: '',
      bodyType: '',
      keywords: '',
      location: '',
      distance: '',
      vehicleType: '',
      category: '',
      mileage: '',
      fuelType: '',
      transmission: '',
      sellerType: '',
      doors: '',
      engineSize: '',
      colour: '',
      conditionType: '', // Added missing property
    });
    setSelectedVehicleType('');
    setVehicles(allVehicles);
  }, []);

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-primary-600 dark:bg-primary-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Browse Vehicles</h1>
          <p className="text-primary-100 max-w-3xl">
            Discover our wide range of vehicles, from cars to jet skis and more. Use the filters to find your perfect match.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-4">
          {vehicleTypeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleVehicleTypeFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedVehicleType === option.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="lg:flex">
          <div className="hidden lg:block w-64 flex-shrink-0 mr-8">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
              <Suspense fallback={<div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
                <SearchFilters 
                  variant="sidebar" 
                  onSearch={handleSearch} 
                />
              </Suspense>
            </div>
          </div>

          <div className="lg:hidden mb-4 flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center space-x-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input appearance-none pr-8"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {showFilters && (
            <div className="lg:hidden mb-4">
              <Suspense fallback={<div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
                <SearchFilters 
                  variant="sidebar" 
                  onSearch={handleSearch} 
                />
              </Suspense>
            </div>
          )}

          <div className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h2 className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{vehicles.length}</span> vehicles found
              </h2>
              
              <div className="relative">
                <label htmlFor="sort" className="text-sm mr-2 text-gray-600 dark:text-gray-400">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input appearance-none inline-block w-48"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <Suspense key={vehicle.id} fallback={<div className="w-full h-96 bg-gray-200 dark:bg-gray-700 animate-pulse" />}>
                    <VehicleCard vehicle={vehicle} />
                  </Suspense>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No vehicles found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {vehicles.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                  <button className="px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Previous
                  </button>
                  <button className="px-3 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    1
                  </button>
                  <button className="px-3 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    2
                  </button>
                  <button className="px-3 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    3
                  </button>
                  <button className="px-3 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Vehicles);