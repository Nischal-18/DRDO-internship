/**
 * Centralized API Service
 * Handles all API requests to the backend with proper error handling and type safety
 */

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

export interface User {
  user_id: number;
  userId?: number;
  full_name: string;
  email: string;
  phone?: string | null;
  role: string;
  is_active?: number;
  created_at?: string;
  last_login?: string | null;
}

export interface LoginResponse {
  token: string;
  userId: number;
  full_name: string;
  email: string;
  role: string;
}

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface Application {
  application_id: number;
  user_id?: number;
  full_name?: string;
  email?: string;
  program_id: number;
  program_name: string;
  status: string;
  applied_at: string;
  reviewed_at?: string | null;
  remarks?: string | null;
}

// Custom error class for API errors
export class ApiError extends Error {
  statusCode?: number;
  response?: any;

  constructor(message: string, statusCode?: number, response?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Get token from localStorage if available
    const token = localStorage.getItem('token');

    // Default headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Parse JSON response
    const data: ApiResponse<T> = await response.json();

    // Handle non-successful responses
    if (!response.ok || !data.success) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError) {
      throw new ApiError('Network error: Unable to connect to the server');
    }

    // Handle other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}

/**
 * Authentication API Methods
 */
export const authApi = {
  /**
   * Login user
   */
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    return fetchApi<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Register new user
   */
  async register(userData: RegisterData): Promise<ApiResponse<LoginResponse>> {
    return fetchApi<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ApiResponse<User>> {
    return fetchApi<User>('/auth/profile');
  },
};

/**
 * Applications API Methods
 */
export const applicationsApi = {
  /**
   * Get current user's applications
   */
  async getMyApplications(): Promise<ApiResponse<Application[]>> {
    return fetchApi<Application[]>('/applications/my-applications');
  },

  /**
   * Get single application by ID
   */
  async getApplicationById(id: number): Promise<ApiResponse<Application>> {
    return fetchApi<Application>(`/applications/${id}`);
  },

  /**
   * Get all applications (Admin/Reviewer only)
   */
  async getAllApplications(): Promise<ApiResponse<Application[]>> {
    return fetchApi<Application[]>('/applications');
  },

  /**
   * Submit new application
   */
  async submitApplication(programId: number): Promise<ApiResponse<Application>> {
    return fetchApi<Application>('/applications', {
      method: 'POST',
      body: JSON.stringify({ program_id: programId }),
    });
  },

  /**
   * Update application status (Admin/Reviewer only)
   */
  async updateApplicationStatus(
    id: number,
    status: string,
    remarks?: string
  ): Promise<ApiResponse<Application>> {
    return fetchApi<Application>(`/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, remarks }),
    });
  },
};

/**
 * Users API Methods (Admin only)
 */
export const usersApi = {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return fetchApi<User[]>('/users');
  },

  /**
   * Get user by ID
   */
  async getUserById(id: number): Promise<ApiResponse<User>> {
    return fetchApi<User>(`/users/${id}`);
  },

  /**
   * Update user role
   */
  async updateUserRole(id: number, role: string): Promise<ApiResponse<void>> {
    return fetchApi<void>(`/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },

  /**
   * Update user status (activate/deactivate)
   */
  async updateUserStatus(id: number, is_active: boolean): Promise<ApiResponse<void>> {
    return fetchApi<void>(`/users/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ is_active }),
    });
  },

  /**
   * Delete user
   */
  async deleteUser(id: number): Promise<ApiResponse<void>> {
    return fetchApi<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Admin API Methods
 */
export const adminApi = {
  /**
   * Get dashboard stats
   */
  async getStats(): Promise<ApiResponse<any>> {
    return fetchApi<any>('/admin/stats');
  },

  /**
   * Get full dashboard data (stats + recent items)
   */
  async getDashboard(): Promise<ApiResponse<any>> {
    return fetchApi<any>('/admin/dashboard');
  },
};

// Default export with all APIs
const api = {
  auth: authApi,
  applications: {
    ...applicationsApi,
    getAll: applicationsApi.getAllApplications,
    getById: applicationsApi.getApplicationById,
    getMy: applicationsApi.getMyApplications,
    submit: applicationsApi.submitApplication,
    updateStatus: applicationsApi.updateApplicationStatus,
  },
  users: {
    ...usersApi,
    getAll: usersApi.getAllUsers,
    getById: usersApi.getUserById,
    updateRole: usersApi.updateUserRole,
    updateStatus: usersApi.updateUserStatus,
    delete: usersApi.deleteUser,
  },
  admin: adminApi,
};

export default api;
