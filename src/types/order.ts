// Order Status Types
export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'returned';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export type FulfillmentStatus = 
  | 'unfulfilled'
  | 'partial'
  | 'fulfilled'
  | 'returned';

export type ShipmentStatus = 
  | 'pending'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'returned';

// Address Type
export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email?: string;
}

// Order Item Type
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  sku: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate?: number;
  metadata?: Record<string, any>;
  createdAt: string;
}

// Payment Type
export interface Payment {
  id: string;
  orderId: string;
  paymentMethod: string;
  paymentGateway: string;
  transactionId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  gatewayResponse?: Record<string, any>;
  processedAt?: string;
  createdAt: string;
}

// Shipment Type
export interface Shipment {
  id: string;
  orderId: string;
  trackingNumber?: string;
  carrier: string;
  serviceType?: string;
  status: ShipmentStatus;
  shippedAt?: string;
  deliveredAt?: string;
  estimatedDelivery?: string;
  trackingUrl?: string;
  createdAt: string;
}

// Order Type
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  totalAmount: number;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  payments?: Payment[];
  shipments?: Shipment[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

// Create Order Request
export interface CreateOrderRequest {
  userId: string;
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
    unitPrice: number;
  }>;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  notes?: string;
}

// Update Order Request
export interface UpdateOrderRequest {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  fulfillmentStatus?: FulfillmentStatus;
  shippingAddress?: Address;
  billingAddress?: Address;
  notes?: string;
}

// Order Query Filters
export interface OrderFilters {
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  fulfillmentStatus?: FulfillmentStatus[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  userId?: string;
  minAmount?: number;
  maxAmount?: number;
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Paginated Response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

