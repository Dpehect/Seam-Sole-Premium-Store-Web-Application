'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CreditCard, Gift, LockKeyhole, MapPin, Sparkles, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  deliveryOptions,
  generateOrderNumber,
  getDeliveryOption,
  getEstimatedDeliveryWindow,
  paymentMethods,
  type DeliveryMethod
} from '@/lib/commerce';
import { checkoutSchema, type CheckoutInput } from '@/lib/validations';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useOrderStore } from '@/store/order-store';
import type { OrderSnapshot } from '@/types/order';

const inputClass = 'rounded-3xl border border-ink/10 bg-white/55 px-5 py-4 text-sm font-semibold outline-none transition placeholder:text-ink/35 focus:border-ink focus:bg-white';

type CheckoutFormProps = {
  onDeliveryChange?: (method: DeliveryMethod) => void;
};

export function CheckoutForm({ onDeliveryChange }: CheckoutFormProps) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = useCartStore((state) => state.discount());
  const shipping = useCartStore((state) => state.shipping);
  const tax = useCartStore((state) => state.tax);
  const total = useCartStore((state) => state.total);
  const setLastOrder = useOrderStore((state) => state.setLastOrder);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: 'standard',
      paymentMethod: 'card',
      country: 'United States',
      billingSameAsShipping: true,
      saveInfo: false,
      terms: false
    }
  });

  const deliveryMethod = watch('deliveryMethod');
  const paymentMethod = watch('paymentMethod');
  const giftNote = watch('giftNote') ?? '';
  const selectedDelivery = useMemo(() => getDeliveryOption(deliveryMethod), [deliveryMethod]);

  useEffect(() => {
    onDeliveryChange?.(deliveryMethod);
  }, [deliveryMethod, onDeliveryChange]);

  function onSubmit(values: CheckoutInput) {
    const order: OrderSnapshot = {
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      items,
      customer: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone
      },
      shippingAddress: {
        address: values.address,
        apartment: values.apartment,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        country: values.country
      },
      deliveryMethod: values.deliveryMethod,
      paymentMethod: values.paymentMethod,
      deliveryEta: getEstimatedDeliveryWindow(values.deliveryMethod),
      giftNote: values.giftNote,
      totals: {
        subtotal,
        discount,
        shipping: shipping(values.deliveryMethod),
        tax: tax(values.deliveryMethod),
        total: total(values.deliveryMethod)
      }
    };

    setLastOrder(order);
    clearCart();
    toast.success('Mock order created');
    router.push('/order-success');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <Panel eyebrow="Step 01 · Contact" title="Who gets the drop?" icon={<Sparkles className="h-5 w-5" />}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="First name" error={errors.firstName?.message}><input {...register('firstName')} className={inputClass} placeholder="Maya" /></Field>
          <Field label="Last name" error={errors.lastName?.message}><input {...register('lastName')} className={inputClass} placeholder="Stone" /></Field>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Email" error={errors.email?.message}><input {...register('email')} className={inputClass} placeholder="maya@example.com" /></Field>
          <Field label="Phone" error={errors.phone?.message}><input {...register('phone')} className={inputClass} placeholder="+1 555 0199" /></Field>
        </div>
      </Panel>

      <Panel eyebrow="Step 02 · Shipping" title="Where should we send it?" icon={<MapPin className="h-5 w-5" />}>
        <Field label="Address" error={errors.address?.message}><input {...register('address')} className={inputClass} placeholder="325 Mercer Street" /></Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Apartment / suite" error={errors.apartment?.message}><input {...register('apartment')} className={inputClass} placeholder="Studio 4B" /></Field>
          <Field label="City" error={errors.city?.message}><input {...register('city')} className={inputClass} placeholder="New York" /></Field>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="State / region" error={errors.state?.message}><input {...register('state')} className={inputClass} placeholder="NY" /></Field>
          <Field label="Postal code" error={errors.postalCode?.message}><input {...register('postalCode')} className={inputClass} placeholder="10012" /></Field>
          <Field label="Country" error={errors.country?.message}><input {...register('country')} className={inputClass} /></Field>
        </div>
      </Panel>

      <Panel eyebrow="Step 03 · Delivery" title="Choose the pace." icon={<Truck className="h-5 w-5" />}>
        <div className="grid gap-3">
          {deliveryOptions.map((option) => (
            <label
              key={option.id}
              className={cn(
                'cursor-pointer rounded-4xl border p-4 transition hover:-translate-y-0.5 hover:shadow-card',
                deliveryMethod === option.id ? 'border-ink bg-lime/70' : 'border-ink/10 bg-white/45'
              )}
            >
              <input type="radio" value={option.id} {...register('deliveryMethod')} className="sr-only" />
              <span className="flex items-start justify-between gap-4">
                <span>
                  <span className="flex flex-wrap items-center gap-2 text-sm font-black uppercase tracking-[.14em]">
                    {option.title}
                    {option.badge && <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] text-cream">{option.badge}</span>}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-ink/60">{option.description}</span>
                  <span className="mt-3 block text-xs font-black uppercase tracking-[.16em] text-ink/50">{option.eta}</span>
                </span>
                <strong className="shrink-0 rounded-full bg-cream px-4 py-2 text-sm">{shipping(option.id) === 0 ? 'Free' : formatPrice(shipping(option.id))}</strong>
              </span>
            </label>
          ))}
        </div>
        <div className="rounded-4xl bg-ink p-4 text-sm leading-7 text-cream/75">
          Selected: <strong className="text-lime">{selectedDelivery.title}</strong>. Delivery, tax and order total update automatically before checkout.
        </div>
      </Panel>

      <Panel eyebrow="Step 04 · Payment" title="Payment details." icon={<CreditCard className="h-5 w-5" />}>
        <div className="grid gap-3 md:grid-cols-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={cn(
                'cursor-pointer rounded-4xl border p-4 transition hover:-translate-y-0.5 hover:shadow-card',
                paymentMethod === method.id ? 'border-ink bg-cobalt text-cream' : 'border-ink/10 bg-white/45'
              )}
            >
              <input type="radio" value={method.id} {...register('paymentMethod')} className="sr-only" />
              <span className="block text-sm font-black uppercase tracking-[.12em]">{method.title}</span>
              <span className={cn('mt-2 block text-xs leading-5', paymentMethod === method.id ? 'text-cream/75' : 'text-ink/55')}>{method.description}</span>
            </label>
          ))}
        </div>

        {paymentMethod === 'card' && (
          <div className="grid gap-4 rounded-[2rem] border border-ink/10 bg-white/45 p-4 md:grid-cols-2">
            <Field label="Name on card" error={errors.cardName?.message}><input {...register('cardName')} className={inputClass} placeholder="Maya Stone" /></Field>
            <Field label="Card number" error={errors.cardNumber?.message}><input {...register('cardNumber')} className={inputClass} placeholder="4242 4242 4242 4242" inputMode="numeric" /></Field>
            <Field label="Expiry" error={errors.expiry?.message}><input {...register('expiry')} className={inputClass} placeholder="08/29" /></Field>
            <Field label="CVV" error={errors.cvv?.message}><input {...register('cvv')} className={inputClass} placeholder="123" inputMode="numeric" /></Field>
          </div>
        )}

        <div className="grid gap-3 rounded-4xl bg-white/45 p-4 text-sm font-bold text-ink/70">
          <label className="flex items-start gap-3"><input type="checkbox" {...register('billingSameAsShipping')} className="mt-1" /> Billing address is the same as shipping.</label>
          <label className="flex items-start gap-3"><input type="checkbox" {...register('saveInfo')} className="mt-1" /> Save this information for the next drop.</label>
        </div>
      </Panel>

      <Panel eyebrow="Step 05 · Extras" title="Make it feel boutique." icon={<Gift className="h-5 w-5" />}>
        <Field label="Gift / order note" error={errors.giftNote?.message}>
          <textarea {...register('giftNote')} className={cn(inputClass, 'min-h-28 resize-none')} placeholder="Add a short note for the packing card." />
        </Field>
        <p className="text-right text-xs font-bold text-ink/45">{giftNote.length}/180</p>
        <label className="flex items-start gap-3 rounded-4xl bg-lime/50 p-4 text-sm font-bold leading-6">
          <input type="checkbox" {...register('terms')} className="mt-1" />
          <span>I agree to the order terms and understand payment data is not stored by this checkout screen.</span>
        </label>
        {errors.terms?.message && <span className="text-xs font-bold text-punch">{errors.terms.message}</span>}
      </Panel>

      <div className="sticky bottom-4 z-20 rounded-[2rem] border border-ink/10 bg-cream/90 p-4 shadow-soft backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-ink/55"><LockKeyhole className="h-4 w-4" /> Secure checkout</div>
        <Button type="submit" size="lg" variant="punch" className="w-full" disabled={isSubmitting || items.length === 0}>
          {isSubmitting ? 'Creating order...' : `Place order · ${formatPrice(total(deliveryMethod))}`}
        </Button>
      </div>
    </form>
  );
}

function Panel({ eyebrow, title, icon, children }: { eyebrow: string; title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className="grid gap-5 rounded-[3rem] border border-ink/10 bg-white/35 p-6 shadow-card backdrop-blur-xl md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.22em] text-punch">{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-black tracking-[-.08em]">{title}</h2>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime shadow-card">{icon}</div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black uppercase tracking-[.12em] text-ink/55">{label}</span>
      {children}
      {error && <span className="text-xs font-bold text-punch">{error}</span>}
    </label>
  );
}
