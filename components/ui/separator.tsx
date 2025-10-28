"use client";

import * as React from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  dashed = false,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  dashed?: boolean;
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        dashed
          ? "border-neutral-40 bg-transparent data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-dashed data-[orientation=vertical]:h-full data-[orientation=vertical]:border-l data-[orientation=vertical]:border-dashed"
          : "bg-neutral-40 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
