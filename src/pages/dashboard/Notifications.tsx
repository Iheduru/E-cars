import { useState } from 'react';
import { Bell } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New message from John',
      message: 'Is the car still available?',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      title: 'Listing approved',
      message: 'Your Toyota Camry listing has been approved',
      time: '1 day ago',
      read: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          <Bell className="inline mr-2" /> Notifications
        </h1>
        <button
          onClick={markAllAsRead}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.map((notification) => (
            <li 
              key={notification.id} 
              className={`px-6 py-4 ${!notification.read ? 'bg-blue-50 dark:bg-gray-700' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-medium ${
                    notification.read 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.time}
                  </span>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;