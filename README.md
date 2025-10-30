# Order Management System - Frontend

Modern, responsive Next.js 15 application for enterprise order management with real-time updates and comprehensive analytics.

## 🚀 Features

- ✅ **Modern Stack**: Next.js 15, React 19, TypeScript
- ✅ **Real-time Updates**: WebSocket integration for live order tracking
- ✅ **Responsive Design**: Mobile-first design with touch gestures
- ✅ **Analytics Dashboard**: Comprehensive order metrics and visualizations
- ✅ **Type-safe**: Full TypeScript coverage with strict type checking
- ✅ **Well-tested**: 63+ tests with 70% coverage target
- ✅ **Accessible**: WCAG compliant with semantic HTML
- ✅ **Production-ready**: CI/CD pipeline with automated testing

## 📋 Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Backend API running on `http://localhost:8001` (optional for development)

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure environment variables
# Edit .env.local with your API URL
```

## 🏃 Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format
npm run format:check
```

Visit `http://localhost:3000` to view the application.

## 🧪 Testing

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run e2e

# E2E with UI
npm run e2e:ui

# E2E debug
npm run e2e:debug
```

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing documentation.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── orders/            # Order management pages
│   ├── analytics/         # Analytics dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── mobile/           # Mobile-specific components
│   ├── responsive/       # Responsive components
│   ├── realtime/         # Real-time components
│   ├── orders/           # Order components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
│   ├── use-orders.ts     # Order management hooks
│   ├── use-responsive.ts # Responsive design hooks
│   ├── use-websocket.ts  # WebSocket hooks
│   └── use-notifications.ts # Notification hooks
├── lib/                  # Utility libraries
│   ├── api.ts           # API client (Axios)
│   ├── utils.ts         # Utility functions
│   ├── constants.ts     # App constants
│   ├── websocket.service.ts # WebSocket service
│   └── mobile-utils.ts  # Mobile utilities
├── types/               # TypeScript types
│   ├── order.ts        # Order types
│   ├── api.types.ts    # API types
│   └── user.types.ts   # User types
└── test-utils/         # Testing utilities
    ├── render.tsx      # Custom render
    ├── mocks.ts        # Mock data
    └── fixtures.ts     # Test fixtures
e2e/                    # Playwright E2E tests
.github/workflows/      # CI/CD workflows
```

## 🎨 Tech Stack

### Core
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework

### State Management
- **React Query**: Server state management
- **Zustand**: Client state management

### Real-time
- **WebSocket**: Native WebSocket for live updates
- **Event-driven**: Real-time order tracking

### Testing
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **MSW**: API mocking

### UI Components
- **Headless UI**: Accessible components
- **Heroicons**: Icon library
- **CVA**: Class variance authority

### Development
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static typing

## 📱 Mobile Support

The application is fully responsive with:
- Touch gestures (swipe, tap, long press)
- Bottom tab navigation
- Pull-to-refresh
- Mobile-optimized analytics
- Safe area support for notched devices

See [MOBILE_RESPONSIVE_GUIDE.md](./MOBILE_RESPONSIVE_GUIDE.md) for details.

## 🔄 Real-time Features

- Live order updates via WebSocket
- Connection status indicator
- Notification center
- Toast notifications
- Browser notifications
- Auto-reconnection with exponential backoff

## 📊 Analytics

- Order statistics and KPIs
- Revenue trends
- Status distribution
- Daily volume charts
- Customer insights
- Date range filtering

## 🧩 Key Components

### Order Management
- Order list with filtering and pagination
- Order details with actions
- Order creation wizard
- Status updates
- Payment tracking
- Shipment tracking

### Mobile Components
- `MobileNavigation`: Bottom tab navigation
- `MobileOrderCard`: Compact order cards
- `SwipeableOrderCard`: Swipe actions
- `PullToRefresh`: Pull-to-refresh
- `BottomSheet`: Native-like modals

### Responsive Components
- `ResponsiveTable`: Adaptive table/card view
- `ResponsiveModal`: Full-screen on mobile

### Real-time Components
- `LiveOrderUpdates`: Real-time update banner
- `OrderNotifications`: Toast notifications
- `ConnectionStatus`: Connection indicator
- `NotificationCenter`: Notification hub

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8001/ws
```

### API Integration

The frontend integrates with the backend API endpoints:
- `/orders` - Order management
- `/payments` - Payment processing
- `/shipments` - Shipment tracking
- `/analytics` - Analytics data
- WebSocket at `/ws` for real-time updates

## 📖 Documentation

- [INSTALLATION.md](./INSTALLATION.md) - Installation guide
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing documentation
- [MOBILE_RESPONSIVE_GUIDE.md](./MOBILE_RESPONSIVE_GUIDE.md) - Mobile guide
- [TEST_SUMMARY.md](./TEST_SUMMARY.md) - Test summary
- [TASK_F5_SUMMARY.md](./TASK_F5_SUMMARY.md) - Mobile task summary

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t order-management-frontend .
docker run -p 3000:3000 order-management-frontend
```

### Vercel

```bash
vercel deploy
```

## 🤝 Contributing

1. Follow the established code style
2. Write tests for new features
3. Update documentation
4. Run linting and tests before committing
5. Follow semantic commit messages

## 📄 License

MIT License - See LICENSE file for details

## 👥 Team

Order Management Team

## 🎉 Status

✅ **Production Ready**

All 6 frontend tasks completed:
- F1: Next.js Setup ✅
- F2: UI Components ✅
- F3: Real-time Updates ✅
- F4: Analytics Dashboard ✅
- F5: Mobile Design ✅
- F6: Testing & QA ✅

---

**Built with ❤️ using Next.js 15 and React 19**
