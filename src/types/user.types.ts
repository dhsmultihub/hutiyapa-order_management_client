// User Role Types
export type UserRole = 'customer' | 'admin' | 'staff' | 'manager' | 'support';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

// User Type
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  metadata?: Record<string, any>;
}

// User Profile
export interface UserProfile extends User {
  bio?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  preferences?: UserPreferences;
  statistics?: UserStatistics;
}

// User Preferences
export interface UserPreferences {
  language: string;
  timezone: string;
  currency: string;
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'system';
}

// Notification Preferences
export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  orderUpdates: boolean;
  paymentConfirmations: boolean;
  shipmentTracking: boolean;
  marketing: boolean;
}

// User Statistics
export interface UserStatistics {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
  lifetimeValue: number;
}

// Authentication Types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Session Type
export interface Session {
  user: User;
  accessToken: string;
  expiresAt: string;
}

// Permission Types
export type Permission = 
  | 'orders:read'
  | 'orders:create'
  | 'orders:update'
  | 'orders:delete'
  | 'payments:read'
  | 'payments:process'
  | 'payments:refund'
  | 'shipments:read'
  | 'shipments:create'
  | 'shipments:update'
  | 'users:read'
  | 'users:update'
  | 'users:delete'
  | 'analytics:read'
  | 'settings:read'
  | 'settings:update';

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  customer: [
    'orders:read',
    'orders:create',
    'payments:read',
    'shipments:read',
  ],
  staff: [
    'orders:read',
    'orders:create',
    'orders:update',
    'payments:read',
    'payments:process',
    'shipments:read',
    'shipments:create',
    'shipments:update',
    'users:read',
  ],
  support: [
    'orders:read',
    'orders:update',
    'payments:read',
    'payments:refund',
    'shipments:read',
    'users:read',
  ],
  manager: [
    'orders:read',
    'orders:create',
    'orders:update',
    'payments:read',
    'payments:process',
    'payments:refund',
    'shipments:read',
    'shipments:create',
    'shipments:update',
    'users:read',
    'users:update',
    'analytics:read',
  ],
  admin: [
    'orders:read',
    'orders:create',
    'orders:update',
    'orders:delete',
    'payments:read',
    'payments:process',
    'payments:refund',
    'shipments:read',
    'shipments:create',
    'shipments:update',
    'users:read',
    'users:update',
    'users:delete',
    'analytics:read',
    'settings:read',
    'settings:update',
  ],
};

