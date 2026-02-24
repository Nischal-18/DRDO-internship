import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  UserCog,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface User {
  user_id: number;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_active: number;
  created_at: string;
  last_login: string | null;
}

const UserList: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.users.getAll();
      if (response.success && response.data) {
        setUsers(response.data as any);
        setFilteredUsers(response.data as any);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.full_name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, roleFilter, users]);

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole) return;
    setIsProcessing(true);
    try {
      await api.users.updateRole(selectedUser.user_id, newRole);
      await fetchUsers();
      setShowRoleModal(false);
      setSelectedUser(null);
      setNewRole('');
    } catch (err: any) {
      setError(err.message || 'Failed to update role');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStatusToggle = async (user: User) => {
    setIsProcessing(true);
    try {
      await api.users.updateStatus(user.user_id, !user.is_active);
      await fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setIsProcessing(true);
    try {
      await api.users.delete(selectedUser.user_id);
      await fetchUsers();
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setIsProcessing(false);
    }
  };

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary-400/10 text-primary-400 border border-primary-400/20';
      case 'reviewer':
        return 'bg-info-400/10 text-info-400 border border-info-400/20';
      case 'applicant':
        return 'bg-surface-700/50 text-neutral-400 border border-surface-600/50';
      default:
        return 'bg-surface-700/50 text-neutral-400 border border-surface-600/50';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

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
          <h1 className="text-2xl font-bold text-neutral-50">Users</h1>
          <p className="text-neutral-400">{users.length} total users</p>
        </div>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 px-4 py-2 bg-surface-800 border border-surface-700/50 rounded-xl hover:bg-surface-700 transition-colors text-neutral-300"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-error-500/10 border border-error-500/30 rounded-xl p-4 text-error-400 flex items-center justify-between">
          <p>{error}</p>
          <button onClick={() => setError('')} className="text-error-400 hover:text-error-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-800/80 border border-surface-600/50 rounded-lg text-neutral-200 placeholder-neutral-500 focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-500" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 bg-surface-800/80 border border-surface-600/50 rounded-lg text-neutral-200 focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
            >
              <option value="all">All Roles</option>
              <option value="applicant">Applicant</option>
              <option value="reviewer">Reviewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface-800/60 rounded-xl border border-surface-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-800 border-b border-surface-700/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700/30">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    No users found
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.user_id} className="hover:bg-surface-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-neutral-100">{user.full_name}</p>
                        <p className="text-sm text-neutral-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusToggle(user)}
                        disabled={user.user_id === currentUser?.userId || isProcessing}
                        className={`flex items-center gap-2 ${
                          user.user_id === currentUser?.userId ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        }`}
                        title={user.user_id === currentUser?.userId ? 'Cannot change your own status' : 'Toggle status'}
                      >
                        {user.is_active ? (
                          <>
                            <ToggleRight className="w-6 h-6 text-success-400" />
                            <span className="text-sm text-success-400">Active</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-6 h-6 text-neutral-500" />
                            <span className="text-sm text-neutral-500">Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 text-sm">
                      {formatDate(user.last_login)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openRoleModal(user)}
                          className="p-2 text-neutral-500 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors"
                          title="Change role"
                        >
                          <UserCog className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          disabled={user.user_id === currentUser?.userId}
                          className={`p-2 rounded-lg transition-colors ${
                            user.user_id === currentUser?.userId
                              ? 'text-neutral-600 cursor-not-allowed'
                              : 'text-neutral-500 hover:text-error-400 hover:bg-error-400/10'
                          }`}
                          title={user.user_id === currentUser?.userId ? 'Cannot delete yourself' : 'Delete user'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
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

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-surface-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-800 border border-surface-700/50 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-50">Change User Role</h3>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="p-1 hover:bg-surface-700/50 rounded transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>
            <p className="text-neutral-400 mb-4">
              Change role for <strong className="text-neutral-200">{selectedUser.full_name}</strong>
            </p>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full px-4 py-2 bg-surface-800/80 border border-surface-600/50 rounded-lg mb-4 text-neutral-200 focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
            >
              <option value="applicant">Applicant</option>
              <option value="reviewer">Reviewer</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-2 border border-surface-700/50 rounded-lg hover:bg-surface-700/30 transition-colors text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                disabled={isProcessing || newRole === selectedUser.role}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-400 text-surface-950 font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-surface-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-800 border border-surface-700/50 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-error-400/10 border border-error-400/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-error-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-50">Delete User</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Are you sure you want to delete <strong className="text-neutral-200">{selectedUser.full_name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-surface-700/50 rounded-lg hover:bg-surface-700/30 transition-colors text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-error-500/20 text-error-400 border border-error-500/30 rounded-lg hover:bg-error-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
