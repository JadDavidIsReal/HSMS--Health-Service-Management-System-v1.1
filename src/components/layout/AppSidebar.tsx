import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Heart, 
  UserCheck,
  LogOut,
  Menu,
  X,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AppSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard, roles: ['nurse', 'doctor'] },
      { title: 'Appointments', url: '/appointments', icon: Calendar, roles: ['nurse', 'doctor', 'patient'] },
    ];

    const roleSpecificItems = {
      nurse: [
        { title: 'Patient Records', url: '/patients', icon: Users, roles: ['nurse'] },
        { title: 'Medical Services', url: '/services', icon: Heart, roles: ['nurse'] },
        { title: 'Staff Directory', url: '/staff', icon: UserCheck, roles: ['nurse'] },
      ],
      doctor: [
        { title: 'Prescriptions', url: '/prescriptions', icon: FileText, roles: ['doctor'] },
      ],
      patient: []
    };

    return [...baseItems, ...(roleSpecificItems[user?.role || 'patient'] || [])];
  };

  const navigationItems = getNavigationItems();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-card border-r border-border z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">HSMS</h1>
              <p className="text-xs text-muted-foreground">Health Services</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-medium">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors
                ${isActive(item.url) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;