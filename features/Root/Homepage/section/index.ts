import dynamic from "next/dynamic";

export const SkeletonPages = dynamic(() => import("./skeleton-pages"), {
  ssr: false,
});
