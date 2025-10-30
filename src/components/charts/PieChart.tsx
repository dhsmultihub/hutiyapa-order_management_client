'use client';

interface PieChartProps {
    data: Array<{
        label: string;
        value: number;
        color?: string;
    }>;
    size?: number;
}

const DEFAULT_COLORS = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // yellow
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
];

export default function PieChart({ data, size = 200 }: PieChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                No data available
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    const slices = data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (item.value / total) * 360;
        const startAngle = currentAngle;
        currentAngle += angle;

        return {
            ...item,
            percentage,
            startAngle,
            endAngle: currentAngle,
            color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        };
    });

    const radius = size / 2;
    const centerX = radius;
    const centerY = radius;

    return (
        <div className="flex flex-col items-center">
            <svg width={size} height={size} className="mb-4">
                {slices.map((slice, index) => {
                    const startAngleRad = (slice.startAngle - 90) * (Math.PI / 180);
                    const endAngleRad = (slice.endAngle - 90) * (Math.PI / 180);

                    const x1 = centerX + radius * 0.9 * Math.cos(startAngleRad);
                    const y1 = centerY + radius * 0.9 * Math.sin(startAngleRad);
                    const x2 = centerX + radius * 0.9 * Math.cos(endAngleRad);
                    const y2 = centerY + radius * 0.9 * Math.sin(endAngleRad);

                    const largeArcFlag = slice.endAngle - slice.startAngle > 180 ? 1 : 0;

                    const pathData = [
                        `M ${centerX} ${centerY}`,
                        `L ${x1} ${y1}`,
                        `A ${radius * 0.9} ${radius * 0.9} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                        'Z',
                    ].join(' ');

                    return (
                        <path
                            key={index}
                            d={pathData}
                            fill={slice.color}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                    );
                })}
            </svg>

            {/* Legend */}
            <div className="space-y-2 w-full">
                {slices.map((slice, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: slice.color }}
                            />
                            <span className="text-gray-700">{slice.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{slice.value}</span>
                            <span className="text-gray-500">({slice.percentage.toFixed(1)}%)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

