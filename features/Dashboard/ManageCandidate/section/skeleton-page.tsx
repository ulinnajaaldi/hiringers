import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

const SkeletonPage: React.FC = () => {
  return (
    <div className="mx-auto flex h-full min-h-[90svh] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Skeleton className="h-8 w-1/2" />
      <div
        className={cn(
          "border-neutral-40 flex h-[50svh] flex-col items-center justify-center rounded-[8px] border p-6 text-center",
        )}
      >
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};

export default SkeletonPage;
