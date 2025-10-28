import React from "react";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonJobDetail: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex items-start justify-between gap-6 px-6">
        <div className="flex items-start gap-6">
          <Skeleton className="h-12 w-12 shrink-0 rounded-[2px]" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-20 rounded-[4px]" />
            <div className="flex flex-col items-start gap-0.5">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
      <Separator dashed />
      <div className="flex flex-col gap-2 px-6">
        <Skeleton className="h-5 w-[80%]" />
        <Skeleton className="h-5 w-[60%]" />
        <Skeleton className="h-5 w-[90%]" />
        <Skeleton className="h-5 w-[70%]" />
        <Skeleton className="h-5 w-[90%]" />
        <Skeleton className="h-5 w-[60%]" />
        <Skeleton className="h-5 w-[80%]" />
      </div>
    </div>
  );
};

export default SkeletonJobDetail;
