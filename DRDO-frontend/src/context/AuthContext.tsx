import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  userId: number;
  full_name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ role: string }>;
  register: (full_name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount and verify token with backend
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        setToken(storedToken);
        try {
          // Verify token and get fresh user data from backend
          const response = await api.auth.getProfile();
          const userData = {
            userId: response.data!.user_id ?? response.data!.userId ?? 0,
            full_name: response.data!.full_name,
            email: response.data!.email,
            role: response.data!.role,
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch {
          // Token is invalid, clear everything
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.auth.login(email, password);

      const userData = {
        userId: response.data!.userId,
        full_name: response.data!.full_name,
        email: response.data!.email,
        role: response.data!.role,
      };

      setToken(response.data!.token);
      setUser(userData);

      localStorage.setItem('token', response.data!.token);
      localStorage.setItem('user', JSON.stringify(userData));

      return { role: userData.role };
    } catch (error) {
      throw error;
    }
  };

  const register = async (full_name: string, email: string, password: string, phone?: string) => {
    try {
      await api.auth.register({ full_name, email, password, phone });

      // After registration, automatically log them in
      await login(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        isLoading,
        isAdmin,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
