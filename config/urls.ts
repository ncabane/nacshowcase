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
