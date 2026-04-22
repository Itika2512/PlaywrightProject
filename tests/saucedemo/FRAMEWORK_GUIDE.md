# 🎯 Saucedemo Automation Framework - Quick Start Guide

## Framework Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TEST SPECIFICATIONS                       │
│  (specs/*.spec.js - What to test)                           │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  Login   │ │  Logout  │ │   Cart   │ │ Checkout │      │
│  │  Tests   │ │  Tests   │ │  Tests   │ │  Tests   │      │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘      │
└───────┼────────────┼────────────┼────────────┼─────────────┘
        │            │            │            │
        └────────────┴────────────┴────────────┘
                     │
        ┌────────────▼────────────────────────────────────────┐
        │           BASE FIXTURES                             │
        │  (fixtures/baseFixtures.js)                         │
        │  - Injects page objects into tests                  │
        │  - Manages test lifecycle                           │
        └────────────┬────────────────────────────────────────┘
                     │
        ┌────────────▼────────────────────────────────────────┐
        │          PAGE OBJECTS (POM)                         │
        │  (pages/*.js - How to interact)                     │
        │                                                      │
        │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
        │  │  Login   │ │Inventory │ │   Cart   │           │
        │  │  Page    │ │  Page    │ │   Page   │           │
        │  └──────────┘ └──────────┘ └──────────┘           │
        │                                                      │
        │  - Locators (where elements are)                    │
        │  - Methods (actions to perform)                     │
        └─────────────────────────────────────────────────────┘
                     │
        ┌────────────▼────────────────────────────────────────┐
        │          SUPPORT LAYERS                             │
        │                                                      │
        │  ┌──────────────┐      ┌──────────────┐           │
        │  │  Test Data   │      │   Helpers    │           │
        │  │ (testData.js)│      │ (helpers.js) │           │
        │  │              │      │              │           │
        │  │ - Users      │      │ - Screenshot │           │
        │  │ - Products   │      │ - Logging    │           │
        │  │ - Messages   │      │ - Utilities  │           │
        │  └──────────────┘      └──────────────┘           │
        └─────────────────────────────────────────────────────┘
```

## 🚀 Quick Start Commands

### Run All Tests
```bash
npm run test:saucedemo
```

### Run Specific Test Suites
```bash
npm run test:login      # Login tests only
npm run test:logout     # Logout tests only
npm run test:cart       # Add to cart tests
npm run test:checkout   # Checkout tests
npm run test:e2e        # End-to-end tests
```

### Debug & Development
```bash
npm run test:headed     # See browser while testing
npm run test:debug      # Step through tests
npm run report          # View HTML report
```

## 📚 Test Flow Examples

### Example 1: Simple Login Test
```
User Action Flow:
1. Navigate to login page
2. Enter username
3. Enter password
4. Click login button
5. Verify on inventory page

Code Implementation:
┌─────────────────────────────────────┐
│ Test: login.spec.js                 │
├─────────────────────────────────────┤
│ await loginPage.navigate()          │
│ await loginPage.login(user, pass)   │
│ await inventoryPage.verifyLoaded()  │
└─────────────────────────────────────┘
```

### Example 2: Add to Cart Test
```
User Action Flow:
1. Login
2. Add product to cart
3. Verify cart count
4. Go to cart
5. Verify product in cart

Code Implementation:
┌─────────────────────────────────────┐
│ Test: addToCart.spec.js             │
├─────────────────────────────────────┤
│ await loginPage.login(...)          │
│ await inventoryPage.addProduct(...) │
│ count = await getCartItemCount()    │
│ await inventoryPage.goToCart()      │
│ await cartPage.verifyPageLoaded()   │
└─────────────────────────────────────┘
```

### Example 3: Complete Checkout (E2E)
```
User Action Flow:
1. Login
2. Add products
3. Go to cart
4. Remove one product
5. Proceed to checkout
6. Fill information
7. Complete order
8. Logout

Code Implementation:
┌─────────────────────────────────────┐
│ Test: endToEnd.spec.js              │
├─────────────────────────────────────┤
│ await loginPage.login(...)          │
│ await inventoryPage.addProduct(...) │
│ await inventoryPage.goToCart()      │
│ await cartPage.removeItem(...)      │
│ await cartPage.proceedToCheckout()  │
│ await checkoutPage.fillInfo(...)    │
│ await checkoutPage.finish()         │
│ await inventoryPage.logout()        │
└─────────────────────────────────────┘
```

## 🎨 Page Object Pattern Explained

### What is a Page Object?
A Page Object is a class that represents a web page and provides methods to interact with it.

### Example: LoginPage.js
```javascript
class LoginPage {
  constructor(page) {
    // LOCATORS - Where elements are
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  // METHODS - What you can do
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Benefits
✅ **Reusability**: Use `loginPage.login()` in any test
✅ **Maintainability**: Change locator once, works everywhere
✅ **Readability**: Tests read like user actions
✅ **Separation**: Test logic separate from page interaction

## 📊 Test Data Structure

### testData.js Organization
```javascript
testData = {
  users: {
    standard: { username: '...', password: '...' },
    locked: { username: '...', password: '...' }
  },
  products: {
    backpack: 'backpack',
    bikeLight: 'bikeLight'
  },
  checkoutInfo: {
    valid: { firstName: 'John', lastName: 'Doe', ... }
  }
}
```

### Usage in Tests
```javascript
// Instead of hardcoding:
await loginPage.login('standard_user', 'secret_sauce');

// Use test data:
await loginPage.login(
  testData.users.standard.username,
  testData.users.standard.password
);
```

## 🔧 Common Operations

### 1. Adding a Product to Cart
```javascript
await inventoryPage.addProductToCart('backpack');
```

### 2. Removing a Product
```javascript
await inventoryPage.removeProductFromCart('backpack');
```

### 3. Checking Cart Count
```javascript
const count = await inventoryPage.getCartItemCount();
expect(count).toBe(2);
```

### 4. Completing Checkout
```javascript
await cartPage.proceedToCheckout();
await checkoutPage.fillCheckoutInformation(testData.checkoutInfo.valid);
await checkoutPage.continue();
await checkoutPage.finish();
```

### 5. Logging Out
```javascript
await inventoryPage.logout();
```

## 🎯 Test Organization

### Test Structure
```javascript
test.describe('Feature Name', () => {
  
  test.beforeEach(async ({ fixtures }) => {
    // Setup before each test
  });

  test('should do something', async ({ fixtures }) => {
    // Test steps
    // Assertions
  });

  test('should do something else', async ({ fixtures }) => {
    // Test steps
    // Assertions
  });
});
```

### Available Fixtures
- `loginPage` - Login page object
- `inventoryPage` - Inventory/products page object
- `cartPage` - Shopping cart page object
- `checkoutPage` - Checkout page object
- `page` - Raw Playwright page object

## 🐛 Debugging Tips

### 1. Run in Headed Mode
```bash
npm run test:headed
```
See the browser and watch tests execute.

### 2. Use Debug Mode
```bash
npm run test:debug
```
Step through tests line by line.

### 3. Add Screenshots
```javascript
await Helpers.takeScreenshot(page, 'my-screenshot');
```

### 4. Add Logging
```javascript
Helpers.logStep('Step 1: Login to application');
```

### 5. Slow Down Execution
In `playwright.config.js`:
```javascript
slowMo: 1000  // 1 second delay between actions
```

## 📈 Extending the Framework

### Adding a New Test
1. Create file in `specs/` directory
2. Import fixtures and test data
3. Write test using page objects
4. Run and verify

### Adding a New Page Object
1. Create file in `pages/` directory
2. Define locators in constructor
3. Create methods for actions
4. Export and add to fixtures

### Adding Test Data
1. Open `data/testData.js`
2. Add data in appropriate section
3. Use in tests via `testData.category.item`

## 🎓 Learning Path

### Beginner
1. Read `login.spec.js` - Understand basic test structure
2. Read `LoginPage.js` - Understand page objects
3. Run `npm run test:login` - See tests in action

### Intermediate
1. Read `addToCart.spec.js` - Multiple page interactions
2. Modify test data and re-run tests
3. Add a new test case

### Advanced
1. Read `endToEnd.spec.js` - Complex workflows
2. Create a new page object
3. Write a complete test suite

## 📞 Need Help?

### Common Issues

**Issue**: Tests fail with timeout
**Solution**: Increase timeout in config or check selectors

**Issue**: Element not found
**Solution**: Verify locator in page object, check if page loaded

**Issue**: Tests pass locally but fail in CI
**Solution**: Check headless mode, add waits for dynamic content

### Best Practices
✅ Use page objects, never raw selectors in tests
✅ Keep tests independent and isolated
✅ Use meaningful test names
✅ Add assertions to verify expected behavior
✅ Use test data instead of hardcoded values
✅ Clean up after tests (logout, clear cart)

## 🎉 You're Ready!

Start with:
```bash
npm run test:login
```

Then explore other test suites and modify them to learn!
