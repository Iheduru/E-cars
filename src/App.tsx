import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PrivateRoute } from './components/auth/PrivateRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';

// Pages
import Home from './pages/Home';
import Listings from './pages/Listings';
import CarDetails from './pages/CarDetails';
import SellCar from './pages/SellCar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import MyListings from './pages/dashboard/MyListings';
import ProfileSettings from './pages/dashboard/ProfileSettings';
import Messages from './pages/dashboard/Messages';
import Blog from './pages/Blog';
import Article from './pages/Article';
import Compare from './pages/Compare';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import CarParts from './pages/CarParts';
import ServiceProvider from './pages/ServiceProvider';
import StolenCars from './pages/StolenCars';
import Dealership from './pages/Dealership';
import Blacklist from './pages/Blacklist';
import ManageCars from './pages/dashboard/ManageCars';
import UploadCar from './pages/dashboard/UploadCars';
import Settings from './pages/dashboard/Settings';
import Notifications from './pages/dashboard/Notifications';
import UserManagement from './pages/dashboard/admin/UserManagement';
import ReportsAndFlags from './pages/dashboard/admin/ReportsAndFlags';
import ContentManagement from './pages/dashboard/admin/ContentManagement';
import Analytics from './pages/dashboard/admin/Analytics';
import DealerDetails from './pages/DealerDetails';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="cars" element={<Listings />} />
        <Route path="cars/:id" element={<CarDetails />} />
        <Route path="sell-car" element={<SellCar />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<Article />} />
        <Route path="compare" element={<Compare />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="car-parts" element={<CarParts />} />
        <Route path="service-providers" element={<ServiceProvider />} />
        <Route path="stolen-cars" element={<StolenCars />} />
        <Route path="dealerships" element={<Dealership />} />
        <Route path="blacklist" element={<Blacklist />} />
        <Route path="/dealers/:id" element={<DealerDetails />} />

        {/* Protected Routes */}
        <Route path="dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="upload" element={<UploadCar />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
          
          {/* Admin Routes 
          <Route path="admin">
            <Route path="users" element={<PrivateRoute adminOnly><UserManagement /></PrivateRoute>} />
            <Route path="reports" element={<PrivateRoute adminOnly><ReportsAndFlags /></PrivateRoute>} />
            <Route path="content" element={<PrivateRoute adminOnly><ContentManagement /></PrivateRoute>} />
            <Route path="analytics" element={<PrivateRoute adminOnly><Analytics /></PrivateRoute>} />
          </Route>*/}
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;