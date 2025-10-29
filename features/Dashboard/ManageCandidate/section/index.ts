import dynamic from "next/dynamic";

export const SkeletonPage = dynamic(() => import("./skeleton-page"), {
  ssr: false,
});
export const DialogDetail = dynamic(() => import("./dialog-detail"), {
  ssr: false,
});
