import React from "react";

import { SkeletonCardJob, SkeletonJobDetail } from "../components";

const SkeletonPages: React.FC = () => {
  return (
    <>
      <div className="col-span-4 flex w-full flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCardJob key={index} />
        ))}
      </div>
      <div className="border-neutral-40 col-span-8 flex h-full flex-col gap-4 rounded-[8px] border">
        <SkeletonJobDetail />
      </div>
    </>
  );
};

export default SkeletonPages;
