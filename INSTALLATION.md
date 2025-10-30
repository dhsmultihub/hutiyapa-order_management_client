# Installation Guide - Order Management Frontend

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm)

### Step 1: Install Dependencies

Navigate to the frontend directory and install all required packages:

```bash
cd hutiyapa-order_management_client
npm install
```

This will install all dependencies including:
- Next.js 15.5.6
- React 19.1.0
- TypeScript
- Tailwind CSS
- React Query
- Axios
- Headless UI
- And all other required packages

### Step 2: Environment Configuration

Create a `.env.local` file in the frontend directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your backend API URLs:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Application Settings
NEXT_PUBLIC_APP_NAME=Order Management System
NEXT_PUBLIC_APP_VERSION=1.0.0

# Environment
NODE_ENV=development
```

### Step 3: Start Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/v1 (must be running separately)

### Step 4: Verify Installation

Open your browser and navigate to http://localhost:3000. You should see:
- ✅ Order Management System homepage
- ✅ Navigation header with links
- ✅ Feature cards for Orders, Payments, Shipments, Analytics
- ✅ Footer with information

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
```

### Production Build
```bash
npm run build        # Build optimized production bundle
npm start            # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint to check for errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
```

### Testing (when implemented)
```bash
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 📁 Project Structure

```
hutiyapa-order_management_client/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Homepage
│   │   ├── loading.tsx        # Global loading UI
│   │   ├── error.tsx          # Global error UI
│   │   ├── not-found.tsx      # 404 page
│   │   └── providers.tsx      # React Query provider
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── modal.tsx
│   │   └── layout/            # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-orders.ts
│   │   ├── use-payments.ts
│   │   └── use-shipments.ts
│   ├── lib/                   # Utility libraries
│   │   ├── api.ts            # API client with Axios
│   │   ├── constants.ts      # App constants
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript types
│       ├── order.ts
│       ├── api.types.ts
│       └── user.types.ts
├── public/                    # Static assets
├── .env.local.example        # Environment variables template
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🔌 Backend Integration

### Backend Requirements

The frontend expects the backend API to be running on:
- **URL**: http://localhost:8000/api/v1
- **WebSocket**: ws://localhost:8000

Make sure the Order Management backend server is running before starting the frontend.

### API Endpoints

The frontend integrates with these backend endpoints:
- `GET /orders` - List all orders
- `POST /orders` - Create new order
- `GET /orders/:id` - Get order details
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order
- `PUT /orders/:id/status` - Update order status
- `GET /payments` - List payments
- `POST /payments` - Process payment
- `GET /shipments` - List shipments
- `POST /shipments` - Create shipment
- `GET /health` - Health check

## 🎨 Styling

This project uses **Tailwind CSS** for styling:

- **Custom Theme**: Configured in `tailwind.config.ts`
- **Global Styles**: Defined in `src/app/globals.css`
- **Component Styles**: Utility-first approach with Tailwind classes

### Customization

To customize the theme, edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run dev
```

### Module Not Found Errors

If you encounter module errors:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart dev server
npm run dev
```

### TypeScript Errors

If TypeScript shows errors:
```bash
# Run type checking
npm run type-check

# Clear TypeScript cache
rm -rf .next
```

### Backend Connection Issues

If the frontend can't connect to the backend:
1. Verify backend is running on port 8000
2. Check `.env.local` has correct API URL
3. Ensure CORS is configured on backend
4. Check browser console for errors

## 📝 Next Steps

After successful installation:

1. ✅ **Explore the Homepage**: Navigate to http://localhost:3000
2. ✅ **Check API Integration**: Ensure backend is connected
3. ✅ **Review Components**: Check `src/components/` directory
4. ✅ **Test API Calls**: Use browser DevTools Network tab
5. ✅ **Start Development**: Begin implementing Task F2

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Review `TASKS.md` for implementation roadmap
- Inspect browser console for errors
- Check backend logs for API issues

---

**Task F1 Status**: ✅ **COMPLETED**  
**Next Task**: F2 - Order Management UI Components

