import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import api from '../../services/api';

interface Application {
  application_id: number;
  user_id: number;
  full_name: string;
  email: string;
  program_id: number;
  program_name: string;
  status: string;
  applied_at: string;
  reviewed_at: string | null;
}

const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchApplications = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.applications.getAll();
      if (response.success && response.data) {
        setApplications(response.data as any);
        setFilteredApplications(response.data as any);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.full_name.toLowerCase().includes(search) ||
        app.email.toLowerCase().includes(search) ||
        app.program_name.toLowerCase().includes(search)
      );
    }

    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, applications]);

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
        return 'bg-surface-700/50 text-neutral-400 border border-surface-600/50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-primary-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-50">Applications</h1>
          <p className="text-neutral-400">{applications.length} total applications</p>
        </div>
        <button
          onClick={fetchApplications}
          className="flex items-center gap-2 px-4 py-2 bg-surface-800 border border-surface-700/50 rounded-xl hover:bg-surface-700 transition-colors text-neutral-300"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-error-500/10 border border-error-500/30 rounded-xl p-4 text-error-400">
          <p>{error}</p>
          <button onClick={fetchApplications} className="text-sm underline mt-1">Try again</button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-surface-800/60 rounded-xl border border-surface-700/50 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by name, email, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-800/80 border border-surface-600/50 rounded-lg text-neutral-200 placeholder-neutral-500 focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-surface-800/80 border border-surface-600/50 rounded-lg text-neutral-200 focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-surface-800/60 rounded-xl border border-surface-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-800 border-b border-surface-700/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Program
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700/30">
              {paginatedApplications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    No applications found
                  </td>
                </tr>
              ) : (
                paginatedApplications.map((app) => (
                  <tr key={app.application_id} className="hover:bg-surface-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-neutral-100">{app.full_name}</p>
                        <p className="text-sm text-neutral-500">{app.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-neutral-300">{app.program_name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400">
                      {formatDate(app.applied_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/applications/${app.application_id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-400/10 text-primary-400 border border-primary-400/20 rounded-lg hover:bg-primary-400/20 transition-colors text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-surface-700/50 flex items-center justify-between">
            <p className="text-sm text-neutral-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredApplications.length)} of {filteredApplications.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-surface-700/50 hover:bg-surface-700/30 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-400 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm text-neutral-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-surface-700/50 hover:bg-surface-700/30 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-400 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationList;
