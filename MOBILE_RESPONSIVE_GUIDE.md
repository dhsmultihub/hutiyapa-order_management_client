# Mobile Responsive Design Guide

## Overview
This document outlines the mobile-responsive features implemented in the Order Management System frontend.

## Key Features

### 1. Responsive Hooks
Located in `src/hooks/`:
- **`use-responsive.ts`**: Provides breakpoint detection and window size tracking
- **`use-touch.ts`**: Handles touch gestures (swipe, tap, long press)
- **`use-mobile.ts`**: Detects mobile devices and touch capabilities

### 2. Mobile Components
Located in `src/components/mobile/`:
- **`MobileNavigation.tsx`**: Bottom tab navigation for mobile devices
- **`MobileHeader.tsx`**: Mobile-optimized header with hamburger menu
- **`MobileOrderCard.tsx`**: Compact order card for mobile views
- **`SwipeableOrderCard.tsx`**: Order card with swipe actions (confirm/cancel)
- **`PullToRefresh.tsx`**: Pull-to-refresh functionality
- **`BottomSheet.tsx`**: Mobile bottom sheet modal

### 3. Responsive Components
Located in `src/components/responsive/`:
- **`ResponsiveTable.tsx`**: Switches between table (desktop) and card (mobile) views
- **`ResponsiveModal.tsx`**: Adapts modal presentation for mobile (full screen)

### 4. Mobile Utilities
Located in `src/lib/mobile-utils.ts`:
- Body scroll management
- Notification permission handling
- Device vibration
- PWA detection
- Safe area insets
- Compact number formatting
- Install prompt handling

### 5. Mobile Styles
Located in `src/app/globals.css`:
- Touch-friendly tap targets (44px minimum)
- Safe area insets for notched devices
- Smooth momentum scrolling
- Touch active states
- Glassmorphism effects
- Mobile-specific animations

## Responsive Breakpoints

```typescript
const breakpoints = {
  xs: 0,      // Mobile portrait
  sm: 640px,  // Mobile landscape
  md: 768px,  // Tablet
  lg: 1024px, // Desktop
  xl: 1280px, // Large desktop
  '2xl': 1536px // Extra large desktop
}
```

## Usage Examples

### Using Responsive Hook
```typescript
import { useResponsive } from '@/hooks/use-responsive';

function MyComponent() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### Using Touch Hook
```typescript
import { useTouch } from '@/hooks/use-touch';

function SwipeableCard() {
  const ref = useTouch({
    onSwipeLeft: () => console.log('Swiped left'),
    onSwipeRight: () => console.log('Swiped right'),
    onTap: () => console.log('Tapped'),
  });
  
  return <div ref={ref}>Swipe me!</div>;
}
```

### Using Mobile Navigation
Already integrated in the root layout. Automatically shows on mobile devices.

### Using Pull-to-Refresh
```typescript
import PullToRefresh from '@/components/mobile/PullToRefresh';

function OrdersList() {
  const handleRefresh = async () => {
    await refetch();
  };
  
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      {/* Your content */}
    </PullToRefresh>
  );
}
```

### Using Bottom Sheet
```typescript
import BottomSheet from '@/components/mobile/BottomSheet';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Options"
      height="half"
    >
      {/* Your content */}
    </BottomSheet>
  );
}
```

## Testing on Mobile Devices

### 1. Browser DevTools
- Chrome: F12 → Toggle device toolbar (Ctrl+Shift+M)
- Firefox: F12 → Responsive Design Mode (Ctrl+Shift+M)
- Safari: Develop → Enter Responsive Design Mode

### 2. Real Device Testing
```bash
# Get your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Run dev server
npm run dev

# Access from mobile device
http://<your-ip>:3000
```

### 3. Test Checklist
- [ ] Navigation works on mobile (bottom tabs)
- [ ] Header is responsive (hamburger menu)
- [ ] Order cards display correctly
- [ ] Touch interactions work (swipe, tap)
- [ ] Modals are full-screen on mobile
- [ ] Pull-to-refresh works
- [ ] Safe areas respected on notched devices
- [ ] Text is readable (minimum 16px)
- [ ] Buttons are tappable (minimum 44px)
- [ ] Forms are easy to fill
- [ ] No horizontal scrolling
- [ ] Performance is smooth

### 4. Device Sizes to Test
- iPhone SE (375x667)
- iPhone 12/13 (390x844)
- iPhone 14 Pro Max (430x932)
- Samsung Galaxy S21 (360x800)
- iPad (768x1024)
- iPad Pro (1024x1366)

## Performance Optimization

### 1. Lazy Loading
Images and components are lazy-loaded to improve mobile performance.

### 2. Code Splitting
Route-based code splitting reduces initial bundle size.

### 3. Touch Optimization
- Uses `passive` event listeners where possible
- Debounced scroll handlers
- Throttled resize handlers

### 4. Animation Performance
- Uses CSS transforms and opacity (GPU-accelerated)
- Respects `prefers-reduced-motion`
- Reduces animations on low-end devices

## Best Practices

### 1. Touch Targets
- Minimum size: 44x44px
- Adequate spacing between targets
- Clear active/pressed states

### 2. Typography
- Base font size: 16px (prevents zoom on iOS)
- Sufficient line height (1.5)
- Good contrast ratios (4.5:1 minimum)

### 3. Layout
- Mobile-first approach
- Flexible grids
- Appropriate spacing
- No horizontal scrolling

### 4. Performance
- Optimize images
- Minimize JavaScript
- Use system fonts
- Lazy load off-screen content

### 5. Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## PWA Features (Future)
The app is PWA-ready with:
- Manifest file support
- Service worker capability
- Install prompt handling
- Offline support (to be implemented)

## Troubleshooting

### Issue: Touch events not working
- Ensure `passive: false` is set for preventDefault
- Check if parent elements are capturing events

### Issue: Safe areas not applied
- Verify viewport meta tag includes `viewport-fit=cover`
- Check CSS safe area environment variables

### Issue: Modal not full-screen on mobile
- Use `ResponsiveModal` with `mobileFullScreen={true}`
- Or use `BottomSheet` for native-like experience

### Issue: Slow performance
- Check for unnecessary re-renders
- Optimize images
- Use React.memo for expensive components
- Profile with React DevTools

## Additional Resources
- [MDN Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [Web.dev Mobile Performance](https://web.dev/mobile/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Mobile](https://material.io/design/platform-guidance/android-mobile.html)

