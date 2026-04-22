/**
 * Test Data for Saucedemo Application
 */

const testData = {
  // Valid Users
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    locked: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    },
    problem: {
      username: 'problem_user',
      password: 'secret_sauce'
    },
    performance: {
      username: 'performance_glitch_user',
      password: 'secret_sauce'
    },
    error: {
      username: 'error_user',
      password: 'secret_sauce'
    },
    visual: {
      username: 'visual_user',
      password: 'secret_sauce'
    }
  },

  // Invalid Credentials
  invalidCredentials: {
    invalidUser: {
      username: 'invalid_user',
      password: 'secret_sauce'
    },
    invalidPassword: {
      username: 'standard_user',
      password: 'wrong_password'
    },
    emptyUsername: {
      username: '',
      password: 'secret_sauce'
    },
    emptyPassword: {
      username: 'standard_user',
      password: ''
    },
    bothEmpty: {
      username: '',
      password: ''
    }
  },

  // Products
  products: {
    backpack: 'backpack',
    bikeLight: 'bikeLight',
    boltTShirt: 'boltTShirt',
    fleeceJacket: 'fleeceJacket',
    onesie: 'onesie',
    tShirtRed: 'tShirtRed'
  },

  // Checkout Information
  checkoutInfo: {
    valid: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    },
    validAlternate: {
      firstName: 'Jane',
      lastName: 'Smith',
      postalCode: '67890'
    },
    missingFirstName: {
      firstName: '',
      lastName: 'Doe',
      postalCode: '12345'
    },
    missingLastName: {
      firstName: 'John',
      lastName: '',
      postalCode: '12345'
    },
    missingPostalCode: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: ''
    }
  },

  // URLs
  urls: {
    base: 'https://www.saucedemo.com',
    inventory: 'https://www.saucedemo.com/inventory.html',
    cart: 'https://www.saucedemo.com/cart.html',
    checkoutStepOne: 'https://www.saucedemo.com/checkout-step-one.html',
    checkoutStepTwo: 'https://www.saucedemo.com/checkout-step-two.html',
    checkoutComplete: 'https://www.saucedemo.com/checkout-complete.html'
  },

  // Expected Messages
  messages: {
    lockedOutError: 'Epic sadface: Sorry, this user has been locked out.',
    invalidCredentialsError: 'Epic sadface: Username and password do not match any user in this service',
    usernameRequiredError: 'Epic sadface: Username is required',
    passwordRequiredError: 'Epic sadface: Password is required',
    firstNameRequiredError: 'Error: First Name is required',
    lastNameRequiredError: 'Error: Last Name is required',
    postalCodeRequiredError: 'Error: Postal Code is required',
    orderCompleteHeader: 'Thank you for your order!',
    orderCompleteText: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  }
};

export default testData;
