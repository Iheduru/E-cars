import { useState, useEffect } from 'react';
import { CarCard } from '../components/car/CarCard';
import SearchFilters, { SearchFilters as FilterValues } from '../components/car/SearchFilters';
import { ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { CarData, mockInventory } from '../data/cars';

const allCars: CarData[] = Object.values(mockInventory).flat();

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'mileage_low', label: 'Mileage: Low to High' },
];

const conditionOptions = [
  { value: 'used', label: 'Used Cars' },
  { value: 'new', label: 'New Cars' },
  { value: 'other', label: 'Others' },
];

const Listings = () => {
  const [cars, setCars] = useState<CarData[]>(allCars);
  const [filteredCars, setFilteredCars] = useState<CarData[]>(allCars);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [currentFilters, setCurrentFilters] = useState<FilterValues>({
    make: '',
    model: '',
    priceRange: '',
    year: '',
    bodyType: '',
    keywords: '',
    location: '',
    distance: '',
    conditionType: '',
    category: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    sellerType: '',
    doors: '',
    engineSize: '',
    colour: '',
  });

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

  const handleConditionFilter = (condition: string) => {
    const newCondition = selectedCondition === condition ? '' : condition;
    setSelectedCondition(newCondition);
    setCurrentFilters((prev) => ({ ...prev, conditionType: newCondition }));
    handleSearch({ ...currentFilters, conditionType: newCondition });
  };

  const handleSearch = (filters: FilterValues) => {
    setCurrentFilters(filters);
    let results = [...allCars];

    if (filters.conditionType) {
      results = results.filter(car => 
        car.condition.toLowerCase() === filters.conditionType.toLowerCase()
      );
    }

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

    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      results = results.filter(car => 
        car.title.toLowerCase().includes(keywords) || 
        car.location.toLowerCase().includes(keywords) ||
        car.fuelType.toLowerCase().includes(keywords) ||
        car.features.some(feature => feature.toLowerCase().includes(keywords))
      );
    }

    if (filters.location) {
      results = results.filter(car => 
        car.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.fuelType) {
      results = results.filter(car => 
        car.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    if (filters.mileage) {
      const [minMileage, maxMileage] = filters.mileage.split('-').map(Number);
      if (minMileage && maxMileage) {
        results = results.filter(car => car.mileage >= minMileage && car.mileage <= maxMileage);
      } else if (minMileage) {
        results = results.filter(car => car.mileage >= minMileage);
      } else if (maxMileage) {
        results = results.filter(car => car.mileage <= maxMileage);
      }
    }

    setFilteredCars(results);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-primary-600 dark:bg-primary-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Browse Cars</h1>
          <p className="text-primary-100 max-w-3xl">
            Explore our extensive collection of quality vehicles. Use the filters to find exactly what you're looking for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-4">
          {conditionOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleConditionFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCondition === option.value
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
              <SearchFilters 
                variant="sidebar" 
                onSearch={handleSearch} 
              />
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
              <SearchFilters 
                variant="sidebar" 
                onSearch={handleSearch} 
              />
            </div>
          )}

          <div className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h2 className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{cars.length}</span> cars found
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
                      model: '',
                      priceRange: '',
                      year: '',
                      bodyType: '',
                      keywords: '',
                      location: '',
                      distance: '',
                      conditionType: '',
                      category: '',
                      mileage: '',
                      fuelType: '',
                      transmission: '',
                      sellerType: '',
                      doors: '',
                      engineSize: '',
                      colour: '',
                    });
                    setSelectedCondition('');
                    setFilteredCars(allCars);
                  }}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}

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