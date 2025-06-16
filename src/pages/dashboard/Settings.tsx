import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const [formData, setFormData] = useState({
    notifications: true,
    darkMode: true,
    emailUpdates: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Save settings logic here
    setTimeout(() => {
      toast.success('Settings saved successfully!');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        <SettingsIcon className="inline mr-2" /> Settings
      </h1>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Notification Preferences
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="notifications" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive browser notifications
                  </p>
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="notifications"
                    name="notifications"
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="emailUpdates" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Updates
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email notifications
                  </p>
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="emailUpdates"
                    name="emailUpdates"
                    type="checkbox"
                    checked={formData.emailUpdates}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Appearance
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="darkMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dark Mode
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle between light and dark theme
                </p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="darkMode"
                  name="darkMode"
                  type="checkbox"
                  checked={formData.darkMode}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;