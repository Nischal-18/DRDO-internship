import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common';
import { LoadingSpinner } from '../../components/common';
import api from '../../services/api';
import { FileText } from 'lucide-react';

interface Application {
  application_id: number;
  program_id: number;
  program_name: string;
  status: string;
  applied_at: string;
  reviewed_at?: string;
  remarks?: string;
}

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.applications.getMyApplications();
      setApplications((response.data || []) as Application[]);
    } catch (err: any) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success-400/10 text-success-400 border border-success-400/20';
      case 'rejected':
        return 'bg-error-400/10 text-error-400 border border-error-400/20';
      case 'under_review':
        return 'bg-warning-400/10 text-warning-400 border border-warning-400/20';
      default:
        return 'bg-surface-700/50 text-neutral-400 border border-surface-600/50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Header */}
      <div className="bg-surface-900 border-b border-surface-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-neutral-50">
                Welcome, {user?.full_name}!
              </h1>
              <p className="text-neutral-400 mt-1">{user?.email}</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface-800/60 border border-surface-700/50 rounded-xl p-6 hover:border-primary-400/30 transition-all duration-300">
            <div className="text-center">
              <p className="text-neutral-400 text-sm">Total Applications</p>
              <p className="text-4xl font-bold text-primary-400 mt-2">{applications.length}</p>
            </div>
          </div>
          <div className="bg-surface-800/60 border border-surface-700/50 rounded-xl p-6 hover:border-success-400/30 transition-all duration-300">
            <div className="text-center">
              <p className="text-neutral-400 text-sm">Approved</p>
              <p className="text-4xl font-bold text-success-400 mt-2">
                {applications.filter((app) => app.status === 'approved').length}
              </p>
            </div>
          </div>
          <div className="bg-surface-800/60 border border-surface-700/50 rounded-xl p-6 hover:border-warning-400/30 transition-all duration-300">
            <div className="text-center">
              <p className="text-neutral-400 text-sm">Pending</p>
              <p className="text-4xl font-bold text-warning-400 mt-2">
                {applications.filter((app) => app.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-surface-800/60 rounded-xl border border-surface-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-700/50 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-neutral-50">My Applications</h2>
            <Button variant="primary" onClick={() => navigate('/programs')}>
              Apply for Program
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-error-500/10 border-l-4 border-error-500">
              <p className="text-error-400">{error}</p>
            </div>
          )}

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-surface-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-neutral-500" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-neutral-200">No applications</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Get started by applying for a program.
              </p>
              <div className="mt-6">
                <Button variant="primary" onClick={() => navigate('/programs')}>
                  Browse Programs
                </Button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-surface-700/30">
              {applications.map((application) => (
                <div key={application.application_id} className="p-6 hover:bg-surface-700/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-100">
                        {application.program_name}
                      </h3>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-neutral-500">
                        <span>Applied: {formatDate(application.applied_at)}</span>
                        <span>•</span>
                        <span>Application ID: #{application.application_id}</span>
                      </div>
                      {application.remarks && (
                        <p className="mt-2 text-sm text-neutral-400">
                          <span className="font-medium text-neutral-300">Remarks:</span> {application.remarks}
                        </p>
                      )}
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
