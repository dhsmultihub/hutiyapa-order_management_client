'use client';

import { formatCurrency } from '@/lib/utils';
import { TrophyIcon } from '@heroicons/react/24/outline';

interface TopProduct {
    productId: string;
    name: string;
    sales: number;
    revenue: number;
}

interface ProductPerformanceProps {
    topProducts: TopProduct[];
}

export default function ProductPerformance({ topProducts }: ProductPerformanceProps) {
    if (!topProducts || topProducts.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Products</h2>
                <p className="text-center text-gray-500 py-8">No product data available</p>
            </div>
        );
    }

    const maxRevenue = Math.max(...topProducts.map(p => p.revenue));

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
                <TrophyIcon className="w-6 h-6 text-yellow-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Top Products</h2>
            </div>

            <div className="space-y-4">
                {topProducts.map((product, index) => {
                    const percentOfMax = (product.revenue / maxRevenue) * 100;

                    return (
                        <div key={product.productId} className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center flex-1">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-3">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{product.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {product.sales} {product.sales === 1 ? 'sale' : 'sales'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="font-semibold text-gray-900">
                                        {formatCurrency(product.revenue)}
                                    </p>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${percentOfMax}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-500">Total Sales</p>
                        <p className="text-xl font-bold text-gray-900">
                            {topProducts.reduce((sum, p) => sum + p.sales, 0).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-xl font-bold text-gray-900">
                            {formatCurrency(topProducts.reduce((sum, p) => sum + p.revenue, 0))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

