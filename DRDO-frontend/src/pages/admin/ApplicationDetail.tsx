import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  RefreshCw, 
  User, 
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';

interface ApplicationDetail {
  application_id: number;
  user_id: number;
  program_id: number;
  program_name: string;
  status: string;
  applied_at: string;
  reviewed_at: string | null;
  remarks: string | null;
}

interface UserInfo {
  user_id: number;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_active: number;
  created_at: string;
}

const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [remarks, setRemarks] = useState('');

  const fetchApplication = async () => {
    if (!id) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await api.applications.getById(parseInt(id));
      if (response.success && response.data) {
        setApplication(response.data as any);
        setRemarks(response.data.remarks || '');
        
        // Fetch user info
        if (response.data.user_id) {
          const userResponse = await api.users.getById(response.data.user_id);
          if (userResponse.success && userResponse.data) {
            setUserInfo(userResponse.data as any);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load application');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!id) return;
    setIsUpdating(true);
    try {
      await api.applications.updateStatus(parseInt(id), newStatus, remarks);
      await fetchApplication();
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-success-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-warning-400" />;
      case 'under_review':
        return <AlertCircle className="w-5 h-5 text-info-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-error-400" />;
      default:
        return <Clock className="w-5 h-5 text-neutral-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success-400/10 text-success-400 border-success-400/20';
      case 'pending':
        return 'bg-warning-400/10 text-warning-400 border-warning-400/20';
      case 'under_review':
        return 'bg-info-400/10 text-info-400 border-info-400/20';
      case 'rejected':
        return 'bg-error-400/10 text-error-400 border-error-400/20';
      default:
        return 'bg-surface-700/50 text-neutral-400 border-surface-600/50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-primary-400 animate-spin" />
      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/applications')}
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </button>
        <div className="bg-error-500/10 border border-error-500/30 rounded-xl p-4 text-error-400">
          <p className="font-medium">Error loading application</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/applications')}
        className="flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Applications
      </button>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-50">Application #{application?.application_id}</h1>
          <p className="text-neutral-400">{application?.program_name}</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(application?.status || '')}`}>
          {getStatusIcon(application?.status || '')}
          <span className="font-medium capitalize">{application?.status?.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-error-500/10 border border-error-500/30 rounded-xl p-4 text-error-400">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Info */}
          <div className="bg-surface-800/60 rounded-xl border border-surface-700/50 p-6">
            <h2 className="font-semibold text-neutral-50 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-neutral-400" />
              Applicant Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500">Full Name</p>
                <p className="font-medium text-neutral-100">{userInfo?.full_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p className="font-medium text-neutral-100">{userInfo?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Phone</p>
                <p className="font-medium text-neutral-100">{userInfo?.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Account Status</p>
                <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                  userInfo?.is_active 
                    ? 'bg-success-400/10 text-success-400 border border-success-400/20' 
                    : 'bg-error-400/10 text-error-400 border border-error-400/20'
                }`}>
                  {userInfo?.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Application Info */}
          <div className="bg-surface-800/60 rounded-xl border border-surface-700/50 p-6">
            <h2 className="font-semibold text-neutral-50 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-neutral-400" />
              Application Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500">Program</p>
                <p className="font-medium text-neutral-100">{application?.program_name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Application ID</p>
                <p className="font-medium text-neutral-100">#{application?.application_id}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Applied On</p>
                <p className="font-medium text-neutral-100">{formatDate(application?.applied_at || '')}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Reviewed On</p>
                <p className="font-medium text-neutral-100">
                  {application?.reviewed_at ? formatDate(application.reviewed_at) : 'Not yet reviewed'}
                </p>
              </div>
            </div>

            {application?.remarks && (
              <div className="mt-4 pt-4 border-t border-surface-700/30">
                <p className="text-sm text-neutral-500 mb-1">Review Remarks</p>
                <p className="text-neutral-300 bg-surface-900/50 p-3 rounded-lg">{application.remarks}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Actions */}
        <div className="space-y-6">
          {/* Update Status */}
          <div className="bg-surface-800/60 rounded-xl border border-surface-700/50 p-6">
            <h2 className="font-semibold text-neutral-50 mb-4">Update Status</h2>
            
            {/* Remarks */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Remarks (optional)
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-surface-800/80 border border-surface-600/50 rounded-lg text-neutral-200 placeholder-neutral-500 focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 resize-none transition-all"
                placeholder="Add notes or feedback..."
              />
            </div>

            {/* Status Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleStatusUpdate('approved')}
                disabled={isUpdating || application?.status === 'approved'}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-success-400/20 text-success-400 border border-success-400/30 rounded-lg hover:bg-success-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate('under_review')}
                disabled={isUpdating || application?.status === 'under_review'}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-info-400/20 text-info-400 border border-info-400/30 rounded-lg hover:bg-info-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <AlertCircle className="w-4 h-4" />
                Mark Under Review
              </button>
              <button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={isUpdating || application?.status === 'rejected'}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-error-400/20 text-error-400 border border-error-400/30 rounded-lg hover:bg-error-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
              {application?.status !== 'pending' && (
                <button
                  onClick={() => handleStatusUpdate('pending')}
                  disabled={isUpdating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-surface-700/50 text-neutral-300 border border-surface-600/50 rounded-lg hover:bg-surface-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  Reset to Pending
                </button>
              )}
            </div>

            {isUpdating && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-500">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Updating...
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-surface-800/60 rounded-xl border border-surface-700/50 p-6">
            <h2 className="font-semibold text-neutral-50 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neutral-400" />
              Timeline
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-success-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-100">Application Submitted</p>
                  <p className="text-xs text-neutral-500">{formatDate(application?.applied_at || '')}</p>
                </div>
              </div>
              {application?.reviewed_at && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-info-400" />
                  <div>
                    <p className="text-sm font-medium text-neutral-100">Status Updated</p>
                    <p className="text-xs text-neutral-500">{formatDate(application.reviewed_at)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
