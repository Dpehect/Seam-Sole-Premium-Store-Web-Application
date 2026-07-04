import type { CheckoutInput } from '@/lib/validations';
import type { DeliveryMethod, PaymentMethod } from '@/lib/commerce';
import type { CartItem } from '@/types/product';

export type OrderTotals = {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

export type OrderSnapshot = {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customer: Pick<CheckoutInput, 'firstName' | 'lastName' | 'email' | 'phone'>;
  shippingAddress: Pick<CheckoutInput, 'address' | 'apartment' | 'city' | 'state' | 'postalCode' | 'country'>;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  deliveryEta: string;
  giftNote?: string;
  totals: OrderTotals;
};
