import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  Order,
  CreateOrderRequest,
  UpdateOrderRequest,
  OrderFilters,
  PaginatedResponse,
  Payment,
  Shipment,
} from '@/types/order';
import { ApiResponse, ApiError, QueryParams } from '@/types/api.types';
import { API_BASE_URL, API_TIMEOUT } from './constants';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to transform order from backend format
function transformOrder(order: any): any {
  return {
    ...order,
    // Map orderItems to items
    items: order.orderItems || [],
    // Convert uppercase status to lowercase
    status: order.status?.toLowerCase() || 'pending',
    paymentStatus: order.paymentStatus?.toLowerCase() || 'pending',
    fulfillmentStatus: order.fulfillmentStatus?.toLowerCase() || 'unfulfilled',
  };
}

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    const data = response.data;

    // Transform order list responses
    if (data?.data?.orders && Array.isArray(data.data.orders)) {
      const totalPages = Math.ceil(data.data.total / data.data.limit);
      return {
        data: data.data.orders.map(transformOrder),
        pagination: {
          page: data.data.page || 1,
          limit: data.data.limit || 10,
          total: data.data.total || 0,
          totalPages: totalPages,
        },
      };
    }

    // Transform single order response
    if (data?.data && data.data.orderNumber) {
      return transformOrder(data.data);
    }

    return response.data;
  },
  (error: AxiosError<ApiError>) => {
    // Handle errors globally
    if (error.response) {
      const apiError: ApiError = error.response.data || {
        code: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred',
        timestamp: new Date().toISOString(),
      };
      return Promise.reject(apiError);
    } else if (error.request) {
      return Promise.reject({
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection.',
        timestamp: new Date().toISOString(),
      });
    }
    return Promise.reject({
      code: 'REQUEST_ERROR',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
);

// Helper function to build query string
function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          searchParams.append(`${key}[${nestedKey}]`, String(nestedValue));
        });
      } else if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  return searchParams.toString();
}

// ============================================================================
// ORDER API
// ============================================================================

export async function getOrders(
  params?: OrderFilters & { page?: number; limit?: number }
): Promise<PaginatedResponse<Order>> {
  const queryString = params ? `?${buildQueryString(params as any)}` : '';
  return apiClient.get(`/orders${queryString}`);
}

export async function getOrderById(orderId: string): Promise<Order> {
  return apiClient.get(`/orders/${orderId}`);
}

export async function createOrder(orderData: CreateOrderRequest): Promise<Order> {
  return apiClient.post('/orders', orderData);
}

export async function updateOrder(
  orderId: string,
  orderData: UpdateOrderRequest
): Promise<Order> {
  return apiClient.put(`/orders/${orderId}`, orderData);
}

export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<Order> {
  return apiClient.put(`/orders/${orderId}/status`, { status });
}

export async function deleteOrder(orderId: string): Promise<void> {
  return apiClient.delete(`/orders/${orderId}`);
}

// ============================================================================
// PAYMENT API
// ============================================================================

export async function getPayments(orderId?: string): Promise<Payment[]> {
  const queryString = orderId ? `?orderId=${orderId}` : '';
  return apiClient.get(`/payments${queryString}`);
}

export async function getPaymentById(paymentId: string): Promise<Payment> {
  return apiClient.get(`/payments/${paymentId}`);
}

export async function processPayment(paymentData: {
  orderId: string;
  paymentMethod: string;
  amount: number;
  paymentGateway: string;
}): Promise<Payment> {
  return apiClient.post('/payments', paymentData);
}

export async function refundPayment(refundData: {
  paymentId: string;
  amount: number;
  reason: string;
}): Promise<Payment> {
  return apiClient.post('/refunds', refundData);
}

// ============================================================================
// SHIPMENT API
// ============================================================================

export async function getShipments(orderId?: string): Promise<Shipment[]> {
  const queryString = orderId ? `?orderId=${orderId}` : '';
  return apiClient.get(`/shipments${queryString}`);
}

export async function getShipmentById(shipmentId: string): Promise<Shipment> {
  return apiClient.get(`/shipments/${shipmentId}`);
}

export async function createShipment(shipmentData: {
  orderId: string;
  carrier: string;
  serviceType?: string;
}): Promise<Shipment> {
  return apiClient.post('/shipments', shipmentData);
}

export async function updateShipmentTracking(
  shipmentId: string,
  trackingData: {
    trackingNumber: string;
    status: string;
    estimatedDelivery?: string;
  }
): Promise<Shipment> {
  return apiClient.put(`/shipments/${shipmentId}/tracking`, trackingData);
}

// ============================================================================
// ANALYTICS API
// ============================================================================

export async function getAnalytics(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<any> {
  const queryString = params ? `?${buildQueryString(params)}` : '';
  return apiClient.get(`/analytics${queryString}`);
}

export async function getOrderAnalytics(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<any> {
  const queryString = params ? `?${buildQueryString(params)}` : '';
  return apiClient.get(`/analytics/orders${queryString}`);
}

// ============================================================================
// HEALTH API
// ============================================================================

export async function checkHealth(): Promise<any> {
  return apiClient.get('/health');
}

// Export the axios instance for custom requests
export default apiClient;

