import { useState, useEffect } from 'react';
import { CarData, CarCard } from '../components/car/CarCard';
import SearchFilters, { SearchFilters as FilterValues } from '../components/car/SearchFilters';
import { ChevronDown, SlidersHorizontal, Grid3X3, Menu, Search } from 'lucide-react';

// Mock data for listings
const allCars: CarData[] = [
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
  {
    id: '10',
    title: '2017 Mercedes-Benz C300',
    price: 28900,
    year: 2017,
    mileage: 68000,
    fuelType: 'Gasoline',
    location: 'New York, NY',
    imageUrl: 'https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '11',
    title: '2022 Kia Telluride SX',
    price: 44500,
    year: 2022,
    mileage: 12000,
    fuelType: 'Gasoline',
    location: 'Atlanta, GA',
    imageUrl: 'https://images.pexels.com/photos/225841/pexels-photo-225841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '12',
    title: '2020 Hyundai Palisade',
    price: 41200,
    year: 2020,
    mileage: 32000,
    fuelType: 'Gasoline',
    location: 'Tampa, FL',
    imageUrl: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'mileage_low', label: 'Mileage: Low to High' },
];

const Listings = () => {
  const [cars, setCars] = useState<CarData[]>(allCars);
  const [filteredCars, setFilteredCars] = useState<CarData[]>(allCars);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterValues>({
    make: '',
    priceRange: '',
    year: '',
    vehicleType: '',
    keywords: '',
  });

  // Apply sorting
  useEffect(() => {
    const sortedCars = [...filteredCars];
    
    switch (sortBy) {
      case 'newest':
        sortedCars.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        sortedCars.sort((a, b) => a.year - b.year);
        break;
      case 'price_low':
        sortedCars.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sortedCars.sort((a, b) => b.price - a.price);
        break;
      case 'mileage_low':
        sortedCars.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        break;
    }
    
    setCars(sortedCars);
  }, [sortBy, filteredCars]);

  // Handle search & filtering
  const handleSearch = (filters: FilterValues) => {
    setCurrentFilters(filters);
    
    // Apply filters (in a real app, this would likely be an API call)
    let results = [...allCars];
    
    // Filter by make
    if (filters.make) {
      results = results.filter(car => 
        car.title.toLowerCase().includes(filters.make.toLowerCase())
      );
    }
    
    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (min && max) {
        results = results.filter(car => car.price >= min && car.price <= max);
      } else if (min) {
        results = results.filter(car => car.price >= min);
      } else if (max) {
        results = results.filter(car => car.price <= max);
      }
    }
    
    // Filter by year
    if (filters.year) {
      const [minYear, maxYear] = filters.year.split('-').map(Number);
      if (minYear && maxYear) {
        results = results.filter(car => car.year >= minYear && car.year <= maxYear);
      } else if (minYear) {
        results = results.filter(car => car.year >= minYear);
      } else if (maxYear) {
        results = results.filter(car => car.year <= maxYear);
      }
    }
    
    // Filter by keywords
    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      results = results.filter(car => 
        car.title.toLowerCase().includes(keywords) || 
        car.location.toLowerCase().includes(keywords) ||
        car.fuelType.toLowerCase().includes(keywords)
      );
    }
    
    setFilteredCars(results);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Page Header */}
      <div className="bg-primary-600 dark:bg-primary-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Browse Cars</h1>
          <p className="text-primary-100 max-w-3xl">
            Explore our extensive collection of quality vehicles. Use the filters to find exactly what you're looking for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0 mr-8">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
              <SearchFilters 
                variant="sidebar" 
                onSearch={handleSearch} 
              />
            </div>
          </div>

          {/* Mobile Filter Button */}
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

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="lg:hidden mb-4">
              <SearchFilters 
                variant="sidebar" 
                onSearch={handleSearch} 
              />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h2 className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{cars.length}</span> cars found
              </h2>
              
              {/* Sort Dropdown */}
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

            {/* Cars Grid */}
            {cars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No cars found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setCurrentFilters({
                      make: '',
                      priceRange: '',
                      year: '',
                      vehicleType: '',
                      keywords: '',
                    });
                    setFilteredCars(allCars);
                  }}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination - would be implemented with real data */}
            {cars.length > 0 && (
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

export default Listings;