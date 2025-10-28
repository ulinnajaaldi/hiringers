import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-neutral-40 placeholder:text-neutral-60 text-neutral-90 aria-invalid:ring-destructive/20 aria-invalid:border-destructive disabled:text-neutral-60 text-m flex field-sizing-content min-h-16 w-full rounded-md border-2 bg-transparent px-3 py-2 transition-[color] outline-none disabled:cursor-not-allowed md:text-sm",
        "focus:border-primary/20 focus-visible:border-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
