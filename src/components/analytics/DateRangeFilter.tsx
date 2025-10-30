'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface DateRangeFilterProps {
    onFilterChange: (startDate: string, endDate: string) => void;
    defaultRange?: 'week' | 'month' | 'quarter' | 'year' | 'custom';
}

export default function DateRangeFilter({
    onFilterChange,
    defaultRange = 'month'
}: DateRangeFilterProps) {
    const [selectedRange, setSelectedRange] = useState(defaultRange);
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    const calculateDateRange = (range: string) => {
        const today = new Date();
        const endDate = today.toISOString().split('T')[0];
        let startDate: string;

        switch (range) {
            case 'week':
                startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0];
                break;
            case 'month':
                startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0];
                break;
            case 'quarter':
                startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0];
                break;
            case 'year':
                startDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0];
                break;
            default:
                return;
        }

        onFilterChange(startDate, endDate);
    };

    const handleRangeSelect = (range: string) => {
        setSelectedRange(range);
        if (range !== 'custom') {
            calculateDateRange(range);
        }
    };

    const handleCustomApply = () => {
        if (customStartDate && customEndDate) {
            onFilterChange(customStartDate, customEndDate);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-900">Date Range</span>
            </div>

            {/* Quick Select Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                {['week', 'month', 'quarter', 'year', 'custom'].map((range) => (
                    <button
                        key={range}
                        onClick={() => handleRangeSelect(range)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedRange === range
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {range === 'week' && 'Last Week'}
                        {range === 'month' && 'Last Month'}
                        {range === 'quarter' && 'Last Quarter'}
                        {range === 'year' && 'Last Year'}
                        {range === 'custom' && 'Custom Range'}
                    </button>
                ))}
            </div>

            {/* Custom Date Range */}
            {selectedRange === 'custom' && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-3">
                        <Input
                            type="date"
                            label="Start Date"
                            value={customStartDate}
                            onChange={(e) => setCustomStartDate(e.target.value)}
                        />
                        <Input
                            type="date"
                            label="End Date"
                            value={customEndDate}
                            onChange={(e) => setCustomEndDate(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={handleCustomApply}
                        disabled={!customStartDate || !customEndDate}
                        className="w-full"
                    >
                        Apply Custom Range
                    </Button>
                </div>
            )}
        </div>
    );
}

