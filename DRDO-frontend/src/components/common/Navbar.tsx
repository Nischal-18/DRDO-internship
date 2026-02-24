import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Shield } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';

interface NavLink {
  label: string;
  to: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Research', to: '/research' },
  { label: 'Labs', to: '/labs' },
  { label: 'News', to: '/news' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-surface-700/30">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center group-hover:shadow-glow-cyan transition-all duration-300">
              <Shield className="w-6 h-6 text-surface-950" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-neutral-50">DRDO Portal</div>
              <div className="text-xs text-neutral-500">Defence Research & Development</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  px-4 py-2 rounded-xl font-medium transition-all duration-300
                  ${
                    isActive(link.to)
                      ? 'text-primary-400 bg-primary-400/10 border border-primary-400/20'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-surface-800/60'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-neutral-300 hover:bg-surface-800/60 hover:text-neutral-100 transition-all duration-300 font-medium"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.full_name || 'Dashboard'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-neutral-400 hover:bg-surface-800/60 hover:text-neutral-200 transition-all duration-300 font-medium focus-ring"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" as="link" to="/login">
                  Login
                </Button>
                <Button variant="primary" size="sm" as="link" to="/register">
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-neutral-300 hover:bg-surface-800/60 transition-all duration-300 focus-ring"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-surface-700/30 animate-[slideInDown_0.2s_ease-out]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={`
                    px-4 py-3 rounded-xl font-medium transition-all duration-300
                    ${
                      isActive(link.to)
                        ? 'text-primary-400 bg-primary-400/10'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-surface-800/60'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 px-4 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="secondary"
                      fullWidth
                      as="link"
                      to="/dashboard"
                      onClick={closeMobileMenu}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {user?.full_name || 'Dashboard'}
                    </Button>
                    <Button
                      variant="accent"
                      fullWidth
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      fullWidth
                      as="link"
                      to="/login"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      as="link"
                      to="/register"
                      onClick={closeMobileMenu}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
