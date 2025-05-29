import { useState } from 'react';
import { Search, MapPin, Phone, Star, ExternalLink } from 'lucide-react';

interface DealershipFilters {
  brand: string;
  location: string;
  rating: string;
  type: string;
}

const Dealership = () => {
  const [filters, setFilters] = useState<DealershipFilters>({
    brand: '',
    location: '',
    rating: '',
    type: '',
  });

  const brands = [
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Lexus',
    'Volkswagen',
    'Hyundai',
  ];

  const dealerTypes = [
    'New Cars',
    'Used Cars',
    'Certified Pre-Owned',
    'All Types',
  ];

  const ratings = [
    { label: '4+ Stars', value: '4' },
    { label: '3+ Stars', value: '3' },
    { label: '2+ Stars', value: '2' },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Car Dealerships
      </h1>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Brand
            </label>
            <select
              name="brand"
              className="input"
              value={filters.brand}
              onChange={handleFilterChange}
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand.toLowerCase()}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="input"
              placeholder="Enter city or ZIP code..."
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rating
            </label>
            <select
              name="rating"
              className="input"
              value={filters.rating}
              onChange={handleFilterChange}
            >
              <option value="">Any Rating</option>
              {ratings.map(rating => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Dealer Type
            </label>
            <select
              name="type"
              className="input"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              {dealerTypes.map(type => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Dealership Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Premium Motors
              </h3>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Dealer Street, Car City, CC 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>(555) 123-4567</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 btn btn-primary">
                View Inventory
              </button>
              <a
                href="#"
                className="btn btn-outline flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="col-span-full text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No dealerships found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your filters or search terms
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dealership;