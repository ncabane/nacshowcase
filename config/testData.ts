// All test input in one place: URLs, credentials, and scenario-specific values.
// AI facilitated the heavy lifting of the test data
export const urls = {
  ui: {
    base: 'https://www.saucedemo.com',
  },
  api: {
    auth: {
      login: 'https://dummyjson.com/auth/login',
    },
    products: (id: number) => `https://dummyjson.com/products/${id}`,
    carts: {
      add: 'https://dummyjson.com/carts/add',
      byId: (id: number) => `https://dummyjson.com/carts/${id}`,
    },
  },
};

export const credentials = {
  sauceDemo: {
    valid: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    invalid: {
      username: 'standard_user',
      password: 'wrong_password',
    },
  },
  dummyJson: {
    valid: {
      username: 'emilys',
      password: 'emilyspass',
    },
    invalid: {
      username: 'emilys',
      password: 'wrong_password',
    },
  },
};

export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const ui = {
  checkout: {
    firstName: 'Nicolas',
    lastName: 'Cabane',
    postalCode: '1234AB',
  } satisfies CheckoutCustomer,
};

export const api = {
  productId: 1,
  invalidProductId: 999_999,
  seededCartId: 1,
  cartProducts: [
    { id: 1, quantity: 1 },
    { id: 2, quantity: 2 },
    { id: 3, quantity: 1 },
  ],
};
