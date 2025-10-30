/**
 * Mobile-specific utility functions
 */

/**
 * Prevent body scroll (useful for modals on mobile)
 */
export function disableBodyScroll() {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
}

/**
 * Re-enable body scroll
 */
export function enableBodyScroll() {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}

/**
 * Request notification permission (mobile)
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
        return await Notification.requestPermission();
    }
    return 'denied';
}

/**
 * Vibrate device (if supported)
 */
export function vibrate(pattern: number | number[] = 200) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

/**
 * Check if app is in standalone mode (PWA)
 */
export function isStandalone(): boolean {
    if (typeof window === 'undefined') return false;

    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
    );
}

/**
 * Get safe area insets (for notched devices)
 */
export function getSafeAreaInsets() {
    if (typeof window === 'undefined') {
        return { top: 0, right: 0, bottom: 0, left: 0 };
    }

    const style = getComputedStyle(document.documentElement);

    return {
        top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
        right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
        bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
        left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
    };
}

/**
 * Format number for mobile display (compact)
 */
export function formatCompactNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Check if device supports touch events
 */
export function hasTouchSupport(): boolean {
    if (typeof window === 'undefined') return false;

    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
    );
}

/**
 * Get device orientation
 */
export function getOrientation(): 'portrait' | 'landscape' {
    if (typeof window === 'undefined') return 'portrait';

    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

/**
 * Add to home screen prompt (PWA)
 */
let deferredPrompt: any = null;

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });
}

export async function showInstallPrompt(): Promise<boolean> {
    if (!deferredPrompt) {
        return false;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;

    return outcome === 'accepted';
}

export function canShowInstallPrompt(): boolean {
    return deferredPrompt !== null;
}

