import React from "react";

import { Banknote, MapPin } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

const SkeletonCardJob: React.FC = () => {
  return (
    <div
      className={cn(
        "border-neutral-40 flex w-full cursor-pointer flex-col gap-2 rounded-[8px] border-2 px-4 py-3 transition-colors",
      )}
    >
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 shrink-0" />
        <div className="flex flex-col text-start">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Separator dashed />
      <div className="flex items-center gap-1">
        <MapPin className="text-accent size-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center gap-1">
        <Banknote className="text-accent size-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonCardJob;
