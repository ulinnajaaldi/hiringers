import dynamic from "next/dynamic";

export const PhotoCapture = dynamic(() => import("./photo-capture"), {
  ssr: false,
});
