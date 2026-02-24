import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, FormField } from '../../components/common';
import ParticleBackground from '../../components/common/ParticleBackground';
import GradientMesh from '../../components/common/GradientMesh';
import { Shield } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
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

  const validateForm = () => {
    if (!formData.full_name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.full_name, formData.email, formData.password, formData.phone);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
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
              Create your <span className="text-gradient-cyan">account</span>
            </h2>
            <p className="mt-2 text-neutral-400">
              Join DRDO Portal to apply for programs
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-error-500/10 border border-error-500/30 text-error-400 px-4 py-3 rounded-xl mb-6 animate-[slideUp_0.3s_ease-out]">
              {error}
            </div>
          )}

          {/* Register Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormField
              label="Full Name"
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />

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
              label="Phone Number (Optional)"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
            />

            <FormField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="At least 6 characters"
            />

            <FormField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter your password"
            />

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-surface-600 bg-surface-800 text-primary-400 focus:ring-primary-400/50 focus:ring-offset-0"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-neutral-400">
                I agree to the{' '}
                <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-neutral-500">Already have an account? </span>
              <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
