import { Link, useLocation } from 'react-router-dom';
import { 
  Car, 
  Settings, 
  MessageSquare, 
  Upload, 
  User, 
  Grid,
  LogOut,
  X,
  ShieldAlert,
  Users,
  FileText,
  BarChart,
  Bell,
  ListChecks
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Listings from '@/pages/Listings';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    { icon: Grid, label: 'Dashboard', path: '/dashboard' },
    { icon: Upload, label: 'Upload Cars', path: '/dashboard/upload' },
    { icon: ListChecks, label: 'Listings', path: '/dashboard/listings' },
    { icon: Car, label: 'Manage Cars', path: '/dashboard/manage-cars' },
    { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },

  ];

  const adminMenuItems = [
    { icon: Users, label: 'User Management', path: '/dashboard/admin/users' },
    { icon: ShieldAlert, label: 'Reports & Flags', path: '/dashboard/admin/reports' },
    { icon: FileText, label: 'Content Management', path: '/dashboard/admin/content' },
    { icon: BarChart, label: 'Analytics', path: '/dashboard/admin/analytics' },
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        {/* Mobile close button */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
              alt={user?.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}

              {isAdmin && (
                <>
                  <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Admin
                    </p>
                  </div>
                  {adminMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </Link>
                    );
                  })}
                </>
              )}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md w-full"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;