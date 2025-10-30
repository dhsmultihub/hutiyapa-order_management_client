'use client';

import { useResponsive } from '@/hooks/use-responsive';
import MobileAnalytics from './mobile-analytics';

export default function AnalyticsPage() {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Track your order performance
          </p>
        </div>
        <MobileAnalytics />
      </div>
    );
  }

  // Desktop analytics view (placeholder)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Comprehensive insights into your order management
        </p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500">Desktop analytics view coming soon...</p>
        <p className="text-sm text-gray-400 mt-2">For now, try the mobile view!</p>
      </div>
    </div>
  );
}
