'use client';

interface LineChartProps {
    data: Array<{
        label: string;
        value: number;
    }>;
    height?: number;
    color?: string;
}

export default function LineChart({
    data,
    height = 300,
    color = '#3b82f6'
}: LineChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                No data available
            </div>
        );
    }

    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;

    // Calculate points for the line
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((d.value - minValue) / range) * 80 - 10;
        return `${x},${y}`;
    }).join(' ');

    // Calculate area polygon points
    const areaPoints = `0,100 ${points} 100,100`;

    return (
        <div className="relative" style={{ height }}>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                {/* Area fill */}
                <polygon
                    points={areaPoints}
                    fill={color}
                    fillOpacity="0.1"
                />

                {/* Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                />

                {/* Points */}
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    const y = 100 - ((d.value - minValue) / range) * 80 - 10;
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="1"
                            fill={color}
                            vectorEffect="non-scaling-stroke"
                        />
                    );
                })}
            </svg>

            {/* Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
                {data.map((d, i) => {
                    if (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1) {
                        return (
                            <span key={i} className="text-center">
                                {d.label}
                            </span>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

