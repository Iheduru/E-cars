import { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { Car, User, Menu, X, Sun, Moon, MessageSquare, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Navigation categories
  const navCategories = {
    marketplace: {
      label: 'Marketplace',
      links: [
        { path: '/cars', label: 'Browse Cars' },
        { path: '/sell-car', label: 'Sell a Car' },
        { path: '/car-parts', label: 'Car Parts' },
        { path: '/compare', label: 'Compare Cars' },
      ]
    },
    services: {
      label: 'Services',
      links: [
        { path: '/service-providers', label: 'Auto Services' },
        { path: '/dealerships', label: 'Dealerships' },
      ]
    },
    safety: {
      label: 'Safety',
      links: [
        { path: '/stolen-cars', label: 'Stolen Cars' },
        { path: '/blacklist', label: 'Blacklist' },
      ]
    },
    resources: {
      label: 'Resources',
      links: [
        { path: '/blog', label: 'Blog' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
      ]
    }
  };

  // Check if the current route is the home page
  const isHomePage = location.pathname === '/';

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Define navbar background class based on scroll state and page
  const navbarBgClass = isScrolled || !isHomePage
    ? 'bg-white dark:bg-gray-900 shadow-md'
    : 'bg-transparent';

  const handleDropdownToggle = (category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBgClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary-600 dark:text-primary-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">eCars</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {Object.entries(navCategories).map(([key, category]) => (
              <div
                key={key}
                className="relative"
              >
                <button
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  onClick={() => handleDropdownToggle(key)}
                  aria-expanded={activeDropdown === key}
                  aria-controls={`dropdown-${key}`}
                >
                  <span>{category.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                <div
                  id={`dropdown-${key}`}
                  className={`absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 transition-all duration-200 ${
                    activeDropdown === key ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  {category.links.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm ${
                          isActive
                            ? 'text-primary-600 dark:text-primary-400 bg-gray-50 dark:bg-gray-700'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Right side - Auth & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {/* Auth Buttons or User Menu */}
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => handleDropdownToggle('user')}
                  aria-expanded={activeDropdown === 'user'}
                  aria-controls="user-dropdown"
                >
                  <img
                    src={user.avatar || 'https://ui-avatars.com/api/?name=' + user.name}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border-2 border-primary-500"
                  />
                  <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                <div
                  id="user-dropdown"
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 ${
                    activeDropdown === 'user' ? 'block' : 'hidden'
                  }`}
                >
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/listings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/dashboard/messages"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Messages
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                {Object.entries(navCategories).map(([key, category]) => (
                  <div key={key} className="space-y-2">
                    <button
                      onClick={() => handleDropdownToggle(key)}
                      className="flex items-center justify-between w-full py-2 text-gray-700 dark:text-gray-300"
                    >
                      <span>{category.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeDropdown === key ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === key && (
                      <div className="pl-4 space-y-2">
                        {category.links.map((link) => (
                          <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                              isActive
                                ? 'block py-2 text-primary-600 dark:text-primary-400'
                                : 'block py-2 text-gray-700 dark:text-gray-300'
                            }
                          >
                            {link.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {!user && (
                  <div className="flex flex-col space-y-2 pt-2 border-t dark:border-gray-800">
                    <Link
                      to="/login"
                      className="py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-center transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                {user && (
                  <div className="pt-2 border-t dark:border-gray-800">
                    <div className="flex items-center space-x-3 py-2">
                      <img
                        src={user.avatar || 'https://ui-avatars.com/api/?name=' + user.name}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover border-2 border-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.name}
                      </span>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <User className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/dashboard/messages"
                      className="flex items-center space-x-2 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Messages</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};