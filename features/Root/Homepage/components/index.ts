import dynamic from "next/dynamic";

export const CardJob = dynamic(() => import("./card-job"), {
  ssr: false,
});
export const JobDetail = dynamic(() => import("./job-detail"), {
  ssr: false,
});
export const SkeletonCardJob = dynamic(() => import("./skeleton-card-job"), {
  ssr: false,
});
export const SkeletonJobDetail = dynamic(
  () => import("./skeleton-job-detail"),
  {
    ssr: false,
  },
);
