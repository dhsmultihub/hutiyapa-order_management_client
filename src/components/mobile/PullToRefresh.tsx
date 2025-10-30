'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface PullToRefreshProps {
    onRefresh: () => Promise<void>;
    children: ReactNode;
    threshold?: number;
}

export default function PullToRefresh({
    onRefresh,
    children,
    threshold = 80
}: PullToRefreshProps) {
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [canPull, setCanPull] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const startY = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            // Only allow pull to refresh at the top of the page
            if (window.scrollY === 0) {
                setCanPull(true);
                startY.current = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!canPull || isRefreshing) return;

            const currentY = e.touches[0].clientY;
            const distance = currentY - startY.current;

            if (distance > 0 && window.scrollY === 0) {
                e.preventDefault();
                setPullDistance(Math.min(distance, threshold * 1.5));
            }
        };

        const handleTouchEnd = async () => {
            if (!canPull || isRefreshing) return;

            if (pullDistance >= threshold) {
                setIsRefreshing(true);
                try {
                    await onRefresh();
                } finally {
                    setIsRefreshing(false);
                }
            }

            setPullDistance(0);
            setCanPull(false);
        };

        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [canPull, isRefreshing, pullDistance, threshold, onRefresh]);

    const rotation = Math.min((pullDistance / threshold) * 360, 360);
    const opacity = Math.min(pullDistance / threshold, 1);

    return (
        <div ref={containerRef} className="relative">
            {/* Pull Indicator */}
            <div
                className="absolute top-0 left-0 right-0 flex items-center justify-center overflow-hidden transition-all duration-200"
                style={{
                    height: pullDistance,
                    opacity: opacity
                }}
            >
                <div className="flex flex-col items-center">
                    <ArrowPathIcon
                        className={`w-6 h-6 text-blue-600 transition-transform ${isRefreshing ? 'animate-spin' : ''}`}
                        style={{
                            transform: isRefreshing ? undefined : `rotate(${rotation}deg)`
                        }}
                    />
                    {pullDistance >= threshold && !isRefreshing && (
                        <span className="text-xs text-gray-600 mt-1">Release to refresh</span>
                    )}
                    {isRefreshing && (
                        <span className="text-xs text-gray-600 mt-1">Refreshing...</span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div
                className="transition-transform duration-200"
                style={{
                    transform: `translateY(${pullDistance}px)`
                }}
            >
                {children}
            </div>
        </div>
    );
}

