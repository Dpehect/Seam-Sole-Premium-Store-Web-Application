import { z } from 'zod';

const cardNumberRegex = /^[0-9 ]{12,23}$/;
const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
const cvvRegex = /^[0-9]{3,4}$/;

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Phone is required for delivery updates'),
  address: z.string().min(8, 'Address is required'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State / region is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  deliveryMethod: z.enum(['standard', 'express', 'same-day']),
  paymentMethod: z.enum(['card', 'paypal', 'apple-pay']),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
  billingSameAsShipping: z.boolean().default(true),
  saveInfo: z.boolean().default(false),
  giftNote: z.string().max(180, 'Gift note must stay under 180 characters').optional(),
  terms: z.boolean().refine((value) => value, 'Accept the demo checkout terms')
}).superRefine((value, ctx) => {
  if (value.paymentMethod !== 'card') return;

  if (!value.cardName || value.cardName.trim().length < 3) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cardName'], message: 'Name on card is required' });
  }

  if (!value.cardNumber || !cardNumberRegex.test(value.cardNumber.replace(/-/g, ' '))) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cardNumber'], message: 'Enter a mock card number' });
  }

  if (!value.expiry || !expiryRegex.test(value.expiry)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['expiry'], message: 'Use MM/YY' });
  }

  if (!value.cvv || !cvvRegex.test(value.cvv)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cvv'], message: 'Enter CVV' });
  }
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
