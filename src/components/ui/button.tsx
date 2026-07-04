import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:pointer-events-none disabled:opacity-50 liquid-border',
  {
    variants: {
      variant: {
        default: 'bg-ink px-5 py-3 text-cream hover:-translate-y-0.5 hover:shadow-soft',
        punch: 'bg-punch px-5 py-3 text-cream hover:-translate-y-0.5 hover:shadow-soft',
        lime: 'bg-lime px-5 py-3 text-ink hover:-translate-y-0.5 hover:shadow-soft',
        outline: 'border border-ink/15 bg-white/30 px-5 py-3 text-ink backdrop-blur-xl hover:bg-white/60',
        ghost: 'px-3 py-2 hover:bg-ink/5'
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-5',
        lg: 'h-14 px-7 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
