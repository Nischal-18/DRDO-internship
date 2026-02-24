import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, FormField } from '../../components/common';
import ParticleBackground from '../../components/common/ParticleBackground';
import GradientMesh from '../../components/common/GradientMesh';
import { Shield } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { role } = await login(formData.email, formData.password);
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background effects */}
      <GradientMesh variant="hero" />
      <ParticleBackground particleCount={30} />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg glow-cyan group-hover:scale-105 transition-transform duration-300">
              <Shield className="w-7 h-7 text-surface-950" />
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8 shadow-xl animate-[scaleIn_0.4s_ease-out]">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-50">
              Sign in to <span className="text-gradient-cyan">DRDO Portal</span>
            </h2>
            <p className="mt-2 text-neutral-400">
              Access your applications and profile
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-error-500/10 border border-error-500/30 text-error-400 px-4 py-3 rounded-xl mb-6 animate-[slideUp_0.3s_ease-out]">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />

            <FormField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-surface-600 bg-surface-800 text-primary-400 focus:ring-primary-400/50 focus:ring-offset-0"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-neutral-500">Don't have an account? </span>
              <Link to="/register" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
