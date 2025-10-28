import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardJob: React.FC = () => {
  return (
    <div
      className="bg-neutral-10 flex flex-col gap-3 rounded-[16px] p-6"
      style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex flex-wrap items-center gap-2 lg:gap-4">
        <Skeleton className="h-8 w-20 rounded-[4px]" />
        <Skeleton className="h-8 w-20 rounded-[4px]" />
      </div>
      <div className="flex flex-col gap-0.5 md:flex-row md:items-end md:justify-between md:gap-0">
        <div className="flex flex-col gap-0.5 md:gap-1 lg:gap-2">
          <Skeleton className="h-6 w-32 rounded-[4px]" />
          <Skeleton className="h-6 w-32 rounded-[4px]" />
        </div>
        <Skeleton className="h-8 w-20 rounded-[4px]" />
      </div>
    </div>
  );
};

export default SkeletonCardJob;
