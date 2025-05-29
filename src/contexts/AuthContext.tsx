import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // For demo purposes - would normally call an API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // For demo: make the user an admin if their email contains "admin"
      const isAdmin = email.toLowerCase().includes('admin');
      
      // Simulate successful login with mock user data
      const mockUser: User = {
        id: '123456',
        name: email.split('@')[0],
        email,
        avatar: 'https://i.pravatar.cc/150?u=' + email,
        role: isAdmin ? 'admin' : 'user',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      
      // Simulate successful registration with mock user data
      const mockUser: User = {
        id: '123456',
        name,
        email,
        avatar: 'https://i.pravatar.cc/150?u=' + email,
        role: 'user',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};