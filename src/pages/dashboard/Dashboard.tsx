import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Welcome back, {user?.name}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Active Listings</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Views</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Messages</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Saved Cars</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No recent activity to display
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;