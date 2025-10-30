'use client';

import { ReactNode } from 'react';
import { useResponsive } from '@/hooks/use-responsive';

interface Column<T> {
    key: string;
    title: string;
    render: (item: T) => ReactNode;
    mobileRender?: (item: T) => ReactNode;
    hideOnMobile?: boolean;
}

interface ResponsiveTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string;
    onRowClick?: (item: T) => void;
}

export default function ResponsiveTable<T>({
    data,
    columns,
    keyExtractor,
    onRowClick,
}: ResponsiveTableProps<T>) {
    const { isMobile } = useResponsive();

    if (isMobile) {
        // Mobile card view
        return (
            <div className="space-y-3">
                {data.map((item) => (
                    <div
                        key={keyExtractor(item)}
                        onClick={() => onRowClick?.(item)}
                        className={`bg-white rounded-lg border border-gray-200 p-4 ${onRowClick ? 'cursor-pointer active:bg-gray-50' : ''
                            }`}
                    >
                        {columns
                            .filter((col) => !col.hideOnMobile)
                            .map((column) => (
                                <div key={column.key} className="mb-2 last:mb-0">
                                    <div className="text-xs text-gray-500 mb-1">{column.title}</div>
                                    <div className="text-sm text-gray-900">
                                        {column.mobileRender
                                            ? column.mobileRender(item)
                                            : column.render(item)}
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        );
    }

    // Desktop table view
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr
                            key={keyExtractor(item)}
                            onClick={() => onRowClick?.(item)}
                            className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >
                                    {column.render(item)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

