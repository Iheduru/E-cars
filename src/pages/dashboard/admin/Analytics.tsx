import { useState } from 'react';
import { BarChart } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts
  const userData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Active Users',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  const listingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Listings',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
      },
      {
        label: 'Sold Listings',
        data: [8, 15, 2, 4, 1, 2],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        <BarChart className="inline mr-2" /> Analytics
      </h1>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'overview'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'users'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'listings'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Listings
          </button>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
          <option value="year">This year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Total Users
          </h3>
          <p className="text-4xl font-bold text-primary-600 mb-2">1,248</p>
          <p className="text-sm text-green-600 dark:text-green-400">
            +12.5% from last month
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Total Listings
          </h3>
          <p className="text-4xl font-bold text-primary-600 mb-2">342</p>
          <p className="text-sm text-green-600 dark:text-green-400">
            +8.3% from last month
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {activeTab === 'overview' && 'Site Traffic'}
          {activeTab === 'users' && 'User Growth'}
          {activeTab === 'listings' && 'Listing Activity'}
        </h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            Chart visualization would be here
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-300">+5</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                5 new users registered today
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-green-600 dark:text-green-300">+3</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                3 new listings added
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                5 hours ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;