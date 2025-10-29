import dynamic from "next/dynamic";

export const CardJob = dynamic(() => import("./card-job"), { ssr: false });
export const SkeletonCardJob = dynamic(() => import("./skeleton-card-job"), {
  ssr: false,
});
export const SearchJob = dynamic(() => import("./search-job"), {
  ssr: false,
});
