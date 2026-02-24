import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import api from '../../services/api';

interface DashboardStats {
  users: {
    total: number;
    applicants: number;
    admins: number;
    reviewers: number;
    active: number;
  };
  applications: {
    total: number;
    pending: number;
    under_review: number;
    approved: number;
    rejected: number;
  };
}

interface RecentUser {
  user_id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
}

interface RecentApplication {
  application_id: number;
  user_id: number;
  full_name: string;
  email: string;
  program_id: number;
  program_name: string;
  status: string;
  applied_at: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.admin.getDashboard();
      if (response.success && response.data) {
        setStats(response.data.stats);
        setRecentUsers(response.data.recent.users);
        setRecentApplications(response.data.recent.applications);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success-400/10 text-success-400 border border-success-400/20';
      case 'pending':
        return 'bg-warning-400/10 text-warning-400 border border-warning-400/20';
      case 'under_review':
        return 'bg-info-400/10 text-info-400 border border-info-400/20';
      case 'rejected':
        return 'bg-error-400/10 text-error-400 border border-error-400/20';
      default:
        return 'bg-surface-700 text-neutral-400 border border-surface-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-primary-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-500/10 border border-error-500/30 rounded-xl p-4 text-error-400">
        <p className="font-medium">Error loading dashboard</p>
        <p className="text-sm opacity-80">{error}</p>
        <button 
          onClick={fetchDashboardData}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-50">Dashboard</h1>
          <p className="text-neutral-400">Overview of portal activity</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="flex items-center gap-2 px-4 py-2 bg-surface-800 border border-surface-700/50 rounded-xl hover:bg-surface-700 hover:border-surface-600 transition-all duration-300 text-neutral-300"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-surface-800/60 rounded-xl p-6 border border-surface-700/50 hover:border-info-400/20 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Total Users</p>
              <p className="text-3xl font-bold text-neutral-50 mt-1">{stats?.users.total || 0}</p>
            </div>
            <div className="w-12 h-12 bg-info-400/10 rounded-xl flex items-center justify-center border border-info-400/20 group-hover:shadow-sm transition-all duration-300">
              <Users className="w-6 h-6 text-info-400" />
            </div>
          </div>
          <div className="mt-4 flex gap-3 text-xs">
            <span className="text-neutral-500">{stats?.users.applicants} applicants</span>
            <span className="text-neutral-500">{stats?.users.active} active</span>
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-surface-800/60 rounded-xl p-6 border border-surface-700/50 hover:border-primary-400/20 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Total Applications</p>
              <p className="text-3xl font-bold text-neutral-50 mt-1">{stats?.applications.total || 0}</p>
            </div>
            <div className="w-12 h-12 bg-primary-400/10 rounded-xl flex items-center justify-center border border-primary-400/20 group-hover:shadow-sm transition-all duration-300">
              <FileText className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <Link to="/admin/applications" className="mt-4 inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Pending */}
        <div className="bg-surface-800/60 rounded-xl p-6 border border-surface-700/50 hover:border-warning-400/20 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Pending Review</p>
              <p className="text-3xl font-bold text-warning-400 mt-1">{stats?.applications.pending || 0}</p>
            </div>
            <div className="w-12 h-12 bg-warning-400/10 rounded-xl flex items-center justify-center border border-warning-400/20 group-hover:shadow-sm transition-all duration-300">
              <Clock className="w-6 h-6 text-warning-400" />
            </div>
          </div>
          <div className="mt-4 text-xs text-neutral-500">
            {stats?.applications.under_review || 0} under review
          </div>
        </div>

        {/* Approved */}
        <div className="bg-surface-800/60 rounded-xl p-6 border border-surface-700/50 hover:border-success-400/20 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Approved</p>
              <p className="text-3xl font-bold text-success-400 mt-1">{stats?.applications.approved || 0}</p>
            </div>
            <div className="w-12 h-12 bg-success-400/10 rounded-xl flex items-center justify-center border border-success-400/20 group-hover:shadow-sm transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-success-400" />
            </div>
          </div>
          <div className="mt-4 text-xs text-neutral-500">
            {stats?.applications.rejected || 0} rejected
          </div>
        </div>
      </div>

      {/* Recent Data Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-surface-800/60 rounded-xl border border-surface-700/50">
          <div className="p-4 border-b border-surface-700/50 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-100">Recent Applications</h2>
            <Link 
              to="/admin/applications" 
              className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-surface-700/30">
            {recentApplications.length === 0 ? (
              <div className="p-8 text-center text-neutral-500">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No applications yet</p>
              </div>
            ) : (
              recentApplications.map((app) => (
                <Link
                  key={app.application_id}
                  to={`/admin/applications/${app.application_id}`}
                  className="p-4 flex items-center justify-between hover:bg-surface-700/30 transition-all duration-300"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-200 truncate">{app.full_name}</p>
                    <p className="text-sm text-neutral-500 truncate">{app.program_name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-neutral-500">{formatDate(app.applied_at)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-surface-800/60 rounded-xl border border-surface-700/50">
          <div className="p-4 border-b border-surface-700/50 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-100">Recent Users</h2>
            <Link 
              to="/admin/users" 
              className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-surface-700/30">
            {recentUsers.length === 0 ? (
              <div className="p-8 text-center text-neutral-500">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No users yet</p>
              </div>
            ) : (
              recentUsers.map((user) => (
                <div
                  key={user.user_id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-200 truncate">{user.full_name}</p>
                    <p className="text-sm text-neutral-500 truncate">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${
                      user.role === 'admin' ? 'bg-primary-400/10 text-primary-400 border-primary-400/20' :
                      user.role === 'reviewer' ? 'bg-info-400/10 text-info-400 border-info-400/20' :
                      'bg-surface-700 text-neutral-400 border-surface-600'
                    }`}>
                      {user.role}
                    </span>
                    <span className="text-xs text-neutral-500">{formatDate(user.created_at)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface-800/60 rounded-xl border border-surface-700/50 p-6">
        <h2 className="font-semibold text-neutral-100 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/applications"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-400 text-surface-950 rounded-xl hover:shadow-glow-cyan transition-all duration-300 font-semibold"
          >
            <FileText className="w-4 h-4" />
            Review Applications
          </Link>
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface-800 border border-surface-600 text-neutral-300 rounded-xl hover:bg-surface-700 hover:border-surface-500 transition-all duration-300 font-medium"
          >
            <Users className="w-4 h-4" />
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
