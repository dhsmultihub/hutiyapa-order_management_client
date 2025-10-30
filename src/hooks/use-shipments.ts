'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Shipment } from '@/types/order';
import { 
  getShipments, 
  getShipmentById, 
  createShipment, 
  updateShipmentTracking 
} from '@/lib/api';

// Query Keys
export const shipmentKeys = {
  all: ['shipments'] as const,
  lists: () => [...shipmentKeys.all, 'list'] as const,
  list: (filters?: any) => [...shipmentKeys.lists(), filters] as const,
  details: () => [...shipmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...shipmentKeys.details(), id] as const,
};

// Fetch Shipments Hook
export function useShipments(orderId?: string) {
  return useQuery<Shipment[]>({
    queryKey: shipmentKeys.list({ orderId }),
    queryFn: () => getShipments(orderId),
  });
}

// Fetch Single Shipment Hook
export function useShipment(shipmentId: string) {
  return useQuery<Shipment>({
    queryKey: shipmentKeys.detail(shipmentId),
    queryFn: () => getShipmentById(shipmentId),
    enabled: !!shipmentId,
  });
}

// Create Shipment Hook
export function useCreateShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shipmentData: {
      orderId: string;
      carrier: string;
      serviceType?: string;
    }) => createShipment(shipmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shipmentKeys.lists() });
    },
  });
}

// Update Shipment Tracking Hook
export function useUpdateShipmentTracking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      shipmentId,
      trackingData,
    }: {
      shipmentId: string;
      trackingData: {
        trackingNumber: string;
        status: string;
        estimatedDelivery?: string;
      };
    }) => updateShipmentTracking(shipmentId, trackingData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: shipmentKeys.detail(variables.shipmentId) 
      });
      queryClient.invalidateQueries({ queryKey: shipmentKeys.lists() });
    },
  });
}

// Custom hook for shipment statistics
export function useShipmentStatistics(orderId?: string) {
  const { data: shipments, isLoading } = useShipments(orderId);

  const statistics = {
    total: shipments?.length || 0,
    pending: shipments?.filter(s => s.status === 'pending').length || 0,
    inTransit: shipments?.filter(s => s.status === 'in_transit').length || 0,
    outForDelivery: shipments?.filter(s => s.status === 'out_for_delivery').length || 0,
    delivered: shipments?.filter(s => s.status === 'delivered').length || 0,
    failed: shipments?.filter(s => s.status === 'failed').length || 0,
    returned: shipments?.filter(s => s.status === 'returned').length || 0,
  };

  return { statistics, isLoading };
}

