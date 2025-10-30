// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// API Request Config
export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
}

// Query Parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// HTTP Status Codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// API Endpoints
export const API_ENDPOINTS = {
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id: string) => `/orders/${id}`,
  ORDER_STATUS: (id: string) => `/orders/${id}/status`,
  
  // Payments
  PAYMENTS: '/payments',
  PAYMENT_BY_ID: (id: string) => `/payments/${id}`,
  REFUNDS: '/refunds',
  
  // Shipments
  SHIPMENTS: '/shipments',
  SHIPMENT_BY_ID: (id: string) => `/shipments/${id}`,
  SHIPMENT_TRACKING: (id: string) => `/shipments/${id}/tracking`,
  
  // Analytics
  ANALYTICS: '/analytics',
  ANALYTICS_ORDERS: '/analytics/orders',
  ANALYTICS_REPORTS: '/analytics/reports',
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,
  USER_PROFILE: '/users/profile',
  
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_REGISTER: '/auth/register',
  
  // Health
  HEALTH: '/health',
  HEALTH_READY: '/health/ready',
  HEALTH_LIVE: '/health/live',
} as const;

// API Error Codes
export enum ApiErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  INVALID_REQUEST = 'INVALID_REQUEST',
}

// Webhook Event Types
export interface WebhookEvent<T = any> {
  id: string;
  type: string;
  data: T;
  timestamp: string;
  source: string;
}

// Real-time Event Types
export interface RealtimeEvent<T = any> {
  event: string;
  data: T;
  timestamp: string;
}

// File Upload Types
export interface FileUpload {
  file: File;
  fieldName: string;
  metadata?: Record<string, any>;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Cache Control
export interface CacheConfig {
  ttl?: number; // Time to live in seconds
  key?: string;
  tags?: string[];
  revalidate?: boolean;
}

