# Testing Guide

## Overview
Comprehensive testing strategy for the Order Management System frontend using Jest, React Testing Library, and Playwright.

---

## Table of Contents
1. [Test Structure](#test-structure)
2. [Unit Testing](#unit-testing)
3. [Integration Testing](#integration-testing)
4. [E2E Testing](#e2e-testing)
5. [Running Tests](#running-tests)
6. [Writing Tests](#writing-tests)
7. [Best Practices](#best-practices)
8. [CI/CD Integration](#cicd-integration)

---

## Test Structure

```
hutiyapa-order_management_client/
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── __tests__/
│   │           ├── button.test.tsx
│   │           └── input.test.tsx
│   ├── hooks/
│   │   └── __tests__/
│   │       └── use-responsive.test.ts
│   ├── lib/
│   │   └── __tests__/
│   │       └── utils.test.ts
│   └── test-utils/
│       ├── render.tsx
│       ├── mocks.ts
│       └── fixtures.ts
├── e2e/
│   ├── orders.spec.ts
│   ├── analytics.spec.ts
│   └── mobile.spec.ts
├── jest.config.js
├── jest.setup.js
└── playwright.config.ts
```

---

## Unit Testing

### Setup
Unit tests use **Jest** and **React Testing Library**.

### Configuration Files
- **`jest.config.js`**: Jest configuration
- **`jest.setup.js`**: Global test setup and mocks

### Running Unit Tests
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# CI mode
npm run test:ci
```

### Writing Component Tests

```typescript
import { render, screen } from '@/test-utils/render'
import userEvent from '@testing-library/user-event'
import Button from '../button'

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Writing Hook Tests

```typescript
import { renderHook, act } from '@testing-library/react'
import { useResponsive } from '../use-responsive'

describe('useResponsive Hook', () => {
  it('detects mobile correctly', () => {
    window.innerWidth = 375
    const { result } = renderHook(() => useResponsive())
    
    expect(result.current.isMobile).toBe(true)
  })
})
```

### Writing Utility Tests

```typescript
import { formatCurrency, formatDate } from '../utils'

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56')
  })
})
```

---

## Integration Testing

### API Integration Tests
Use **MSW (Mock Service Worker)** for API mocking.

```typescript
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/orders', (req, res, ctx) => {
    return res(ctx.json({ data: mockOrders }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### React Query Integration
Use the custom `render` function from `test-utils/render.tsx` which wraps components with `QueryClientProvider`.

---

## E2E Testing

### Setup
E2E tests use **Playwright** for browser automation.

### Configuration
- **`playwright.config.ts`**: Playwright configuration
- Tests are in the **`e2e/`** directory

### Running E2E Tests
```bash
# Run all E2E tests
npm run e2e

# Run with UI mode
npm run e2e:ui

# Run in debug mode
npm run e2e:debug

# Run specific test file
npx playwright test orders.spec.ts

# Run on specific browser
npx playwright test --project=chromium
```

### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test'

test.describe('Order Management', () => {
  test('should display orders list', async ({ page }) => {
    await page.goto('/orders')
    await expect(page.getByRole('heading', { name: /orders/i })).toBeVisible()
  })
  
  test('should navigate to order details', async ({ page }) => {
    await page.goto('/orders')
    const firstOrder = page.locator('[data-testid="order-card"]').first()
    await firstOrder.click()
    await expect(page).toHaveURL(/\/orders\/[^/]+$/)
  })
})
```

### Mobile E2E Tests

```typescript
test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })
  
  test('should show mobile navigation', async ({ page }) => {
    await page.goto('/')
    const mobileNav = page.locator('nav[class*="mobile"]')
    await expect(mobileNav).toBeVisible()
  })
})
```

---

## Running Tests

### Local Development

```bash
# Unit tests (watch mode)
npm run test:watch

# E2E tests (headless)
npm run e2e

# E2E tests (headed with UI)
npm run e2e:ui

# All tests with coverage
npm run test:coverage && npm run e2e
```

### CI/CD Environment

```bash
# Unit tests (CI mode)
npm run test:ci

# E2E tests (CI mode)
npx playwright test --project=chromium
```

---

## Writing Tests

### Test File Naming
- Unit tests: `*.test.{ts,tsx}` or `*.spec.{ts,tsx}`
- E2E tests: `*.spec.ts` in the `e2e/` directory

### Test Structure

```typescript
describe('Feature Name', () => {
  // Setup
  beforeEach(() => {
    // Common setup
  })
  
  afterEach(() => {
    // Cleanup
  })
  
  it('should do something', () => {
    // Arrange
    const input = 'test'
    
    // Act
    const result = someFunction(input)
    
    // Assert
    expect(result).toBe('expected')
  })
})
```

### Using Test Utilities

**Custom Render:**
```typescript
import { render, screen } from '@/test-utils/render'
```

**Mock Data:**
```typescript
import { mockOrder, mockOrders } from '@/test-utils/mocks'
```

**Fixtures:**
```typescript
import { createMockOrder } from '@/test-utils/fixtures'

const order = createMockOrder({ status: 'PENDING' })
```

---

## Best Practices

### Unit Tests
1. **Test user behavior**, not implementation details
2. **Use semantic queries** (`getByRole`, `getByLabelText`, etc.)
3. **Avoid testing library internals**
4. **Keep tests simple and readable**
5. **Mock external dependencies**
6. **Test edge cases and error states**

### E2E Tests
1. **Test critical user journeys**
2. **Use data-testid sparingly** (prefer semantic locators)
3. **Wait for elements properly**
4. **Test on multiple browsers**
5. **Keep tests independent**
6. **Use Page Object Model for complex flows**

### General Guidelines
1. **Write tests that fail for the right reason**
2. **Maintain test isolation**
3. **Keep tests fast**
4. **Make tests deterministic**
5. **Follow the AAA pattern** (Arrange, Act, Assert)
6. **Use meaningful test descriptions**

---

## Coverage Goals

### Target Coverage
- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

### Viewing Coverage

```bash
# Generate coverage report
npm run test:coverage

# Open HTML report
open coverage/lcov-report/index.html
```

### Coverage Configuration
Coverage thresholds are configured in `jest.config.js`:

```javascript
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
}
```

---

## CI/CD Integration

### GitHub Actions
Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

### Workflow Files
- **`.github/workflows/test.yml`**: CI/CD test workflow

### Test Reports
- Unit test coverage: Uploaded to Codecov
- E2E test reports: Stored as artifacts
- Playwright reports: Available for 30 days

---

## Debugging Tests

### Unit Tests

```bash
# Run specific test file
npm test -- button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Button"

# Debug in VS Code
# Add breakpoint and use "Jest: Debug" in VS Code
```

### E2E Tests

```bash
# Debug mode (opens browser)
npm run e2e:debug

# UI mode (interactive)
npm run e2e:ui

# Headed mode
npx playwright test --headed

# Slow motion
npx playwright test --headed --slow-mo=1000
```

### VS Code Configuration

Add to `.vscode/launch.json`:

```json
{
  "configurations": [
    {
      "name": "Jest Debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "--no-cache"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

---

## Common Issues

### Jest Issues

**Issue**: Tests fail with "Cannot find module"
**Solution**: Check `moduleNameMapper` in `jest.config.js`

**Issue**: Tests timeout
**Solution**: Increase timeout in test: `jest.setTimeout(10000)`

### Playwright Issues

**Issue**: Browser not installed
**Solution**: Run `npx playwright install`

**Issue**: Tests fail in CI
**Solution**: Use `--project=chromium` and check timeouts

---

## Resources

### Documentation
- [Jest Docs](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Docs](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Examples
- See `src/**/__tests__/` for unit test examples
- See `e2e/` for E2E test examples
- See `test-utils/` for utilities and mocks

---

## Summary

✅ **Unit Tests**: Fast, isolated component and function tests  
✅ **Integration Tests**: Test component interactions and API integration  
✅ **E2E Tests**: Full user journey tests across browsers  
✅ **Coverage Reports**: Track test coverage and quality  
✅ **CI/CD**: Automated testing on every commit  

**Happy Testing! 🧪**

