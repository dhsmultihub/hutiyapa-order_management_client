'use client';

import { useRef, useEffect, RefObject } from 'react';

interface TouchHandlers {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onTap?: () => void;
    onLongPress?: () => void;
}

interface TouchPosition {
    x: number;
    y: number;
    time: number;
}

export function useTouch<T extends HTMLElement = HTMLDivElement>(
    handlers: TouchHandlers,
    options: {
        swipeThreshold?: number;
        longPressDelay?: number;
    } = {}
): RefObject<T> {
    const ref = useRef<T>(null);
    const touchStart = useRef<TouchPosition | null>(null);
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);

    const { swipeThreshold = 50, longPressDelay = 500 } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            touchStart.current = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now(),
            };

            // Start long press timer
            if (handlers.onLongPress) {
                longPressTimer.current = setTimeout(() => {
                    handlers.onLongPress?.();
                }, longPressDelay);
            }
        };

        const handleTouchMove = () => {
            // Cancel long press on move
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            // Clear long press timer
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }

            if (!touchStart.current) return;

            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStart.current.x;
            const deltaY = touch.clientY - touchStart.current.y;
            const deltaTime = Date.now() - touchStart.current.time;

            // Check for tap
            if (
                Math.abs(deltaX) < 10 &&
                Math.abs(deltaY) < 10 &&
                deltaTime < 300 &&
                handlers.onTap
            ) {
                handlers.onTap();
                touchStart.current = null;
                return;
            }

            // Check for swipe
            if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    // Horizontal swipe
                    if (deltaX > 0 && handlers.onSwipeRight) {
                        handlers.onSwipeRight();
                    } else if (deltaX < 0 && handlers.onSwipeLeft) {
                        handlers.onSwipeLeft();
                    }
                } else {
                    // Vertical swipe
                    if (deltaY > 0 && handlers.onSwipeDown) {
                        handlers.onSwipeDown();
                    } else if (deltaY < 0 && handlers.onSwipeUp) {
                        handlers.onSwipeUp();
                    }
                }
            }

            touchStart.current = null;
        };

        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchmove', handleTouchMove);
        element.addEventListener('touchend', handleTouchEnd);

        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
            }
        };
    }, [handlers, swipeThreshold, longPressDelay]);

    return ref;
}

