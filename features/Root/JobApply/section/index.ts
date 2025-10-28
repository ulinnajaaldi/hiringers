import dynamic from "next/dynamic";

export const FormJobApply = dynamic(() => import("./form-job-apply"), {
  ssr: false,
});
export const SkeletonPage = dynamic(
  () => import("./skeleton-page").then((mod) => mod.default),
  {
    ssr: false,
  },
);
