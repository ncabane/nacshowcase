import type { APIRequestContext, APIResponse } from '@playwright/test';
import { credentials, urls } from '../../../config/urls';

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
};

export type CartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
};

export type CartResponse = {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  isDeleted?: boolean;
  deletedOn?: string;
};

export type CartAddRequest = {
  userId: number;
  products: Array<{ id: number; quantity: number }>;
};

export class DummyJsonApi {
  constructor(private readonly request: APIRequestContext) {}

  async login(
    username = credentials.dummyJson.valid.username,
    password = credentials.dummyJson.valid.password,
  ): Promise<APIResponse> {
    return this.request.post(urls.api.auth.login, {
      data: { username, password },
    });
  }

  async getProduct(id: number): Promise<APIResponse> {
    return this.request.get(urls.api.products(id));
  }

  async addCart(payload: CartAddRequest): Promise<APIResponse> {
    return this.request.post(urls.api.carts.add, {
      data: payload,
    });
  }

  async deleteCart(id: number): Promise<APIResponse> {
    return this.request.delete(urls.api.carts.byId(id));
  }
}
