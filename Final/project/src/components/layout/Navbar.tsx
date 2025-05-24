import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, Search } from 'lucide-react';
import Logo from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            {!isLandingPage && (
              <button 
                onClick={toggleSidebar}
                className="mr-2 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 md:hidden"
              >
                <Menu size={24} />
              </button>
            )}
            <Link to="/" className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-gray-900">RecruitAI</span>
            </Link>
          </div>

          {isLandingPage ? (
            <div className="hidden items-center md:flex">
              <a href="#features" className="mx-3 text-sm text-gray-600 hover:text-primary">Features</a>
              <a href="#pricing" className="mx-3 text-sm text-gray-600 hover:text-primary">Pricing</a>
              <a href="#testimonials" className="mx-3 text-sm text-gray-600 hover:text-primary">Testimonials</a>
              <a href="#contact" className="mx-3 text-sm text-gray-600 hover:text-primary">Contact</a>
              {isAuthenticated ? (
                <Link to="/dashboard" className="ml-4 btn btn-primary">Dashboard</Link>
              ) : (
                <>
                  <Link to="/login" className="ml-4 btn btn-outline">Log in</Link>
                  <Link to="/signup" className="ml-2 btn btn-primary">Sign up</Link>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <div className="relative mr-4 hidden md:block">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button className="relative mr-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600">
                <Bell size={20} />
                <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-error"></span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-600"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <User size={16} />
                  </div>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {isLandingPage && (
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isLandingPage && isMenuOpen && (
        <div className="animate-fade-in md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a 
              href="#features" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <div className="mt-4 flex flex-col space-y-2">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="btn btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="btn btn-outline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/signup" 
                    className="btn btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;