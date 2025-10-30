'use client';

interface BarChartProps {
    data: Array<{
        label: string;
        value: number;
    }>;
    height?: number;
    color?: string;
}

export default function BarChart({
    data,
    height = 300,
    color = '#3b82f6'
}: BarChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                No data available
            </div>
        );
    }

    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div style={{ height }} className="flex items-end justify-between gap-2 px-4">
            {data.map((item, index) => {
                const barHeight = (item.value / maxValue) * 100;
                return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                        {/* Value label */}
                        <div className="text-xs font-medium text-gray-700 mb-1">
                            {item.value.toLocaleString()}
                        </div>

                        {/* Bar */}
                        <div
                            className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80"
                            style={{
                                height: `${barHeight}%`,
                                backgroundColor: color,
                                minHeight: '4px',
                            }}
                        />

                        {/* Label */}
                        <div className="text-xs text-gray-500 mt-2 text-center truncate w-full">
                            {item.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

