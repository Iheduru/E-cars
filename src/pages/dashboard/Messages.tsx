import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const Messages = () => {
  const [messages] = useState([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Messages</h1>

      {messages.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <MessageSquare className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Messages Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            When buyers contact you about your listings, their messages will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* Messages will be listed here */}
        </div>
      )}
    </div>
  );
};

export default Messages;