"use client";

import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[8px] cursor-pointer text-s font-bold transition-all disabled:pointer-events-none disabled:bg-neutral-30 border border-transparent disabled:border-neutral-40 disabled:text-neutral-60! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-neutral-10! hover:bg-primary-hover",
        destructive:
          "bg-destructive text-white hover:bg-danger-hover focus-visible:ring-danger-focus",
        outline:
          "border border-neutral-40 text-neutral-100! bg-background shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12)] hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-neutral-90! hover:bg-secondary-hover",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-m h-fit px-4 py-1",
        lg: "text-l h-fit px-4 py-1.5",
        sm: "text-s h-fit gap-1.5 px-4 py-1",
        icon: "size-9",
        "icon-sm": "size-7",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      suppressHydrationWarning
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
