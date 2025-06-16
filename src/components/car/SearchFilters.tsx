import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

const makeOptions: FilterOption[] = [
  { value: '', label: 'All Makes' },
  { value: 'toyota', label: 'Toyota' },
  { value: 'honda', label: 'Honda' },
  { value: 'ford', label: 'Ford' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'audi', label: 'Audi' },
  { value: 'lexus', label: 'Lexus' },
  { value: 'nissan', label: 'Nissan' },
];

const priceRangeOptions: FilterOption[] = [
  { value: '', label: 'Any Price' },
  { value: '0-5000', label: 'Under $5,000' },
  { value: '5000-10000', label: 'Under $10,000' },
  { value: '10000-20000', label: '$10,000 - $20,000' },
  { value: '20000-30000', label: '$20,000 - $30,000' },
  { value: '30000-50000', label: '$30,000 - $50,000' },
  { value: '50000-', label: 'Over $50,000' },
];

const yearOptions: FilterOption[] = [
  { value: '', label: 'Any Year' },
  { value: '2022-2024', label: '2022 - 2024' },
  { value: '2018-2021', label: '2018 - 2021' },
  { value: '2014-2017', label: '2014 - 2017' },
  { value: '2010-2013', label: '2010 - 2013' },
  { value: '2000-2009', label: '2000 - 2009' },
  { value: '-1999', label: 'Before 2000' },
];

const vehicleTypeOptions: FilterOption[] = [
  { value: '', label: 'All Types' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'truck', label: 'Truck' },
  { value: 'coupe', label: 'Coupe' },
  { value: 'convertible', label: 'Convertible' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'van', label: 'Van/Minivan' },
];

const locationTypeOptions: FilterOption[] = [
  { value: '', label: 'Any Location' },
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'houston', label: 'Houston' },
  { value: 'miami', label: 'Miami' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'boston', label: 'Boston' },
  { value: 'dallas', label: 'Dallas' },
  { value: 'washington-dc', label: 'Washington D.C.' },
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'atlanta', label: 'Atlanta' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'denver', label: 'Denver' },
  { value: 'las-vegas', label: 'Las Vegas' },
  { value: 'orlando', label: 'Orlando' },
];

interface SearchFiltersProps {
  variant?: 'hero' | 'sidebar';
  className?: string;
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  make: string;
  priceRange: string;
  year: string;
  vehicleType: string;
  keywords: string;
  locationType: string;
}

const SearchFilters = ({ 
  variant = 'hero', 
  className = '', 
  onSearch = () => {} 
}: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    make: '',
    priceRange: '',
    year: '',
    vehicleType: '',
    keywords: '',
    locationType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  if (variant === 'hero') {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Make */}
            <div className="relative">
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Make
              </label>
              <div className="relative">
                <select
                  id="make"
                  name="make"
                  value={filters.make}
                  onChange={handleChange}
                  className="input appearance-none"
                >
                  {makeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price Range
              </label>
              <div className="relative">
                <select
                  id="priceRange"
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleChange}
                  className="input appearance-none"
                >
                  {priceRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year
              </label>
              <div className="relative">
                <select
                  id="year"
                  name="year"
                  value={filters.year}
                  onChange={handleChange}
                  className="input appearance-none"
                >
                  {yearOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Type
              </label>
              <div className="relative">
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={filters.vehicleType}
                  onChange={handleChange}
                  className="input appearance-none"
                >
                  {vehicleTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Location Type */}
            <div>
              <label htmlFor="locationType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <div className="relative">
                <select
                  id="locationType"
                  name="locationType"
                  value={filters.locationType}
                  onChange={handleChange}
                  className="input appearance-none"
                >
                  {locationTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>


            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full btn btn-primary flex items-center justify-center space-x-2 h-[42px]"
              >
                <Search className="h-4 w-4" />
                <span>Search Cars</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // Sidebar variant
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Keywords
          </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            placeholder="Search by keywords..."
            value={filters.keywords}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="sidebar-make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Make
          </label>
          <div className="relative">
            <select
              id="sidebar-make"
              name="make"
              value={filters.make}
              onChange={handleChange}
              className="input appearance-none"
            >
              {makeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="sidebar-priceRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price Range
          </label>
          <div className="relative">
            <select
              id="sidebar-priceRange"
              name="priceRange"
              value={filters.priceRange}
              onChange={handleChange}
              className="input appearance-none"
            >
              {priceRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="sidebar-year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Year
          </label>
          <div className="relative">
            <select
              id="sidebar-year"
              name="year"
              value={filters.year}
              onChange={handleChange}
              className="input appearance-none"
            >
              {yearOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="sidebar-vehicleType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Vehicle Type
          </label>
          <div className="relative">
            <select
              id="sidebar-vehicleType"
              name="vehicleType"
              value={filters.vehicleType}
              onChange={handleChange}
              className="input appearance-none"
            >
              {vehicleTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary flex items-center justify-center space-x-2"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;

export { SearchFilters }