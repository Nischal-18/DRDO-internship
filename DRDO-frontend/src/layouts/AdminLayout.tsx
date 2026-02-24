import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Shield
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { 
      path: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard 
    },
    { 
      path: '/admin/applications', 
      label: 'Applications', 
      icon: FileText 
    },
    { 
      path: '/admin/users', 
      label: 'Users', 
      icon: Users 
    },
  ];

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: React.ElementType }) => (
    <NavLink
      to={path}
      onClick={() => setSidebarOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-primary-400/10 text-primary-400 border border-primary-400/20 shadow-sm'
            : 'text-neutral-400 hover:bg-surface-700/50 hover:text-neutral-200'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Mobile Header */}
      <header className="lg:hidden bg-surface-900 border-b border-surface-700/50 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-surface-800 text-neutral-300"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg text-neutral-100">DRDO Admin</h1>
        <div className="w-10" />
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-surface-950/80 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-surface-900 border-r border-surface-700/50 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-surface-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5 text-surface-950" />
            </div>
            <div>
              <h1 className="font-bold text-neutral-100">DRDO Portal</h1>
              <p className="text-xs text-neutral-500">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-800 text-neutral-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-surface-700/50">
          <div className="bg-surface-800/60 rounded-xl p-3 border border-surface-700/30">
            <p className="font-medium text-neutral-200 truncate">{user?.full_name}</p>
            <p className="text-sm text-neutral-500 truncate">{user?.email}</p>
            <span className="inline-block mt-2 px-2 py-1 bg-primary-400/10 text-primary-400 text-xs font-medium rounded-lg border border-primary-400/20">
              {user?.role?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-700/50 bg-surface-900">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-error-400 hover:bg-error-500/10 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
