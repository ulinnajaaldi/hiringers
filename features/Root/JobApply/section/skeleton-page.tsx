import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonPage: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 shrink-0" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-8 w-64" />
      </div>
      <Skeleton className="h-[70svh] w-full" />
    </>
  );
};

export default SkeletonPage;
