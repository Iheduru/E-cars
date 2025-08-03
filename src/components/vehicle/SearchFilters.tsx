import { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';

export interface SearchFilters {
  make: string;
  model: string;
  priceRange: string;
  year: string;
  bodyType: string;
  keywords: string;
  location: string;
  distance: string;
  vehicleType: string;
  category: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  sellerType: string;
  doors: string;
  engineSize: string;
  colour: string;
}

interface SearchFiltersProps {
  variant?: 'sidebar' | 'inline';
  onSearch: (filters: SearchFilters) => void;
}

const SearchFilters = ({ variant = 'sidebar', onSearch }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
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
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-5000', label: '$0 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000-20000', label: '$10,000 - $20,000' },
    { value: '20000-40000', label: '$20,000 - $40,000' },
    { value: '40000-100000', label: '$40,000 - $100,000' },
    { value: '100000-', label: '$100,000+' },
  ];

  const yearRanges = [
    { value: '', label: 'Any Year' },
    { value: '2020-2025', label: '2020 - 2025' },
    { value: '2015-2020', label: '2015 - 2020' },
    { value: '2010-2015', label: '2010 - 2015' },
    { value: '2000-2010', label: '2000 - 2010' },
    { value: '-2000', label: 'Before 2000' },
  ];

  const mileageRanges = [
    { value: '', label: 'Any Mileage' },
    { value: '0-10000', label: '0 - 10,000 miles' },
    { value: '10000-30000', label: '10,000 - 30,000 miles' },
    { value: '30000-60000', label: '30,000 - 60,000 miles' },
    { value: '60000-100000', label: '60,000 - 100,000 miles' },
    { value: '100000-', label: '100,000+ miles' },
  ];

  const fuelTypes = [
    { value: '', label: 'Any Fuel Type' },
    { value: 'Gasoline', label: 'Gasoline' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Electric', label: 'Electric' },
    { value: 'Hybrid', label: 'Hybrid' },
    { value: 'N/A', label: 'N/A' },
  ];

  const transmissions = [
    { value: '', label: 'Any Transmission' },
    { value: 'Automatic', label: 'Automatic' },
    { value: 'Manual', label: 'Manual' },
    { value: 'Jet Drive', label: 'Jet Drive' },
    { value: 'Inboard', label: 'Inboard' },
    { value: 'Outboard', label: 'Outboard' },
    { value: 'N/A', label: 'N/A' },
  ];

  const vehicleTypes = [
    { value: '', label: 'Any Vehicle Type' },
    { value: 'motorbike', label: 'Motorbike' },
    { value: 'truck', label: 'Truck' },
    { value: 'van', label: 'Van' },
    { value: 'trailer', label: 'Trailer' },
    { value: 'bus', label: 'Bus' },
    { value: 'rv', label: 'RV' },
    { value: 'boat', label: 'Boat' },
    { value: 'atv', label: 'ATV' },
    { value: 'snowmobile', label: 'Snowmobile' },
    { value: 'jet_ski', label: 'Jet Ski' },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${
        variant === 'sidebar' ? 'space-y-4' : 'flex flex-wrap gap-4'
      }`}
    >
      <div className="flex-1">
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Keywords
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={filters.keywords}
            onChange={handleChange}
            className="input w-full pl-10"
            placeholder="Search by title, features..."
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex-1">
        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          name="vehicleType"
          value={filters.vehicleType}
          onChange={handleChange}
          className="input w-full mt-1"
        >
          {vehicleTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Price Range
        </label>
        <select
          id="priceRange"
          name="priceRange"
          value={filters.priceRange}
          onChange={handleChange}
          className="input w-full mt-1"
        >
          {priceRanges.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Year
        </label>
        <select
          id="year"
          name="year"
          value={filters.year}
          onChange={handleChange}
          className="input w-full mt-1"
        >
          {yearRanges.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Mileage
        </label>
        <select
          id="mileage"
          name="mileage"
          value={filters.mileage}
          onChange={handleChange}
          className="input w-full mt-1"
        >
          {mileageRanges.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Fuel Type
        </label>
        <select
          id="fuelType"
          name="fuelType"
          value={filters.fuelType}
          onChange={handleChange}
          className="input w-full mt-1"
        >
          {fuelTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Transmission
        </label>
        <select
          id="transmission"
          name="transmission"
          value={filters.transmission}
          onChange={handleChange}
          className="input w-full mt-1"
        >
          {transmissions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="input w-full mt-1"
          placeholder="City, State"
        />
      </div>

      <div className="flex-1">
        <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Make
        </label>
        <input
          type="text"
          id="make"
          name="make"
          value={filters.make}
          onChange={handleChange}
          className="input w-full mt-1"
          placeholder="e.g., Harley-Davidson, Ford"
        />
      </div>

      <div className="flex-1">
        <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Model
        </label>
        <input
          type="text"
          id="model"
          name="model"
          value={filters.model}
          onChange={handleChange}
          className="input w-full mt-1"
          placeholder="e.g., Sportster, F-150"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full mt-4">
        Apply Filters
      </button>
    </form>
  );
};

export default SearchFilters;