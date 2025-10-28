import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-neutral-60 text-neutral-90 selection:bg-primary selection:text-primary-foreground border-neutral-40 md:text-m disabled:bg-neutral-30 disabled:border-neutral-40 disabled:text-neutral-60 h-10 w-full min-w-0 rounded-[8px] border-2 bg-transparent px-4 py-2 text-sm transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed",
        "focus:border-primary/20 focus-visible:border-primary",
        "aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
