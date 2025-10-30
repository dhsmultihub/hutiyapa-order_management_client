'use client';

import { useResponsive } from './use-responsive';

export function useMobile() {
    const { isMobile, isTablet } = useResponsive();

    const isTouchDevice = () => {
        if (typeof window === 'undefined') return false;
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    const isIOS = () => {
        if (typeof window === 'undefined') return false;
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    };

    const isAndroid = () => {
        if (typeof window === 'undefined') return false;
        return /Android/.test(navigator.userAgent);
    };

    const isMobileDevice = isMobile || isTablet;
    const isTouch = isTouchDevice();

    return {
        isMobile,
        isTablet,
        isMobileDevice,
        isTouchDevice: isTouch,
        isIOS: isIOS(),
        isAndroid: isAndroid(),
        showMobileUI: isMobileDevice || isTouch,
    };
}

