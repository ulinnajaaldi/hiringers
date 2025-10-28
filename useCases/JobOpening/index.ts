export { default as useCreateJobOpening } from "./use-create-job-opening";
export { default as useGetJobOpenings } from "./use-get-job-openings";
export { default as useGetJobOpening } from "./use-get-job-opening";

export const JOBOPENING_QKEY = {
  ALL: ["job-openings"],
  DETAIL: (slug: string) => ["job-opening", { slug }],
};
