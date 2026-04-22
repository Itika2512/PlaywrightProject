# Saucedemo Automation Framework

A comprehensive Playwright-based automation framework for testing the Saucedemo e-commerce application.

## 📁 Framework Structure

```
tests/saucedemo/
├── pages/              # Page Object Models
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── specs/              # Test Specifications
│   ├── login.spec.js
│   ├── logout.spec.js
│   ├── addToCart.spec.js
│   ├── checkout.spec.js
│   └── endToEnd.spec.js
├── fixtures/           # Test Fixtures
│   └── baseFixtures.js
├── data/              # Test Data
│   └── testData.js
├── utils/             # Utility Functions
│   └── helpers.js
└── README.md
```

## 🎯 Features

### Page Object Model (POM)
- **LoginPage**: Handles login functionality
- **InventoryPage**: Manages product browsing and cart operations
- **CartPage**: Shopping cart management
- **CheckoutPage**: Complete checkout flow

### Test Coverage
1. **Login Tests** (`login.spec.js`)
   - Valid login scenarios
   - Invalid credentials handling
   - Error message validation
   - Multiple user types

2. **Logout Tests** (`logout.spec.js`)
   - Successful logout
   - Session management
   - Re-login capability

3. **Add to Cart Tests** (`addToCart.spec.js`)
   - Single product addition
   - Multiple products
   - Product removal from inventory
   - Product removal from cart
   - Cart verification

4. **Checkout Tests** (`checkout.spec.js`)
   - Complete checkout flow
   - Form validation
   - Order summary verification
   - Checkout cancellation

5. **End-to-End Tests** (`endToEnd.spec.js`)
   - Complete user journeys
   - Multi-step workflows
   - Real-world scenarios

### Test Data Management
Centralized test data in `data/testData.js`:
- User credentials (standard, locked, problem, performance users)
- Invalid credentials for negative testing
- Product information
- Checkout details
- Expected error messages
- URLs

### Utilities
Helper functions in `utils/helpers.js`:
- Screenshot capture
- Wait utilities
- Random data generation
- Currency formatting
- Logging

## 🚀 Getting Started

### Prerequisites
```bash
npm install
```

### Running Tests

#### Run all Saucedemo tests
```bash
npx playwright test tests/saucedemo
```

#### Run specific test suite
```bash
npx playwright test tests/saucedemo/specs/login.spec.js
npx playwright test tests/saucedemo/specs/addToCart.spec.js
npx playwright test tests/saucedemo/specs/checkout.spec.js
npx playwright test tests/saucedemo/specs/logout.spec.js
npx playwright test tests/saucedemo/specs/endToEnd.spec.js
```

#### Run tests in headed mode
```bash
npx playwright test tests/saucedemo --headed
```

#### Run tests in debug mode
```bash
npx playwright test tests/saucedemo --debug
```

#### Run specific test by name
```bash
npx playwright test tests/saucedemo -g "should login successfully"
```

### View Test Reports
```bash
npx playwright show-report
```

## 📝 Writing New Tests

### Example: Adding a new test

```javascript
const { test } = require('../fixtures/baseFixtures');
const { expect } = require('@playwright/test');
const testData = require('../data/testData');

test.describe('My New Test Suite', () => {
  
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await inventoryPage.verifyPageLoaded();
  });

  test('my new test case', async ({ inventoryPage }) => {
    // Your test logic here
    await inventoryPage.addProductToCart('backpack');
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(1);
  });
});
```

## 🏗️ Framework Design Principles

### 1. Page Object Model
- Each page is represented by a class
- Locators are defined in the constructor
- Methods represent user actions
- Promotes code reusability and maintainability

### 2. Fixtures
- Page objects are injected as fixtures
- Automatic setup and teardown
- Shared across tests

### 3. Test Data Separation
- All test data in centralized location
- Easy to maintain and update
- Supports data-driven testing

### 4. Utility Functions
- Common operations extracted to helpers
- Reusable across test suites
- Reduces code duplication

## 🔧 Configuration

The framework uses the main `playwright.config.js` with:
- Chromium browser (configurable for Firefox, WebKit)
- Screenshots on failure
- Video recording on failure
- Trace on retry
- Parallel execution

## 📊 Test Execution Strategy

### Parallel Execution
Tests run in parallel by default for faster execution.

### Test Isolation
Each test is independent and can run in any order.

### Retry Mechanism
Failed tests are automatically retried (configurable in CI).

## 🎨 Best Practices

1. **Use Page Objects**: Never use raw locators in test files
2. **Descriptive Test Names**: Use clear, descriptive test names
3. **Independent Tests**: Each test should be self-contained
4. **Assertions**: Use meaningful assertions with clear messages
5. **Wait Strategies**: Use Playwright's auto-waiting features
6. **Test Data**: Use centralized test data
7. **Comments**: Add comments for complex logic

## 📈 Extending the Framework

### Adding a New Page Object
1. Create a new file in `pages/` directory
2. Define locators in constructor
3. Create methods for user actions
4. Export the class

### Adding New Test Data
1. Update `data/testData.js`
2. Organize data by category
3. Use descriptive keys

### Adding Utilities
1. Add functions to `utils/helpers.js`
2. Make them static methods
3. Document parameters and return values

## 🐛 Debugging

### Debug Mode
```bash
npx playwright test tests/saucedemo --debug
```

### Headed Mode
```bash
npx playwright test tests/saucedemo --headed --slow-mo=1000
```

### Trace Viewer
```bash
npx playwright show-trace trace.zip
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Saucedemo Application](https://www.saucedemo.com)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🤝 Contributing

When adding new tests:
1. Follow the existing structure
2. Use page objects
3. Add test data to `testData.js`
4. Write clear test descriptions
5. Add appropriate assertions

## 📄 License

This framework is for educational and testing purposes.
