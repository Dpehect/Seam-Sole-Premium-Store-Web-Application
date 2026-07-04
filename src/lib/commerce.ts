export type CouponResult = {
  code: string;
  label: string;
  amount: number;
  freeShipping?: boolean;
};

export type DeliveryMethod = 'standard' | 'express' | 'same-day';
export type PaymentMethod = 'card' | 'paypal' | 'apple-pay';

export type DeliveryOption = {
  id: DeliveryMethod;
  title: string;
  description: string;
  eta: string;
  price: number;
  badge?: string;
};

export const FREE_SHIPPING_THRESHOLD = 220;
export const STANDARD_SHIPPING = 12;
export const EXPRESS_SHIPPING = 24;
export const SAME_DAY_SHIPPING = 34;
export const TAX_RATE = 0.0825;

export const deliveryOptions: DeliveryOption[] = [
  {
    id: 'standard',
    title: 'Standard drop delivery',
    description: 'Tracked boutique packaging with recycled mailer and garment card.',
    eta: '3–5 business days',
    price: STANDARD_SHIPPING,
    badge: 'Best value'
  },
  {
    id: 'express',
    title: 'Express fit delivery',
    description: 'Priority handling for launch-week orders and last-minute rotations.',
    eta: '1–2 business days',
    price: EXPRESS_SHIPPING
  },
  {
    id: 'same-day',
    title: 'Same-day city courier',
    description: 'Mock local courier flow for premium metro delivery experiences.',
    eta: 'Today by 9 PM',
    price: SAME_DAY_SHIPPING,
    badge: 'Premium'
  }
];

export const paymentMethods: Array<{ id: PaymentMethod; title: string; description: string }> = [
  { id: 'card', title: 'Mock card', description: 'Safe frontend-only card form for demos.' },
  { id: 'paypal', title: 'Mock PayPal', description: 'Redirect-style payment simulation.' },
  { id: 'apple-pay', title: 'Mock Apple Pay', description: 'One-tap wallet style checkout.' }
];

export function getShipping(subtotal: number, freeShipping = false, deliveryMethod: DeliveryMethod = 'standard') {
  if (subtotal <= 0) return 0;

  if (deliveryMethod === 'standard') {
    if (freeShipping || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return STANDARD_SHIPPING;
  }

  if (deliveryMethod === 'express') {
    return freeShipping ? Math.max(0, EXPRESS_SHIPPING - STANDARD_SHIPPING) : EXPRESS_SHIPPING;
  }

  return freeShipping ? Math.max(0, SAME_DAY_SHIPPING - STANDARD_SHIPPING) : SAME_DAY_SHIPPING;
}

export function getTax(taxableAmount: number) {
  if (taxableAmount <= 0) return 0;
  return Math.round(taxableAmount * TAX_RATE);
}

export function getCouponDiscount(code: string, subtotal: number): CouponResult | null {
  const normalized = code.trim().toUpperCase();

  if (normalized === 'DROP10' && subtotal >= 100) {
    return { code: normalized, label: 'Drop code: 10% off', amount: Math.round(subtotal * 0.1) };
  }

  if (normalized === 'FIT15' && subtotal >= 180) {
    return { code: normalized, label: 'Fit builder: 15% off', amount: Math.round(subtotal * 0.15) };
  }

  if (normalized === 'FREESHIP' && subtotal >= 50) {
    return { code: normalized, label: 'Free standard shipping unlocked', amount: 0, freeShipping: true };
  }

  return null;
}

export function getFreeShippingProgress(subtotal: number) {
  return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
}

export function getDeliveryOption(method: DeliveryMethod) {
  return deliveryOptions.find((option) => option.id === method) ?? deliveryOptions[0];
}

export function getEstimatedDeliveryWindow(method: DeliveryMethod) {
  return getDeliveryOption(method).eta;
}

export function generateOrderNumber() {
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `SS-${new Date().getFullYear()}-${suffix}`;
}
