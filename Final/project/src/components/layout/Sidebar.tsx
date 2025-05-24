import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  BarChart4, 
  Settings, 
  HelpCircle,
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'Candidates', path: '/candidates', icon: <Users size={20} /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart4 size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" 
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed z-50 h-full w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 md:translate-x-0 md:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <h2 className="text-lg font-bold text-gray-900">Navigation</h2>
          <button 
            onClick={closeSidebar}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
              onClick={closeSidebar}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-200 bg-gray-50 p-4">
          <div className="rounded-md bg-primary/5 p-3">
            <h4 className="text-sm font-medium text-primary">AI Assistant</h4>
            <p className="mt-1 text-xs text-gray-600">
              Need help? Ask our AI assistant for guidance.
            </p>
            <button className="mt-2 w-full btn btn-primary">
              Ask AI Assistant
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;