import { useState } from 'react';
import { Search } from 'lucide-react';

interface PartFilters {
  brand: string;
  category: string;
  condition: string;
  priceRange: string;
  location: string;
}

const CarParts = () => {
  const [filters, setFilters] = useState<PartFilters>({
    brand: '',
    category: '',
    condition: '',
    priceRange: '',
    location: '',
  });

  const categories = [
    'Engine Parts',
    'Transmission',
    'Brakes',
    'Suspension',
    'Body Parts',
    'Interior',
    'Electrical',
    'Wheels & Tires',
  ];

  const conditions = [
    'New',
    'Used - Like New',
    'Used - Good',
    'Used - Fair',
    'Remanufactured',
  ];

  const priceRanges = [
    { label: 'Under $100', value: '0-100' },
    { label: '$100 - $500', value: '100-500' },
    { label: '$500 - $1000', value: '500-1000' },
    { label: '$1000 - $5000', value: '1000-5000' },
    { label: 'Over $5000', value: '5000-' },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Car Parts</h1>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              className="input"
              placeholder="Search brands..."
              value={filters.brand}
              onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              className="input"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Condition
            </label>
            <select
              name="condition"
              className="input"
              value={filters.condition}
              onChange={handleFilterChange}
            >
              <option value="">Any Condition</option>
              {conditions.map(condition => (
                <option key={condition} value={condition.toLowerCase()}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price Range
            </label>
            <select
              name="priceRange"
              className="input"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Any Price</option>
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
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
              placeholder="Enter location..."
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample empty state */}
        <div className="col-span-full text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No parts found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your filters or search terms
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarParts;