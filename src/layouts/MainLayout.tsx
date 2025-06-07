import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Calculator, 
  FileText, 
  Users, 
  User, 
  Menu, 
  X, 
  Bell, 
  ChevronDown 
} from 'lucide-react';

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/calculators', label: 'Calculators', icon: <Calculator className="w-5 h-5" /> },
    { path: '/articles', label: 'Articles', icon: <FileText className="w-5 h-5" /> },
    { path: '/community', label: 'Community', icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg p-2">
                  FinaQ
                </div>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-all ${
                      location.pathname === item.path || 
                      (item.path !== '/' && location.pathname.startsWith(item.path))
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  <Bell className="h-5 w-5" />
                </button>
                
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                    <div className="px-4 py-2 font-medium border-b border-gray-200">Notifications</div>
                    <div className="max-h-72 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer border-l-4 border-blue-500">
                        <div className="text-sm font-medium">Portfolio Update</div>
                        <div className="text-xs text-gray-500">Your investment portfolio is up 2.3% today</div>
                        <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                        <div className="text-sm font-medium">Savings Goal Achieved</div>
                        <div className="text-xs text-gray-500">You've reached your emergency fund goal! 🎉</div>
                        <div className="text-xs text-gray-400 mt-1">Yesterday</div>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                        <div className="text-sm font-medium">New Calculator Available</div>
                        <div className="text-xs text-gray-500">Try our new retirement planner calculator</div>
                        <div className="text-xs text-gray-400 mt-1">3 days ago</div>
                      </div>
                    </div>
                    <div className="px-4 py-2 text-xs text-center text-blue-600 border-t border-gray-200 hover:bg-gray-50">
                      View all notifications
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-medium">
                    J
                  </div>
                  <span className="text-sm font-medium">John</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 ${
                    location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(item.path))
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-medium text-lg">
                    J
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">John Doe</div>
                  <div className="text-sm font-medium text-gray-500">john@example.com</div>
                </div>
                <button className="ml-auto p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100">
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg p-2">
                  FinaQ
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Your trusted companion for financial wellness and education.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Features</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-sm text-gray-500 hover:text-blue-600">Dashboard</Link></li>
                <li><Link to="/calculators" className="text-sm text-gray-500 hover:text-blue-600">Calculators</Link></li>
                <li><Link to="/articles" className="text-sm text-gray-500 hover:text-blue-600">Financial Insights</Link></li>
                <li><Link to="/community" className="text-sm text-gray-500 hover:text-blue-600">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Help Center</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Financial Glossary</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Market Updates</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Education</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Subscribe</h3>
              <p className="mt-4 text-sm text-gray-500">Get the latest financial insights directly to your inbox.</p>
              <form className="mt-4 flex flex-col sm:flex-row sm:max-w-md gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} FinaQ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;